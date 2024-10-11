import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../redux/product";
import ProductList from "../ProductComponents/ProductList";

function ProductSearchPage() {
  const dispatch = useDispatch();

  /*const [searchParams, setSearchParams] = useSearchParams();
  const params = [];
  for(let param of searchParams.entries()) {
    params.push(param);
  }
  console.log("params", params);*/

  const products = useSelector(state => state.product.allProducts);
  //const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <ProductList products={products} />
    </div>
  )
}

export default ProductSearchPage;
