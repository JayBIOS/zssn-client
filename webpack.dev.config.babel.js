/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 5/22/17.
 */
import webpack from 'webpack';

import config from './webpack.config.babel';

config.entry = [
    // Activate HMR for React.
    'react-hot-loader/patch',

    // Bundle the client for webpack-dev-server.
    // and connect to the provided endpoint.
    //'webpack-dev-server/client?http://localhost:8080',

    // Bundle the client for hot reloading.
    //'webpack/hot/only-dev-server',

    'webpack-hot-middleware/client',

    // Entry point of the application.
    './index.js'
];

config.output.publicPath = '/js/';

// Enable HMR globally.
config.plugins.push(new webpack.HotModuleReplacementPlugin());

// Prints more readable module names in the browser console
// on HMR updates.
config.plugins.push(new webpack.NamedModulesPlugin());

export default config;
