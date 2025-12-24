// Practical Example: File Watcher Simulation
// Real-world example showing events in a practical scenario

import { EventEmitter } from 'events';
import { readFile } from 'fs/promises';

// Create a file watcher class
class FileWatcher extends EventEmitter {
  constructor(filename) {
    super();
    this.filename = filename;
    this.lastContent = null;
    this.watching = false;
  }

  async start() {
    if (this.watching) {
      this.emit('error', new Error('Already watching!'));
      return;
    }

    this.watching = true;
    this.emit('started', this.filename);
    
    // Simulate checking file every 2 seconds
    this.interval = setInterval(async () => {
      try {
        const content = await this.checkFile();
        if (content !== this.lastContent) {
          if (this.lastContent === null) {
            this.emit('file-created', this.filename, content);
          } else {
            this.emit('file-changed', this.filename, content, this.lastContent);
          }
          this.lastContent = content;
        }
      } catch (err) {
        this.emit('error', err);
      }
    }, 2000);
  }

  async checkFile() {
    try {
      const content = await readFile(this.filename, 'utf-8');
      return content;
    } catch (err) {
      if (err.code === 'ENOENT') {
        // File doesn't exist yet
        return null;
      }
      throw err;
    }
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.watching = false;
    this.emit('stopped', this.filename);
  }
}

// Usage example
const watcher = new FileWatcher('test.txt');

// Listen for different events
watcher.on('started', (filename) => {
  console.log(`👀 Started watching: ${filename}`);
});

watcher.on('file-created', (filename, content) => {
  console.log(`📄 File created: ${filename}`);
  console.log(`   Content: ${content.substring(0, 50)}...`);
});

watcher.on('file-changed', (filename, newContent, oldContent) => {
  console.log(`✏️  File changed: ${filename}`);
  console.log(`   Old: ${oldContent.substring(0, 30)}...`);
  console.log(`   New: ${newContent.substring(0, 30)}...`);
});

watcher.on('error', (err) => {
  console.error(`❌ Error: ${err.message}`);
});

watcher.on('stopped', (filename) => {
  console.log(`🛑 Stopped watching: ${filename}`);
});

// Start watching
watcher.start();

// Stop after 10 seconds (for demo purposes)
setTimeout(() => {
  watcher.stop();
  process.exit(0);
}, 10000);

// Note: In a real application, you'd use fs.watch() or chokidar
// This is just a demonstration of the event pattern

