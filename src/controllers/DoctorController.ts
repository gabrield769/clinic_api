import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Doctor } from "../entities/Doctor";

export class DoctorController {
    async create(req: Request, res: Response): Promise<Response> {
        const { name, specialty } = req.body;

        try {
            const doctorRepository = AppDataSource.getRepository(Doctor);
            const newDoctor = doctorRepository.create({ name, specialty });
            await doctorRepository.save(newDoctor);

            return res.status(201).json(newDoctor);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const doctorRepository = AppDataSource.getRepository(Doctor);
            const doctors = await doctorRepository.find();
            return res.status(200).json(doctors);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}