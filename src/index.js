import blessed from 'blessed'
import contrib from 'blessed-contrib'
import { firestore } from './firebase'

const screen = blessed.screen();


screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});

//grid.set(row, col, rowSpan, colSpan, obj, opts)
const grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

const channels = grid.set(0, 0, 11, 2, contrib.table, {
  keys: true,
  vi: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  label: "Channels",
  border: { type: "line", fg: "cyan" },
  columnWidth: [16] /*in chars*/
})
const chat = grid.set(0, 2, 11, 10, contrib.log, {label: "Chat"})
const input = grid.set(11, 0, 1, 12, blessed.input, {label: 'Message'})

chat.log('I Love You Caresse')
chat.log('I think this is pretty cool!!!')




const fetchChannels = async () => {
  try {
  const snapshot = await firestore.collection('channels').get()
  const data = snapshot.docs.map(doc => { return [doc.data().title] })
  } catch (error) {
    console.error(error)
  }
}
fetchChannels()

channels.setData({
  headers: [''],
  data: [['test one'], ['test two']] 
})
//allow control the table with the keyboard
//TODO: add this with a keystroke
//channels.focus();




screen.render();
