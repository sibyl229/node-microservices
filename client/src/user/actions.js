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
    dispatch({
      type: 'REQUEST_USER_PROFILE'
    });
    fetch('/api/user', {
      headers: {
        ...authorizationHeader(jwt)
      }
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        return response.json();
      } else {
        return response.json().then((error) => {
          return Promise.reject(error);
        });
      }
    }).then((json) => {
      dispatch({
        type: 'USER_PROFILE_SUCCESS',
        data: json
      });
    }).catch((error) => {
      dispatch({
        type: 'USER_PROFILE_FAILURE',
        error: error.response
      });
    });
  }
}
