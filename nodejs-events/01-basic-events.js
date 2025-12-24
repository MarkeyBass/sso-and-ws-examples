// Basic Events Example
// Demonstrates the fundamental event pattern: emit and listen

import { EventEmitter } from 'events';

// Create an EventEmitter instance
const emitter = new EventEmitter();

// Register a listener for the 'greet' event
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Register another listener for the same event
emitter.on('greet', (name) => {
  console.log(`Nice to meet you, ${name}!`);
});

// Emit the 'greet' event with data
console.log('Emitting greet event...');
emitter.emit('greet', 'Alice');

// Emit it again with different data
console.log('\nEmitting greet event again...');
emitter.emit('greet', 'Bob');

// Output:
// Emitting greet event...
// Hello, Alice!
// Nice to meet you, Alice!
//
// Emitting greet event again...
// Hello, Bob!
// Nice to meet you, Bob!

