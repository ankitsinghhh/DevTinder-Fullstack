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

| Method | Endpoint           | Purpose                         |
|--------|--------------------|---------------------------------|
| GET    | `/profile/view`    | View logged-in user's profile   |
| PATCH  | `/profile/edit`    | Edit logged-in user's profile   |
| PATCH  | `/profile/password`| Change/reset user password      |

---

### 🤝 Connection Request APIs

| Method | Endpoint                                     | Purpose                                     |
|--------|----------------------------------------------|---------------------------------------------|
| POST   | `/request/send/interested/:userId`           | Send an interest request (right swipe)      |
| POST   | `/request/send/ignore/:userId`               | Ignore a profile (left swipe)               |
| POST   | `/request/review/accepted/:requestId`        | Accept a received request                   |
| POST   | `/request/review/rejected/:requestId`        | Reject a received request                   |

---

### 🔄 Connections & Requests APIs

| Method | Endpoint               | Purpose                            |
|--------|------------------------|------------------------------------|
| GET    | `/connections`         | Fetch all accepted connections     |
| GET    | `/requests/received`   | View all incoming requests         |

---

### 🧭 Feed API

| Method | Endpoint   | Purpose                                                  |
|--------|------------|----------------------------------------------------------|
| GET    | `/feed`    | Fetch a list of other users (a defined number at once)  |

> This endpoint returns **multiple user profiles at once**, not one by one like Tinder.
