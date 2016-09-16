pjson = require('./package.json')
fs = require('fs')

if !process.env.NODE_ENV? or process.env.NODE_ENV == 'local'
    config =
        env: 'local'
        httpsPort: process.env.HTTPSPORT || '8443'
        httpPort: process.env.HTTPPORT || '8080'
        cdn: '/build/bundle.js'
    sslOptions =
        key: process.env.KEY || fs.readFileSync('/etc/letsencrypt/live/liive.in/privkey.pem')
        cert: process.env.CERT || fs.readFileSync('/etc/letsencrypt/live/liive.in/fullchain.pem')
        ca: process.env.CA || fs.readFileSync('/etc/letsencrypt/live/liive.in/chain.pem')
        requestCert: false
        rejectUnauthorized: false

else  # default deployment :Heroku for now.
    config =
        env: process.env.NODE_ENV || 'develop'
        httpPort: process.env.PORT || '' # must be set.
        cdn: 'https://s3-us-west-2.amazonaws.com/liive-cdn/bundle.js'      # todo:: setup cloudflare cdn.

    sslOptions = null

config.title = pjson.title
config.version = pjson.version+".3"

module.exports = [config, sslOptions]
