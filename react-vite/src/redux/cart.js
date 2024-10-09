const GET_PRODUCTS = 'carts/getCartProducts'

// Action Creators
const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products
})

// Thunks
export const getCartProducts = () => async (dispatch) => {
  const res = await fetch('/api/carts/');
  if(res.ok) {
    const data = await res.json();
    dispatch(getProducts(data));
    return data;
  }
  else {
    dispatch(getProducts({'Products': []}));
  }
}

export const removeCartProducts = (cartItemId) => async () => {
  const res = await fetch(`/api/carts/${cartItemId}`, {
    method: "DELETE"
  });
  if(res.ok) {
    const data = await res.json();
    return data;
  } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages;
  } else {
    return { server: "Internal Server Error" };
  }
}

export const editCartProducts = (body) => async () => {
  const { amount, cartItemId } = body;
  const res = await fetch(`/api/carts/${cartItemId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({amount})
  });
  if(res.ok) {
    const data = await res.json();
    return data;
  } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages;
  } else {
    return { server: "Internal Server Error" };
  }
}

export const createCartProducts = (body) => async () => {
  const res = await fetch("/api/carts/", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if(res.ok) {
    const data = await res.json();
    return data;
  } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages;
  } else {
    return { server: "Internal Server Error" };
  }
}

export const createOrderProducts = (body) => async (dispatch) => {
  const { amount, orderId, productId, cartItemId } = body;
  const res = await fetch(`/api/order_products/${orderId}/${productId}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({"amount": amount})
  });
  if(res.ok) {
    dispatch(removeCartProducts(cartItemId));
    const data = await res.json();
    return data;
  } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages;
  } else {
    return { server: "Internal Server Error" };
  }
}


// Reducer
const initialState = {
  cartProducts: [],
}

const cartReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_PRODUCTS:
      newState = {...state};
      newState.cartProducts = action.payload.Products;
      return newState;
    default:
      return state;
  }
}

export default cartReducer;
