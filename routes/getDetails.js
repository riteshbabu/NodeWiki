
/*
 * GET Wikipedia Details.
 */
var request = require('request');

exports.detail = function(req, res){
    var peoples = {};
    var title = req.body.title;
    var url = 'http://en.wikipedia.org/w/api.php?action=query&titles='+encodeURI(title)+'&prop=pageimages&format=json&pithumbsize=500';
    request(url, function(err, response, data) {
      if(!err) {
          var val = JSON.parse(data);
          var value = val.query.pages;
          Object.keys(value).forEach(function(key) {
            var title = "";
            var thumbnail = "";
            if (value[key].title) {
              title = value[key].title;
            }
            if (value[key].thumbnail) {
              thumbnail = value[key].thumbnail.source;
            }
            peoples = {
              name: title,
              pageid: value[key].pageid,
              image: thumbnail
            }; 
            var summUrl = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles='+encodeURI(title); 
            request(summUrl, function(err, response, result) {
                if(!err) {
                    var val = JSON.parse(result);
                    var value = val.query.pages;
                    Object.keys(value).forEach(function(key) {
                        var summary = "";
                        if (value[key].extract) {
                            summary = value[key].extract;
                        }
                        peoples.summary = summary;
                        console.log("summary", peoples);
                        return res.json(peoples);

                    });
                    
                }
            }).setMaxListeners(12);
            
          });
        }
    }).setMaxListeners(12);
    

};