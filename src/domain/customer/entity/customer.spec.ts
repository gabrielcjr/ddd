import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        
        expect(() => {
            const customer = new Customer("", "John");
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
            
            expect(() => {
                const customer = new Customer("123", "");
            }).toThrowError("Name is required");
    });

    it("should change name", () => {
        const customer = new Customer("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        const customer = new Customer("123", "John");
        const address = new Address("Street", 1, "12345", "City");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        const customer = new Customer("123", "John");

        customer.deactivate();
        
        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined when activate a customer", () => {
        expect(() => {
            const customer = new Customer("123", "John");

            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });

});