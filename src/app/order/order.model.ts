class Order {
    constructor(
        public name: string,
        public email: string,
        public emailConfirmation: string,
        public address: string,
        public number: number,
        public optionalAddress: string,
        public paymentOption: string,
        public orderItems: OrderItem[] = [],
        public _id?: string
    ) {

    }
}

class OrderItem {
    constructor(public menuId: string, public name: string,
        public price: number, public quantity: number) { }
}

export { Order, OrderItem }
