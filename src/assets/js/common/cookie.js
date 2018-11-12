function getCookie (k) {
  var name = encodeURIComponent(k) + '='
  var s = document.cookie.indexOf(name)
  var e = null
  var ret = null
  if (s > -1) {
    e = document.cookie.indexOf(';', s)
    if (e === -1) {
      e = document.cookie.length
    }
    ret = document.cookie.substring(s + name.length, e)
  } else {
    ret = 'noUser'
    return ret
  }
  return ret ? decodeURIComponent(ret) : ''
}

export default {
  getCookie
}