# Asian Messaging Hub

A multilingual messaging platform targeting Asian markets with support for WeChat, WhatsApp, and LINE integration.

## Features

- 📱 Multi-channel messaging support (WeChat, WhatsApp, LINE)
- 🌏 Multi-language support (English, Chinese, Japanese, Korean)
- 🔍 Real-time message search and filtering
- 📊 Message statistics dashboard
- 🗑️ Message management (create, view, delete)
- 💾 PostgreSQL database for persistent storage

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- PostgreSQL 15
- Maven
- Hibernate/JPA

### Frontend
- React 18
- Axios
- CSS3

## Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- Docker (for PostgreSQL)
- Git

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/asian-messaging-hub.git
cd asian-messaging-hub
```

### 2. Start PostgreSQL Database
```bash
docker run --name messaging-hub-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=messaging_hub -p 5432:5432 -d postgres:15
```

### 3. Start Backend
```bash
cd backend/messaging-hub/messaging-hub
mvnw spring-boot:run
```
Backend will run on `http://localhost:8080`

### 4. Start Frontend
```bash
cd frontend
npm install
npm start
```
Frontend will run on `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages` | Get all messages |
| POST | `/api/messages` | Create a new message |
| DELETE | `/api/messages/{id}` | Delete a message |

## Project Structure
```
asian-messaging-hub/
├── backend/
│   └── messaging-hub/
│       └── messaging-hub/
│           ├── src/
│           │   ├── main/
│           │   │   ├── java/com/asianhub/messaginghub/
│           │   │   │   ├── controller/
│           │   │   │   ├── model/
│           │   │   │   ├── repository/
│           │   │   │   ├── service/
│           │   │   │   └── MessagingHubApplication.java
│           │   │   └── resources/
│           │   │       └── application.properties
│           │   └── test/
│           └── pom.xml
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── MessageForm.js
    │   │   └── MessageList.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## Future Enhancements

- Real API integration with WeChat, WhatsApp, and LINE
- Message translation feature
- User authentication
- Message scheduling
- Analytics dashboard
- Export messages to CSV/PDF

## License

MIT

## Author

Your Name