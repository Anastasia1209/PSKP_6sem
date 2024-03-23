import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class UpdateService {
    updateFaculty = async (res, dto) => {
        try {
            const { faculty, faculty_name } = dto;
            const facultyToUpdate = await prisma.faculty.findUnique({ where: { faculty } });
            if (!facultyToUpdate)
                this.sendCustomError(res, 404, `Не найден факультет = ${faculty}`);
            else {
                await prisma.faculty.update({
                    where: { faculty },
                    data: { faculty_name }
                }).then(async () => res.json(await prisma.faculty.findUnique({ where: { faculty } })));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    updatePulpit = async (res, dto) => {
        try {
            const { pulpit, pulpit_name, faculty } = dto;
            const pulpitToUpdate = await prisma.pulpit.findUnique({ where: { pulpit } });
            const facultyToUpdate = await prisma.faculty.findUnique({ where: { faculty } });

            if (!pulpitToUpdate)
                this.sendCustomError(res, 404, `Не найдена кафедра = ${pulpit}`);
            else if (!facultyToUpdate)
                this.sendCustomError(res, 404, `Не найден факультет = ${faculty}`);
            else {
                await prisma.pulpit.update({
                    where: { pulpit },
                    data: {
                        pulpit_name,
                        faculty
                    }
                }).then(async () => res.json(await prisma.pulpit.findUnique({ where: { pulpit } })));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    updateSubject = async (res, dto) => {
        try {
            const { subject, subject_name, pulpit } = dto;
            const subjectToUpdate = await prisma.subject.findUnique({ where: { subject } });
            const pulpitToUpdate = await prisma.pulpit.findUnique({ where: { pulpit } });

            if (!subjectToUpdate)
                this.sendCustomError(res, 404, `Не найдена дисциплина = ${subject}`);
            else if (!pulpitToUpdate)
                this.sendCustomError(res, 404, `Не найдена кафедра = ${pulpit}`);
            else {
                await prisma.subject.update({
                    where: { subject },
                    data: {
                        subject_name,
                        pulpit
                    }
                }).then(async () => res.json(await prisma.subject.findUnique({ where: { subject } })));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    updateTeacher = async (res, dto) => {
        try {
            const { teacher, teacher_name, pulpit } = dto;
            const teacherToUpdate = await prisma.teacher.findUnique({ where: { teacher } });
            const pulpitToUpdate = await prisma.pulpit.findUnique({ where: { pulpit } });

            if (!teacherToUpdate)
                this.sendCustomError(res, 404, `Не найден преподаватель = ${teacher}`);
            else if (!pulpitToUpdate)
                this.sendCustomError(res, 404, `Не найдена кафедра = ${pulpit}`);
            else {
                await prisma.teacher.update({
                    where: { teacher },
                    data: {
                        teacher_name,
                        pulpit
                    }
                }).then(async () => res.json(await prisma.teacher.findUnique({ where: { teacher } })));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    updateAuditoriumType = async (res, dto) => {
        try {
            const { auditorium_type, auditorium_typename } = dto;
            const typeToUpdate = await prisma.auditoriumType.findUnique({ where: { auditorium_type } });
            if (!typeToUpdate)
                this.sendCustomError(res, 404, `Не найден тип аудитории = ${auditorium_type}`);
            else {
                await prisma.auditoriumType.update({
                    where: { auditorium_type },
                    data: { auditorium_typename }
                }).then(async () => res.json(await prisma.auditoriumType.findUnique({ where: { auditorium_type } })));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    updateAuditorium = async (res, dto) => {
        try {
            const { auditorium, auditorium_name, auditorium_capacity, auditorium_type } = dto;
            const auditoriumToUpdate = await prisma.auditorium.findUnique({ where: { auditorium } });
            const typeToUpdate = await prisma.auditoriumType.findUnique({ where: { auditorium_type } });

            if (!auditoriumToUpdate)
                this.sendCustomError(res, 404, `Не найдена аудитория = ${auditorium}`);
            else if (!typeToUpdate)
                this.sendCustomError(res, 404, `Не найден тип аудитории = ${auditorium_type}`);
            else {
                await prisma.auditorium.update({
                    where: { auditorium },
                    data: {
                        auditorium_name,
                        auditorium_capacity,
                        auditorium_type
                    }
                }).then(async () => res.json(await prisma.auditorium.findUnique({ where: { auditorium } })));
            }
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