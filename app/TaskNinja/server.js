
var express = require("express"),
    http = require("http"),
    //import the mongoose library
    mongoose = require("mongoose");
    app = express();
    
        
app.use(express.static(__dirname + "/client"));

// tell Express to parse incoming
// JSON objects
app.use(express.urlencoded());

//connect to taskninja data store in mongodb
mongoose.connect('mongodb://localhost/taskninja');

//create a mongoose model for todos
var ToDoSchema = mongoose.Schema({
	description: String,
	tags: [String]
});

var ToDo = mongoose.Model("ToDo", ToDoSchema);

//listen for requests
http.createServer(app).listen(3000);


//update get route to get todo items out of the database and return them
app.get("/todo.json", function(req, res){
	ToDo.find({}, function(err, toDos){
		res.json(toDos);
	});
});

/*
app.get("/todos.json", function (req, res) {
    res.json(toDos);
});
*/

//update post route to add elements to database
app.post("/todos", function(req, res){
	console.log(req.body);
	var newToDo = new ToDo({"description":req.body.description, "tags":req.body.tags});

	newToDo.save(function(err, result){
		if(err !== null){
			//the element did not get saved
			console.log(err);
		} else {
			// our client expects ALL of the todo items to getreturned,
	    	// an additional request to maintain compatibility
	    	ToDo.find({}, function(err, result){
	    		if(err !== null){
	    			//element not saved
	    			res.send("ERROR");
	    		}
	    		res.json(result);

	    	});
		}

	});

});

/*
app.post("/todos", function (req, res) {
    // the object is now stored in req.body
    var newToDo = req.body;

    console.log(newToDo);

    toDos.push(newToDo);

    // send back a simple object
    res.json({"message":"You posted to the server!"});
});
*/
