"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.firestore = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/firestore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var firebaseConfig = {
  apiKey: "AIzaSyDXgUrmdJSWtGs4ihXUA9kb8YmewOzUQwA",
  authDomain: "nm-chat.firebaseapp.com",
  databaseURL: "https://nm-chat.firebaseio.com",
  projectId: "nm-chat",
  storageBucket: "nm-chat.appspot.com",
  messagingSenderId: "718360447369",
  appId: "1:718360447369:web:6f895ec48995686ad03958"
}; // Initialize Firebase

_app["default"].initializeApp(firebaseConfig);

var firestore = _app["default"].firestore();

exports.firestore = firestore;
var _default = _app["default"];
exports["default"] = _default;