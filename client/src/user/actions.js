function readJwtFromCookie() {
  const matches = /JWT=([^;]+)/.exec(document.cookie);
  return matches && matches[1];
}

export function authenticate(options = {}) {
  return (dispatch) => {
    const jwt = readJwtFromCookie();
    console.log('authenticate is called')
    console.log(jwt);

    if (jwt) {
      const jwtPayload = jwt.split('.')[1];
      const decodedJwt = JSON.parse(atob(jwtPayload));
      console.log(decodedJwt.exp > (Date.now() / 1000));
      if (decodedJwt.exp > (Date.now() / 1000) && !options.error) {
        dispatch({
          type: 'READ_JWT',
          jwt: jwt,
          decodedJwt: decodedJwt
        });
      }
    }
  };
}

export function login() {

}
