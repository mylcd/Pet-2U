import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { getCartProducts, removeCartProducts } from "../../redux/cart";

function CartPage() {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const cartProducts = useSelector(state => state.cart.cartProducts);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch, sessionUser]);

  return (
    <div>
      {cartProducts.map((cartProduct, i)=>{
        return (
          <div key={cartProduct.id}>
            {cartProduct.productId}
          </div>
        )
      })}
    </div>
    )
}

export default CartPage;
