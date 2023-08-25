import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

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
  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect("I'm okay!");
  });
});
describe('PostsController (e2e)', () => {
  it('/posts (GET)', () => {
    return request(app.getHttpServer()).get('/posts').expect(200).expect([]);
  });
  it('/posts (POST)', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'test', text: 'test' })
      .expect(201);
  });
});
describe('MediasController (e2e)', () => {
  it('/medias (GET)', () => {
    return request(app.getHttpServer()).get('/medias').expect(200).expect([]);
  });
  it('/medias (POST)', () => {
    return request(app.getHttpServer())
      .post('/medias')
      .send({ title: 'test', username: 'test' })
      .expect(201);
  });
});
describe('publicationsController (e2e)', () => {});
