import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Joao Jose',
            email: 'joaojose@teste.com',
            avatarUrl: 'https://github.com/rafaeldoria.png'
        }
    });

    const pool = await prisma.pool.create({
        data: {
            title: 'Example first',
            code: '123TES',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    });

    await prisma.game.create({
        data: {
            date: '2022-11-02T18:50:50.201Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    });

    await prisma.game.create({
        data: {
            date: '2022-11-03T18:50:50.201Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 2,
    
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        },
    });
}

main()