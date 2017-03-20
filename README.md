# HACCPAPZ Web and API Servers
###### Martin Coleman, G00312351

## Introduction
This repository contains all the source code of the Haccpapz web server and Api server.

This repository is part of my final year project for my B.Sc. in Software Development.
This repository contains the server that serves the Mobile application and the server that serves a Web application.

The other half of the project can be found at: https://github.com/Martinc94/HACCPManagementApp.

It contains the mobile application developed using Ionic.

## Api Server
This server handles all the data management for Haccpapz. It manages HTTP requests such as Get and Post. It is responsible for authentication of users on the mobile app and web app, handling and storing forms posted from the mobile app, providing infomation such as settings to the app and forms to the webapp. It is also used for handling data analysis on the stored forms.

### Example of some API calls
Url:
http://haccpapz.northeurope.cloudapp.azure.com:8080

API URL | HTTP Method | Response Data 
------------ | ----------- |-----------
"url/api/foodDelivery" | POST | Saves Delivery form sent from the user
"url/api/getFoodDelivery" | GET | Returns Delivery forms for user
"url/api/suppliers" | GET | Returns supplier settings
"url/api/suppliers" | PUT | Updates supplier settings

### Technologies
#### NodeJS
Node is an asynchronous event driven JavaScript runtime that is designed to build scalable network applications. I chose node as it will be scaleable with the growth of Haccpapz. Node is lightweight yet extremely effective and handling HTTP Services such as GET, POST, PUT and DELETE.
#### Mongoose
Mongoose is the driver that connects the Node server to the MongoDB database.

Example of Javascript code to connect to mongoDB:
```
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});
```

### Database
The database i chose to use was MongoDB[5]. I chose this database as it is a document-oriented database that works well with photo storage.
As Haccpapz deals with text based forms a document-oriented database was most suitable. It was also a requirement to be able to store photos.
MongoDB stores documents as JSON.

Example of document stored in Json:
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

MongoDB for database

Download node from here:
https://nodejs.org/en/

Download MongoDB from here:
https://www.mongodb.com/

### How to run
Download source code and required frameworks(Node, Npm).

Download and setup MongoDB if dont already it.

Tutorial below:

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

Make sure mondoDB is running if not the following command will start it from mongoDB install location.
```
mongod.exe
```

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

## Web Server
This server handles viewing forms and viewing data analysis. It allows users to login and view their saved forms.
It allows Admins to perform analysis on data.

### Technologies
#### Angular 2
Angular[3] 2 is the improved version of Angular. Angular is great for managing MVC(Model-View-Controller) which made it ideal for this project that would be handling data(JSON) and displaying it to the user in a human readable manner. Angular 2 improves usability of services allowing observables rather than traditional callbacks. This was also useful and this web application consumes a large amount of services.
Angular 2's templating, rendering speed , data management, HTTP services, form handling and routing makes it the perfect choice for a modern web application.

#### Typescript
Angular 2 requires the use of typescript. Angular 2 uses Typescript to add type security to Javascript.

#### Angular Maps
I used Angular maps[6] to display google maps for using location services during the food trend analysis.

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
4. http://devdactic.com/restful-api-user-authentication-1
5. https://www.mongodb.com/
6. https://angular-maps.com/
7. http://mongoosejs.com/
