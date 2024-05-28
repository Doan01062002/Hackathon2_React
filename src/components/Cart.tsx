// Cart.tsx
import React from 'react';

interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
  describe: string;
}

interface CartProps {
  cartItems: Product[];
  updateCart: (cartItems: Product[]) => void;
  deleteCartItem: (id: number) => void;
}

export default function Cart({ cartItems, updateCart, deleteCartItem }: CartProps) {
  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    updateCart(updatedCartItems);
  };

  return (
    <div>
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div className="panel panel-danger">
          <div className="panel-heading">
            <h1 className="panel-title">Your Cart</h1>
          </div>
          <div className="panel-body">
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="my-cart-body">
                {cartItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price} USD</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.valueAsNumber)}
                        min={1}
                      />
                    </td>
                    <td>
                      <button className="label label-info update-cart-item">Update</button>
                      <button className="label label-danger delete-cart-item" onClick={() => deleteCartItem(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot id="my-cart-footer">
                <tr>
                  <td colSpan={4}>
                    There are <b>{cartItems.length}</b> items in your shopping cart.
                  </td>
                  <td colSpan={2} className="total-price text-left">
                    {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)} USD
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        {cartItems.length <= 0 ? <div style={{backgroundColor:"red", color:"white"}} className="alert alert-success" role="alert" id="mnotification">
            Không có sản phẩm trong giỏ hàng
        </div> : ""}
      </div>
      
    </div>
  );
}
