const initialState = {
  dataUrl: null,
  loading: false,
  data: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_FETCH_DATA':
      return {
        ...state,
        dataUrl: action.dataUrl,
        loading: true,
        data: null,
        error: null
      };
    case 'FETCH_DATA_SUCCESS':
      return state.dataUrl === action.dataUrl ? {
        ...state,
        loading: false,
        data: action.data
      } : state;
    case 'FETCH_DATA_FAILURE':
      return state.dataUrl === action.dataUrl ? {
        ...state,
        loading: false,        
        error: action.error
      } : state;
    default:
      return state;
  }
};
