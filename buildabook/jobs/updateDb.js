const Router = require('express').Router();
const mongoose = require('mongoose');
var schedule = require('node-schedule');
let Chapter = require('../models/chapter.model')
let Book = require('../models/book.model');
const MongoClient = require('mongodb').MongoClient;

module.exports = 
{
   timedEvent:() => {
    console.log('Running timed event No. 1');

    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
    console.log("time is " + now);
    
    // find chapters that have an end Date
    // db.collections.find() returns a cursor which acts similar to
    // a pointer. Can be iterated through, google mongodb cursors for more
    // info.
    // see if chapters are finished

    
    let query = Chapter.find({"startDate": now});
    query.exec((err, chapters) => {
      chapters.forEach((chapter) => {
        console.log("opening " + chapter.id)
        let query4 =Chapter.updateOne({"_id": chapter.id}, {"inProgressFlag": true});
        query4.exec();
      });
    });


    let query2 = Chapter.find({"endDate": now});
    query2.exec((err, chapters) => 
    {
      chapters.forEach((chapter) => {
       
        console.log("found one that endDate has matched@!");
        if (chapter.contenders.length > 0)
        {
            var query22 = Chapter.find({"_id": {$in: [chapter.contenders]}});
            query22.exec((err, contenders) => 
            {
              console.log("found " + contenders.id)
              contenders.forEach((contender) => {
                
                var max = 0;
                if (contender.upvotes > max)
                {
                  let query4324 = Chapter.updateOne({"_id": chapter.id}, 
                  {
                    "title": contender.title,
                    "text": contender.text,
                    "author":contender.author,
                    $push: {"comments": {$each: contender.comments}},
                    "inProgressFlag": false 
                  });
                  query4324.exec();
                  max = contender.upvotes;
                }
              });
            });
          }
          
            
          let query222 =Chapter.updateOne({"_id": chapter.id}, 
          {
            "inProgressFlag": false 
          });
          query222.exec();

          console.log("closing" + chapter.id);
      
        
      });
    });
    
    let query3 = Book.find({})
    query3.exec((err,books) => 
    {
      books.forEach(book => {
        if (book.chaptersArray.length > 0)
        {
          
          var queue43 = Chapter.find(
          {
            "_id": {$in: book.chaptersArray}, 
            "inProgressFlag": false
          }).countDocuments();
            queue43.exec((err, value) =>
            {
              if (value === book.numberOfChapters)
              {
                let queue432432 = Book.updateOne({"_id": book.id}, 
                {
                  "inProgressFlag": false 
                });
                queue432432.exec();

              }
            }
          );
    
          
        }

      });
    });
    
  }
} 