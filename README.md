# 🚀 Deskova CRM

<div align="center">

![React](https://img.shields.io/badge/React-Frontend-blue?logo=react)
![Django](https://img.shields.io/badge/Django-Backend-green?logo=django)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38BDF8?logo=tailwindcss)

Modern CRM system built with React.js and Django REST Framework

</div>

---

# 🇬🇧 English Version

## 📌 About Project

Deskova CRM is a modern Customer Relationship Management system developed using React.js, Django REST Framework and PostgreSQL.

The system allows administrators and managers to create, manage and monitor leads through a modern web interface with authentication, activity logging and role-based access control.

---

# ✨ Features

- 🔐 JWT Authentication
- 👤 Role-Based Access (Admin / Manager)
- 🎟️ Invite Code Registration System
- 📋 Lead Management
- 📊 Statistics Dashboard
- 📑 Activity Logs
- 🔎 Search, Filters and Sorting
- 📄 Pagination
- 🧩 Kanban Board
- 🌙 Dark / Light Theme
- ⚡ REST API Architecture

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- React Router
- React Query
- Axios

## Backend
- Django
- Django REST Framework
- JWT Authentication

## Database
- PostgreSQL

---

# 📦 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/qwazysexx/Deskova-CRM.git
```

---

## 2️⃣ Navigate to Project Folder

```bash
cd Deskova-CRM
```

---

# ⚛️ Frontend Setup

## Install Dependencies

```bash
cd frontend
```

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend will start on:

```text
http://localhost:5173
```

---

# 🐍 Backend Setup

## Navigate to Backend Folder

```bash
cd backend
```

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Apply Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Run Backend Server

```bash
python manage.py runserver
```

Backend server:

```text
http://127.0.0.1:8000
```

---

# 👑 Admin Account Setup

After cloning the project and applying migrations, create an administrator account:

```bash
python manage.py createsuperuser
```

Enter:
- username
- email
- password

After successful creation, open:

```text
http://127.0.0.1:8000/admin
```
The created superuser account can be used for:
- Django Admin Panel
- CRM frontend login
- activity logs access
- full lead management
- invite code generation

---

# 🎟️ Invite Code System

To create a new invite code:

1. Open Django Admin Panel
2. Go to:

```text
Invite codes
```

3. Click:

```text
Add Invite Code
```

4. Leave the `Code` field empty
5. Click `Save`

The system will automatically generate a new invite code.

Managers can use this code during registration on the frontend.

---

# 🔑 Authentication System

The project uses JWT authentication and invite-code based registration.

Only users with valid invite codes can register accounts.

Invite codes are generated automatically through Django Admin Panel.

---

# 👥 User Roles

## Admin
- View all leads
- Access activity logs
- Generate invite codes
- Manage all leads

## Manager
- Create leads
- Update own leads
- Manage lead statuses

---

# 📊 CRM Functionalities

- Create Lead
- Update Lead
- Delete Lead
- Search Leads
- Filter Leads
- Sort Leads
- Kanban Pipeline
- Activity Tracking
- Statistics Dashboard

---

# 📁 Project Structure

```text
frontend/
backend/
```

---

# 🌐 Repository

https://github.com/qwazysexx/Deskova-CRM

---

---

# 🇺🇦 Українська версія

## 📌 Про проєкт

Deskova CRM — це сучасна CRM-система для управління клієнтами та лідами, створена за допомогою React.js, Django REST Framework та PostgreSQL.

Система дозволяє адміністраторам та менеджерам створювати, редагувати та відстежувати ліди через сучасний веб-інтерфейс із системою авторизації, журналом активності та розмежуванням ролей.

---

# ✨ Основний функціонал

- 🔐 JWT авторизація
- 👤 Ролі користувачів (Admin / Manager)
- 🎟️ Система Invite Code
- 📋 Управління лідами
- 📊 Панель статистики
- 📑 Журнал активності
- 🔎 Пошук, фільтрація та сортування
- 📄 Пагінація
- 🧩 Kanban Board
- 🌙 Світла / темна тема
- ⚡ REST API архітектура

---

# 🛠️ Технології

## Frontend
- React.js
- Tailwind CSS
- React Router
- React Query
- Axios

## Backend
- Django
- Django REST Framework
- JWT Authentication

## База даних
- PostgreSQL

---

# 📦 Встановлення та запуск

## 1️⃣ Клонування репозиторію

```bash
git clone https://github.com/qwazysexx/Deskova-CRM.git
```

---

## 2️⃣ Перехід у папку проєкту

```bash
cd Deskova-CRM
```

---

# ⚛️ Запуск Frontend

## Встановлення залежностей

```bash
cd frontend
```

```bash
npm install
```

## Запуск frontend

```bash
npm run dev
```

Frontend буде доступний за адресою:

```text
http://localhost:5173
```

---

# 🐍 Запуск Backend

## Перехід у backend

```bash
cd backend
```

## Створення virtual environment

```bash
python -m venv venv
```

## Активація virtual environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

## Встановлення залежностей

```bash
pip install -r requirements.txt
```

---

## Міграції бази даних

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Запуск backend серверу

```bash
python manage.py runserver
```

Backend буде доступний за адресою:

```text
http://127.0.0.1:8000
```

---

# 👑 Створення адміністратора

Після клонування проєкту та виконання міграцій потрібно створити адміністратора:

```bash
python manage.py createsuperuser
```

Після цього введіть:
- username
- email
- password

Після створення адміністратора відкрийте:

```text
http://127.0.0.1:8000/admin
```

Увійдіть, використовуючи створені дані адміністратора.

Створений superuser акаунт використовується для:
- Django Admin Panel
- входу у CRM систему
- доступу до activity logs
- повного управління лідами
- генерації invite codes

---

# 🎟️ Система Invite Codes

Для створення нового invite code:

1. Відкрийте Django Admin Panel
2. Перейдіть у:

```text
Invite codes
```

3. Натисніть:

```text
Add Invite Code
```

4. Залиште поле `Code` порожнім
5. Натисніть `Save`

Система автоматично згенерує invite code.

Менеджери можуть використовувати цей код під час реєстрації у CRM системі.

---

# 🔑 Система авторизації

У проєкті використовується JWT авторизація та система реєстрації через Invite Codes.

Створення акаунтів доступне лише користувачам із валідним invite code.

Invite codes автоматично генеруються через Django Admin Panel.

---

# 👥 Ролі користувачів

## Admin
- Перегляд усіх лідів
- Доступ до Activity Logs
- Генерація Invite Codes
- Управління всіма лідами

## Manager
- Створення лідів
- Редагування власних лідів
- Зміна статусів лідів

---

# 📊 Функціональні можливості CRM

- Створення лідів
- Редагування лідів
- Видалення лідів
- Пошук лідів
- Фільтрація лідів
- Сортування лідів
- Kanban Pipeline
- Відстеження активності
- Dashboard статистики

---

# 📁 Структура проєкту

```text
frontend/
backend/
```

---

# 🌐 Репозиторій

https://github.com/qwazysexx/Deskova-CRM