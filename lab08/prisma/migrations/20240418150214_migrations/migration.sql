-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Repos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commits" (
    "id" SERIAL NOT NULL,
    "repoId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Commits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Repos" ADD CONSTRAINT "Repos_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commits" ADD CONSTRAINT "Commits_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
