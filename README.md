# HACCPAPZ Web and API Server
###### Martin Coleman, G00312351

## Introduction
This repository contains all the source code of the Haccpapz web server and Api server.

###Api Server
This server handles all the data management for Haccpapz. It manages HTTP requests such as 
Get and Post. It is responsible for authentication of users on the mobile app and web app, handling and storing forms posted from the mobile app, providing infomation such as settings to the app and forms to the webapp. It is also used for handling data analysis on the stored forms.

####Example of API
API URL | HTTP Method | Response Data 
------------ | ----------- |-----------
"http://www." | GET | explain here

####Database
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

###Web Server
 

## References
1. 
2.  
