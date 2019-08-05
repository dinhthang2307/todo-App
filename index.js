//require esential lib
var express = require('express');
var bodyParser = require("body-parser");

//then we call express
var app = express();
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static("public"));
//takes us to the root(/) URL
app.get('/', function (req, res) {
  res.render('index', {task: task,
                        complete: complete
                    });
    }
);

var task = ["Ra trường", "Có gấu"];
var complete = ["Có việc làm"];

// Post method when click addtask button
app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect('/');
 });

app.post('/removetask', function(req, res){
    var completeTask = req.body.check;

    if(typeof completeTask === "string"){
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for(var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect('/');
});

// set up view engine
app.set('view engine', 'ejs');

//the server is listening on port 3000 for connections
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
});