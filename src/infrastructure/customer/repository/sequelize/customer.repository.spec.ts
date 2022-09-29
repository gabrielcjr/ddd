import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import CustomerModel from './customer.model';
import CustomerRepository from './customer.repository';

describe("Customer repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([CustomerModel])
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("street", 1, "1234", "city");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: ({ id: "123" }) });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("street", 1, "1234", "city");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: ({ id: "123" }) });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        });

        customer.changeName("John Doe");
        customer.changeAddress(new Address("street2", 2, "1235", "city2"));
        await customerRepository.update(customer);

        const customerModel2 = await CustomerModel.findOne({ where: ({ id: "123" }) });

        expect(customerModel2.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            street: customer.Address.street,
            number: customer.Address.number,
            zipcode: customer.Address.zip,
            city: customer.Address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("street", 1, "1234", "city");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: ({ id: "123" }) });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        });

    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("street", 1, "1234", "city");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: ({ id: "124" }) });

        expect(async () => {
        await customerRepository.find("124");
        }).rejects.toThrowError("Customer not found");
        });
    
    it("should find all customers", async () => {
        let customerRepository = new CustomerRepository();
        let customer1 = new Customer("123", "John");
        let address1 = new Address("street 1", 1, "1234", "city");
        customer1.Address = address1;
        customer1.addRewardPoints(10);
        customer1.activate();
        
        
        let customer2 = new Customer("124", "Johnny");
        let address2 = new Address("street 2", 2, "1235", "city 2");
        customer2.Address = address2;
        customer2.addRewardPoints(20);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
    });


        
});