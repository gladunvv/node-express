const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

function start() {
  try {
    app.listen(PORT, () => console.log(`App gas been started on port ${PORT}`));
  } catch (e) {
    console.log('Server Error :', e.message);
    process.exit(1);
  }
}

start();
