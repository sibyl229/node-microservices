require('isomorphic-fetch');

export function loadData(dataUrl) {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_FETCH_DATA',
      url: dataUrl
    });
    fetch(dataUrl, {
      headers: {
        'Accept': 'application/json',
      }
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then((error) => {
          return Promise.reject(error);
        });
      }
    }).then((json) => {
      dispatch({
        type: 'FETCH_DATA_SUCCESS',
        url: dataUrl,
        data: json
      });
    }).catch((error) => {
      dispatch({
        type: 'FETCH_DATA_FAILURE',
        url: dataUrl,
        error: error
      });
    });
  };
};
