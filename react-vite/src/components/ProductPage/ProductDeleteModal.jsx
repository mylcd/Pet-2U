import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { closeProduct, openProduct, getProductDetails } from "../../redux/product";

function ProductDeleteModal({ productId, closed }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!closed) {
      dispatch(closeProduct(productId))
        .then(() => {
          dispatch(getProductDetails(productId));
        })
        .then(() => {
          closeModal();
        }
      );
    }
    else {
      dispatch(openProduct(productId))
        .then(() => {
          dispatch(getProductDetails(productId));
        })
        .then(() => {
          closeModal();
        }
      );
    }
  }

  return (
    <div className="modal">
      <div className="md-demo-div middle bold">{closed ? "Confirm Enlist" : "Confirm Delete"}</div>
      <div className="error">{closed ? "Are you sure you wish to re-enlist this product again?"
      : "Are you sure you wish to close this product?"}</div>
      <button
        className="md-button"
        onClick={handleSubmit}
      >
        Yes
      </button>
      <button className="md-button"
        onClick={closeModal}
      >
        No
      </button>
    </div>
  );
}

export default ProductDeleteModal;
