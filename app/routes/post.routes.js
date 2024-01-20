const BlogPost = require("../models/post.model.js");

module.exports = app => {
    const tutorials = require("../controllers/post.controller.js");

    var router = require("express").Router();

    // Create a new Post
    router.post("/", tutorials.create);
    
    // Retrieve All Post
    router.get("/", tutorials.findAll);

    // Retrieve All Published Post
    router.get("/published", tutorials.findAllPublished);

    // Retrive a single Post with id
    router.get("/:id", tutorials.findOne);

    // Update a Post with id
    router.put("/:id", tutorials.update);

    // Delete a Post with id
    router.delete("/:id", tutorials.delete);

    // Delete All Post
    router.delete("/", tutorials.deleteAll);

    app.use('/api/blogpost', router);
};

