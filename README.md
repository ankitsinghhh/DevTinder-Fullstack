# DevTinder 🌐

[![Live Demo](https://img.shields.io/badge/Live%20Site-tinderdev.in-blue)](https://tinderdev.in)

Welcome to **DevTinder**, my full-stack web app project designed to connect developers in a vibrant, community-driven platform! Built with **Node.js**, **Express**, **MongoDB** for the backend and **React** for the frontend, DevTinder is live at [tinderdev.in](https://tinderdev.in), hosted on AWS. It’s like Tinder, but for coders — find your next collaborator, mentor, or tech buddy with a click!

## About

DevTinder is a social discovery platform tailored for developers. Users can create profiles, browse others, click "Interested" or "Ignore" to connect, and chat with their matches in real-time using WebSockets. With seamless Razorpay integration for Silver and Gold memberships, DevTinder offers a premium experience for those looking to stand out. This project is my attempt to blend tech and networking with a fun, intuitive UI.

## Tech Stack

| Component   | Tools                            |
|-------------|----------------------------------|
| **Frontend** | React, JavaScript, CSS         |
| **Backend**  | Node.js, Express.js, MongoDB   |
| **Real-Time** | WebSockets                     |
| **Payments** | Razorpay                       |
| **Deployment**| AWS (EC2, S3/CloudFront, Route 53) |

## Features

- **User Profiles**: Showcase your skills, projects, and tech stack.
- **Matching System**: Click "Interested" or "Ignore" to connect with developers.
- **Real-Time Chat**: Chat with your connections using WebSocket-powered messaging.
- **Premium Memberships**: Silver and Gold tiers via Razorpay for enhanced features.
- **Secure Authentication**: JWT-based login with HTTP-only cookies.
- **Responsive Design**: Works seamlessly on mobile and desktop using DaisyUI components.

## Architecture & Flow

```
[ React UI ] ↔ [ Express API ] ↔ [ MongoDB Database ]
  ↑              ↑                ↓
JWT Auth     WebSockets       Data Storage
```

1. Users sign up or log in; backend issues a JWT stored in an HTTP-only cookie.
2. Authenticated API calls fetch profile cards for browsing.
3. Users click "Interested" or "Ignore" to express interest, sent to the backend.
4. Mutual "Interested" clicks create a **match**, enabling WebSocket-based chat.
5. Messages are stored in MongoDB for persistence.
6. Razorpay handles secure payments for Silver/Gold memberships.

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **AWS Account** (for deployment)
- **Razorpay Account** (for payment integration testing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ankitsinghhh/DevTinder-Fullstack.git
   cd DevTinder-Fullstack
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```
   Edit `.env` to set:
   - `PORT`: Backend port (e.g., 5000)
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret for JWT
   - `CLIENT_URL`: Frontend URL (e.g., `http://localhost:3000`)
   - Razorpay API keys (if testing payments)

3. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   ```
   Edit `.env` to set:
   - `REACT_APP_API_URL`: Backend API URL (e.g., `http://localhost:5000/api`)

### Running Locally

1. Start MongoDB (if local):
   ```bash
   mongod
   ```

2. Run the backend:
   ```bash
   cd backend
   npm run dev
   ```

3. Run the frontend (in a separate terminal):
   ```bash
   cd frontend
   npm start
   ```

4. Open [http://localhost:7777](http://localhost:3000) to explore DevTinder!

## Deployment

DevTinder is live at [tinderdev.in](https://tinderdev.in), powered by AWS:
- **Backend**: Hosted on an EC2 instance with Nginx.
- **Frontend**: Served via EC2/Nginx.
- **Domain**: Managed via Cloudflare, registered on GoDaddy.
- **Payments**: Razorpay integration for seamless membership transactions.




## Contact

I’d love to hear your thoughts or ideas for DevTinder! Reach me at:
- **Email**: ankitsingh79834@gmail.com 
- **GitHub**: [ankitsinghhh](https://github.com/ankitsinghhh)
- **Website**: [tinderdev.in](https://tinderdev.in)

Thanks for checking out DevTinder! 
