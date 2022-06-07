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
       
        await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                        id: item.id,
                        product_id: item.productId,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                }))},
            {
                where: {
                    id: entity.id,
                },
            }
    )}

    // async find(id: string): Promise<Order> {
    //     return new Promise<Order> 
    // }

    // async findAll(): Promise<Order[]> {
    //     return new Promise<order[]>
    // }
}


