
/*
 * GET home page.
 */
//var Wiki = require("wikijs");

exports.index = function(req, res){
   //Wiki.page("salman khan", function(err, page) {
        
        //page.images(function(err, images){
          // list of image URL's in the article
          //console.log(images);
        //});
       // page.summary(function(err, content) {
            //console.log(content);
            res.render('index');
       // });
        
       // });
   
};