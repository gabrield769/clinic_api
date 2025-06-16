import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import { Patient } from "../entities/Patient";
import { Doctor } from "../entities/Doctor";
import { Appointment } from "../entities/Appointment";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Patient, Doctor, Appointment],
    migrations: [],
    subscribers: [],
});