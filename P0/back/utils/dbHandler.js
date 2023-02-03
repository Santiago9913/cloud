const client = require("@prisma/client").PrismaClient;

const Prisma = new client();

exports.getUserByEmail = async (email) => {
  try {
    await Prisma.$connect();
    const user = await Prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (e) {
    throw e.message;
  } finally {
    await Prisma.$disconnect();
  }
};

exports.getUserById = async (id) => {
  try {
    Prisma.$connect();
    const user = await Prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  } catch (e) {
    throw "Internal error";
  } finally {
    await Prisma.$disconnect();
  }
};

exports.createUser = async (email, userModel) => {
  try {
    const dbUser = await this.getUserByEmail(email);
    await Prisma.$connect();

    if (!dbUser) {
      const user = await Prisma.user.create({
        data: {
          ...userModel,
        },
      });

      return user;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    throw e.message;
  } finally {
    await Prisma.$disconnect();
  }
};

exports.getEvent = async (eventId, ownerId) => {
  try {
    await Prisma.$connect();
    const event = await Prisma.event.findFirst({
      where: {
        id: eventId,
        ownerId: ownerId,
      },
      include: {
        owner: true,
      },
    });

    return event;
  } catch (e) {
    console.log(e.message);
    throw e.message;
  } finally {
    await Prisma.$disconnect();
  }
};

exports.getEvents = async (ownerId) => {
  try {
    await Prisma.$connect();
    const events = await Prisma.event.findMany({
      where: {
        ownerId: ownerId,
      },
    });

    return events;
  } catch (e) {
    throw e.message;
  } finally {
    await Prisma.$disconnect();
  }
};

exports.createEvent = async (eventModel) => {
  try {
    await Prisma.$connect();
    const event = await Prisma.event.create({
      data: {
        ...eventModel,
      },
    });

    return event;
  } catch (e) {
    throw e.message;
  } finally {
    await Prisma.$disconnect();
  }
};

exports.deleteEvent = async (eventId, ownerId) => {
  try {
    await Prisma.$connect();
    const event = await Prisma.event.deleteMany({
      where: {
        id: eventId,
        ownerId: ownerId,
      },
    });

    return event;
  } catch (e) {
    throw e.message;
  } finally {
    await Prisma.$disconnect();
  }
};

exports.updateEvent = async (eventId, ownerId, eventModel) => {
  try {
    await Prisma.$connect();
    const event = await Prisma.event.updateMany({
      where: {
        id: eventId,
        ownerId: ownerId,
      },
      data: {
        ...eventModel,
      },
    });

    return event;
  } catch (e) {
    throw e.message;
  } finally {
    await Prisma.$disconnect();
  }
};
