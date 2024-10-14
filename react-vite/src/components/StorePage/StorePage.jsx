import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getStoreProducts } from "../../redux/product";
import { getStoreDetails } from "../../redux/store";
import OpenModalButton from "../OpenModalButton"
import ProductList from "../ProductComponents/ProductList";
import StoreDeleteModal from "./StoreDeleteModal";
import "./Store.css";

function StorePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const products = useSelector(state => state.product.allProducts);
  const store = useSelector(state => state.store.storeDetails);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getStoreProducts(id));
    dispatch(getStoreDetails(id));
  }, [dispatch, id]);

  const handleNavigateEdit = e => {
    e.preventDefault();
    navigate(`/stores/${id}/edit`,
      {state: { oldName : store.name, oldDescription: store.description}});
  }

  const handleNavigateNewProduct = e => {
    e.preventDefault();
    navigate(`/stores/${id}/new`);
  }

  // Required Later: Store Comment Summary, All Store Comments, Ask Owner a Question

  return (
    <>
      {store.Owner &&
        <div className="apple-font">
          <div className="store-title">{store.name}</div>
          {sessionUser && (sessionUser.id == store.Owner.id) ?
            <div className="store-edit apple-font">
              <div className="store-owner">Owned By You</div>
              <button
                type="button"
                onClick={handleNavigateEdit}
              >
                Edit
              </button>
              <OpenModalButton
                buttonText={(store.closed == true) ? "Open" : "Close"}
                modalComponent={<StoreDeleteModal storeId = {store.id} closed = {store.closed}/>}
              />
              <button
                type="button"
                onClick={handleNavigateNewProduct}
              >
                Create New Listing
              </button>
            </div>
            :
            <div className="store-owner">Owned By: {store.Owner.username}</div>
          }

          {(store.closed == true) ?
            <div>Store Temporarily Closed</div>
            :
            <>
              <div className="store-subtitle">About Seller: </div>
              <div className="store-content">{store.description}</div>
              <div className="store-subtitle">Products:  </div>
            </>
          }
          {sessionUser && (sessionUser.id == store.Owner.id) ?
            <ProductList products={products} />
            :
            <ProductList products={products.filter((product) => product.closed == false)} />
          }

        </div>
      }
    </>
  )
}

export default StorePage;
