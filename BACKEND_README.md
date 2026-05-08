# BRIMSTONE — Backend API Reference

> Complete guide for building the backend for the Brimstone natural handmade products e-commerce site.

---

## 1. Tech Stack (Frontend — Already Built)

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript (Vite) |
| Routing | React Router v6 |
| State | React Context (`AuthContext`, `CartContext`) |
| HTTP Client | Custom `fetch` wrapper (`src/lib/api.ts`) |
| UI | Tailwind CSS + shadcn/ui (Radix) |
| Dev Server | Vite on **port 8080** |
| Backend Proxy | Vite proxies `/api/*` → `http://localhost:5000` |

---

## 2. Backend Requirements

### Recommended Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Auth:** JWT (Bearer tokens stored in `localStorage`)
- **Password Hashing:** bcrypt
- **Port:** `5000` (Vite proxy is hardcoded to this)

### CORS
The Vite dev server (`http://localhost:8080`) proxies `/api` requests to your backend, so CORS is not an issue in development. In production, configure CORS to allow your deployed frontend origin.

---

## 3. Environment & Proxy Setup

The frontend uses a `VITE_API_BASE_URL` env var. If not set, all requests use relative paths like `/api/...` which Vite proxies.

**`vite.config.ts` proxy config (already set up):**
```ts
proxy: {
  "/api": {
    target: "http://localhost:5000",
    changeOrigin: true,
  }
}
```

So your Express app should mount all routes under `/api`. Example:
```
http://localhost:5000/api/auth/login
http://localhost:5000/api/orders
```

---

## 4. Authentication Flow

### How Auth Works (Frontend)
1. On login/signup, the frontend receives `{ success: true, token: "...", user: {...} }`.
2. The `token` is stored in `localStorage` as `"token"`.
3. Every subsequent API call sends `Authorization: Bearer <token>` automatically.
4. On app load, `AuthContext` calls `GET /api/auth/profile` to refresh user data.
5. On sign-out, `localStorage` keys `token` and `user` are cleared.

### Token Storage
```
localStorage["token"] = "<JWT string>"
localStorage["user"]  = JSON.stringify({ id, name, email, mobileno, dob, gender, role })
```

---

## 5. All API Endpoints

### 5.1 Auth Routes — `/api/auth`

---

#### `POST /api/auth/signup`

Register a new user.

**Request Body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "secret123",
  "mobileno": "9876543210",
  "dob": "1995-08-15",
  "gender": "Female"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | Yes | Full name |
| `email` | string | Yes | Must be unique |
| `password` | string | Yes | Min 6 chars, store hashed (bcrypt) |
| `mobileno` | string | Yes | Exactly 10 digits |
| `dob` | string | Yes | ISO date YYYY-MM-DD |
| `gender` | string | Yes | One of "Male", "Female", "Other" |

**Success Response 200:**
```json
{
  "success": true,
  "message": "Account created successfully!",
  "token": "<JWT>",
  "user": {
    "id": "abc123",
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "mobileno": "9876543210",
    "dob": "1995-08-15",
    "gender": "Female",
    "role": "user"
  }
}
```

**Error Response 400 (email taken):**
```json
{ "success": false, "message": "Email already registered." }
```

---

#### `POST /api/auth/login`

Login with email + password.

**Request Body:**
```json
{
  "email": "priya@example.com",
  "password": "secret123"
}
```

**Success Response 200:**
```json
{
  "success": true,
  "message": "Login successful!",
  "token": "<JWT>",
  "user": {
    "id": "abc123",
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "mobileno": "9876543210",
    "dob": "1995-08-15",
    "gender": "Female",
    "role": "user"
  }
}
```

**Error Response 401:**
```json
{ "success": false, "message": "Invalid email or password." }
```

---

#### `GET /api/auth/profile`

Get the currently logged-in user's profile.

**Headers:** `Authorization: Bearer <token>`

**Success Response 200:**
```json
{
  "success": true,
  "user": {
    "id": "abc123",
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "mobileno": "9876543210",
    "dob": "1995-08-15",
    "gender": "Female",
    "role": "user"
  }
}
```

> Note: The frontend supports both `res.data.user` and `res.data` directly (it does `res.data?.user ?? res.data`), so either shape works.

**Error Response 401:**
```json
{ "success": false, "message": "Unauthorized." }
```

---

### 5.2 Order Routes — `/api/orders`

All order routes require `Authorization: Bearer <token>`.

---

#### `POST /api/orders`

Place a new order. Called from the Checkout page.

**Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`

**Request Body:**
```json
{
  "items": [
    { "id": "cold-process-soaps-cocolumiya", "name": "Cocolumiya", "price": 130, "qty": 2 },
    { "id": "oils-grannys-champi-oil", "name": "Granny's Champi Oil", "price": 150, "qty": 1 }
  ],
  "customer": {
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "mobileno": "9876543210"
  },
  "shippingAddress": {
    "fullName": "Priya Sharma",
    "mobile": "9876543210",
    "addressLine1": "House 12, Green Park",
    "addressLine2": "Near Metro Station",
    "city": "New Delhi",
    "state": "Delhi",
    "pin": "110016",
    "notes": "Call before delivery"
  },
  "pricing": {
    "subtotal": 410,
    "gst": 74,
    "delivery": 50,
    "total": 534
  }
}
```

**Full Field Reference:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `items` | array | Yes | Array of cart items |
| `items[].id` | string | Yes | Product ID slug |
| `items[].name` | string | Yes | Product name |
| `items[].price` | number | Yes | Unit price in INR (integer) |
| `items[].qty` | number | Yes | Quantity |
| `customer` | object | Yes | Logged-in user snapshot |
| `customer.name` | string | No | |
| `customer.email` | string | No | |
| `customer.mobileno` | string | No | |
| `shippingAddress.fullName` | string | Yes | |
| `shippingAddress.mobile` | string | Yes | 10 digits |
| `shippingAddress.addressLine1` | string | Yes | |
| `shippingAddress.addressLine2` | string | No | Optional |
| `shippingAddress.city` | string | Yes | |
| `shippingAddress.state` | string | Yes | |
| `shippingAddress.pin` | string | Yes | 6 digits |
| `shippingAddress.notes` | string | No | Optional delivery instructions |
| `pricing.subtotal` | number | Yes | Cart total before tax |
| `pricing.gst` | number | Yes | 18% GST amount |
| `pricing.delivery` | number | Yes | Fixed Rs.50 delivery charge |
| `pricing.total` | number | Yes | Final total |

**Pricing Logic (computed by frontend — you can re-validate):**
```
subtotal = sum(item.price * item.qty)
gst      = round(subtotal * 0.18)
delivery = 50  (fixed, only if cart non-empty)
total    = subtotal + gst + delivery
```

**Success Response 201:**
```json
{
  "success": true,
  "message": "Order placed successfully!",
  "order": {
    "id": "ord_abc123",
    "status": "pending",
    "createdAt": "2026-05-09T00:00:00.000Z"
  }
}
```

**Error Response 400:**
```json
{ "success": false, "message": "Cart is empty." }
```

---

#### `GET /api/orders/user/my-orders`

Get all orders for the currently logged-in user.

**Headers:** `Authorization: Bearer <token>`

**Success Response 200:**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "664abc123def456",
      "status": "confirmed",
      "createdAt": "2026-05-09T00:00:00.000Z",
      "pricing": { "total": 534 },
      "items": [
        { "name": "Cocolumiya", "qty": 2, "price": 130 }
      ]
    }
  ]
}
```

> Note: The frontend accepts both `{ orders: [...] }` and a bare `[...]` array.

---

#### `GET /api/orders/admin/all-orders`

Get ALL orders across all users. Admin only.

**Headers:** `Authorization: Bearer <token>` (user must have `role: "admin"`)

