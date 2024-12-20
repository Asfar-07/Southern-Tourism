var createError = require("http-errors");
var express = require("express");
var path = require("path");
const fs = require("fs");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var connectiondb = require("./DataBase/mongoosdb");
const Schema = require("./DataBase/dbShema");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/MainPG");
var LoginRouter = require("./routes/login");
var PlaceRatingRouter = require("./routes/PlaceRating");
var SignupRouter = require("./routes/signupPG");
var RegisterRouter = require("./routes/RegisterPG");
var MemberShipRouter = require("./routes/MemberProfile");
var MemberUpdate = require("./routes/MemberUpdate");
var UpdatePage = require("./routes/UpdatePage");
var UserComments = require("./routes/usercomments");
var ChangeProfile = require("./routes/ChangePofile");
var SearchData = require("./routes/Search");
var SearchResult = require("./routes/SearchResult");
var Viewmainpalce = require("./routes/Viewofpalce");

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "Mainpageimages")));
app.use(express.static(path.join(__dirname, "collectionplaceimage")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true /*cookie:{maxAge:60000*60*24*10}*/,
  })
);

app.use("/", indexRouter);
app.use("/placerating", PlaceRatingRouter);
app.use("/login", LoginRouter);
app.use("/signup", SignupRouter);
app.use("/register", RegisterRouter);
app.use("/profile", MemberShipRouter);
app.use("/MemberUpdate", MemberUpdate);
app.use("/upload", UpdatePage);
app.use("/usercomments", UserComments);
app.use("/ChangeProfile", ChangeProfile);
app.use("/search", SearchData);
app.use("/SearchresultValue", SearchResult);
app.use("/Viewofplace", Viewmainpalce);

app.use("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/updatepageforuserfirsttime", (req, res) => {
  const useremail = req.session.UserData.email;
  var splituseremail = useremail.split("@");
  var CheckLeader = true;
  res.render("GuerdUpdate", { CheckLeader });
});
app.post("/confirm/email", async (req, res) => {
  console.log(req.body);
  const connection = await connectiondb();
  collectionName1 = "emailcheck";
  const UserEmail =connection.model.collectionName1 || connection.model(collectionName1, Schema);
  collectionName2 = "tempdata";
  const TempRegisterData =connection.model.collectionName2 || connection.model(collectionName2, Schema);
  const data = await TempRegisterData.findOne(req.body);
  const EmailSplit = data.email.split("@");
  collectionName3 = "MemberShip-" + EmailSplit[0];
  const CreateMember =
    connection.model.collectionName3 ||
    connection.model(collectionName3, Schema);
  console.log(data);
  const user = new UserEmail({
    full_name: data.full_name,
    gender: data.gender,
    contact_number: data.contact_number,
    Google_map: data.Google_map,
    address: data.address,
    languages_spoken: data.languages_spoken,
    years_experience: data.years_experience,
    certification: data.certification,
    email: data.email,
    Idcheck: data.Idcheck,
  });
  const Membersession = new CreateMember({
    full_name: data.full_name,
    gender: data.gender,
    contact_number: data.contact_number,
    Google_map: data.Google_map,
    address: data.address,
    languages_spoken: data.languages_spoken,
    years_experience: data.years_experience,
    certification: data.certification,
    email: data.email,
    Idcheck: data.Idcheck,
  });
  user.save();
  Membersession.save(async function (err, dataofbase) {
    if (err) {
      reject(err);
    } else {
      console.log("save dtaa=" + dataofbase);
      const result = await TempRegisterData.deleteOne(req.body);
      console.log(`${result.deletedCount} document deleted`);
      res.send("Your data stored.");
    }
  });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
