import { route } from "rwsdk/router";
import Pages__OSN__Index from "./index";
import Pages__OSN__ThankYou from "./thank-you";
import Pages__OSN__Welcome from "./welcome";

export default [route("/", Pages__OSN__Index), route("/welcome", Pages__OSN__Welcome), route("/thank-you", Pages__OSN__ThankYou)];
