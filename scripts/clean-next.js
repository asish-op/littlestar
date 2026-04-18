const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');

try {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log('[prebuild] Removed .next directory to avoid stale build artifacts.');
} catch (error) {
  console.warn('[prebuild] Could not remove .next directory:', error.message);
}
