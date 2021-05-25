import express from 'express';
import cors from 'cors';

import { connect } from './config/db.js';
import router from './routes/track.js';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));

connect();
