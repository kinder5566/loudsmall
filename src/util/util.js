Date.prototype.toDateString = function() {
  let year = this.getFullYear();
  let month = fillzero(this.getMonth());
  let date = fillzero(this.getDate());
  let hour = fillzero(this.getHours());
  let min = fillzero(this.getMinutes());
  let sec = fillzero(this.getSeconds());
  return year + '/' + month + '/' + date + ' ' + hour + ':' + min + ':' + sec ;
}

function fillzero(value) {
  return ('0'+ value).substr(-2);
}

const util = { };

export default util

if(typeof module !== 'undefined' && module) {
  module.exports = util;
}