const GET_PRODUCTS = 'products/getAllProducts'

// Action Creators
const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products
})

// Thunks
export const getAllProducts = () => async (dispatch) => {
  console.log("hello");
  const res = await fetch('/api/products/');
  console.log(res);
  if(res.ok) {
    const data = await res.json();
    console.log(data);
    dispatch(getProducts(data));
    return data;
  }
}

// Reducer
const initialState = {
  allProducts: [],
}

const productReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_PRODUCTS:
      newState = {...state};
      newState.allProducts = action.payload.Products;
      return newState;
    default:
      return state;
  }
}

export default productReducer;
