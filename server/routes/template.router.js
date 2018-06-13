const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// reorganize route list after completed
// ******** = incomplete/not functional

/// GET profile [DONE]
router.get('/profile/:id', (req, res) => {
    console.log('GET all route for user', req.params.id);
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "person" WHERE "id" = $1;`;
        pool.query(queryText, [req.user.id])
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('error on person GET: ', error);
                res.sendStatus(500);
            })
    }
    else {
        res.sendStatus(403);
    }
});

////GET topics [DONE]
router.get('/topics', (req, res) => {
    console.log('GET all route for TOPIC');
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "topic"
                        ORDER BY "topic"."id" ASC;`;

        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('error on topic GET: ', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

// GET threads [DONE]
router.get('/threads/:id', (req, res) => {
    console.log('/threads with param:', req.params.id);
    console.log('GET all route for thread');
    if (req.isAuthenticated()) {
        id = req.params.id;
        //  let thread = req.params
        let queryText = `SELECT * FROM "thread" where "topic_id" = $1
                        ORDER BY "thread"."id" ASC;`;
        pool.query(queryText, [id])
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('error on thread GET: ', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

// GET comments [DONE]
router.get('/comments/:id', (req, res) => {
    console.log('/threads with param:', req.params.id);
    console.log('GET all route for comments');
    if (req.isAuthenticated()) {
        let id = req.params.id;
        let queryText = `SELECT "person"."profile_img", "person"."username", "person"."id", 
                        "thread"."title", "thread"."id",
                        "comment"."person_id", "comment"."reply", "comment"."id", "comment"."date",
                        "comment"."thread_id"
                        FROM "comment"
                        JOIN "person" ON "person"."id" = "comment"."person_id"
                        JOIN "thread" ON "comment"."thread_id" = "thread"."id"
                        WHERE "thread"."id" = $1
                        ORDER BY "comment"."id" ASC;`;
        //change to ORDER BY "comment"."date"
        pool.query(queryText, [id])
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('error on comment GET: ', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

// ******** POST route template (new reply/comment)
router.post('/newReply', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.body);
        let queryText = `INSERT INTO "comment" ("reply", "thread_id", "person_id")
                        VALUES ($1, $2, $3)`;
        pool.query(queryText, 
            [req.body.reply, req.body.commentList[0].thread_id, req.user.id])
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((error) => {
                res.sendStatus(500);
                console.log('error on POST: ', error)
            })
    } else {
        res.sendStatus(403);
    }
});

// ******** POST route template (new thread)
router.post('/newThread', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = `INSERT INTO "thread" ("title", "person_id", "body")
                        VALUES ($1, $2, $3)
                        RETURNING id AS thread_id`;
        pool.query(queryText, [req.body.title, req.user.id, req.body.body])
            .then((results) => {
                res.send(results.rows);
            })
            .catch((error) => {
                res.sendStatus(500);
                console.log('error on POST: ', error)
            })
    } else {
        res.sendStatus(403);
    }
});


// ******** GET profile settings
router.get('/profile/:id', (req, res) => {
    console.log('GET all route for user', req.params.id);
    if (req.isAuthenticated()) {
        let profile = req.user.id
        let queryText = `SELECT * FROM "person" WHERE "id" = $1;`;
        pool.query(queryText, [profile])
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('error on person GET: ', error);
                res.sendStatus(500);
            })
    }
    else {
        res.sendStatus(403);
    }
});

// ******** PUT edit profile settings
router.put('/:id', (req, res) => {
    console.log('PUT item route');
    if (req.isAuthenticated() && req.params.id === req.user.id) {
        let queryText = `UPDATE "person" SET "profile_alias" = $2, "profile_location" = $3, 
                        "profile_timezone" = $4, "profile_contact" = $5, "profile_img" = $6
                        WHERE "id" = $1`;
        pool.query(queryText, [req.user.id, req.params.profile_alias, req.params.profile_location,
        req.params.profile_timezone, req.params.profile_contact, req.params.profile_img])
            .then((result) => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('error on PUT: ', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }

});

/**
 * DELETE route template (delete comments)
 * add another delete for delete discussions? /stretch or skip
 */
router.delete('/', (req, res) => {

});






module.exports = router;