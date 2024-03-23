import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class SelectService {
    getFaculties = async res => res.json(await prisma.faculty.findMany());

    getPulpits = async res => res.json(await prisma.pulpit.findMany());

    getSubjects = async res => res.json(await prisma.subject.findMany());

    getTeachers = async res => res.json(await prisma.teacher.findMany());

    getAuditoriumTypes = async res => res.json(await prisma.auditoriumType.findMany());

    getAuditoriums = async res => res.json(await prisma.auditorium.findMany());

    getFacultySubjects = async (res, xyz) => {
        try {
            const facultyToFind = await prisma.faculty.findUnique({ where: { faculty: xyz } });
            if (!facultyToFind)
                this.sendCustomError(res, 404, `Не найден факультет = ${xyz}`);
            else {
                res.json(await prisma.faculty.findMany({
                    where: { faculty: xyz },
                    select: {
                        faculty: true,
                        Pulpit: {
                            select: {
                                pulpit: true,
                                Subject: { select: { subject_name: true } }
                            }
                        }
                    }
                }));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    getTypesAuditoriums = async (res, xyz) => {
        try {
            const typeToFind = await prisma.auditoriumType.findUnique({ where: { auditorium_type: xyz } });
            if (!typeToFind)
                this.sendCustomError(res, 404, `Не найден тип аудитории = ${xyz}`);
            else {
                res.json(await prisma.auditoriumType.findMany({
                    where: { auditorium_type: xyz },
                    select: {
                        auditorium_type: true,
                        Auditorium: { select: { auditorium: true } }
                    }
                }));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    getComputerAuditoriums1k = async res => {
        try {
            res.json(await prisma.auditorium.findMany({
                where: {
                    auditorium_type: 'ЛБ-К',
                    auditorium: { endsWith: '-1' }
                },
            }));
        }
        catch (err) { this.sendError(res, err); }
    }


    getPuplitsWithoutTeachers = async res => {
        try {
            const pulpitsWithoutTeachers = await prisma.pulpit.findMany({
                where: {
                    Teacher: { none: {} }
                }
            });
            if (pulpitsWithoutTeachers.length === 0)
                this.sendCustomError(res, 404, 'Нет кафедр без преподавателей');
            else
                res.json(pulpitsWithoutTeachers);
        }
        catch (err) { this.sendError(res, err); }
    }


    getPulpitsWithVladimir = async res => {
        try {
            const pulpitsWithVladimir = await prisma.pulpit.findMany({
                where: {
                    Teacher: {
                        some: {
                            teacher_name: {  contains: 'Владимир' 
                        },
                            
                        }
                    }
                },
                select: {
                    pulpit: true,
                    pulpit_name: true,
                    Teacher: {
                        select: {
                            teacher_name: true
                        }
                    }
                }
            });
            if (pulpitsWithVladimir.length === 0)
                this.sendCustomError(res, 404, 'Нет кафедр с преподавателем по имени "Владимир"');
            else
                res.json(pulpitsWithVladimir);
        }
        catch (err) { this.sendError(res, err); }
    }

    getPulpitsByCount = async (res, code) => {
        try {
            const result = await prisma.pulpit.findMany({
                select: {
                    pulpit: true,
                    pulpit_name: true,
                    faculty: true,
                    _count: {
                        select: { Teacher: true }
                    }
                },
                skip: code * 10,
                take: 10,
            });
            res.json(result);
        } catch (err) { this.sendError(res, err); }
    }

    getAuditoriumsWithSameTypeAndCapacity = async res => {
        try {
            const sameAuditoriums = await prisma.auditorium.groupBy({
                by: ['auditorium_capacity', 'auditorium_type'],
                _count: { auditorium: true },
                having: {
                    auditorium: {
                        _count: { gt: 1 }
                    }
                }
            });
            if (sameAuditoriums.length === 0)
                this.sendCustomError(res, 404, 'Нет аудиторий с таким типом и вместимостью');
            else
                res.json(sameAuditoriums);
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