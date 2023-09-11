# Social Postify

## Elevator Pitch

In today's digital world, businesses must maintain an active and engaging presence on social media. **Social Postify** is your all-in-one solution for scheduling, managing, and monitoring social media posts across various platforms. With an intuitive web application built on **NestJS**, **Social Postify** empowers users to create and schedule custom posts for Facebook, Instagram, Twitter, and LinkedIn, streamlining their social media marketing efforts.

## Key Features

- **Multi-Platform Posting:** Create and schedule posts across different social media networks, including Facebook, Instagram, Twitter, and LinkedIn, all from one centralized platform.

- **Customized Posts:** Craft personalized posts with images, titles, and text to captivate your audience.

- **Scheduling:** Set specific dates and times for each post, ensuring optimal engagement with your target audience.

- **Clear Overview:** Get a comprehensive view of all your scheduled posts for effective planning and management.

## API Endpoints

### Health

- **GET** `/health`: Check the application's status. Returns "I'm okay!" with the status code `200 OK`.

### Medias

- **POST** `/medias`: Create a new media entry with parameters `title` and `username`. Returns `400 Bad Request` for missing fields or `409 Conflict` for duplicate entries.

- **GET** `/medias`: Retrieve all registered media entries in the system.

- **GET** `/medias/:id`: Retrieve a specific media entry by ID.

- **PUT** `/medias/:id`: Update a media entry by ID. Returns `404 Not Found` for non-existent entries or `409 Conflict` for duplicate entries.

- **DELETE** `/medias/:id`: Delete a media entry by ID. Returns `404 Not Found` for non-existent entries or `403 Forbidden` if the media is associated with a publication.

### Posts

- **POST** `/posts`: Create a new post with parameters `title`, `text`, and an optional `image`. Returns `400 Bad Request` for missing fields.

- **GET** `/posts`: Retrieve all registered posts in the system.

- **GET** `/posts/:id`: Retrieve a specific post by ID.

- **PUT** `/posts/:id`: Update a post by ID. Returns `404 Not Found` for non-existent entries.

- **DELETE** `/posts/:id`: Delete a post by ID. Returns `404 Not Found` if the post doesn't exist or `403 Forbidden` if the post is associated with a publication.

## Conclusion

**Social Postify** is your go-to tool for efficient social media management. Whether you're a business, influencer, or content creator, our platform simplifies the process of creating, scheduling, and monitoring posts on multiple social media platforms. Start optimizing your social media strategy today with **Social Postify**!
