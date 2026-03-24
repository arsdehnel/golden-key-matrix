import { route } from "rwsdk/router";
import InitialQuestion from "./initial-question";
import { QrPoll } from "./qr-poll";

export default [route("/qr-poll", QrPoll), route("/initial-question", InitialQuestion)];
