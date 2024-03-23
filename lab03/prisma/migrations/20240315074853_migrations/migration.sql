-- CreateTable
CREATE TABLE "faculty" (
    "faculty" CHAR(10) NOT NULL,
    "faculty_name" VARCHAR(50),

    CONSTRAINT "faculty_pkey" PRIMARY KEY ("faculty")
);

-- CreateTable
CREATE TABLE "pulpit" (
    "pulpit" CHAR(10) NOT NULL,
    "pulpit_name" VARCHAR(100),
    "faculty" CHAR(10) NOT NULL,

    CONSTRAINT "pulpit_pkey" PRIMARY KEY ("pulpit")
);

-- CreateTable
CREATE TABLE "subject" (
    "subject" CHAR(10) NOT NULL,
    "subject_name" VARCHAR(50) NOT NULL,
    "pulpit" CHAR(10) NOT NULL,

    CONSTRAINT "subject_pkey" PRIMARY KEY ("subject")
);

-- CreateTable
CREATE TABLE "teacher" (
    "teacher" CHAR(10) NOT NULL,
    "teacher_name" VARCHAR(50),
    "pulpit" CHAR(10) NOT NULL,

    CONSTRAINT "teacher_pkey" PRIMARY KEY ("teacher")
);

-- CreateTable
CREATE TABLE "auditorium_type" (
    "auditorium_type" CHAR(10) NOT NULL,
    "auditorium_typename" VARCHAR(30) NOT NULL,

    CONSTRAINT "auditorium_type_pkey" PRIMARY KEY ("auditorium_type")
);

-- CreateTable
CREATE TABLE "auditorium" (
    "auditorium" CHAR(10) NOT NULL,
    "auditorium_name" VARCHAR(200),
    "auditorium_capacity" INTEGER,
    "auditorium_type" CHAR(10) NOT NULL,

    CONSTRAINT "auditorium_pkey" PRIMARY KEY ("auditorium")
);

-- AddForeignKey
ALTER TABLE "pulpit" ADD CONSTRAINT "pulpit_faculty_fkey" FOREIGN KEY ("faculty") REFERENCES "faculty"("faculty") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_pulpit_fkey" FOREIGN KEY ("pulpit") REFERENCES "pulpit"("pulpit") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_pulpit_fkey" FOREIGN KEY ("pulpit") REFERENCES "pulpit"("pulpit") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditorium" ADD CONSTRAINT "auditorium_auditorium_type_fkey" FOREIGN KEY ("auditorium_type") REFERENCES "auditorium_type"("auditorium_type") ON DELETE CASCADE ON UPDATE CASCADE;
