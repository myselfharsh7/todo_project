# To-Do List Application

A simple web application for managing a personal to-do list. This application allows you to create, update, delete, and mark tasks as completed. Built with Django for the backend and a simple frontend using HTML, CSS, and JavaScript.

## Features

- Add tasks with a title and description.
- Mark tasks as completed or incomplete.
- Edit the title and description of tasks.
- Delete tasks.
- Data persistence with SQLite database.
- User authentication (login, register).

## Technologies

- **Backend**: Python, Django
- **Frontend**: HTML, CSS, JavaScript
- **Database**: SQLite
- **API**: RESTful APIs for CRUD operations

## Setup Instructions

### Prerequisites

- Python 3.x
- pip (Python package installer)
- Django
- Git (for version control)


### 1. Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone [https://github.com/your-username/todo-list-app.git](https://github.com/myselfharsh7/todo_project.git)
cd todo_project
```
2. Install Dependencies

Use pip to install the necessary Python packages listed in the requirements.txt file:
```bash
pip install -r requirements.txt
```
3. Set Up the Database

Run the following command to apply the migrations and set up the database:
```bash
python manage.py migrate
```
4. Create a Superuser (Optional)

To access the Django admin panel, create a superuser account:
```bash
python manage.py createsuperuser
```
5. Run the Development Server

Start the development server:
```bash
python manage.py runserver
```
Access lOCALLY
Visit http://127.0.0.1:8000/ in your browser to view the application.

Access the Admin Panel :
To access the Django admin panel, visit http://127.0.0.1:8000/admin/

## Demo Video

[https://uploading]

## Live 

[https://todo-list-svnt.onrender.com](https://todo-list-svnt.onrender.com)
