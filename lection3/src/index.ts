type CreditCardPayment = {
    type: "credit-card"
    card: string;
}

type PayPalPayment = {
    type: "paypal"
    email: string;
}

type BankTransferPayment = {
    type: "bank-transfer"
    iban: string;
}

type Payment = CreditCardPayment | PayPalPayment | BankTransferPayment

type Order ={
    id: number;
    payment: Payment;
    total: number;
}

const orders: Order[] = [
    {id: 1, payment: { type: "bank-transfer", iban: "DE1234-1234-1424-1243-12"}, total: 100},
    {id: 2, payment: { type: "credit-card", card: "2332-4566-6654-7768"}, total: 20},
    {id: 3, payment: { type: "bank-transfer", iban: "DE1234-6554-1424-8443-12"}, total: 320},
    {id: 4, payment: { type: "paypal", email: "john@gmail.com"}, total: 140},
    {id: 5, payment: { type: "paypal", email: "michael@gmail.com"}, total: 200},
    {id: 6, payment: { type: "credit-card", card: "3324-4456-6654-7776"}, total: 150},
    {id: 7, payment: { type: "paypal", email: "jane@gmail.com"}, total: 20},
    {id: 8, payment: { type: "credit-card", card: "9990-6677-9980-9987"}, total: 400},
    {id: 9, payment: { type: "paypal", email: "anne@gmail.com"}, total: 100},
]

function getPaymentDetails(orderId: number){
    const order = orders.find(o => o.id === orderId);
    switch (order?.payment.type){
        case "bank-transfer":
            console.log(`Order ${order.id} was paid with Bank Transfer( IBAN - ${order.payment.iban})`)
            break;
        case "credit-card":
            console.log(`Order ${order.id} was paid with Credit Card( Card # - ${order.payment.card})`)
            break;
        case "paypal":
            console.log(`Order ${order.id} was paid PayPal( Email - ${order.payment.email})`)
            break;
        default: 
            console.log("Wrong payment type!");
            break;

    }
}

function paymentStatistics(){
    return orders.reduce((acc, curr) =>{
        const method = curr.payment.type
        if (!acc[method]){
            acc[method] = 0
        }
        acc[method] += 1
        return acc
    }, {} as{[index: string] : number})
}

getPaymentDetails(1)
getPaymentDetails(9)

console.log(paymentStatistics())

