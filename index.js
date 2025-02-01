import express from 'express';
import dotenv from 'dotenv';
import router from './routes/faq-routes.js';
import './config/db.js'; 


dotenv.config();
export const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/faqs', router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
