# FAQ Management

This project is a FAQ Management API built with Node.js, Express, MongoDB, and Redis. It supports FAQ storage, retrieval, translation, and caching. The API integrates Google Cloud Translation for multi-language support and uses Redis for optimized performance.

## Features
- **CRUD Operations** : Create, Read, and Delete FAQs.
- **Multi-language Support** : Translates FAQs using Google Cloud Translation API.
- **Caching with Redis** : Optimizes performance and reduces database calls.
- **Automated Testing** : Uses Mocha & Chai for API testing.

## Project Setup

- Install Dependencies
```bash
npm install
```

- Setup Environment Variables
```bash
# Create a .env file in the project root and add:
MONGODB_URI=mongodb://admin:password@localhost:27017/
GOOGLE_TRANSLATION_API_KEY=your_api_key
```

- Start Redis & MongoDB using Docker
```bash
docker-compose up -d
```

- Test the Endpoints
```bash
npm test
```

- Run the Server
```bash
npm run dev
```




## API Endpoints

### Get All FAQs
```bash
curl http://localhost:3000/api/faqs/
```

### Get FAQs in a Specific Language
```bash
curl http://localhost:3000/api/faqs?lang=hi
```

### Create a New FAQ
```bash
curl -X POST http://localhost:3000/api/faqs \
     -H "Content-Type: application/json" \
     -d '{
           "question": "What is Node.js?",
           "answer": "Node.js is a JavaScript runtime."
         }'
```

### Delete an FAQ
```bash
curl -X DELETE http://localhost:3000/api/faqs/faqId
```

