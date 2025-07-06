import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import shiftRoutes from './routes/shiftRoutes';
import carerRoutes from './routes/carerRoutes';
import clientRoutes from './routes/clientRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/carers', carerRoutes);
app.use('/clients', clientRoutes);
app.use('/shifts', shiftRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});