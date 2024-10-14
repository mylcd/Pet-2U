const GET_PRODUCTS = 'products/getAllProducts'
const DETAIL_PRODUCT = 'products/getProductDetails'

// Action Creators
const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products
})

const detailProduct = (product) => ({
  type: DETAIL_PRODUCT,
  payload: product
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

export const getProductDetails = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/${id}`);
  if(res.ok) {
    const data = await res.json();
    dispatch(detailProduct(data));
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

export const editProducts = (body) => async () => {
  const res = await fetch(`/api/products/${body.id}`, {
    method: 'PUT',
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

export const closeProduct = (id) => async () => {
  const res = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
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

export const openProduct = (id) => async () => {
  const res = await fetch(`/api/products/${id}/reopen`, {
    method: 'POST',
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
  detailProduct: {}
}

const productReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_PRODUCTS:
      newState = {...state};
      newState.allProducts = action.payload.Products;
      return newState;
    case DETAIL_PRODUCT:
      newState = {...state};
      newState.detailProduct = action.payload;
      return newState;
    default:
      return state;
  }
}

export default productReducer;
