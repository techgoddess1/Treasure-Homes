import express from 'express';
import cors from 'cors';
import router from './routes';
import Response from './helpers/ResponseModel';

const app = express();
app.use(cors);

app.use(express.json());

app.use('/api/v1', router);

app.use('*', (req, res) => {
  res.status(404).json(new Response(false, 404, 'You typed in the wrong URL'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App running on port: ${PORT}`));

export default app;
