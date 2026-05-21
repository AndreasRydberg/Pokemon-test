import express, { Application } from "express";
import Routes from "./src/routes";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app: Application = express();
new Routes(app);

app
  .listen(PORT, "0.0.0.0", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });