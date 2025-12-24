import WebSocket from "ws";
import { createInput } from "./readline.js";

const ws = new WebSocket("ws://localhost:4000");
let rl; // Store the readline interface

ws.on("open", () => {
  console.log("user2 connected to ws://localhost:4000");
  rl = createInput("user2> ", (line) => {
    if (line.trim().length === 0) return;
    ws.send(`user2: ${line}`);
  });
});

ws.on("message", (data) => {
  console.log(`\n[recv] ${data.toString()}`);
  rl.prompt(); // Restore the prompt properly
  // Like console.log, but without a new line
  // process.stdout.write('user2> ');
});

ws.on("close", () => {
  console.log("Connection closed");
  process.exit(0);
});

ws.on("error", (err) => {
  console.error("WebSocket error:", err.message);
});