**Success Response 200:**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "664abc123def456",
      "status": "pending",
      "createdAt": "2026-05-09T00:00:00.000Z",
      "customer": {
        "name": "Priya Sharma",
        "mobileno": "9876543210"
      },
      "shippingAddress": {
        "fullName": "Priya Sharma",
        "mobile": "9876543210",
        "addressLine1": "House 12, Green Park",
        "city": "New Delhi",
        "state": "Delhi",
        "pin": "110016"
      },
      "items": [
        { "name": "Cocolumiya", "qty": 2, "price": 130 }
      ],
      "pricing": { "subtotal": 410, "gst": 74, "delivery": 50, "total": 534 }
    }
  ]
}
```

---

#### `PUT /api/orders/:orderId/status`

Update the status of a specific order. Admin only.

**Headers:** `Authorization: Bearer <token>`

**URL Param:** `:orderId` — the MongoDB `_id` string

**Request Body:**
```json
{ "status": "confirmed" }
```

**Allowed status values:**

| Value | Meaning |
|---|---|
| `"pending"` | Default after order placed |
| `"confirmed"` | Admin confirms the order |
| `"shipped"` | Order dispatched |
| `"delivered"` | Order delivered (hidden from admin view) |

**Success Response 200:**
```json
{ "success": true, "message": "Order marked as confirmed" }
```

**Error Response 404:**
```json
{ "success": false, "message": "Order not found." }
```

---

## 6. Data Models (MongoDB / Mongoose)

### User Model
```js
const UserSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },       // bcrypt hashed
  mobileno: { type: String, required: true },       // 10 digit string
  dob:      { type: String },                       // "YYYY-MM-DD"
  gender:   { type: String, enum: ["Male", "Female", "Other"] },
  role:     { type: String, enum: ["user", "admin"], default: "user" },
  createdAt:{ type: Date, default: Date.now }
});
```

### Order Model
```js
const OrderSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status:   { type: String, enum: ["pending","confirmed","shipped","delivered"], default: "pending" },
  items: [{
    id:    { type: String },   // product slug
    name:  { type: String },
    price: { type: Number },   // unit price in INR
    qty:   { type: Number },
  }],
  customer: {
    name:     String,
    email:    String,
    mobileno: String,
  },
  shippingAddress: {
    fullName:    String,
    mobile:      String,
    addressLine1: String,
    addressLine2: String,
    city:        String,
    state:       String,
    pin:         String,
    notes:       String,
  },
  pricing: {
    subtotal: Number,
    gst:      Number,
    delivery: Number,
    total:    Number,
  },
  createdAt: { type: Date, default: Date.now }
});
```

---

## 7. JWT Configuration

- **Algorithm:** HS256 (standard)
- **Payload:** `{ userId: user._id, role: user.role }`
- **Secret:** Use a strong random string in `.env` as `JWT_SECRET`
- **Expiry:** Recommended `7d` or `30d`

**Auth Middleware:**
```js
function protect(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

function adminOnly(req, res, next) {
  if (req.user?.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });
  next();
}
```

---

## 8. Route Summary Table

| Method | Endpoint | Auth | Role | Called From |
|---|---|---|---|---|
| POST | `/api/auth/signup` | No | — | AuthDialog (Sign Up form) |
| POST | `/api/auth/login` | No | — | AuthDialog (Sign In form) |
| GET | `/api/auth/profile` | Yes | any | AuthContext on app load |
| POST | `/api/orders` | Yes | user | Checkout page |
| GET | `/api/orders/user/my-orders` | Yes | user | Account page |
| GET | `/api/orders/admin/all-orders` | Yes | admin | Admin page |
| PUT | `/api/orders/:orderId/status` | Yes | admin | Admin page (status buttons) |

---

## 9. Frontend Pages & What They Do

| Page | Route | Auth Required | Purpose |
|---|---|---|---|
| Index | `/` | No | Home page (Hero, Products, Benefits, About, CEO, Donation, Contact) |
| Shop | `/shop` | No | Product catalog — 16 products, filter by category |
| Cart | `/cart` | Yes | View and manage cart items |
| Checkout | `/checkout` | Yes | Enter delivery details, place order |
| Account | `/account` | Yes | View profile, order history |
| Admin | `/admin` | Yes (admin) | Manage all orders, update statuses |
| NotFound | `*` | No | 404 fallback |

---

## 10. Full Data Flow

```
1. SIGNUP
   User fills Signup form
   → POST /api/auth/signup { name, email, password, mobileno, dob, gender }
   ← { success, token, user }
   → token saved to localStorage["token"]
   → user saved to localStorage["user"]

2. SESSION RESTORE
   User revisits the site
   → GET /api/auth/profile  (auto on app load, reads token from localStorage)
   ← { user: { id, name, email, role, ... } }
   → AuthContext populated

3. SHOPPING (no API calls)
   Cart items stored in localStorage["cart"] as JSON array
   Items: [{ id, name, price (number), qty, image?, category? }]

4. CHECKOUT
   User visits /checkout, fills address, clicks "Place Order"
   → POST /api/orders { items, customer, shippingAddress, pricing }
   ← { success: true, order: { id, status } }
   → Cart cleared (localStorage["cart"] = [])
   → Navigate to /account

5. ORDER HISTORY
   User visits /account
   → GET /api/orders/user/my-orders
   ← { orders: [{ _id, status, pricing.total, items, createdAt }] }

6. ADMIN MANAGEMENT
   Admin visits /admin
   → GET /api/orders/admin/all-orders
   ← { orders: [...all non-delivered...] }

   Admin clicks Confirm / Shipped / Delivered
   → PUT /api/orders/:id/status { status: "confirmed" | "shipped" | "delivered" }
   ← { success: true, message: "..." }
