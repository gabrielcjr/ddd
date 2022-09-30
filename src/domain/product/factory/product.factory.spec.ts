import ProductFactory from "./product.factory";


describe("Product factory tests", () => {
    it("should create a product type A", () => {
        // Arrange
        const product = ProductFactory.create("a", "Product A", 100);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(100);
        expect(product.constructor.name).toBe("Product");
    })

    it("should create a product type B", () => {
        // Arrange
        const product = ProductFactory.create("b", "Product B", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(2);
        expect(product.constructor.name).toBe("ProductB");
    })

    it("should throw an error when creating a product with invalid type", () => {
        // Arrange
        expect(() => ProductFactory.create("c", "Product C", 100)).toThrowError("Invalid product type");
    }
    )
})