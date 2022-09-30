import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("Order factory unit tests", () => {
    it("should create an order", () => {
        const orderProps = {
            id: uuid(),
            customer: "John",
            items: [
                {
                    id: uuid(),
                    name: "Item 1",
                    productId: uuid(),
                    price: 10,
                    quantity: 1
                }
            ]
        }
        const order = OrderFactory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toBe(orderProps.customer);
        expect(order.items.length).toBe(1);

    });
})