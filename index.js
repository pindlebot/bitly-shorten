const fetch = require('node-fetch')

const safeEncodeURIComponent = string => {
  let decoded = decodeURIComponent(string)
  while (string !== decoded) {
    string = decoded
    decoded = decodeURIComponent(string)
  }
  return encodeURIComponent(decoded)
}

module.exports = (url, { apiKey } = {}) => {
  const bitlyApiKey = apiKey || process.env.BITLY_API_KEY
  let longUrl = encodeURIComponent(url)
  let endpoint = `https://api-ssl.bitly.com/v3/shorten?access_token=${bitlyApiKey}&longUrl=${longUrl}`
  return fetch(endpoint, {
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(resp => resp.json())
}
