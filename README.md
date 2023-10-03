# IS-27-Full-Stack-Developer-Assessment
## Documentation Installing a Project

These documents guide you on how to install the application in your system.


## Prerequisites

Before you install a code repository on your PC, you will need to have the following software installed:

* Python 3.9.12

* Nodejs (latest version)

* npm (latest version)

* Visual Studio Code (VS Code)

* Docker

* MongoDB


## System Design Infomation

I created a basic full-stack application in a single docker-compose.yml with the following services:

- Database (MongoDB)

- APIs (written in Python using Flask frameworks)

- Frontend (using the React framework)



## Follow the below steps to install the repository

1) The first step is to download the .zip file and extract it into your selected folder.

2) After extracting the file open the project folder (IS-27-Full-Stack-Developer-Assessment) in VSCode.

3) Open the terminal in VSCode. select Terminal > New Terminal and run the below code.


After opening the IS-27-Full-Stack-Developer-Assessment folder you will see the below listed folders and files:


(Folder Structure)

- REQ101449_Technical_Test
    - backend
       - collection
            - user.js
       - config
            - db.js
       - models
            - user.js
       - routes
            - user.js
    - frontend
        - public
        - src
        - app.js
        - index.js
        - home.js
        - formscomponent.js
        - .dockerignore
        - .gitignore
        - Dockerfile
        - package-lock.json
        - package.json
        - README.md
    - docker-compose.yml
    - README.md

#You can run the above code with two techniques
1. using the docker command and
2. running backend and frontend individually

Method 1:
# Run the below docker command 

This will open the project folder in your command line

```cmd
cd IS-27-Full-Stack-Developer-Assessment
```

This will build a 3 docker container and install the necessary files

```cmd
docker-compose build
```

This will start the Database, Backend server API, and  Frontend application

```cmd
docker-compose up
```

## Server Localhost

http://localhost:3000/  


## API running 

For testing the server run the below link in the browser, this will run the test route

http://localhost:3100/test  (Example API)


# Database

The database will run on port 27017


# Frontend 

For running the react applications (Frontend) run the below link in a browser

http://localhost:3000/

# Additional
After doing this even if you can't see the output on the browser (say you just see the page without data), you need to install Mongodb with docker

# Installation of MongoDB with docker
'''cmd 
'''docker pull mongo'''
as soon as you do this it should pull all the data 
after this one try to reload your web page in order to see the outcome


## Conclusion

After that running http://localhost:3000/ the react app will start and you can see data tables on the screen and you can perform All operations in the applications.


Method 2:
# backend
open the new terminal when you are in VS code and get to the backend directory using the '''cmd 
''' cd backend'''
after that just try to run the command
'''npm start command'''
After this step go to a new terminal in VS Code for frontend

#frontend
once you are in the terminal guide yourself to the frontend directory using cmd
''' cd frontend'''
try to run  the command in the terminal as
'''npm start'''
after that web page will open up with all the data and web page.

#web page
after doing these two steps you are on a final web page where you can perform edit delete and insert tasks as required
webpage will automatically open on your default browser on a link
'''http://localhost:3000'''
If it doesn't open up just look for
'''localhost:3000''' on your browser to  see the final outcome.



