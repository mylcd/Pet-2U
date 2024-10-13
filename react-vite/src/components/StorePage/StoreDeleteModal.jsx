import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { closeStore, openStore, getStoreDetails } from "../../redux/store";

function StoreDeleteModal({ storeId, closed }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!closed) {
      dispatch(closeStore(storeId))
        .then(() => {
          dispatch(getStoreDetails(storeId));
        })
        .then(() => {
          closeModal();
        }
      );
    }
    else {
      dispatch(openStore(storeId))
        .then(() => {
          dispatch(getStoreDetails(storeId));
        })
        .then(() => {
          closeModal();
        }
      );
    }
  }

  return (
    <div className="modal">
      <div className="md-demo-div middle bold">{closed ? "Confirm Reopen" : "Confirm Delete"}</div>
      <div className="error">{closed ? "Are you sure you wish to reopen this store?"
      : "Are you sure you wish to close this store?"}</div>
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

export default StoreDeleteModal;
