// Defines all API routes and maps them to controller functions.

import { Router } from "express";
import { PatientController } from "../controllers/PatientController";
import { DoctorController } from "../controllers/DoctorController";
import { AppointmentController } from "../controllers/AppointmentController";

const router = Router();

const patientController = new PatientController();
const doctorController = new DoctorController();
const appointmentController = new AppointmentController();

// Patient routes
// We wrap the controller method call in an arrow function to preserve the correct 'this' context.
router.post("/patients", (req, res) => patientController.create(req, res));
router.get("/patients", (req, res) => patientController.list(req, res)); 


// Doctor routes
router.post("/doctors", (req, res) => doctorController.create(req, res));
router.get("/doctors", (req, res) => doctorController.list(req, res));

// Appointment routes
router.post("/appointments", (req, res) => appointmentController.create(req, res));
router.get("/appointments/doctor/:doctorId", (req, res) => appointmentController.listByDoctor(req, res));
router.get("/appointments/patient/:patientId", (req, res) => appointmentController.listByPatient(req, res));

export default router;