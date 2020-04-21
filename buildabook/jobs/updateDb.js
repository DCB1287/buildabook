// John Cunningham 
let Chapter = require('../models/chapter.model')
let Book = require('../models/book.model');


// this is what is executed every minute by the server
module.exports = 
{
   timedEvent:() => {
    console.log('Running timed event No. 1');

    // all dates in database are rounded to nearest second
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
    console.log("time is " + now);
    
    // db.collections.find() returns a cursor which acts similar to
    // a pointer. Can be iterated through, google mongodb cursors for more
    // info.
    // see if chapters are finished

    // this checks to see if a startDate matches the current date.
    // if so, then the contest for this chapter can start.
    let query = Chapter.find({"startDate": now});
    query.exec((err, chapters) => {
      chapters.forEach((chapter) => {
        console.log("opening " + chapter.id)
        let query4 =Chapter.updateOne({"_id": chapter.id}, {"inProgressFlag": true});
        query4.exec();
      });
    });

    // find a chapter that has an end date that has an enddate that is now.
    let query2 = Chapter.find({"endDate": now});
    query2.exec((err, chapters) => 
    {
      
      // returns an array of documents, cycle through the documents as such
      chapters.forEach((chapter) => {
        console.log("found one that endDate has matched!");
        if (chapter.contenders.length > 0)
        {
            var query22 = Chapter.find({"_id": {$in: chapter.contenders}});
            query22.exec((err, contenders) => 
            {
              // this technically doens't execute if there are no contenders.
              
              var max = 0;
              contenders.forEach((contender) => {
                console.log("found contender " + contender.id + " determining if pushed to chapter")
                // for each contender, we compare it to max. If upvotes of contender is larger than max, it becomes the new winner of chapter.
                // (kinda like bubble sort)
                if (contender.upvoteCount >= max)
                {
                  // query to add contender's contents to main chapter. 
                  console.log("Adding to the chapter " + chapter.id)
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
          
          // since the chapter is now closed, set a flag to indicate its not open to submissions anymore.
          let query222 = Chapter.updateOne({"_id": chapter.id}, 
          {
            "inProgressFlag": false 
          });
          query222.exec();

          console.log("closing " + chapter.id);
      });
    });
    
    
    // this query cycles through all books
    let query3 = Book.find({})
    query3.exec((err,books) => 
    {
      // for each book...
      books.forEach(book => {

        // if the chaptersArray contains more than 0 elements...
        if (book.chaptersArray.length > 0)
        {
          var authors = [];

          // find the chapters in this book and return an array of authors...
          var queue2333 = Chapter.find(
          {
            "_id": {$in: book.chaptersArray},
          }, {"_id": 0,"author": 1});
          queue2333.exec((err, author) => 
          {
            // for each author, put the author's name in the authorsArray of the book
            author.forEach(name => {
              if (name.author != '' && !book.authorArray.includes(name.author))
              {
                authors.push(name.author);
                console.log("adding |" + name.author + "| to book!") 
                queue23332 = Book.updateOne(
                  {"_id": book.id},
                  {$push: {"authorArray": name.author}}
                );
                queue23332.exec();
              }
            });
          });
          
          authors = [];

          // find the chapters that aren't in progress
          var queue43 = Chapter.find(
          {
            "_id": {$in: book.chaptersArray}, 
            "inProgressFlag": false
          }).countDocuments();
            queue43.exec((err, value) =>
            {
              // if the number of chapters that aren't in progress == number of chapters
              // set the book inProgressFlag to false
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