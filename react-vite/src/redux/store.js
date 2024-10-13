const GET_STORE_DETAILS = 'stores/getStoreDetails'

// Action Creators
const storeDetails = (details) => ({
  type: GET_STORE_DETAILS,
  payload: details
})

// Thunks
export const getStoreDetails = (id) => async (dispatch) => {
  const res = await fetch(`/api/stores/${id}`);
  if(res.ok) {
    const data = await res.json();
    dispatch(storeDetails(data));
    return data;
  }
};

export const createNewStores = (body) => async () => {
  const res = await fetch("/api/stores/", {
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

export const closeStore = (id) => async () => {
  const res = await fetch(`/api/stores/${id}`, {
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

export const openStore = (id) => async () => {
  const res = await fetch(`/api/stores/${id}/reopen`, {
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

export const changeStore = ({ id, name, description }) => async () => {
  const res = await fetch(`/api/stores/${id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({name, description})
  });
  console.log(res);
  if(res.ok) {
    const data = await res.json();
    return data;
  } else if (res.status < 500) {
    const errorMessages = await res.json();
    console.log(errorMessages);
    return errorMessages;
  } else {
    return { server: "Internal Server Error" };
  }
};

// Reducer
const initialState = {
  storeDetails: {},
}

const storeReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_STORE_DETAILS:
      newState = {...state};
      newState.storeDetails = action.payload;
      return newState;
    default:
      return state;
  }
}

export default storeReducer;
