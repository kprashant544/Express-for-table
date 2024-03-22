const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());


const table = require("./Routes/TableCrud");
app.use("/",table);

const authRoute = require("./Routes/Auth");
app.use("/auth", authRoute);
const port = 5001;

/* --- */
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

