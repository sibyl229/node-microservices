const initialState = {
  queryString: '',
  loading: false,
  results: [],
  error: null
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SEND_SEARCH_QUERY':
      return {
        ...state,
        queryString: action.queryString,
        loading: true,
        results: [],
      };
    case 'SEARCH_QUERY_SUCCESS':
      return state.queryString === action.queryString ? {
        ...state,
        loading: false,
        results: action.data,
        error: null
      } : state;
    case 'SEARCH_QUERY_FAILURE':
      return state.queryString === action.queryString ? {
        ...state,
        loading: false,
        results: [],
        error: null
      } : state;
    default:
      return state;
  }
};
