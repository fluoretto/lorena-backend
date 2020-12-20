import express from "express";
import { respond } from "@root/server/util";
import { helloWorld } from "@root/apis/v1";

const router = express.Router();

router.get("/", (q, s) => respond(s, helloWorld()));

export default router;
