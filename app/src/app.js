// NOTE - Imports
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import Database from './database/index.js';
import { handleNotFound, handleServerError } from './middlewares/index.middleware.js';
import routes from './routes/index.js';
import { boxenError, boxenLog } from './utils/boxenLogs.util.js';

const app = express();

// NOTE - Middleware
app.use(
    session({
        secret: process.env.SECRET,
        cookie: { maxAge: 3600000 },
        resave: false,
        saveUninitialized: true,
    }),
);

app.set('views', path.join(new URL('.', import.meta.url).pathname, 'views'));
app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.use(express.static(path.join(new URL('.', import.meta.url).pathname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }),
);

routes.forEach((router) => {
    app.use(router.path, router);
    let routesLog = '';
    router.stack.forEach((layer) => {
        if (layer.route) {
            routesLog += `  - ${router.path + layer.route.path}\n`;
        }
    });
    boxenLog({ log: `Routes montées depuis ${router.routerName || 'un fichier'}\n${routesLog}` });
});

app.use(handleNotFound);
app.use(handleServerError);

// NOTE - Init Database
try {
    await Database.connect();
    await Database.init();
} catch (err) {
    boxenError(`# Failed to start DB:\n\n${err}`);
}

// NOTE - Start server
try {
    const listener = await app.listen(process.env.PORT || 3000);
    boxenLog({
        log: `# Server started successfully.\n# Listening on port ${listener.address().port}.`,
        color: 'green',
    });
} catch (err) {
    boxenError(`# Failded to start server:\n\n${err}`);
}
