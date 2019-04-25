require("dotenv").config();
require("./config/db_connections");

const sassMiddleware = require("node-sass-middleware");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const hbs = require("hbs");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

// custom app routes

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
hbs.registerPartials(__dirname + "/views/partials");

// Login passport config

app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Express View engine setup

app.use(
  sassMiddleware({
    src: path.join(__dirname, "public", "stylesheets"),
    dest: path.join(__dirname, "public", "stylesheets"),
    sourceMap: true,
    debug: true,
    outputStyle: "compressed"
  })
);

hbs.registerHelper("ternary", (test, yes, no) => (test ? yes : no));

hbs.registerHelper("compare", function(lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = options.hash.operator || "==";

  var operators = {
    "==": function(l, r) {
      return l == r;
    },
    "===": function(l, r) {
      return l === r;
    },
    "!=": function(l, r) {
      return l != r;
    },
    "<": function(l, r) {
      return l < r;
    },
    ">": function(l, r) {
      return l > r;
    },
    "<=": function(l, r) {
      return l <= r;
    },
    ">=": function(l, r) {
      return l >= r;
    },
    typeof: function(l, r) {
      return typeof l == r;
    }
  };

  if (!operators[operator])
    throw new Error(
      "Handlerbars Helper 'compare' doesn't know the operator " + operator
    );

  var result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const index = require("./routes/index");
app.use("/", index);

const authRouter = require("./routes/authRouter");
app.use("/", authRouter);

const apiUser = require("./routes/api_user");
app.use("/api/user/", apiUser.router);

const apiUniversity = require("./routes/api_university");
app.use("/api/university/", apiUniversity.router);

const apiCompany = require("./routes/api_company");
app.use("/api/company/", apiCompany.router);

const apiDegrees = require("./routes/api_degrees");
app.use("/api/degrees/", apiDegrees.router);

module.exports = app;
