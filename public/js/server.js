/* eslint-disable no-console */
const app = require('../app');

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

