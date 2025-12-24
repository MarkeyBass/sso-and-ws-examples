// Custom EventEmitter Example
// Shows how to create your own class that extends EventEmitter

import { EventEmitter } from 'events';

// Create a custom class that extends EventEmitter
class UserManager extends EventEmitter {
  constructor() {
    super(); // Call parent constructor
    this.users = [];
  }

  addUser(name) {
    this.users.push(name);
    // Emit a custom event when user is added
    this.emit('user-added', name, this.users.length);
  }

  removeUser(name) {
    const index = this.users.indexOf(name);
    if (index > -1) {
      this.users.splice(index, 1);
      // Emit a custom event when user is removed
      this.emit('user-removed', name, this.users.length);
    }
  }

  getUserCount() {
    return this.users.length;
  }
}

// Use the custom EventEmitter
const userManager = new UserManager();

// Listen for custom events
userManager.on('user-added', (name, totalUsers) => {
  console.log(`✅ User "${name}" added. Total users: ${totalUsers}`);
});

userManager.on('user-removed', (name, totalUsers) => {
  console.log(`❌ User "${name}" removed. Total users: ${totalUsers}`);
});

// Perform actions that trigger events
userManager.addUser('Alice');
userManager.addUser('Bob');
userManager.addUser('Charlie');

console.log(`\nCurrent user count: ${userManager.getUserCount()}\n`);

userManager.removeUser('Bob');

// Output:
// ✅ User "Alice" added. Total users: 1
// ✅ User "Bob" added. Total users: 2
// ✅ User "Charlie" added. Total users: 3
//
// Current user count: 3
//
// ❌ User "Bob" removed. Total users: 2

