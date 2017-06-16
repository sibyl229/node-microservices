const initialState = {
  currentContentUrl: '',
  pages: {},
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_FETCH_PAGE':
      return {
        ...state,
        currentContentUrl: action.contentUrl,
        loading: true,
        error: null
      };
    case 'FETCH_PAGE_SUCCESS':
      return state.currentContentUrl === action.contentUrl ? {
        ...state,
        loading: false,
        pages: {
          [action.contentUrl]: action.content
        }
      } : state;
    case 'FETCH_PAGE_FAILURE':
      return state.currentContentUrl === action.contentUrl ? {
        ...state,
        loading: false,
        pages: {},
        error: action.error
      } : state;
    default:
      return state;
  }
};
