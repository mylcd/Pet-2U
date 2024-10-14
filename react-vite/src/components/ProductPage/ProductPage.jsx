import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetails } from "../../redux/product";
import "./ProductDetail.css";
import Default from "../ProductComponents/default.png";

function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const product = useSelector(state => state.product.detailProduct);
  const sessionUser = useSelector(state => state.session.user);

  const [selectedImage, setSelectedImage] = useState(-1);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const handleNavigateEdit = e => {
    e.preventDefault();
    navigate(`/products/${id}/edit`,
      {state: {
        oldName : product.name,
        oldDescription: product.description,
        oldPrice: product.price.toString(),
        oldStock: product.stock.toString(),
        oldPreview: product.previewImage,
        oldImages: product.Images.map((image) => image.url)
      }}
    );
  }

  // Required Later:

  return (
    <>
      {product.Images && product.Store && product.Owner &&
        <div>
          <div className="apple-font productdetail-page">

            <div className="productdetail-images">
              <div className="productdetail-leftimage">
                <div className=
                  {selectedImage==-1?"productdetail-smallimage-border"
                  :
                  "productdetail-smallimage-hidden"}
                  onClick={() => setSelectedImage(-1)}>
                  <img
                    className="productdetail-smallimage"
                    src={product.previewImage=="default.png"
                      ? Default : product.previewImage}/>
                </div>
                {product.Images.map((image, i) => {
                  return (
                    <div className=
                      {selectedImage==i?"productdetail-smallimage-border"
                      :
                      "productdetail-smallimage-hidden"}
                      onClick={() => setSelectedImage(i)}
                      key={i}
                    >
                      <img
                        className="productdetail-smallimage"
                        src={image.url}/>
                    </div>
                  );
                })}
              </div>
              <div className="productdetail-rightimage">
                <div>
                  <img
                    className="productdetail-largeimage"
                    src={selectedImage==-1 ?
                    (product.previewImage=="default.png"
                      ? Default
                      :
                      product.previewImage)
                    :
                    product.Images[selectedImage].url}/>
                </div>
              </div>
            </div>

            <div className="productdetail-info">
              <div className="in-between">
                <div className="productdetail-title">{product.name}</div>
                {sessionUser && (sessionUser.id == product.Owner.id) &&
                  <button
                    className="form-button productdetail-edit"
                    type="button"
                    onClick={handleNavigateEdit}
                  >
                    Edit
                  </button>
                }
              </div>
              <div className="productdetail-store">
                <div>Sold by {product.Store.name}, </div>
                <a href={`/stores/${product.Store.id}`}>Go to store page</a>
              </div>
              <div className="productdetail-rating">
                Rating Working In Progress
              </div>
              <div className="productdetail-description">
                {product.description}
              </div>
            </div>

            <div className="productdetail-order">
              <div className="productdetail-price margin10">
                <label className="px12 top-align">$</label>
                {Math.floor(product.price)}
                <label className="px12 top-align">
                  {(product.price * 100 % 100 < 10) && "0"}
                  {Math.round(product.price * 100 % 100)}
                </label>
              </div>
              {product.stock > 0 ?
                <div className="green margin10 in-between">
                  <div>In Stock</div>
                  <div className="productdetail-sold">{product.sold} sold</div>
                </div>
                :
                <div className="error margin10 in-between">
                  <div>Out of Stock</div>
                  <div className="productdetail-sold">{product.sold} sold</div>
                </div>
              }
              <button disabled={true}
                className="form-button productdetail-button">
                Buy Now
              </button>
              <button disabled={true}
                className="form-button productdetail-button">
                Add Cart
              </button>
            </div>


          </div>

          <div className="apple-font productdetail-review">
            <div className="productdetail-reviewtitle">
              Reviews and feedbacks:
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default ProductPage;
