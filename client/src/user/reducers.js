const initialState = {
  jwt: null,
  decodedJwt: null
}

export default (state = initialState, action) => {
  switch (action.filter) {
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
    default:
      return state;
  }
};
