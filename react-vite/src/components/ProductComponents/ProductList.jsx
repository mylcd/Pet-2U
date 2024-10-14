import { useNavigate } from "react-router-dom";
import Default from "./default.png";
import "./Product.css";

function ProductList({ products }) {
  const navigate = useNavigate();

  return (
    <div className="product-list">
      {
        products.map((product)=>{
          return (
            <div className="product-item"  key={product.id}
              onClick={() => {
                if(product.id !=0) {
                  navigate(`/products/${product.id}`)
                }
              }
            }>
              <img className="product-preview"
                src={product.previewImage=="default.png"
                ? Default : product.previewImage}/>
              <div className="product-label apple-font">
                <label className="product-name">
                  {product.name}
                </label>
                <label className="product-price">
                  ${product.price.toFixed(2)}
                </label>
              </div>
              {product.closed && <label className="product-error error">Out of Order</label>}
            </div>
          )
        })
      }
    </div>
  )
}

export default ProductList;
