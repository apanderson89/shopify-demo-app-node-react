require("dotenv").config();
const webpack = require('webpack');
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);

const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");

module.exports = withCSS(withSass({
  publicRuntimeConfig: {
  	API_KEY: apiKey,
APP_NAME: 'My Favorite Products',
API_DEVELOPMENT: 'http://localhost:8000/api',
API_PRODUCTION: 'https://myamazonhistory.com/api',
PRODUCTION: false,
DOMAIN_DEVELOPMENT: 'http://localhost:3000',
DOMAIN_PRODUCTION: 'https://myamazonhistory.com',
FB_APP_ID: '305241670454834',
DISQUS_SHORTNAME: 'ampitup-io',
GOOGLE_CLIENT_ID:'299145764723-o5k1tr51r339gua3cja4o02r0l2g4lkb.apps.googleusercontent.com'
},
   webpack: function(config, options) {
    const env = { API_KEY: apiKey };
    config.plugins.push(new webpack.DefinePlugin(env));
    
    if (!options.dev) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        });
        return config;
    }

    return config;
  }
}));