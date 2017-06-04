const initialState = {
  jwt: null,
  decodedJwt: null
}

export default (state = initialState, action) => {
  console.log('action called');
  console.log(action);
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
    default:
      return state;
  }
};
