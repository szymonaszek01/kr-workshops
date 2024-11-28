const express = require('express');
const bookRoutes = require('./routes/book-routes');

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', bookRoutes);
app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => {
  res.send('Welcom to kr-workshops-backend');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
