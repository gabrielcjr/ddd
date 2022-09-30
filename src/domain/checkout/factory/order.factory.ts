import Order from "../entity/order";
import OrderItem from "../entity/orderItem";

interface OrderFactoryProps {
    id: string;
    customer: string;
    items: {
        id: string;
        name: string;
        price: number;
        productId: string;
        quantity: number;
    }[];
    }

export default class OrderFactory {
    static create(propos: OrderFactoryProps): Order {
        const items = propos.items.map((item) => {
            return new OrderItem(
                item.id,
                item.name,
                item.price,
                item.productId,
                item.quantity
            )
        });
        return new Order(propos.id, propos.customer, items);
    }
}
