import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../redux/order";
import Default from "../ProductComponents/default.png";

function ProfilePage() {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const orders = useSelector(state => state.order.allOrders);
  console.log(orders);
  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div>
      <h1>{sessionUser.username}</h1>
      <div>{sessionUser.email}</div>
      <div>Orders:</div>
      {orders.map((order, i)=>{
        return (
          <div key={i}>
            {order.Products.map((product, j)=>{
              console.log(product);
              return (
                <div key={"product" + j}>
                  <img
                    src={product.previewImg=="default.png"
                    ? Default : product.previewImg}/>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default ProfilePage;
