import { Sequelize } from 'sequelize-typescript';
import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import Order from '../../domain/entity/order';
import OrderItem from '../../domain/entity/orderItem';
import Product from '../../domain/entity/product';
import CustomerModel from '../db/sequelize/model/customer.model';
import OrderItemModel from '../db/sequelize/model/order-Idem.model';
import OrderModel from '../db/sequelize/model/order.model';
import ProductModel from '../db/sequelize/model/product.model';
import CustomerRepository from './customer.repository';
import OrderRepository from './order.repository';
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
        const product = new Product("123", "product", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "123", 
            product.name,
            product.price,
            product.id,
            2
        );
        
        const order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ 
            where: { id: order.id },
            include: ["items"]
        });
        
        expect(orderModel.toJSON()).toStrictEqual({

            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: "123",
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",

                }
            ]
        })
    })

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("street", 1, "1234", "city");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("123", "product1", 10);
        await productRepository.create(product1);

        const orderItem = new OrderItem(
            "1",
            product1.name,
            product1.price,
            product1.id,
            1
        );

        const order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        // const product2 = new Product("124", "product2", 20);
        // await productRepository.create(product2);

        // const orderItem2 = new OrderItem(
        //     "2",
        //     product2.name,
        //     product2.price,
        //     product2.id,
        //     2
        // );

        // order.addItems(orderItem2);

        const newCustomer = new Customer("124", "John Doe");
        const address2 = new Address("street2", 12, "1235", "city");
        newCustomer.changeAddress(address2);
        await customerRepository.create(newCustomer);

        order.changeCustomerId(newCustomer.id);
        
        // console.log(order)
        
        await orderRepository.update(order);

        const foundOrder = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]})
        
        // console.log(foundOrder.toJSON());
        
        expect(foundOrder.toJSON()).toStrictEqual({

            id: "123",
            customer_id: "124",
            total: order.total(),
            items: [
                {
                    id: "1",
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",

                }
                // {
                //     id: "2",
                //     name: orderItem2.name,
                //     price: orderItem2.price,
                //     quantity: orderItem2.quantity,
                //     order_id: "123",
                //     product_id: "124",

                // }
            ]
        })
    })

    it("should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("street", 1, "1234", "city");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "product", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "123",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find(order.id);
        expect(foundOrder).toStrictEqual(order);
    })

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("street", 1, "1234", "city");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        
        const productRepository = new ProductRepository();
        const product = new Product("123", "product", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "123",
            product.name,
            product.price,
            product.id,
            2
        );

        const product2 = new Product("124", "product2", 20);
        await productRepository.create(product2);

        const orderItem2 = new OrderItem(
            "124",
            product2.name,
            product2.price,
            product2.id,
            3
        );

        const order = new Order("123", "123", [orderItem, orderItem2]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrders = await orderRepository.findAll();
        expect(foundOrders).toStrictEqual([order]);
    }
    )

});