const express = require('express');
const app = express();

app.get('/ping', (req, res) => {
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log('SERVER OK');
});
