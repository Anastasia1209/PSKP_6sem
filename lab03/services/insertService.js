import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class InsertService {
    insertFaculty = async (res, dto) => {
        try {
            const { faculty, faculty_name, Pulpit } = dto;
            const facultyExists = await prisma.faculty.findFirst({ where: { faculty } });

            if (facultyExists)
                this.sendCustomError(res, 409, `Факультет уже существует = ${faculty}`);
            else
                res.status(201).json(await prisma.faculty.create({
                    data: {
                        faculty,
                        faculty_name,
                    },
                    include: {
                        Pulpit: true
                    }
                }));
        }
        catch (err) { this.sendError(res, err); }
    }


    insertPulpit = async (res, dto) => {
        try {
            const { pulpit, pulpit_name, faculty, faculty_name } = dto;
            const pulpitExists = await prisma.pulpit.findFirst({ where: { pulpit } });

            if (pulpitExists)
                this.sendCustomError(res, 409, `Кафедра уже существует = ${dto.pulpit}`);
            else
                res.status(201).json(await prisma.pulpit.create({
                    data: {
                        pulpit,
                        pulpit_name,
                        Faculty: {
                            connectOrCreate: {
                                where: { faculty },
                                create: {
                                    faculty,
                                    faculty_name
                                }
                              
                                //  {
                                //     "pulpit": "pul1",
                                //     "pulpit_name": "pul name",
                                //     "faculty": "ЛХФ",
                                //     "faculty_name": "Лесохозяйственный факультет"
                                //  }
                            }
                        }
                    },
                    select: {
                        pulpit: true,
                        pulpit_name: true,
                        Faculty: true
                    }
                }));
        }
        catch (err) { this.sendError(res, err); }
    }


    insertSubject = async (res, dto) => {
        try {
            const { subject, subject_name, pulpit } = dto;
            const subjectExists = await prisma.subject.findFirst({ where: { subject } });
            const pulpitExists = await prisma.pulpit.findFirst({ where: { pulpit } });

            if (subjectExists)
                this.sendCustomError(res, 409, `Дисциплина уже существует = ${subject}`);
            else if (!pulpitExists)
                this.sendCustomError(res, 404, `Не найдена кафедра = ${pulpit}`);
            else
                res.status(201).json(await prisma.subject.create({
                    data: {
                        subject,
                        subject_name,
                        pulpit
                    }
                }));
        }
        catch (err) { console.log(err); this.sendError(res, err); }
    }


    insertTeacher = async (res, dto) => {
        try {
            const { teacher, teacher_name, pulpit } = dto;
            const teacherExists = await prisma.teacher.findFirst({ where: { teacher } });
            const pulpitExists = await prisma.pulpit.findFirst({ where: { pulpit } });

            if (teacherExists)
                this.sendCustomError(res, 409, `Преподаватель уже существует = ${teacher}`);
            else if (!pulpitExists)
                this.sendCustomError(res, 404, `Не найдена кафедра = ${pulpit}`);
            else
                res.status(201).json(await prisma.teacher.create({
                    data: {
                        teacher,
                        teacher_name,
                        pulpit
                    }
                }));
        }
        catch (err) { this.sendError(res, err); }
    }


    insertAuditoriumType = async (res, dto) => {
        try {
            const { auditorium_type, auditorium_typename } = dto;
            const typeExists = await prisma.auditoriumType.findFirst({ where: { auditorium_type } });

            if (typeExists)
                this.sendCustomError(res, 409, `Тип аудитории уже существует = ${auditorium_type}`);
            else
                res.status(201).json(await prisma.auditoriumType.create({
                    data: {
                        auditorium_type,
                        auditorium_typename
                    }
                }));
        }
        catch (err) { this.sendError(res, err); }
    }


    insertAuditorium = async (res, dto) => {
        try {
            const { auditorium, auditorium_name, auditorium_capacity, auditorium_type } = dto;
            const auditoriumExists = await prisma.auditorium.findFirst({ where: { auditorium } });
            const typeExists = await prisma.auditoriumType.findFirst({ where: { auditorium_type } });

            if (auditoriumExists)
                this.sendCustomError(res, 409, `Аудитория уже существует = ${auditorium}`);
            else if (!typeExists)
                this.sendCustomError(res, 404, `Не найден тип аудитории = ${auditorium_type}`);
            else
                res.status(201).json(await prisma.auditorium.create({
                    data: {
                        auditorium,
                        auditorium_name,
                        auditorium_capacity,
                        auditorium_type
                    }
                }));
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