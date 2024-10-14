const GET_PRODUCTS = 'products/getAllProducts'

// Action Creators
const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products
})

// Thunks
export const getAllProducts = () => async (dispatch) => {
  const res = await fetch('/api/products/');
  if(res.ok) {
    const data = await res.json();
    dispatch(getProducts(data));
    return data;
  }
}

export const getStoreProducts = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/stores/${id}`);
  if(res.ok) {
    const data = await res.json();
    dispatch(getProducts(data));
    return data;
  }
}

export const createNewProducts = (body) => async () => {
  const res = await fetch("/api/products/", {
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
};

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
