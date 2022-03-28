import express from "express";
import { insertRecord, getUsers } from '../controllers/userController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', getUsers);
router.post('/createUser', body('email').isEmail(), body('password').isLength({ min: 5 }), insertRecord);





// router.get('/', (request, response) => {
//     response.render("user/addOrEdit", {
//         viewTitle: "Insert User"
//     });
// });

router.put('/', (request, response) => {
    // User.findById((err,doc) => {
    //     if(!err) {
    //         response.render('user/addOrEdit', {
    //             viewTitle: "Update User",
    //             user: doc
    //         });
    //         console.log(doc);
    //     } else {
    //         console.log("Error retrive list data: " + err);
    //     }
    // });
});

router.delete('/', (request, response) => {
    User.findByIdAndRemove((err,doc) => {
        if(!err) {
            response.redirect('/user/list');
        } else {
            console.log("Error delete: " + err);
        }
    });
});

router.get('/list', (request, response) => {
    User.find((err,doc) => {
        if(!err) {
            response.render('user/list', {
                list: doc
            });
        } else {
            console.log("Error retrive list data: " + err);
        }
    });
});

export default router;