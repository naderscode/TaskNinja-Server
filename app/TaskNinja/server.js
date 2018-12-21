var express = require("express"),
	http = require("http"),
	app = express(),
	toDos = [
	{
		"description": "Car wash",
		"tags": ["auto"]
	},
	{
		"description": "Buy Groceries",
		"tags": ["shopping", "errands"]
	},
	{
		"description": "Haircut",
		"tags": ["personal care", "beauty"]
	},
	{
		"description": "Order office supplies",
		"tags": ["work"]
	},
	{
		"description": "Meet with client",
		"tags": ["work", "meetings"]
	},
	{
		"description": "Design new app",
		"tags": ["work", "design"]
	}
]

app.use(express.static(__dirname + "/client"));

http.createServer(app).listen(3000);

app.get("/todos.json", function(req, res){
	res.json(toDos);
})