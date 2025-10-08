type Category = 'fruits' | 'beverages' | 'bakery' | 'meat' | 'sweetness'

type Product = {
    id: number;
    title: string;
    description?: string;
    price: number;
    imageUrl?: string;
    category: Category;
}

type CartItem = {
    product: Product;
    quantity: number;
}

type Cart = {
    items: CartItem[];
    totalPrice: number;
}

const products: Product[] = [
    {
        id: 1, title: 'Apple Gala', price: 1.49, category: 'fruits'
    },
    {
        id: 2, title: 'Orange Juice 1L', price: 2.99, category: 'beverages'
    },
    {
        id: 3, title: 'Croissant', price: 1.99, category: 'bakery'
    },
    {
        id: 4, title: 'Ribeye Steak', price: 14.99, category: 'meat'
    },
    {
        id: 5, title: 'Chocolate Muffin', price: 2.49, category: 'sweetness'
    },
    {
        id: 6, title: 'Banana', price: 1.09, category: 'fruits'
    },
    { 
        id: 7, title: 'Wholegrain Bread', price: 3.29, category: 'bakery'
    }
]

const cart: Cart = { totalPrice: 0, items: []}

function filterProductsByCategory(category: Category){
    return products.filter(products => products.category === category)
}

function addProductToCart(product: Product, quantity: number){
    const ifItemExist = cart.items.find(item => item.product.id ===product.id)
    if (ifItemExist){
        ifItemExist.quantity += quantity;
    } else {
        cart.items.push({product, quantity})
    }
}

function removeFromCart(productId: number, quantity: number = 1){
    const item = cart.items.findIndex(item => item.product.id === productId)
    if (item > -1){
        if (cart.items[item].quantity > quantity){
            cart.items[item].quantity -= quantity;
        } else if (cart.items[item].quantity <= quantity){
            cart.items.splice(item, 1)
        }
    }
}

function calcTotalPrice(){
    return cart.items.reduce( (total, item) => {
        total = total + item.product.price * item.quantity;
        return total;
    }, 0)
}

addProductToCart(products[3], 2)
addProductToCart(products[1], 1)

// console.log(filterProductsByCategory('meat'))
console.log("Before - ", cart.items);
removeFromCart(2);              //логика работает так, что я долна удалять элемент по id в самом списке Products, а не удаляет запись из корзины
console.log("After - ", cart.items);

cart.totalPrice = calcTotalPrice();
console.log("Total: ", cart.totalPrice)
