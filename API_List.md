# 🚀 DevTinder API Endpoints Overview

To build the core functionality of the **DevTinder Project**, we need to implement several **API endpoints** that cover:

- **Authentication**
- **Profile Management**
- **Connection Requests**
- **User Feed**
- **Connection Handling**

---

### 🔐 Authentication APIs

| Method | Endpoint     | Purpose                    |
|--------|--------------|----------------------------|
| POST   | `/signup`    | Register a new user        |
| POST   | `/login`     | Log in an existing user    |
| POST   | `/logout`    | Log out the current user   |

---

### 👤 Profile APIs

| Method | Endpoint            | Purpose                          |
|--------|---------------------|----------------------------------|
| GET    | `/profile/view`     | View logged-in user's profile    |
| PATCH  | `/profile/edit`     | Edit logged-in user's profile    |
| PATCH  | `/profile/password` | Change/reset user password       |

---

### 🤝 Connection Request APIs

| Method | Endpoint                                | Purpose                                             |
|--------|------------------------------------------|-----------------------------------------------------|
| POST   | `/request/send/:status/:toUserId`        | Send a request based on `status` (interested/ignore) |
| POST   | `/request/review/accepted/:requestId`    | Accept a received request                           |
| POST   | `/request/review/rejected/:requestId`    | Reject a received request                           |

> ✅ Instead of separate `/interested/:userId` and `/ignore/:userId` endpoints,  
we now use a **single unified route**:  
`/request/send/:status/:toUserId`  
Where `:status` can be `"interested"` or `"ignore"`.

---

### 🔄 Connections & Requests APIs

| Method | Endpoint               | Purpose                            |
|--------|------------------------|------------------------------------|
| GET    | `/user/connections`    | Fetch all accepted connections     |
| GET    | `/user/requests/received` | View all incoming requests       |

---

### 🧭 Feed API

| Method | Endpoint       | Purpose                                                  |
|--------|----------------|----------------------------------------------------------|
| GET    | `/user/feed`   | Fetch a list of other users (a defined number at once)  |

> 📌 This endpoint returns **multiple user profiles at once**, not one-by-one like a swipe app.

---
