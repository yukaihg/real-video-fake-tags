real-video-fake-tags
====================
## Highlights

A few things that are useful in this application:

* How to use [videojs](http://videojs.com/) HTML5 player and its api to tag videos
 * see public/javascripts/script.js 
* How to create a **RESTful** json api using Node.js and Express
 * see app.js
* How to use a **model wrapper** (Mongoose in this case) to bind data models into database schema (MongoDB in this case)
 * see models/index.js
* How to preform basic **CRUD**(create, read, update, delete) actions on data models without writing queries 
 * see app.js
* How to use AJAX call and RESTful api to dynamically update page content (all comments are loaded in front-end)
 * see public/javascripts/script.js 
* Some insights of mongoDB and how it works
 * see app.js


## System Requirement

1. [mongoDB](http://www.mongodb.org/downloads) needs be installed and running , follow the README instruction if you have trouble.

2. ```npm install``` as always

3. run "util/import.js" to feed test data into database 'tag_database'

4. run 'app.js' and have fun


## Further Reading
[Develop a RESTful API Using Node.js With Express and Mongoose](http://pixelhandler.com/blog/2012/02/09/develop-a-restful-api-using-node-js-with-express-and-mongoose/)