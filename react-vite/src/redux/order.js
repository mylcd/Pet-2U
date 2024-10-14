const GET_ORDERS = 'orders/getAllOrders'

// Action Creators
const getOrders = (orders) => ({
    type: GET_ORDERS,
    payload: orders
})

// Thunks
export const getAllOrders = () => async (dispatch) => {
  const res = await fetch('/api/orders/');
  if(res.ok) {
    const data = await res.json();
    dispatch(getOrders(data));
    return data;
  }
}

export const createOrders = () => async () => {
  const res = await fetch("/api/orders/", {
    method: 'POST'
  });
  if(res.ok) {
    const data = await res.json();
    return data;
  }
}

// Reducer
const initialState = {
  allOrders: [],
}

const orderReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ORDERS:
      newState = {...state};
      newState.allOrders = action.payload.Orders;
      return newState;
    default:
      return state;
  }
}

export default orderReducer;
