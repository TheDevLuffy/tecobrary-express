const config = (token) => ({
  headers: {
    Authorization: 'token ' + token,
    'User-Agent': 'Login-App'
  }
})

const headers = {
  headers: {
    accept: 'application/json'
  }
}

module.exports = {  
  config,
  headers
}