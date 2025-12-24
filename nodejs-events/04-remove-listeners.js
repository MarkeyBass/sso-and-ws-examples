// Remove Listeners Example
// Shows how to remove event listeners to prevent memory leaks

import { EventEmitter } from 'events';

const emitter = new EventEmitter();

// Define a listener function (must be named to remove it later)
function handleMessage(msg) {
  console.log(`Received: ${msg}`);
}

// Register the listener
emitter.on('message', handleMessage);

console.log(`Listeners before: ${emitter.listenerCount('message')}`);

// Emit event - listener runs
emitter.emit('message', 'Hello');

// Remove the specific listener
emitter.off('message', handleMessage); // or emitter.removeListener()

console.log(`Listeners after removal: ${emitter.listenerCount('message')}`);

// Emit again - nothing happens (listener was removed)
emitter.emit('message', 'Goodbye');

// Remove all listeners for an event
emitter.on('cleanup', () => console.log('Cleanup 1'));
emitter.on('cleanup', () => console.log('Cleanup 2'));

console.log(`\nCleanup listeners: ${emitter.listenerCount('cleanup')}`);
emitter.removeAllListeners('cleanup');
console.log(`Cleanup listeners after removeAllListeners: ${emitter.listenerCount('cleanup')}`);

// Output:
// Listeners before: 1
// Received: Hello
// Listeners after removal: 0
//
// Cleanup listeners: 2
// Cleanup listeners after removeAllListeners: 0

