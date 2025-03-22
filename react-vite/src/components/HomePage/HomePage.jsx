import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/product";
import ProductList from "../ProductComponents/ProductList";

function HomePage() {
  const dispatch = useDispatch();

  const products = useSelector(state => state.product.allProducts);
  
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <ProductList products={products.filter((product) => product.closed == false)} />
    </div>
    )
}

export default HomePage;
