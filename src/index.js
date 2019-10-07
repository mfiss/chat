import blessed from "blessed";
import contrib from "blessed-contrib";
import { firestore } from "./firebase";

const screen = blessed.screen();
//grid.set(row, col, rowSpan, colSpan, obj, opts)
const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });
const channels = grid.set(0, 0, 11.5, 2, contrib.table, {
  keys: true,
  vi: true,
  interactive: true,
  label: "Channels",
  border: {
    type: "line",
    fg: "cyan"
  },
  columnWidth: [16]
});
const chat = grid.set(0, 2, 11.5, 10, contrib.log, { label: "Chat" });
const message = grid.set(11.5, 0, 0.65, 12, blessed.textbox, {
  label: "Message",
  vi: true,
  inputOnFocus: true
});

const fetchChannels = async () => {
  try {
    await firestore.collection("channels").onSnapshot(snapshot => {
    const data = snapshot.docs.map(doc => {
      return [doc.data().title];
    });
  channels.setData({
    headers: [""],
    data
  });
    });
  } catch (error) {
    console.error(error);
  }
};
fetchChannels();

const fetchMessages = async () => {
  try {
    await firestore.collection("/channels/0NFtJhVR6ST6TFUcZxJr/messages/").onSnapshot(snapshot => {
      snapshot.docs.map(doc => {
        chat.log(doc.data().message)
      })
    })
  } catch (error) {
    console.error(error)
  }
}
fetchMessages()

const postMessage = async (message) => {
  try {
    await firestore.collection('/channels/0NFtJhVR6ST6TFUcZxJr/messages/').add({message})
  } catch (error) {
    console.error(error)
  }
}

message.key(['enter'], () => message.submit())
message.on('submit', () => {
    let text = message.getValue();
    postMessage(text) 
    message.value = ''
    message.render()
    message.focus()
  });
message.focus();


//channels.focus()

screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});

screen.render();
