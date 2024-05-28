// Shopping.tsx
import React from 'react';

interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
  describe: string;
}

interface ListProductProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export default function Shopping({ products, addToCart }: ListProductProps) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h1 className="panel-title">List Products</h1>
        </div>
        <div className="panel-body" id="list-product">
          {products.map((product) => (
            <div key={product.id} className="media product">
              <div className="media-left">
                <a href="#">
                  <img
                    className="media-object"
                    src={product.img}
                    alt={product.name}
                  />
                </a>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{product.name}</h4>
                <p>{product.describe}</p>
                <input
                  readOnly
                  name={`quantity-product-${product.id}`}
                  type="number"
                  value={product.quantity}
                />
                {product.quantity <=0 ? <span className='price'>{product.price} USD</span> : <span style={{backgroundColor:"orange"}} className='price' onClick={() => addToCart(product)}>{product.price} USD</span>}
                
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="alert alert-success" role="alert" id="mnotification">
        Add to cart successfully
      </div>
    </div>
  );
}
