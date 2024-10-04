import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../redux/order";

function OrderPage() {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const orders = useSelector(state => state.order.allOrders);
  console.log(orders);
  //const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div>
      {orders.map((order, i)=>{
        return (
          <div key={order.id}>
            {order.id}
          </div>
        )
      })}
    </div>
  )
}

export default OrderPage;
