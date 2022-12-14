const express = require("express");
const mongoose = require("mongoose");
const env = require("./env");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const routes = require("./routes");
const path = require("node:path");
const helmet = require("helmet");
const csrf = require("csurf");
const {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddleware,
} = require("./src/middlewares/middleware");
const { exit } = require("node:process");

mongoose
  .connect(env.MONGODB_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successful database connection");
    app.emit("pronto");
  })
  .catch((e) => {
    console.error(e);
    exit(-1);
  });
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
        "style-src": ["'self'", "cdn.jsdelivr.net"],
        "img-src": ["'self'", "data:"],
      },
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
  secret: env.SESSION_SECRET,
  store: MongoStore.create({ mongoUrl: env.MONGODB_CONNECT_URL }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semana
    httpOnly: true,
  },
});
app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf());

// Nossos próprios middlewares
app.use(middlewareGlobal, checkCsrfError, csrfMiddleware);
app.use(routes);

app.on("pronto", () => {
  app.listen(env.PORT, () => {
    console.log(`Acessar http://localhost:${env.PORT}`);
    console.log(`Servidor executando na porta ${env.PORT}`);
  });
});
