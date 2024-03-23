import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class OtherService {
    transaction = async res => {
        try {
            await prisma.$transaction(async prisma => {
                await prisma.auditorium.updateMany({
                    data: {
                        auditorium_capacity: {
                            increment: 100
                        }
                    }
                });
                throw new Error('Rollback транзакции');
            });
        } catch (err) {
            console.log(`${err}`);
            this.sendCustomError(res, 200, `Транзакция откатилась`);
            return;
        }
    };

    getPulpitsByFacultyFluent = async (res, faculty_id) => {
        const pulpits = await prisma.faculty.findUnique({
            where: { faculty: faculty_id }
        })
            .Pulpit();
        if (pulpits)
            res.json(pulpits)
        else
            this.sendCustomError(res, 404, `Не найден факультет = ${faculty_id}`);
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