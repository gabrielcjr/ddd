import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/orderItem";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository";
import OrderRepositoryInterface from "../../domain/repository/order-repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-Idem.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository  {
    // implements OrderRepositoryInterface

    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        product_id: item.productId,
                        quantity: item.quantity
                }))
            },
            {
               include: [{model: OrderItemModel}]
            }
        );
    };

    async update(entity: Order): Promise<void> {
       
        await OrderModel.update({
                id: entity.id,
                customer_id: entity.customerId,
                items: entity.items.map((item) => ({
                        id: item.id,
                        product_id: item.productId,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                        }
                )),
                total: entity.total()
            },
            {
                where: {
                    id: entity.id,
                }
            
            },      

        )
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: {
                id,
            },
            include: [{model: OrderItemModel}]
        });
        if (!orderModel) {
            throw new Error("Order not found");
        }
        const order = new Order(
            orderModel.id,
            orderModel.customer_id,
            orderModel.items.map((item) => new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
            ))
            
        );
        return order;

    }

    // async findAll(): Promise<Order[]> {
    //     return new Promise<order[]>
    // }
}


