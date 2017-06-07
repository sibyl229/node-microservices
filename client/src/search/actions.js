require('isomorphic-fetch');

function formatQuery(queryString) {
  return `
    query {
      getGenesByNames(names: ["${queryString}"], after: "-1") {
        hasNextPage
        endCursor
        edges {
          cursor
          node {
            id
            public_name
            concise_description {
              text
            }
          }
        }
      }
    }
  `
}
export function search(queryString, targetElement) {
  return (dispatch, getState) => {
    const actionID = getState().search.nextId;
    const sendSearchQueryAction = {
      type: 'SEND_SEARCH_QUERY',
      queryString: queryString,
      actionID: actionID
    };
    dispatch(sendSearchQueryAction);

    //fetch('http://localhost:4000/', {
    fetch('http://52.90.214.72:4003/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': btoa(encodeURI(JSON.stringify(sendSearchQueryAction)))
      },
      body: JSON.stringify({
        query: formatQuery(queryString)
      })
    }).then(response => {
      console.log(response.headers.get('Content-Type'));
      console.log(response.headers.get('Link'));
      console.log(response.headers.get('Server'));
      console.log(response.headers.get('X-Request-Id'));
      return response.json();
    }).then(json => dispatch({
      type: 'SEARCH_QUERY_SUCCESS',
      data: json,
      targetElement: targetElement
    })).catch(error => dispatch({
      type: 'SEARCH_QUERY_FAILURE',
      error: error
    }));
  }
}
