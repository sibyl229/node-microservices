import { push } from 'react-router-redux';
require('isomorphic-fetch');

function readJwtFromCookie() {
  const matches = /JWT=([^;]+)/.exec(document.cookie);
  return matches && matches[1];
}

// export function authenticate(options = {}) {
//   const jwt = readJwtFromCookie();
//   console.log('authenticate is called')
//   console.log(jwt);
//
//   if (jwt) {
//     const jwtPayload = jwt.split('.')[1];
//     const decodedJwt = JSON.parse(atob(jwtPayload));
//     console.log(decodedJwt.exp > (Date.now() / 1000));
//     if (decodedJwt.exp > (Date.now() / 1000) && !options.error) {
//       return {
//         type: 'READ_JWT',
//         jwt: jwt,
//         decodedJwt: decodedJwt
//       };
//     }
//   } else {
//     return push('/user');
//   }
// }

function decodeJwt(jwt) {
  const jwtPayload = jwt.split('.')[1];
  const decodedJwt = JSON.parse(atob(jwtPayload));
  return decodedJwt;
}

export function getJWT(options = {}) {
  const jwt = readJwtFromCookie();
  console.log('authenticate is called')
  console.log(jwt);

  if (jwt) {
    const decodedJwt = decodeJwt(jwt);
    console.log(decodedJwt.exp > (Date.now() / 1000));
    if (decodedJwt.exp > (Date.now() / 1000) && !options.error) {
      return jwt;
    }
  }
}

function authorizationHeader(jwt) {
  return {
    'Authorization': `Bearer ${jwt}`
  }
}

function delete_cookie( name, path, domain ) {
  if((document.cookie || '').search(new RegExp(name)) > -1) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

export function logout(error) {
  return (dispatch) => {
    delete_cookie('JWT', '/');
    console.log(document.cookie);
//    dispatch(push('/user'));
    dispatch({
      type: 'CLEAR_LOCAL_PROFILE',
      error: error
    });
  }
};

export function authenticate(jwt) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let validJwt = jwt;
      if (!validJwt) {
        validJwt = getJWT();
        if (validJwt) {
          dispatch({
            type: 'READ_JWT',
            jwt: validJwt,
            decodedJwt: decodeJwt(validJwt)
          });
        }
      }

      if (validJwt) {
        resolve(validJwt);
      } else {
        reject("no valid JWT found");
      }
    });
  }
}

export function getUserProfile(userId, jwt) {
  return (dispatch) => {

    dispatch(
      authenticate(jwt)
    ).then((jwt) => {
      dispatch({
        type: 'REQUEST_USER_PROFILE',
        redirect: '/user'
      });
      return fetch('/api/user', {
        headers: {
          ...authorizationHeader(jwt)
        }
      });
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
      dispatch(logout(error));
//      dispatch(push('/user'));
//       dispatch({
// //        type: 'USER_PROFILE_FAILURE',
//         type: 'CLEAR_LOCAL_PROFILE',
//         error: error.response
//       });
    });
  }
}


export function postBookmark(userId, url, jwt) {
  return (dispatch) => {
    dispatch({
      type: 'POST_BOOKMARK_SENT',
      url: url
    });
    fetch('/api/user/bookmark', {
      method: 'POST',
      headers: {
        ...authorizationHeader(jwt)
      },
      body: JSON.stringify({
        userId,
        url,
      })
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
        type: 'POST_BOOKMARK_SUCCESS',
        data: json
      });
    }).catch((error) => {
      dispatch(logout(error));
      dispatch()
//      dispatch(push('/user'));
//       dispatch({
// //        type: 'USER_PROFILE_FAILURE',
//         type: 'CLEAR_LOCAL_PROFILE',
//         error: error.response
//       });
    });
  }
}
