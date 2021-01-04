//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb+srv://shenpai_sharma:17JE003089@cluster0.skz5k.mongodb.net/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});


const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

// const item1 = new Item({
//   name: ""
// });

// const item2 = new Item({
//   name: "Eat"
// });

// const item3 = new Item({
//   name: "Die"
// });

const defaultItems = [];

// Item.insertMany(defaultItems, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully inserted 3 items.");
//   }
// });


app.get("/", function(req, res) {

  Item.find({}, function(err, founditem){
    if(err){
      console.log(err);
    }
    else{

      if(founditem.length === 0){
        // Item.insertMany(defaultItems, function(err){
        //   if(err){
        //     console.log(err);
        //   }
        //   else{
        //     console.log("Successfully inserted 3 items.");
        //   }
        // });
        res.redirect("/");
      }
      else{
        res.render("list", {listTitle: "Today", newListItems: founditem});

      }
    }
  });
  
  

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });

  item.save();

  res.redirect("/");

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

app.post("/delete", function(req, res){
  //console.log(req.body.checkbox);
  const checkboxitemId = req.body.checkbox;

  Item.findByIdAndRemove(checkboxitemId, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully deleted checked item.");
    }
  });

  res.redirect("/");

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
