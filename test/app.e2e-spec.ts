import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import {
  MediasFactory,
  PostFactory,
  PublicationsFactory,
} from './factory/factory';

let app: INestApplication;
let prisma: PrismaService;
beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  prisma = app.get(PrismaService);
  await prisma.publications.deleteMany();
  await prisma.posts.deleteMany();
  await prisma.medias.deleteMany();
  await app.init();
});
describe('AppController (e2e)', () => {
  it('/health (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect("I'm okay!");
  });
});
describe('PostsController (e2e)', () => {
  it('/posts (GET) empty', async () => {
    return await request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect([]);
  });
  it('/posts (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'test', text: 'test' })
      .expect(201);
  });
  it('/posts (GET) 1 post', async () => {
    await PostFactory.create(prisma);
    const response = await request(app.getHttpServer()).get('/posts');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(1);
  });
  it('/posts/:id (GET)', async () => {
    const post = await PostFactory.create(prisma);
    const response = await request(app.getHttpServer()).get(
      `/posts/${post.id}`,
    );
    expect(response.statusCode).toEqual(200);
  });
  it('/posts/:id (DELETE)', async () => {
    const post = await PostFactory.create(prisma);
    const response = await request(app.getHttpServer()).delete(
      `/posts/${post.id}`,
    );
    expect(response.statusCode).toEqual(204);
  });
  it('/posts/:id (PUT)', async () => {
    const post = await PostFactory.create(prisma);
    const response = await request(app.getHttpServer())
      .put(`/posts/${post.id}`)
      .send({ title: 'test', text: 'test' });
    expect(response.statusCode).toEqual(200);
  });
});
describe('MediasController (e2e)', () => {
  it('/medias (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/medias')
      .expect(200)
      .expect([]);
  });
  it('/medias (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/medias')
      .send({ title: 'test', text: 'test' })
      .expect(201);
  });
  it('/medias (GET) 1 media', async () => {
    await MediasFactory.create(prisma);
    const response = await request(app.getHttpServer()).get('/medias');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(1);
  });
  it('/medias/:id (GET)', async () => {
    const media = await MediasFactory.create(prisma);
    const response = await request(app.getHttpServer()).get(
      `/medias/${media.id}`,
    );
    expect(response.statusCode).toEqual(200);
  });
  it('/medias/:id (DELETE)', async () => {
    const media = await MediasFactory.create(prisma);
    const response = await request(app.getHttpServer()).delete(
      `/medias/${media.id}`,
    );
    expect(response.statusCode).toEqual(204);
  });
  it('/medias/:id (PUT)', async () => {
    const media = await MediasFactory.create(prisma);
    const response = await request(app.getHttpServer())
      .put(`/medias/${media.id}`)
      .send({ title: 'test', username: 'test' });
    expect(response.statusCode).toEqual(200);
  });
});
describe('publicationsController (e2e)', () => {
  it('/publications (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/publications')
      .expect(200)
      .expect([]);
  });
  it('/publications (POST)', async () => {
    const post = await PostFactory.create(prisma);
    const media = await MediasFactory.create(prisma);
    return await request(app.getHttpServer())
      .post('/publications')
      .send({ mediaId: media.id, postId: post.id, date: new Date() })
      .expect(201);
  });
  it('/publications (GET) 1 publication', async () => {
    await PublicationsFactory.create(prisma);
    const response = await request(app.getHttpServer()).get('/publications');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(1);
  });
  it('/publications/:id (GET)', async () => {
    const publication = await PublicationsFactory.create(prisma);
    const response = await request(app.getHttpServer()).get(
      `/publications/${publication.id}`,
    );
    expect(response.statusCode).toEqual(200);
  });
  it('/publications/:id (DELETE)', async () => {
    const publication = await PublicationsFactory.create(prisma);
    const response = await request(app.getHttpServer()).delete(
      `/publications/${publication.id}`,
    );
    expect(response.statusCode).toEqual(204);
  });
  it('/publications/:id (PUT)', async () => {
    const publication = await PublicationsFactory.create(prisma);
    console.log(publication);
    const response = await request(app.getHttpServer())
      .put(`/publications/${publication.id}`)
      .send({ date: publication.date });
    expect(response.statusCode).toEqual(200);
  });
});
