require('isomorphic-fetch');

export function fetchStaticPage(contentUrl) {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_FETCH_PAGE',
      contentUrl: contentUrl
    });
    fetch(contentUrl, {
      headers: {
        'Accept': 'text/html',
      }
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.text().then((text) => {
          var el = document.createElement( 'html' );
          el.innerHTML = text;
          console.log(el.innerHTML);
          return el.getElementsByClassName("static-widget-content")[0].outerHTML;
        });
      } else {
        return Promise.reject(response.statusText);
      }
    }).then((html) => {
      dispatch({
        type: 'FETCH_PAGE_SUCCESS',
        contentUrl: contentUrl,
        content: html
      });
    }).catch((error) => {
      dispatch({
        type: 'FETCH_PAGE_FAILURE',
        contentUrl: contentUrl,
        error: error
      });
    });
  };
};
