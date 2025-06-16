// Represents a patient in the clinic.

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Appointment } from "./Appointment";

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ unique: true })
    email!: string;

    // Defines the one-to-many relationship with Appointment
    @OneToMany(() => Appointment, (appointment: Appointment) => appointment.patient)
    appointments!: Appointment[];
}