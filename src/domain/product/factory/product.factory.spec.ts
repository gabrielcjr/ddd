import ProductFactory from "./product.factory";


describe("Product factory tests", () => {
    it("should create a product type A", () => {
        // Arrange
        const productFactory = new ProductFactory();
        const product = productFactory.create("Product 1", 100, "Product 1 description");

        expect(product).toBeDefined();
        expect(product.name).toBe("Product 1");
        expect(product.price).toBe(100);
        expect(product.description).toBe("Product 1 description");
    })
}