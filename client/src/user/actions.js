require('isomorphic-fetch');

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

function authorizationHeader(jwt) {
  return {
    'Authorization': `Bearer ${jwt}`
  }
}



export function getUserProfile(userId, jwt) {
  return (dispatch) => {
    fetch('/api/user', {
      headers: {
        ...authorizationHeader(jwt)
      }
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: 'USER_PROFILE_SUCCESS',
          data: response.json()
        });
      } else {
        var error = new Error(response.statusText);
        error.response = response.json();
        throw error;
      }
    }).catch((error) => {
      dispatch({
        type: 'USER_PROFILE_FAILURE',
        error: error.response
      });
    });
  }
}
