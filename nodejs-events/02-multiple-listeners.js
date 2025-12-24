// Multiple Listeners Example
// Shows how multiple listeners can respond to the same event

import { EventEmitter } from 'events';

const emitter = new EventEmitter();

// Simulate different parts of an application listening to the same event

// Logger listens for 'user-action'
emitter.on('user-action', (action, userId) => {
  console.log(`[LOG] User ${userId} performed: ${action}`);
});

// Analytics listens for 'user-action'
emitter.on('user-action', (action, userId) => {
  console.log(`[ANALYTICS] Tracking: ${action} by user ${userId}`);
});

// Notification system listens for 'user-action'
emitter.on('user-action', (action, userId) => {
  if (action === 'login') {
    console.log(`[NOTIFICATION] Welcome back, user ${userId}!`);
  }
});

// When a user action occurs, ALL listeners are called
console.log('User logs in...');
emitter.emit('user-action', 'login', 123);

console.log('\nUser makes a purchase...');
emitter.emit('user-action', 'purchase', 123);

// Output:
// User logs in...
// [LOG] User 123 performed: login
// [ANALYTICS] Tracking: login by user 123
// [NOTIFICATION] Welcome back, user 123!
//
// User makes a purchase...
// [LOG] User 123 performed: purchase
// [ANALYTICS] Tracking: purchase by user 123

