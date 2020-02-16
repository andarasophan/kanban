# kanban

**Create User**
----
  Return access token after successfully registered.

* **URL**

  http://localhost:3000/register

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    `first_name=[String]`\
    `last_name=[String]`\
    `email=[String]`\
    `password=[String]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoibmV3IiwibGFzdF9uYW1lIjoidXNlciIsImlkIjo2LCJlbWFpbCI6InVzZXI0QG1haWwuY29tIiwiaWF0"
    }
* **Error Response:**

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "error": [
        "Email is already registered"
        ]
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Login User**
----
  Return access token after successfully login.

* **URL**

  http://localhost:3000/login

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    `email=[String]`\
    `password=[String]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoibmV3IiwibGFzdF9uYW1lIjoidXNlciIsImlkIjo2LCJlbWFpbCI6InVzZXI0QG1haWwuY29tIiwiaWF0"
    }
* **Error Response:**

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "error": "Email / Password Wrong"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Get Categories**
----
  Returns json data all categories by user (includes tasks).

* **Headers:**

    `token`

* **URL**

  http://localhost:3000/categories

* **Method:**

    `GET`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
    {
        "id": 46,
        "name": "Doing",
        "user_id": 1,
        "createdAt": "2020-02-14T09:35:15.456Z",
        "updatedAt": "2020-02-14T09:35:15.456Z",
        "Tasks": [
            {
                "id": 84,
                "title": "Task1",
                "description": null,
                "due_date": null,
                "user_id": 1,
                "category_id": 46,
                "createdAt": "2020-02-14T14:46:34.230Z",
                "updatedAt": "2020-02-16T09:55:51.122Z"
            },
            {
                "id": 106,
                "title": "Task2",
                "description": null,
                "due_date": null,
                "user_id": 1,
                "category_id": 46,
                "createdAt": "2020-02-16T09:55:57.255Z",
                "updatedAt": "2020-02-16T09:55:57.255Z"
            },
            {
                "id": 107,
                "title": "Task3",
                "description": null,
                "due_date": null,
                "user_id": 1,
                "category_id": 46,
                "createdAt": "2020-02-16T09:56:13.127Z",
                "updatedAt": "2020-02-16T09:58:35.014Z"
            }
        ]
    },
    {
        "id": 57,
        "name": "Completed",
        "user_id": 1,
        "createdAt": "2020-02-16T09:55:41.825Z",
        "updatedAt": "2020-02-16T09:59:10.665Z",
        "Tasks": []
    }
    ]
* **Error Response:**

  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "error": "Unauthorized"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Create Category**
----
  Returns json data new category.

* **Headers:**

    `token`

* **URL**

  http://localhost:3000/categories

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    `name=[String]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "id": 59,
    "name": "test",
    "user_id": 1,
    "updatedAt": "2020-02-16T11:17:45.567Z",
    "createdAt": "2020-02-16T11:17:45.567Z"
    }
* **Error Response:**
  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "error": [
        "*Name is required"
    ]
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "error": "Unauthorized"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Edit Category**
----
  Returns json data new update category.

* **Headers:**

    `token`

* **URL**

  http://localhost:3000/categories/:categoryId

* **Method:**

    `PUT`
  
*  **URL Params**

    `categoryId=[Number]`

* **Data Params**

    `name=[String]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
    1,
    [
        {
            "id": 59,
            "name": "testUpdate",
            "createdAt": "2020-02-16T11:17:45.567Z",
            "updatedAt": "2020-02-16T11:25:44.221Z",
            "user_id": 1
        }
    ]
    ]
* **Error Response:**
  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "error": [
        "*Name is required"
    ]
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "error": "Unauthorized"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "error": "Category not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Delete Category**
----
  Returns json data how many deleted category and deleted tasks(*this also delete tasks which has this category id).

* **Headers:**

    `token`

* **URL**

  http://localhost:3000/categories/:categoryId

* **Method:**

    `DELETE`
  
*  **URL Params**

    `categoryId=[Number]`

* **Data Params**

    `name=[String]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "category": 1,
    "tasks": 2,
    "message": "Deleted"
    }
* **Error Response:**
  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "error": [
        "*Name is required"
    ]
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "error": "Unauthorized"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "error": "Category not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Create Task**
----
  Returns json data new task.

* **Headers:**

    `token`

* **URL**

  http://localhost:3000/tasks/:categoryId

* **Method:**

    `POST`
  
*  **URL Params**

    `categoryId=[Number]`

* **Data Params**

    `title=[String]`\
    `description=[String]`\
    `due_date=[Date]`\
    `user_id=[Number]`\
    `category_id=[Number]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
    "id": 110,
    "title": "newTask",
    "description": null,
    "due_date": null,
    "user_id": 1,
    "category_id": 46,
    "updatedAt": "2020-02-16T12:59:55.839Z",
    "createdAt": "2020-02-16T12:59:55.839Z"
    }
* **Error Response:**
  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "error": [
        "Title is required"
    ]
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "error": "Unauthorized"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "error": "Category not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Edit Task**
----
  Returns json data updated task.

* **Headers:**

    `token`

* **URL**

  http://localhost:3000/tasks/:categoryId/:taskId

* **Method:**

    `PUT`
  
*  **URL Params**

    `categoryId=[Number]`\
    `taskId=[Number]`

* **Data Params**

    `title=[String]`\
    `description=[String]`\
    `due_date=[Date]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
    1,
    [
        {
            "id": 110,
            "title": "Edit Test",
            "description": null,
            "due_date": null,
            "createdAt": "2020-02-16T12:59:55.839Z",
            "updatedAt": "2020-02-16T13:06:16.384Z",
            "user_id": 1,
            "category_id": 46
        }
    ]
    ]
* **Error Response:**
  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "error": [
        "Title is required"
    ]
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "error": "Unauthorized"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "error": "Data not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Delete Task**
----
  Returns json data number of deleted task.

* **Headers:**

    `token`

* **URL**

  http://localhost:3000/tasks/:categoryId/:taskId

* **Method:**

    `DELETE`
  
*  **URL Params**

    `categoryId=[Number]`\
    `taskId=[Number]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "data": 1,
    "message": "Deleted"
    }
* **Error Response:**
  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "error": [
        "Title is required"
    ]
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "error": "Unauthorized"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "error": "Data not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Edit Task (category_id)**
----
  Returns json data updated task.

* **Headers:**

    `token`

* **URL**

  http://localhost:3000/tasks/:categoryId/:taskId/updateCategory

* **Method:**

    `DELETE`
  
*  **URL Params**

    `categoryId=[Number]`\
    `taskId=[Number]`

* **Data Params**

    `category_id=[Number]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
    1,
    [
        {
            "id": 84,
            "title": "Task1",
            "description": null,
            "due_date": null,
            "createdAt": "2020-02-14T14:46:34.230Z",
            "updatedAt": "2020-02-16T13:15:12.430Z",
            "user_id": 1,
            "category_id": 57
        }
    ]
    ]
* **Error Response:**
  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "error": "Invalid input"
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "error": "Unauthorized"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "error": "Category not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }