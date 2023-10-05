import express from "express";
import { Server as websocketServer } from "socket.io";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import http from "http";
import {v4 as uuid} from "uuid";

const app = express();
const httpServer = http.createServer(app);
const io = new websocketServer(httpServer);
const __dirname = dirname(fileURLToPath(import.meta.url));

const notes = [];

app.use(express.static(join(__dirname, "public")));
io.on('connection', (socket)=> {
    console.log('new connection:', socket.id)
    socket.on("client: new note", (newNote) => {
        const note = {...newNote, id: uuid()};
        console.log(notes);
        notes.push(note);
        console.log(notes)
        socket.emit("server: newnote", note)
    })
})


httpServer.listen(process.env.PORT || 3000);