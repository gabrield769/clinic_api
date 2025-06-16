import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Patient } from "../entities/Patient";

export class PatientController {
    async create(req: Request, res: Response): Promise<Response> {
        const { name, email } = req.body;

        try {
            const patientRepository = AppDataSource.getRepository(Patient);
            const newPatient = patientRepository.create({ name, email });
            await patientRepository.save(newPatient);

            return res.status(201).json(newPatient);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


    async list(req: Request, res: Response): Promise<Response> {
        try {
            const patientRepository = AppDataSource.getRepository(Patient);
            const patients = await patientRepository.find();
            return res.status(200).json(patients);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}