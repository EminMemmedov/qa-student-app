import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const version = Date.now().toString();

const versionData = {
    version: version,
    buildDate: new Date().toISOString()
};

const publicDir = path.join(__dirname, '../public');
const versionFilePath = path.join(publicDir, 'version.json');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2));

console.log(`Version ${version} generated at ${versionFilePath}`);
