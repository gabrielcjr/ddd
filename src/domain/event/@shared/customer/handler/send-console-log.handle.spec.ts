import CustomerCreatedEvent from "../customer-created.event";
import SendConsoleLog1Handler from "./send-console-log-1-when-customer-is-created.handler";
import SendConsoleLog2Handler from "./send-console-log-2-when-customer-is-created.handler";

describe("Test send console log handlers", () => {
    it("should send console log 1", () => {
        // Arrange
        const sendConsoleLog1Handler = new SendConsoleLog1Handler();
        const spySendConsoleLog1Handler = jest.spyOn(sendConsoleLog1Handler, "handle");
        const customerCreatedEvent = new CustomerCreatedEvent({});

        // Act
        sendConsoleLog1Handler.handle(customerCreatedEvent);

        // Assert
        expect(spySendConsoleLog1Handler).toHaveBeenCalled();
        expect(spySendConsoleLog1Handler).toHaveBeenCalledWith(customerCreatedEvent);
    });

    it("should send console log 2", () => {
        // Arrange
        const sendConsoleLog2Handler = new SendConsoleLog2Handler();
        const spySendConsoleLog2Handler = jest.spyOn(sendConsoleLog2Handler, "handle");
        const customerCreatedEvent = new CustomerCreatedEvent({})
            // Act
            sendConsoleLog2Handler.handle(customerCreatedEvent);
    
            // Assert
            expect(spySendConsoleLog2Handler).toHaveBeenCalled();
            expect(spySendConsoleLog2Handler).toHaveBeenCalledWith(customerCreatedEvent);
        });
});