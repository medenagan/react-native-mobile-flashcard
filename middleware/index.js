import thunk from "redux-thunk";
import logger from "./logger";
import { applyMiddleware } from "redux";

const DEBUG = false;

export default DEBUG ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);