```

---

## 11. Error Response Format

Recommended error shape (the frontend reads all of these):

```json
{
  "success": false,
  "message": "Human-readable error description"
}
```

Frontend reads: `res.data?.message || res.data?.error || res.data?.msg || "Fallback"`

---

## 12. Admin Account Setup

To create an admin, manually update the user in MongoDB:

```js
db.users.updateOne(
  { email: "admin@brimstone.com" },
  { $set: { role: "admin" } }
)
```

Or seed it in your seed script. The frontend `ProtectedRoute` checks `role === "admin"` before rendering `/admin`.

---

## 13. Recommended Project Structure (Express)

```
brimstone-backend/
├── src/
│   ├── models/
│   │   ├── User.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js          →  /api/auth
│   │   └── orders.js        →  /api/orders
│   ├── middleware/
│   │   └── auth.js          →  protect(), adminOnly()
│   └── controllers/
│       ├── authController.js
│       └── orderController.js
├── .env
└── server.js
```

**`server.js`:**
```js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/auth",   require("./src/routes/auth"));
app.use("/api/orders", require("./src/routes/orders"));

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT || 5000, () =>
    console.log("Backend running on http://localhost:5000")
  );
});
```

**`.env`:**
```
MONGO_URI=mongodb://localhost:27017/brimstone
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

---

## 14. Product Catalog Reference (No Backend Needed)

Products are hardcoded in the frontend (`src/pages/Shop.tsx`). No product API is needed.

| Name | Category | Price Range |
|---|---|---|
| Cocolumiya | Cold Process Soaps | Rs.130 – Rs.250 |
| Bean & Blam | Cold Process Soaps | Rs.130 – Rs.250 |
| Ashbar | Cold Process Soaps | Rs.130 – Rs.250 |
| Ritual Roots | Cold Process Soaps | Rs.130 – Rs.250 |
| Herbal Heal | Cold Process Soaps | Rs.130 – Rs.250 |
| Tan Off | Cold Process Soaps | Rs.130 – Rs.250 |
| Scrubbing Bar | Melt & Pour Soaps | Rs.80 – Rs.150 |
| Detox Skin Bar | Melt & Pour Soaps | Rs.80 – Rs.150 |
| Ubtan Bar | Melt & Pour Soaps | Rs.80 – Rs.150 |
| Brightening Bar | Melt & Pour Soaps | Rs.80 – Rs.150 |
| Skin Lightening Bar | Melt & Pour Soaps | Rs.80 – Rs.150 |
| Anti Acne Bar | Melt & Pour Soaps | Rs.80 – Rs.150 |
| Tan Removal Bar | Melt & Pour Soaps | Rs.80 – Rs.150 |
| Extra Virgin Coconut Oil | Oils | Rs.80 – Rs.350 |
| Granny's Champi Oil | Oils | Rs.150 – Rs.450 |
| Vedanil Oil | Oils | Rs.180 – Rs.320 |

---

## 15. Pricing Constants

```
DELIVERY_CHARGE = Rs.50          (fixed per order)
GST_RATE        = 18%            (on subtotal)
gst             = Math.round(subtotal * 0.18)
total           = subtotal + gst + delivery
```

---

## 16. Deployment Notes

### Frontend (Production Build)
```bash
npm run build   # Outputs to /dist
```

Set env var before build:
```
VITE_API_BASE_URL=https://your-api-domain.com
```

### Backend
- Deploy on Render / Railway / DigitalOcean / EC2
- Set `MONGO_URI` to MongoDB Atlas connection string
- Set `JWT_SECRET` to a strong random string
- Enable CORS for your frontend domain

---

## 17. Quick Start Checklist

- [ ] Create Express app, listen on port 5000
- [ ] Connect to MongoDB
- [ ] Create `User` model with bcrypt password hashing
- [ ] Create `Order` model
- [ ] `POST /api/auth/signup` — hash password, create user, return JWT + user
- [ ] `POST /api/auth/login` — verify credentials, return JWT + user
- [ ] `GET /api/auth/profile` — protected, return logged-in user
- [ ] `POST /api/orders` — protected, create order linked to userId from JWT
- [ ] `GET /api/orders/user/my-orders` — protected, return current user's orders
- [ ] `GET /api/orders/admin/all-orders` — admin only, return all orders
- [ ] `PUT /api/orders/:id/status` — admin only, update order status
- [ ] Test all endpoints with Postman / Thunder Client
- [ ] Start backend → `npm run dev` (frontend) → Full flow works
