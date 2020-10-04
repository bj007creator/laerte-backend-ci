import path from "path";
import express from "express";
import "../config/passport-setup";
import UsersRoutes from "./routes/UsersRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import ServiceRoutes from "./routes/ServiceRoutes";
import cors from "cors";
import passport from "passport";
//import '../config/getEnv';

const app = express();

app.use(cors());

app.use(express.json());

app.use(passport.initialize());

app.use("/users", UsersRoutes);

app.use("/auth", AuthRoutes);

app.use("/services", ServiceRoutes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(process.env.PORT || 3333);
