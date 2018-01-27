module.exports = {
    cookieSecret: "VerySecretCookieKey",
    originsWhitelist : [ // CORS whitelist
        'http://localhost:4200', //this is my front-end url for development
        'http://localhost:8888', //this is my front-end url for development (from docker)
        'http://www.myproductionurl.com'
      ]
}