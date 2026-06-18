const fs = require('fs');
const deployments = JSON.parse(fs.readFileSync('deployments.json', 'utf8'));
const prod = deployments.find(d => d.environment === 'Production – cash-compass-bot');
if (prod) {
    console.log(prod.statuses_url);
}
