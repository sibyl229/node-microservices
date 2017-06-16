import { combineReducers } from 'redux';

const fullSearchInitialState = {
  queryString: '',
  loading: false,
  results: [],
  error: null
};

const fullSearchReducer = (state = fullSearchInitialState, action) => {
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

const suggestInitialState = {
  queryString: '',
  loading: false,
  results: [],
  error: null
};

const suggestReducer = (state = suggestInitialState, action) => {
  switch (action.type) {
    case 'SEND_SUGGEST_QUERY':
      return {
        ...state,
        queryString: action.queryString,
        loading: true,
        results: [],
      };
    case 'SUGGEST_QUERY_SUCCESS':
      return state.queryString === action.queryString ? {
        ...state,
        loading: false,
        results: action.data,
        error: null
      } : state;
    case 'SUGGEST_QUERY_FAILURE':
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


export default combineReducers({
  full: fullSearchReducer,
  suggest: suggestReducer
});
