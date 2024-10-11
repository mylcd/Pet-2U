import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStoreProducts } from "../../redux/product";
import { getStoreDetails } from "../../redux/store";
import ProductList from "../ProductComponents/ProductList";

function StorePage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const products = useSelector(state => state.product.allProducts);
  const store = useSelector(state => state.store.storeDetails);
  console.log(store.Owner);
  //const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getStoreProducts(id));
    dispatch(getStoreDetails(id));
  }, [dispatch]);

  return (
    <div>
      <div>{store.name}</div>
      {store.Owner && <div>Owned By: {store.Owner.username}</div>}
      <div>{store.description}</div>
      <div>Products:  </div>
      <ProductList products={products} />
    </div>
  )
}

export default StorePage;
