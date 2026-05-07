import app from './app';
import { Logger } from '../utils/Logger';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  Logger.info(`Compiler Backend is running on port ${PORT}`);
});