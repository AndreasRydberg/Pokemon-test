import express, { Application, Request, Response, NextFunction } from "express";
import Routes from "./src/routes";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app: Application = express();
new Routes(app);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

app
  .listen(PORT, "0.0.0.0", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.error("Error: address already in use");
    } else {
      console.error(err);
    }
  });