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



# How to Install Social Postify

Follow these steps to install the **Social Postify** Node.js backend application on your system.

## Prerequisites

- **Node.js**: Ensure that you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

## Installation Steps

1. **Clone the Repository**

   - Go to the [Social Postify GitHub repository]([https://github.com/your-repo-url](https://github.com/andreymudri/social-postify)) and click on the "Clone" button to copy the repository URL.
   - Open your preferred Git client or use the Git command line and run the following command:
   
     ```
     git clone https://github.com/andreymudri/social-postify
     ```
     

2. **Navigate to the Project Directory**

   - Using your terminal or command prompt, change your working directory to the Social Postify project folder:

     ```
     cd social-postify
     ```

3. **Install Dependencies**

   - Install the required dependencies by running the following command:

     ```
     npm install
     ```

   This command will download and install all the necessary packages and libraries specified in the `package.json` file.

4. **Configuration**

   - Depending on your environment, you may need to configure database connections or other environment-specific settings. Check the project's configuration files, such as `.env.example`, and make any necessary changes.

5. **Database Setup**

   - If the application uses a database, you'll need to set it up. Refer to the project's documentation or configuration files to configure your database connection and run any required database migrations or seed data.

6. **Start the Application**

   - Start the Social Postify backend server by running the following command:

     ```
     npm start
     ```

   This will start the server, and it should now be accessible at a specified endpoint (usually `localhost:3000` by default).

7. **Test the API**

   - You can use tools like Postman or simply a web browser to test the API endpoints mentioned in the `README.md`. For example, you can make a GET request to `http://localhost:3000/health` to check the application's status.

That's it! You've successfully installed the Social Postify Node.js backend application. You can now proceed to integrate it with your frontend or use it as needed for your project.

Remember to refer to the project's documentation and configuration files for any additional setup or customization required for your specific use case. If you encounter any issues during installation or usage, don't hesitate to seek assistance from the project's documentation or community support.

