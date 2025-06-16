// Represents a doctor in the clinic.

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Appointment } from "./Appointment";

@Entity('doctors')
export class Doctor {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ length: 100 })
    specialty!: string;

    // Defines the one-to-many relationship with Appointment
    @OneToMany(() => Appointment, (appointment: Appointment) => appointment.doctor)
    appointments!: Appointment[];
}