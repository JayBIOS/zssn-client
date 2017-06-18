/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/18/17.
 */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';

const app = express(),
    PUBLIC_DIR = path.join(__dirname, 'public'),
    HTML_FILE = path.join(PUBLIC_DIR, 'index.html'),
    isDevelopment = process.env.NODE_ENV !== 'production',
    DEFAULT_PORT = 8080,
    compiler = webpack(config);

app.set('port', process.env.PORT || DEFAULT_PORT);

if (isDevelopment) {
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: { colors: true }
    }));

    app.use(webpackHotMiddleware(compiler));

    app.use(express.static(PUBLIC_DIR));

    app.get('*', (req, res, next) => {
        //res.set('content-type', 'text/html');
        res.sendFile(path.join(HTML_FILE));
        //res.end();
    });
} else {
    app.use(express.static(PUBLIC_DIR));

    app.get('*', (req, res) => res.sendFile(HTML_FILE));
}

app.listen(app.get('port'));
