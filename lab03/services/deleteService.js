
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class DeleteService {
    deleteFaculty = async (res, faculty_id) => {
        try {
            const facultyToDelete = await prisma.faculty.findUnique({ where: { faculty: faculty_id } });
            if (!facultyToDelete)
                this.sendCustomError(res, 404, `Не найден факультет = ${faculty_id}`);
            else
                await prisma.faculty.delete({ where: { faculty: faculty_id } })
                    .then(() => res.json(facultyToDelete));
        }
        catch (err) { this.sendError(res, err); }
    }


    deletePulpit = async (res, pulpit_id) => {
        try {
            const pulpitToDelete = await prisma.pulpit.findUnique({ where: { pulpit: pulpit_id } });
            if (!pulpitToDelete)
                this.sendCustomError(res, 404, `Не найдена кафедра = ${pulpit_id}`);
            else
                await prisma.pulpit.delete({ where: { pulpit: pulpit_id } })
                    .then(() => res.json(pulpitToDelete));
        }
        catch (err) { this.sendError(res, err); }
    }


    deleteSubject = async (res, subject_id) => {
        try {
            const subjectToDelete = await prisma.subject.findUnique({ where: { subject: subject_id } });
            if (!subjectToDelete)
                this.sendCustomError(res, 404, `Не найдена дисциплина = ${subject_id}`);
            else
                await prisma.subject.delete({ where: { subject: subject_id } })
                    .then(() => res.json(subjectToDelete));
        }
        catch (err) { this.sendError(res, err); }
    }


    deleteTeacher = async (res, teacher_id) => {
        try {
            const teacherToDelete = await prisma.teacher.findUnique({ where: { teacher: teacher_id } });
            if (!teacherToDelete)
                this.sendCustomError(res, 404, `Не найден преподаватель = ${teacher_id}`);
            else
                await prisma.teacher.delete({ where: { teacher: teacher_id } })
                    .then(() => res.json(teacherToDelete));
        }
        catch (err) { this.sendError(res, err); }
    }


    deleteAuditoriumType = async (res, type_id) => {
        try {
            const typeToDelete = await prisma.auditoriumType.findUnique({
                where: { auditorium_type: type_id }
            });
            if (!typeToDelete)
                this.sendCustomError(res, 404, `Не найден тип аудитории = ${type_id}`);
            else
                await prisma.auditoriumType.delete({ where: { auditorium_type: type_id } })
                    .then(() => res.json(typeToDelete));
        }
        catch (err) { this.sendError(res, err); }
    }


    deleteAuditorium = async (res, auditorium_id) => {
        try {
            const auditoriumToDelete = await prisma.auditorium.findUnique({
                where: { auditorium: auditorium_id }
            });
            if (!auditoriumToDelete)
                this.sendCustomError(res, 404, `Не найдена аудитория = ${auditorium_id}`);
            else
                await prisma.auditorium.delete({ where: { auditorium: auditorium_id } })
                    .then(() => res.json(auditoriumToDelete));
        }
        catch (err) { this.sendError(res, err); }
    }

    sendError = async (res, err) => {
        if (err)
            res.status(409).json({
                name: err?.name,
                code: err.code,
                detail: err.original?.detail,
                message: err.message
            });
        else
            this.sendCustomError(res, 409, err);
    }

    sendCustomError = async (res, code, message) => {
        res.status(code).json({ code, message });
    }
}