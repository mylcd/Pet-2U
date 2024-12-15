import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../redux/order";
import Default from "../ProductComponents/default.png";
import "./Profile.css";

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
    <div className="profile">
      <h1>{sessionUser.username}</h1>
      <div>{sessionUser.email}</div>
      <div>Orders:</div>
      {orders.map((order, i)=>{
        return (
          <div className="profile-order" key={i} >
            {order.Products.map((product, j)=>{
              console.log(product);
              return (
                <div className="profile-orderproduct" key={"product" + j}>
                  <img className="profile-orderimage"
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
