import { Sequelize } from 'sequelize-typescript';
import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import Order from '../../domain/entity/order';
import OrderItem from '../../domain/entity/orderItem';
import CustomerModel from '../db/sequelize/model/customer.model';
import OrderItemModel from '../db/sequelize/model/order-Idem.model';
import OrderModel from '../db/sequelize/model/order.model';
import ProductModel from '../db/sequelize/model/product.model';
import CustomerRepository from './customer.repository';
import ProductRepository from './product.repository';

describe("Order repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("street", 1, "1234", "city");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "product");
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "123", 
            product.name,
            product.price,
            product.id,
            2);
        
        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();

        await orderRepository.create(orderRepository);

        const orderModel = await OrderModel.findOne({ 
            where: { id: "123" },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({

            id: "123",
            customerId: "123",
            items: [
                {
                    id: "123",
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    product_id: "123",
                }
            ]
        })
    })






        
});