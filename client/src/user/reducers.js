const initialState = {
  jwt: null,
  decodedJwt: null,
  redirect: '/',
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
};

const deleteBookmark = (state, action) => {
  const otherBookmarks = state.bookmarks.filter(
    (bookmark) => bookmark.id !== action.data.id
  );
  return {
    ...state,
    bookmarks: otherBookmarks
  }
}

export default (state = initialState, action) => {
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
    case 'VISIT_LOGIN':
      return {
        ...state,
        redirect: action.redirect === '/user' ? state.redirect : (action.redirect || '/')
      }
    case 'POST_AUTH_REDIRECT':
      return {
        ...state,
        redirect: '/'
      }
    case 'CLEAR_LOCAL_PROFILE':
      return {
        ...initialState,
        redirect: state.redirect,
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
      // bookmark needs to be added on the client side
      return addBookmark(state, action);
    case 'DELETE_BOOKMARK_SUCCESS':
      return deleteBookmark(state, action);
    default:
      return state;
  }
};
