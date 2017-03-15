# HACCPAPZ Web and API Servers
###### Martin Coleman, G00312351

## Introduction
This repository contains all the source code of the Haccpapz web server and Api server.

### Api Server
This server handles all the data management for Haccpapz. It manages HTTP requests such as Get and Post. It is responsible for authentication of users on the mobile app and web app, handling and storing forms posted from the mobile app, providing infomation such as settings to the app and forms to the webapp. It is also used for handling data analysis on the stored forms.

#### Example of some API calls
Url:
http://haccpapz.northeurope.cloudapp.azure.com:8080

API URL | HTTP Method | Response Data 
------------ | ----------- |-----------
"url/api/foodDelivery" | POST | Saves Delivery form sent from the user
"url/api/getFoodDelivery" | GET | Returns Delivery forms for user
"url/api/suppliers" | GET | Returns supplier settings
"url/api/suppliers" | PUT | Updates supplier settings

#### Database
The database i chose to use was MongoDB. I chose this database as it is a document-oriented database that works well with photo storage.
As Haccpapz deals with text based forms a document-oriented database was most suitable. It was also a requirement to be able to store photos.
MongoDB stores documents as JSON.

Example of document stored in Json
```json
{
    "_id" :"5877a15809a313c40d244609",
    "managersign" : "Martin",
    "checkon" : "12/12/16",
    "sign" : "Martin",
    "comment" : "Good",
    "thirdTemp" : "20",
    "secondTemp" : "23",
    "firstTemp" : "20",
    "time" : "17:45",
    "food" : "Chicken",
    "date" : "12/12/16",
    "email" : "email@email.com",
    "__v" : 0
}
```

### Requirements
Nodejs 6.10.0 or greater

Npm 3.10.5 or greater

Download node from here:
https://nodejs.org/en/

### How to run
Download source code and required frameworks(Node, Npm).

Open CMD and navigate to APIServer folder.

Run the following commands to setup required modules:
```
npm install 
```

To run the server:
```
node server
```
Open port 8080 if you wish server to be accessed from remote source.

### Web Server
This server handles viewing forms and viewing data analysis. It allows users to login and view their saved forms.
It allows Admins to perform analysis on data.

#### Technologies
##### Angular 2
Angular 2 id the improved version of Angular. Angular implements MVC in   

### Requirements
Nodejs 6.10.0 or greater

Npm 3.10.5 or greater

Download node from here:
https://nodejs.org/en/

### How to run
Download source code and required frameworks(Node, Npm).

Open CMD and navigate to WebServer folder.

Run the following commands to setup required modules:
```
npm install 
npm install -g @angular/cli
```
To run the server in development mode:
```
ng serve --host 0.0.0.0 --port 4000 --live-reload-port 49153
```

To run the server in production mode:
```
ng serve --host 0.0.0.0 --port 4000 --prod
```

Open port 4000 if you wish server to be accessed from remote source.


## References
1. https://nodejs.org/en/
2. https://github.com/angular/angular-cli
3. https://angular.io/
