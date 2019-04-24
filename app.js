require("dotenv").config();
const sassMiddleware = require("node-sass-middleware");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
mongoose.Promise = Promise;
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;




passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy((email, password, next) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect email" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

// custom app routes


mongoose
  .connect("mongodb://localhost/awesome-project", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();


// Login passport config


app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

console.log(path.join(__dirname, "public", "stylesheets"));
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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
hbs.registerPartials(__dirname + "/views/partials");

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const index = require("./routes/index");
app.use("/", index);

const authRouter = require("./routes/authRouter");
app.use("/", authRouter);

const apiUser = require("./routes/api_user");
app.use("/api/user/", apiUser.router);

const apiSchool = require("./routes/api_school");
app.use("/api/school/", apiSchool.router);

const apiCompany = require("./routes/api_company");
app.use("/api/company/", apiCompany.router);

// app.use("/user_dashboard_details/", dashboardUserRouter);
// app.use("/school_dashboard_details/", dashboardProductRouter);
module.exports = app;

// const listener = app.listen(process.env.PORT, () => {
//   console.log("app started at http://localhost:" + listener.address().port);
// });
