class Customer {
    
    _id: string;
    _name: string;
    _address: string;
    _activate: boolean = true;

    constructor(id: string, name: string, address: string) {
        this._id = id;
        this._name = name;
        this._address = address;
    }

    changeName(name: string) {
        this._name = name;
    }

    activate() {
        this._activate = true;
    }

    deactivate() {
        this._activate = false;
    }
    
}