import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    
    url: process.env.DATABASE_URL,
    
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,

    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    synchronize: true, 
    logging: false,

    
    entities: [__dirname + '/../entities/*.{js,ts}'],
    migrations: [],
    subscribers: [],
});