const mongoose = require('mongoose')

/* Post Model
    -- title: String
    -- topic: String [] (from a set: {Politics, Health, Sport or Tech}) 
    -- message: String
    -- author: User model
    -- likes: [{
        userId: user object
        username: String
    }]
    -- comments: [comment object ids]
    -- timestamp: Date.now()
    -- expiration: Date */