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
