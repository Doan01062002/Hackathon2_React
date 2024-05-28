import React, { useState, useEffect } from 'react';
import Shopping from './components/Shopping';
import Cart from './components/Cart';

interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
  describe: string;
}

// Tạo danh sách sản phẩm mẫu
const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Pizza',
    img: 'https://github.com/ngoquy12/template_shopping_cart/blob/master/images/pizza.jpg?raw=true',
    price: 30,
    quantity: 1,
    describe: 'Delicious pizza with cheese and pepperoni.'
  },
  {
    id: 2,
    name: 'Hamburger',
    img: 'https://github.com/ngoquy12/template_shopping_cart/blob/master/images/Hamburger.jpg?raw=true',
    price: 15,
    quantity: 4,
    describe: 'Juicy hamburger with fresh vegetables.'
  },
  {
    id: 3,
    name: 'Bread',
    img: 'https://github.com/ngoquy12/template_shopping_cart/blob/master/images/bread.jpg?raw=true',
    price: 20,
    quantity: 1,
    describe: 'Soft bread with a crispy crust.'
  },
  {
    id: 4,
    name: 'Cake',
    img: 'https://github.com/ngoquy12/template_shopping_cart/blob/master/images/Cake.jpg?raw=true',
    price: 10,
    quantity: 1,
    describe: 'Sweet cake with layers of cream.'
  }
];

export default function App() {

  const [products, setProducts] = useState<Product[]>(()=>{
    const productsLocal = localStorage.getItem("products")

    //nếu có jobLocal thì thực hiện ép kiểu, nếu không sẽ tạo ra một mảng rỗng
    const products = productsLocal ? JSON.parse(productsLocal) : [];

    return products;

    // //lưu danh sách sản phẩm mẫu vào localStorage, cần comment 2 dòng trên lại
    // localStorage.setItem('products', JSON.stringify(sampleProducts));
    // return sampleProducts;
  });

  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const saveCartToLocalStorage = (cartItems: Product[]) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const updateProductQuantity = (productId: number, quantity: number) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity: quantity } : product
    );
    setProducts(updatedProducts);
  };

  const addToCart = (product: Product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
      saveCartToLocalStorage(updatedCartItems);
      // Cập nhật lại số lượng của sản phẩm trong danh sách sản phẩm
      updateProductQuantity(product.id, product.quantity - 1);
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCartItems);
      saveCartToLocalStorage(updatedCartItems);
      // Cập nhật lại số lượng của sản phẩm trong danh sách sản phẩm
      updateProductQuantity(product.id, product.quantity - 1);
    }

    // Show notification
    const notification = document.getElementById('mnotification');
    if (notification) {
      notification.style.backgroundColor = 'green';
      notification.innerText = 'Add to cart successfully';
      setTimeout(() => {
        notification.style.backgroundColor = '';
        notification.innerText = '';
      }, 3000);
    }
  };

  const updateCart = (updatedCartItems: Product[]) => {
    setCartItems(updatedCartItems);
    saveCartToLocalStorage(updatedCartItems);
    // Show notification
    const notification = document.getElementById('mnotification');
    if (notification) {
      notification.style.backgroundColor = 'orange';
      notification.innerText = 'Update successfully';
      setTimeout(() => {
        notification.style.backgroundColor = '';
        notification.innerText = '';
      }, 3000);
    }
  };

  const deleteCartItem = (id: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    saveCartToLocalStorage(updatedCartItems);
    // Show notification
    const notification = document.getElementById('mnotification');
    if (notification) {
      notification.style.backgroundColor = 'red';
      notification.innerText = 'Delete successfully';
      setTimeout(() => {
        notification.style.backgroundColor = '';
        notification.innerText = '';
      }, 3000);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="row">
        <Shopping products={products} addToCart={addToCart} />
        <Cart cartItems={cartItems} updateCart={updateCart} deleteCartItem={deleteCartItem} />
      </div>
    </div>
  );
}

