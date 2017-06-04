function readJwtFromCookie() {
  const matches = /JTW=([^;]+)/.exec(document.cookie);
  return matches && matches[1];
}

export function authenticate(options = {}) {
  return (dispatch) => {
    const jwt = readJwtFromCookie();

    if (jwt) {
      const jwtPayload = jwt.split('.')[1];
      const decodedJwt = atob(jwtPayload);
      if (decodedJwt.exp <= Date.now() / 1000 && !options.error) {
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
