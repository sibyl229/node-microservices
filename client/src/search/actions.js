require('isomorphic-fetch');

export function suggest(queryString, queryFormatter, targetElement) {
  return (dispatch, getState) => {

    dispatch({
      type: 'SEND_SUGGEST_QUERY',
      queryString: queryString
    });

    //fetch('http://localhost:4003/', {
    fetch('http://52.90.214.72:4003/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: queryFormatter(queryString)
      })
    }).then(response => {
      return response.json();
    }).then(json => dispatch({
      type: 'SUGGEST_QUERY_SUCCESS',
      queryString: queryString,
      data: json.data,
      targetElement: targetElement
    })).catch(error => dispatch({
      type: 'SUGGEST_QUERY_FAILURE',
      queryString: queryString,
      error: error
    }));
  }
};


export function search(queryString, queryFormatter, targetElement) {
  return (dispatch, getState) => {

    dispatch({
      type: 'SEND_SEARCH_QUERY',
      queryString: queryString
    });

    //fetch('http://localhost:4003/', {
    fetch('http://52.90.214.72:4003/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: queryFormatter(queryString)
      })
    }).then(response => {
      return response.json();
    }).then(json => dispatch({
      type: 'SEARCH_QUERY_SUCCESS',
      queryString: queryString,
      data: json.data,
      targetElement: targetElement
    })).catch(error => dispatch({
      type: 'SEARCH_QUERY_FAILURE',
      queryString: queryString,
      error: error
    }));
  }
};
