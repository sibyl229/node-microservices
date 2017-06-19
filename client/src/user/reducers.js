const initialState = {
  jwt: null,
  decodedJwt: null,
  user: {
    loading: true,
    data: null,
    error: null
  },
  bookmarks: []
}

const addBookmark = (state, action) => {
  if (state.bookmarks.filter((bookmark) => bookmark.id === action.data.id).length > 0) {
    return state;
  } else {
    return {
      ...state,
      bookmarks: [
        {
          id: action.data.id,
          url: action.data.url
        },
        ...state.bookmarks
      ].slice(0, 10)
    }
  }
}

export default (state = initialState, action) => {
  console.log('action called');
  console.log(action);
  const userState = state.user;

  switch (action.type) {
    case 'READ_JWT':
      if (action.jwt === state.jwt) {
        return state;
      } else {
        return {
          ...state,
          jwt: action.jwt,
          decodedJwt: action.decodedJwt
        }
      }
    case 'CLEAR_LOCAL_PROFILE':
      return {
        ...initialState,
        error: action.error || null
      }
    case 'REQUEST_USER_PROFILE':
      return {
        ...state,
        user: {
          ...userState,
          loading: 1,
          data: null,
          error: null
        }
      };
    case 'USER_PROFILE_SUCCESS':
      return {
        ...state,
        user: {
          ...userState,
          loading: false,
          data: action.data
        }
      };
    case 'USER_PROFILE_FAILURE':
      return {
        ...state,
        user: {
          ...userState,
          loading: false,
          error: action.error
        }
      };
    // start of bookmark related reducers
    // case 'POST_BOOKMARK_SENT':
    //   return {
    //     ...state,
    //     bookmarks: {
    //       ...state.bookmarks,
    //       [action.bookmark.url]: {
    //         url: action.bookmark.url
    //       }
    //     }
    //   }
    case 'POST_BOOKMARK_SUCCESS':
      return addBookmark(state, action);
    case 'GET_BOOKMARK_SUCCESS':
      return addBookmark(state, action);
    default:
      return state;
  }
};
