import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-Idem.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository {
    

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
               
};