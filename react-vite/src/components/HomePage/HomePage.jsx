import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../redux/product";

function HomePage() {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const products = useSelector(state => state.product.allProducts);
  //const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      {products.map((product, i)=>{
        return (
          <div key={product.id}>
            {product.name}
          </div>
        )
      })}
    </div>
    )
}

export default HomePage;
