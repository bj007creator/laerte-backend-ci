import path from "path";
import express from "express";
import "../config/passport-setup";
import UsersRoutes from "./routes/UsersRoutes";
import ProfileRoutes from "./routes/ProfileRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import ServiceRoutes from "./routes/ServiceRoutes";
import SolicitationRoutes from "./routes/SolicitationRoutes";
import PostRoutes from "./routes/PostRoutes";
import ImagesRoutes from "./routes/ImagesRoutes";
import VideosRoutes from "./routes/VideosRoutes";
import TextsRoutes from "./routes/TextsRoutes";
import cors from "cors";
import passport from "passport";
//import '../config/getEnv';

const app = express();

app.use(cors());

app.use(express.json());

app.use(passport.initialize());

app.use("/users", UsersRoutes);

app.use("/profile", ProfileRoutes);

app.use("/auth", AuthRoutes);

app.use("/services", ServiceRoutes);

app.use("/solicitations", SolicitationRoutes);

app.use("/posts", PostRoutes);

app.use("/images", ImagesRoutes);

app.use("/videos", VideosRoutes);

app.use("/texts", TextsRoutes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(process.env.PORT || 3333);
