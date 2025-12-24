# Node.js Events Tutorial

This folder teaches you how to work with events in Node.js using the EventEmitter pattern.

---

## What Are Events?

Events are a way for objects to communicate with each other. When something happens (an "event"), code that's listening for that event gets notified and runs.

**Real-world analogy:** Like a doorbell - when someone presses it (event), you hear it (listener) and go answer the door (callback).

---

## EventEmitter: The Foundation

Node.js has a built-in `EventEmitter` class that provides the event system. Many Node.js objects inherit from it:
- `process` (stdin, stdout)
- `http.Server`
- `fs.ReadStream`
- `readline.Interface`
- And many more!

---

## Basic Concepts

### 1. Emitting Events
When something happens, you **emit** an event:
```javascript
emitter.emit('eventName', data);
```

### 2. Listening to Events
You register a **listener** (callback) that runs when the event occurs:
```javascript
emitter.on('eventName', (data) => {
  // This runs when 'eventName' is emitted
});
```

### 3. Event-Driven = Non-Blocking
Events use the event loop, so they're **non-blocking**. Multiple events can be processed without blocking each other.

---

## Example Files

- **`01-basic-events.js`** - Basic event emission and listening
- **`02-multiple-listeners.js`** - Multiple listeners for the same event
- **`03-once-listener.js`** - One-time event listeners
- **`04-remove-listeners.js`** - Removing event listeners
- **`05-custom-eventemitter.js`** - Creating your own EventEmitter class
- **`06-error-events.js`** - Handling error events
- **`07-practical-example.js`** - Real-world example: File watcher

---

## Key Methods

### `emitter.on(eventName, listener)`
Registers a listener that runs every time the event is emitted.

### `emitter.once(eventName, listener)`
Registers a listener that runs **only once**, then automatically removes itself.

### `emitter.emit(eventName, ...args)`
Emits an event, calling all registered listeners with the provided arguments.

### `emitter.off(eventName, listener)` or `emitter.removeListener()`
Removes a specific listener.

### `emitter.removeAllListeners(eventName)`
Removes all listeners for an event.

### `emitter.listenerCount(eventName)`
Returns the number of listeners for an event.

---

## Event-Driven Architecture Benefits

1. **Loose Coupling**: Objects don't need direct references to each other
2. **Scalability**: Easy to add/remove functionality
3. **Non-Blocking**: Uses event loop, doesn't block execution
4. **Flexibility**: Multiple listeners can respond to the same event
5. **Asynchronous**: Perfect for I/O operations

---

## Common Patterns

### Pattern 1: Observer Pattern
One object emits events, multiple objects listen:
```javascript
emitter.on('data', listener1);
emitter.on('data', listener2);
emitter.on('data', listener3);
emitter.emit('data', 'hello'); // All 3 listeners run
```

### Pattern 2: Event Delegation
Parent object emits, child objects handle:
```javascript
class Parent {
  constructor() {
    this.emitter = new EventEmitter();
  }
  notify(message) {
    this.emitter.emit('message', message);
  }
}
```

### Pattern 3: Error Handling
Always handle 'error' events:
```javascript
emitter.on('error', (err) => {
  console.error('Error occurred:', err);
});
```

---

## Best Practices

1. **Always handle 'error' events** - Unhandled errors can crash your app
2. **Use descriptive event names** - `'user-logged-in'` not `'event1'`
3. **Don't emit too frequently** - Can cause performance issues
4. **Remove listeners when done** - Prevents memory leaks
5. **Use `once()` for one-time events** - Automatically cleans up

---

## Next Steps

Run each example file to see events in action:
```bash
node 01-basic-events.js
node 02-multiple-listeners.js
# ... etc
```

Each file is self-contained and includes comments explaining what's happening.

