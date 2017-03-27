const express = require('express');
const routes = require('./config/routes');
const { port } = require('./config/environment');
const dest = `${__dirname}/public`;

const app = express();

app.use(express.static(dest));

app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));

app.listen(port, () => console.log(`Express is listening on port ${port}`));
