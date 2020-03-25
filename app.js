const express = require('express');

const app = express();

const PORT = 5000;

function start() {
  try {
    app.listen(PORT, () => console.log(`App gas been started on port ${PORT}`));
  } catch (e) {
    console.log('Server Error :', e.message);
    process.exit(1);
  }
}

start();
