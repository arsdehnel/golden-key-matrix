import { route } from "rwsdk/router";
import { QrPoll } from "./qr-poll";
import InitialQuestion from "./initial-question";

export default [route("/qr-poll", QrPoll), route("/initial-question", InitialQuestion)];
