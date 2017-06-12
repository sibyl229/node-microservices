export function hasContent(obj) {
  if (typeof obj === 'object') {
    return obj !== null && Object.keys(obj).length > 0
  } else {
    return typeof obj !== 'undefined';
  }
};

export function capitalize(str) {
  return str ?
    str.charAt(0).toUpperCase() + str.slice(1) :
    '';
};
