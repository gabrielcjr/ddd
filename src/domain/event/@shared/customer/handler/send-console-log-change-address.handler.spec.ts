import CustomerChangeAddressEvent from "../customer-change-address.event";
import SendConsoleLogChangeAddressHandler from "./send-console-log-change-address.handler";

describe("Test send console log change address handler", () => {
    it("should send console log change address", () => {
        // Arrange
        const sendConsoleLogChangeAddressHandler = new SendConsoleLogChangeAddressHandler();
        const spySendConsoleLogChangeAddressHandler = jest.spyOn(sendConsoleLogChangeAddressHandler, "handle");
        const customerChangeAddressEvent = new CustomerChangeAddressEvent({});

        // Act

        sendConsoleLogChangeAddressHandler.handle(customerChangeAddressEvent);

        // Assert

        expect(spySendConsoleLogChangeAddressHandler).toHaveBeenCalled();
        expect(spySendConsoleLogChangeAddressHandler).toHaveBeenCalledWith(customerChangeAddressEvent);
    });
});