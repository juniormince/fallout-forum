const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
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



// GET list of threads by topic id
router.get('/threads', (req, res) => {
    console.log('GET all threads by topic id');
    if(req.isAuthenticated()) {
        // let queryText = 
        //                 `SELECT "thread"."title", "thread"."id"
        //                 FROM "---"
        //                 RIGHT JOIN "----" ON "---"."_id" = "----"."id"
        //                 GROUP BY "thread"."title"
        //                 ORDER BY count DESC`;
        pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error on GET /threads: ', error);
            res.sendStatus(500);
        })
    } 
    else {
        res.sendStatus(403);
    }
});







/**
 * POST route template (new thread)
 */
router.post('/', (req, res) => {
    if(req.isAuthenticated())   {

    }
    else    {
        res.sendStatus(403);
    }
});


/**
 * POST route template (new reply/comment)
 */
router.post('/', (req, res) => {

});


/**
 * PUT route template (edit profile settings)
 */
router.put('/', (req, res) => {

});




/**
 * DELETE route template (delete comments)
 * add another delete for delete discussions? /stretch or skip
 */
router.delete('/', (req, res) => {

});






module.exports = router;