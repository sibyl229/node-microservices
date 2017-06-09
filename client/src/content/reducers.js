const initialState = {
  dataUrl: null,
  data: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_FETCH_DATA':
      return {
        ...state,
        dataUrl: action.dataUrl,
        data: null,
        error: null
      };
    case 'FETCH_DATA_SUCCESS':
      return state.dataUrl === action.dataUrl ? {
        ...state,
        data: action.data
      } : state;
    case 'FETCH_DATA_FAILURE':
      return state.dataUrl === action.dataUrl ? {
        ...state,
        error: action.error
      } : state;
    default:
      return state;
  }
};
