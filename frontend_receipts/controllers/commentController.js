// controllers/commentController.js

var roles = require('../models/roles');
var Comment = require('../models/comment');

// GET /api/comments
exports.get_comments = (req, res) => {
    if ( !( req.roles.includes(roles.Role.ADMIN) || 
            req.roles.includes(roles.Role.PHYSICIAN) ) ) {
                res.status(401).json({"Message":"Unauthorized User."});
        return;
    }
    
    Comment.find( (err, comments) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(comments);
    });
};

// GET /api/comments/{id}
exports.get_comment = (req, res) => {
    if ( !( req.roles.includes(roles.Role.ADMIN) || 
            req.roles.includes(roles.Role.PHYSICIAN) ) ) {
        res.status(401).json({"Message":"Unauthorized User."});
        return;
    }

    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!comment) {
            res.status(404).json({"Message":"No comment found with the given ID."});
            return;
        }
        res.status(200).json(comment);
    });
};

// POST /api/comments
exports.post_comment = (req, res) => {
    if ( !( req.roles.includes(roles.Role.ADMIN) || 
            req.roles.includes(roles.Role.PHYSICIAN) ) ) {
                res.status(401).json({"Message":"Unauthorized User."});
        return;
    }

    if ( !(req.body.presentationID && req.body.comment) ) {
        res.status(200).json({"Message":"Comment requires presentationId and the comment!"});
    }

    var comment = new Comment();
    comment.physician = req.userID;
    comment.presentationID = req.body.presentationID;
    comment.comment = req.body.comment;

    comment.save( (err, comment) => {
        if (err) {
            res.send(err);
            return;
        }
        var message = {
            "Message":"The comment was created!",
            "comment":{comment}
        }
        res.status(200).send(message);
    });
};

// PUT /api/comments/{id}
exports.put_comment = (req, res) => {
    if ( !( req.roles.includes(roles.Role.ADMIN) || 
            req.roles.includes(roles.Role.PHYSICIAN) ) ) {
        res.status(401).json({"Message":"Unauthorized User."});
        return;
    }
    
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            res.send(err);
            return;
        }

        if (comment.physician != req.userID) {
            res.status(401).json({"Message":"This comment does not belongs to you"});
            return;
        }

        if (req.body.presentationID) {
            comment.presentationID = req.body.presentationID;
        }
        if (req.body.comment) {
            comment.comment = req.body.comment;
        }

        comment.save( err => {
            if (err) {
                res.send(err);
            }
            res.json({"Message":"Comment updated!"});
        });
    });
};

// DELETE /api/comments/{id}
exports.delete_comment = (req, res) => {
    if ( !( req.roles.includes(roles.Role.ADMIN) || 
            req.roles.includes(roles.Role.PHYSICIAN) ) ) {
        res.status(401).json({"Message":"Unauthorized User."});
        return;
    }
    
    Comment.remove({
        _id: req.params.id
    }, (err, comment) => {
        if (err) {
            res.send(err);
            return;
        }

        if (comment.result.n < 1) {
            res.status(404).json({"Message":"No comment found with the given ID."});
            return;
        }

        res.json({"Message":"Successfully deleted"});
    });
};

// GET /api/comments/presentation/{id}
exports.get_comments_of_presentation = (req, res) => {
    if ( !( req.roles.includes(roles.Role.ADMIN) || 
            req.roles.includes(roles.Role.PHYSICIAN) ) ) {
        res.status(401).json({"Message":"Unauthorized User."});
        return;
    }

    Comment.find({"presentationID":req.params.id}, (err, comments) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(comments);
    });
};