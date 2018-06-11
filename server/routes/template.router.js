const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// reorganize route list after completed


/// GET profile [DONE]
router.get('/profile/:id', (req, res) => {
    console.log('GET all route for user', req.params.id);
    if (req.isAuthenticated()) 
        {
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


// ******** POST route template (new reply/comment)
router.post('/newReply', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = `INSERT INTO "comment" ("reply", "person_id")
                        VALUES ($1, $2)`;
        pool.query(queryText, [req.body.reply, req.user.id])
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



// ******** GET profile settings
router.get('/profile/:id', (req, res) => {
    console.log('GET all route for user', req.params.id);
    if (req.isAuthenticated()) 
        {
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


// ******** GET threads by id TEST

// router.get('/threads', (req, res) => {
//     console.log('GET all route for thread');
//     if (req.isAuthenticated() 
//     // && req.body.topic_id == req.body.topic.id
// ) {
//         let queryText = `SELECT "person"."username", "person"."id", "thread"."person_id",
//                         "thread"."title", "thread"."date", "thread"."id", "thread"."topic_id",
//                         "topic"."id", "topic"."title"
//                         FROM "person"
//                         RIGHT JOIN "thread" 
//                         ON "person"."id" = "thread"."person_id"
//                         LEFT JOIN "topic"
//                         ON "thread"."topic_id" = "topic"."id"
//                         ORDER BY "thread"."date" DESC;`;
//         pool.query(queryText // , [req.body.topic_id]
//         )
//         .then((result) => {
//             res.send(result.rows);
//         }).catch((error) => {
//             console.log('error on thread GET: ', error);
//             res.sendStatus(500);
//         })
//     } else {
//         res.sendStatus(403);
//     }
// });


// ******** GET threads by topic id NOTES
// router.get('/threads', (req, res) => {
//     console.log('GET all threads by topic id');
//     if(req.isAuthenticated()) {
//         // let queryText = 
//         //                 `SELECT "thread"."title", "thread"."id"
//         //                 FROM "---"
//         //                 RIGHT JOIN "----" ON "---"."_id" = "----"."id"
//         //                 GROUP BY "thread"."title"
//         //                 ORDER BY count DESC`;
//         pool.query(queryText)
//         .then((result) => {
//             res.send(result.rows);
//         })
//         .catch((error) => {
//             console.log('error on GET /threads: ', error);
//             res.sendStatus(500);
//         })
//     } 
//     else {
//         res.sendStatus(403);
//     }
// });


// ******** GET threads DRAFT (gets all)
router.get('/threads', (req, res) => {
    console.log('GET all route for thread');
    if (req.isAuthenticated() 
    // && req.body.topic_id == req.body.topic.id
) {
        let queryText = `SELECT * FROM "thread"
                        ORDER BY "thread"."id" ASC;`;
        pool.query(queryText
            // , [req.body.topic_id]
        )
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


// ******** GET comments TEST (all)
router.get('/comments', (req, res) => {
    console.log('GET all route for comments');
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "comment"  
                        ORDER BY "comment"."id" ASC;`;

        pool.query(queryText)
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


/// ******** GET comments TEST (by users)
// router.get('/comments', (req, res) => {
//     console.log('GET all route for comments');
//     if (req.isAuthenticated() ) {
//         let queryText = `SELECT "person"."profile_img", "person"."username", "person"."id", 
//                         "comment"."person_id", "comment"."reply", "comment"."id", "comment"."date",
//                         "comment"."thread_id"
//                         FROM "person"
//                         RIGHT JOIN "comment" 
//                         ON "person"."id" = "comment"."person_id"
//                         ORDER BY "comment"."date" DESC;`;

//         pool.query(queryText)
//         .then((result) => {
//             res.send(result.rows);
//         }).catch((error) => {
//             console.log('error on comment GET: ', error);
//             res.sendStatus(500);
//         })
//     } else {
//         res.sendStatus(403);
//     }
// });



// ******** POST route template (new thread)
// router.post('/addthread', (req, res) => {
//     if (req.isAuthenticated()) {
//         let queryText = `INSERT INTO "comment" ("reply", "thread_id", "person_id")
//                         VALUES ($1, $2, $3)`;
//         pool.query(queryText, [req.body.reply, req.body.thread_id, req.user.id])
//             .then((result) => {
//                 res.sendStatus(201);
//             })
//             .catch((error) => {
//                 res.sendStatus(500);
//                 console.log('error on POST: ', error)
//             })
//     } else {
//         res.sendStatus(403);
//     }
// });




/**
 * DELETE route template (delete comments)
 * add another delete for delete discussions? /stretch or skip
 */
router.delete('/', (req, res) => {

});






module.exports = router;