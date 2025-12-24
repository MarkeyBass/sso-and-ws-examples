// Error Events Example
// Demonstrates how to handle error events (CRITICAL!)

import { EventEmitter } from 'events';

const emitter = new EventEmitter();

// ⚠️ IMPORTANT: Always handle 'error' events!
// If an 'error' event is emitted and no listener is registered,
// Node.js will throw an exception and crash your application.

emitter.on('error', (err) => {
  console.error('Error caught:', err.message);
  // Handle the error gracefully instead of crashing
});

// You can emit error events
emitter.emit('error', new Error('Something went wrong!'));

// Without the error listener, this would crash:
// emitter.emit('error', new Error('Unhandled error'));
// Error: Unhandled 'error' event

// Example: Simulating an async operation that might fail
function processData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data === 'invalid') {
        emitter.emit('error', new Error('Invalid data received'));
        reject(new Error('Invalid data'));
      } else {
        console.log(`Processing: ${data}`);
        resolve(data);
      }
    }, 100);
  });
}

// Handle both success and error
emitter.on('data-processed', (data) => {
  console.log(`✅ Data processed successfully: ${data}`);
});

// Simulate processing
processData('valid data')
  .then((data) => emitter.emit('data-processed', data))
  .catch((err) => console.error('Promise rejected:', err.message));

processData('invalid')
  .then((data) => emitter.emit('data-processed', data))
  .catch((err) => console.error('Promise rejected:', err.message));

// Output:
// Error caught: Something went wrong!
// Processing: valid data
// ✅ Data processed successfully: valid data
// Error caught: Invalid data received
// Promise rejected: Invalid data

