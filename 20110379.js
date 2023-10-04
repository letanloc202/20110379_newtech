const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));

const blogController = require('./controllers/blogController');
app.use('/', blogController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});