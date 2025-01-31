const express = require('express');
const dotenv = require('dotenv');
const faqRoutes = require('./routes/faq-routes.js');
require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/faqs', faqRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
