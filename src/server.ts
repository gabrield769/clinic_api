import express, { Request, Response, NextFunction } from 'express';
import { AppDataSource } from './database/data-source';
import routes from './routes';

// Listeners de processo para garantir que nenhum erro passe batido
process.on('uncaughtException', (error, origin) => {
  console.log('<<<<< uncaughtException >>>>>', error, origin);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.log('<<<<< unhandledRejection >>>>>', reason, promise);
  process.exit(1);
});

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");

    const app = express();
    app.use(express.json());
    app.use('/api', routes);

    // Middleware de Erro Global
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error('--- GLOBAL ERROR HANDLER CAUGHT AN ERROR ---');
        console.error(err);
        res.status(500).json({ 
            message: 'An unexpected error occurred!',
            error: err.message 
        });
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});