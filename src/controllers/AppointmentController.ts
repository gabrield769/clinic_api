// Handles HTTP requests related to appointments.

import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Appointment } from "../entities/Appointment";
import { Patient } from "../entities/Patient";
import { Doctor } from "../entities/Doctor";

export class AppointmentController {
    // Creates a new appointment
    async create(req: Request, res: Response): Promise<Response> {
        const { patientId, doctorId, appointmentDate } = req.body;

        try {
            const appointmentRepository = AppDataSource.getRepository(Appointment);
            const patientRepository = AppDataSource.getRepository(Patient);
            const doctorRepository = AppDataSource.getRepository(Doctor);

            const patient = await patientRepository.findOneBy({ id: patientId });
            if (!patient) return res.status(404).json({ message: "Patient not found" });

            const doctor = await doctorRepository.findOneBy({ id: doctorId });
            if (!doctor) return res.status(404).json({ message: "Doctor not found" });

            const newAppointment = appointmentRepository.create({
                patient,
                doctor,
                appointmentDate
            });

            await appointmentRepository.save(newAppointment);
            return res.status(201).json(newAppointment);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // Lists appointments for a specific doctor
    async listByDoctor(req: Request, res: Response): Promise<Response> {
        const doctorId = parseInt(req.params.doctorId);

        try {
            const appointmentRepository = AppDataSource.getRepository(Appointment);
            const appointments = await appointmentRepository.find({
                where: { doctor: { id: doctorId } },
                relations: ["patient"]
            });
            return res.status(200).json(appointments);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // Lists appointments for a specific patient
    async listByPatient(req: Request, res: Response): Promise<Response> {
        const patientId = parseInt(req.params.patientId);

        try {
            const appointmentRepository = AppDataSource.getRepository(Appointment);
            const appointments = await appointmentRepository.find({
                where: { patient: { id: patientId } },
                relations: ["doctor"]
            });
            return res.status(200).json(appointments);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}