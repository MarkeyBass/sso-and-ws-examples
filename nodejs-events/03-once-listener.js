// Once Listener Example
// Demonstrates listeners that run only once, then automatically remove themselves

import { EventEmitter } from 'events';

const emitter = new EventEmitter();

// Regular listener - runs every time
emitter.on('data', (chunk) => {
  console.log(`Regular listener: ${chunk}`);
});

// Once listener - runs only once, then removes itself
emitter.once('data', (chunk) => {
  console.log(`Once listener (first time only): ${chunk}`);
});

console.log('Emitting data event 3 times...\n');

emitter.emit('data', 'chunk 1');
emitter.emit('data', 'chunk 2');
emitter.emit('data', 'chunk 3');

console.log(`\nListener count after 3 emissions: ${emitter.listenerCount('data')}`);

// Output:
// Emitting data event 3 times...
//
// Regular listener: chunk 1
// Once listener (first time only): chunk 1
// Regular listener: chunk 2
// Regular listener: chunk 3
//
// Listener count after 3 emissions: 1
// (Only the regular listener remains)

