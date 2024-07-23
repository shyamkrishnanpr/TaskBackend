# Full Stack Assignment - Backend Task

This is the Backend for the full stack project. 

**The following tools were utilized for the project:**

- Node JS
- Express JS
- MongoDB
- mongoose



## Deployment Instructions:

#### Prerequisites:

- Node.js and npm should be installed on your system.
- MongoDB server should be running.


#### Step 1: Clone the Project

Open a terminal and run the following command to clone this project:
```bash
git clone https://github.com/shyamkrishnanpr/TaskBackend.git
 
```
#### Step 2: Navigate to the Project Directory

Navigate to the  directory within the cloned project 
```bash

 
```
#### Step 3: Install Dependencies

Run the following command to install the required packages locally for the project.
```bash
  npm install
 
```

#### Step 4: Rename and Configure .env File

- Rename the `sample.env` file to `.env`
- Open the `.env` file and fill in your configuration details, such as the database URL,google client id etc



#### Step 5: Start the Backend Server

Run the following command to start the Node Js Backend server.

```bash
  npm run dev
 
```


## API Reference

#### POST API to Register user:

```http
  POST /api/auth/register
```

#### POST API to login user:

```http
  POST /api/auth/login
```


#### POST API to Add Tasks:

```http
  POST /api/task/createTask
```


#### GET API to List All Tasks:

```http
  GET /api/task/getTask
```


####  PUT API to Edit Task Data:

```http
  PUT /api/task/updateTask/:id
```

####  DELETE API to Delete Task Data:

```http
  DELETE /api/task/deleteTask/:id
```




#### Conclusion

Thank you for following these deployment instructions to set up the Node JS project. By following these steps, you've successfully configured the Backend components.

For any questions or clarifications, please feel free to contact me at shyamkrishnasby@gmail.com

#### Thank you for reviewing my submission.
