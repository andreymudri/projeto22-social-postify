import { faker } from '@faker-js/faker';
import { PrismaService } from '../../src/prisma/prisma.service';

export class PostFactory {
  static async create(prisma: PrismaService) {
    const post = await prisma.posts.create({
      data: {
        title: faker.lorem.sentence(),
        text: faker.lorem.paragraph(),
      },
    });
    return post;
  }
}

export class MediasFactory {
  static async create(prisma: PrismaService) {
    const media = await prisma.medias.create({
      data: {
        title: faker.company.name(),
        username: faker.person.firstName(),
      },
    });
    return media;
  }
}

export class PublicationsFactory {
  static async create(prisma: PrismaService) {
    const media = await MediasFactory.create(prisma);
    const post = await PostFactory.create(prisma);
    const date = new Date(2025, 1, 1);

    const Publication = await prisma.publications.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: date,
      },
    });
    return Publication;
  }
}
