const fs = require('fs');
const content = fs.readFileSync('src/components/AgentPortal.js', 'utf8');
const fixed = content.replace(/\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync('src/components/AgentPortal.js', fixed);
