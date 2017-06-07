const initialState = {
  queryString: '',
  loading: false,
  results: [],
  nextId: 1
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SEND_SEARCH_QUERY':
      return {
        queryString: action.queryString,
        loading: true,
        results: [],
        nextId: state.nextId + 1
      };
    case 'SEARCH_QUERY_SUCCESS':
      return state;
    case 'SEARCH_QUERY_FAILURE':
      return state;
    default:
      return state;
  }
};
