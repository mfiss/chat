"use strict";

var _blessed = _interopRequireDefault(require("blessed"));

var _blessedContrib = _interopRequireDefault(require("blessed-contrib"));

var _firebase = require("./firebase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var screen = _blessed["default"].screen();

screen.key(["escape", "q", "C-c"], function (ch, key) {
  return process.exit(0);
}); //grid.set(row, col, rowSpan, colSpan, obj, opts)

var grid = new _blessedContrib["default"].grid({
  rows: 12,
  cols: 12,
  screen: screen
});
var channels = grid.set(0, 0, 11, 2, _blessedContrib["default"].table, {
  keys: true,
  vi: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  label: "Channels",
  border: {
    type: "line",
    fg: "cyan"
  },
  columnWidth: [16]
  /*in chars*/

});
var chat = grid.set(0, 2, 11, 10, _blessedContrib["default"].log, {
  label: "Chat"
});
var input = grid.set(11, 0, 1, 12, _blessed["default"].input, {
  label: 'Message'
});
chat.log('I Love You Caresse');
chat.log('I think this is pretty cool!!!');

var fetchChannels =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var snapshot;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _firebase.firestore.collection('channels').get();

          case 3:
            snapshot = _context.sent;
            snapshot.forEach(function (doc) {
              var id = doc.id;
              var data = doc.data();
              console.log({
                id: id,
                data: data
              });
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function fetchChannels() {
    return _ref.apply(this, arguments);
  };
}();

fetchChannels(); //allow control the table with the keyboard
//TODO: add this with a keystroke
//channels.focus();

screen.render();