import { v4 as uuid } from "uuid";
import Product from "../entity/product";
import ProductInterface from "../entity/product.interface"

export default class ProductFactory {
public static create(type: string, name: string, price: number): ProductInterface {
    return new Product(uuid(),name, price);
    }
}