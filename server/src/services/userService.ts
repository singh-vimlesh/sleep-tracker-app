import prisma from '../prisma';

export const getUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export const getUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
};

export const createUser = async (name: string, gender: string, email: string) => {
    return prisma.user.create({
        data: {
            name,
            email,
            gender,
        },
    });
};

export const updateUser = async (email: string, updates: { gender?: string; name?: string }) => {
    return prisma.user.update({
        where: { email },
        data: updates,
    });
};

export const getAllUsersWithSubmissionCount = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            gender: true,
            _count: {
                select: { sleepRecords: true },
            },
        },
    });

    return users.map((user: { id: string; name: string; email: string; gender: string; _count: { sleepRecords: number } }) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        submissions: user._count.sleepRecords,
    }));
};
