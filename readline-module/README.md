# Readline Module Example

This example demonstrates how Node.js's built-in `readline` module works for handling terminal input in a non-blocking, event-driven way.

---

## What This Example Does

The `readline-prompt-example.js` file creates a simple CLI (Command Line Interface) that:
- Displays a prompt (`CLI> `)
- Waits for user input
- Processes commands (`hello`, `time`, `exit`)
- Shows the prompt again for the next input
- Runs continuously until the user types `exit` or presses Ctrl+C

---

## How It Works: Event-Driven and Non-Blocking

### The Key Concept

Unlike blocking input methods (like `readline-sync`), this uses **event-driven programming**. The program doesn't stop and wait for input—instead, it registers event listeners and continues running.

### Step-by-Step Breakdown

#### 1. Creating the Readline Interface

```javascript
const rl = readline.createInterface({
  input: process.stdin,   // Where to read from (keyboard)
  output: process.stdout, // Where to write to (screen)
  prompt: 'CLI> '        // The prompt text
});
```

**What happens internally:**
- Node.js sets up listeners on `process.stdin` (the input stream)
- It watches for raw keyboard input from the OS
- The function returns **immediately**—it doesn't wait for anything

#### 2. Displaying the Prompt

```javascript
rl.prompt();
```

This writes `CLI> ` to the screen and positions the cursor, but **doesn't block**. The program continues immediately.

#### 3. Registering the 'line' Event Listener

```javascript
rl.on('line', (line) => {
  // This callback runs when user presses Enter
  console.log(`You entered: ${input}`);
  rl.prompt(); // Show prompt again
});
```

**What this does:**
- Registers a callback function
- The callback will run **later** when a complete line is entered
- The `.on()` call returns immediately—no waiting!

---

## How the 'line' Event Works

### The Registration Chain

1. **Your code**: `rl.on('line', callback)` → Registers your callback
2. **Inside readline module**: Sets up `process.stdin.on('data', ...)` → Listens to raw input
3. **Node.js event loop**: Watches for OS keyboard events
4. **OS**: Detects when you type and sends data to Node.js

### Detecting the Enter Key

The readline module:
- Receives raw input chunks as you type (each keystroke)
- Buffers the characters internally
- Watches for the newline character (`\n`) which is what Enter produces
- When `\n` is detected, it emits the `'line'` event with the complete line

### Example Flow

```
You type: "h" → process.stdin emits 'data' → readline buffers "h"
You type: "e" → process.stdin emits 'data' → readline buffers "he"
You type: "l" → process.stdin emits 'data' → readline buffers "hel"
You type: "l" → process.stdin emits 'data' → readline buffers "hell"
You type: "o" → process.stdin emits 'data' → readline buffers "hello"
You press Enter → process.stdin emits 'data' with "\n" → 
  readline detects "\n" → emits 'line' event with "hello" → 
  YOUR CALLBACK RUNS!
```

---

## Why It's Non-Blocking

### The Event Loop

Node.js uses an **event loop** that continuously checks for events:

```javascript
// Simplified event loop (inside Node.js):
while (true) {
  // Check for:
  // - Keyboard input (readline)
  // - Network messages (WebSocket, HTTP)
  // - File system events
  // - Timers
  // - etc.
  
  const event = getNextEvent();
  if (event) {
    event.callback(); // Run the handler
  }
}
```

### Comparison: Blocking vs Non-Blocking

**Blocking (bad):**
```javascript
// This STOPS the entire program
const answer = readlineSync.question('Enter: ');
console.log('Got:', answer); // Can't run until user types
// WebSocket messages can't be processed!
```

**Non-Blocking (good - what readline does):**
```javascript
// This returns immediately
rl.on('line', (line) => {
  console.log('Got:', line); // Runs LATER when event fires
});
// Program continues - WebSocket messages can be processed!
```

### Timeline Example

```
Time 0ms:   rl.on('line', callback) → Registers listener → Returns immediately
Time 1ms:   Event loop running... checking for events
Time 2ms:   Event loop running... checking for events  
Time 3ms:   Event loop running... checking for events
...
Time 500ms: User types "hello" and presses Enter
Time 501ms: OS sends input to Node.js
Time 502ms: readline parses it, emits 'line' event
Time 503ms: Your callback runs: console.log('Hello there!')
Time 504ms: rl.prompt() shows prompt again
Time 505ms: Event loop continues... checking for other events
```

---

## Key Features

### 1. Continuous Input Loop

The example handles multiple inputs automatically:
- After processing one command, it calls `rl.prompt()` again
- This creates a continuous loop without a `while(true)` in your code
- The loop is managed by the event system

### 2. Multiple Event Listeners

You can register multiple listeners for different events:

```javascript
rl.on('line', (line) => {
  // Handle input
});

rl.on('close', () => {
  // Handle exit (Ctrl+C or Ctrl+D)
});
```

Both listeners are registered and can fire independently.

### 3. Works with Other Async Operations

Because it's non-blocking, you can use it alongside:
- WebSocket connections
- HTTP servers
- File system operations
- Timers
- Other event-driven code

All running simultaneously on the same event loop!

---

## The Code Breakdown

```javascript
// 1. Create interface (returns immediately)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'CLI> '
});

// 2. Show prompt (returns immediately)
rl.prompt();

// 3. Register event listener (returns immediately)
rl.on('line', (line) => {
  const input = line.trim();
  
  // Process the command
  switch (input) {
    case 'hello':
      console.log('Hello there!');
      break;
    case 'time':
      console.log(`Current time: ${new Date().toLocaleTimeString()}`);
      break;
    case 'exit':
      rl.close(); // Closes the interface, triggers 'close' event
      return;
    default:
      console.log(`You entered: ${input}`);
  }
  
  // Show prompt again for next input
  rl.prompt();
});

// 4. Handle cleanup
rl.on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});
```

**All of this code runs once at startup, then the event loop takes over!**

---

## Summary

- **Event-driven**: Uses `.on('line', callback)` to register handlers
- **Non-blocking**: Functions return immediately, callbacks run later
- **Continuous**: Automatically handles multiple inputs via events
- **Compatible**: Works with other async operations (WebSockets, timers, etc.)
- **Built-in**: No extra dependencies needed

The "hidden loop" is Node.js's event loop, which continuously checks for and processes events. Your code just registers what to do when events occur!

