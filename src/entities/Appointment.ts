// Represents an appointment between a patient and a doctor.

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    appointmentDate!: Date;

    @Column({ default: 'scheduled' })
    status!: string;

    // Defines the many-to-one relationship with Patient
    @ManyToOne(() => Patient, (patient: Patient) => patient.appointments)
    @JoinColumn({ name: 'patientId' })
    patient!: Patient;

    // Defines the many-to-one relationship with Doctor
    @ManyToOne(() => Doctor, (doctor: Doctor) => doctor.appointments)
    @JoinColumn({ name: 'doctorId' })
    doctor!: Doctor;
}