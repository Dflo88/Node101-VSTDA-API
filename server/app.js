const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const bodyParser = require('body-parser');

var mockData = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

router
    .route('/')
    .get((req,res)=> {
        res.status(200).send({ status: 'ok'});
    })

router
    .route('/api/TodoItems')
    .get((req,res)=> {
        res.status(200).send(mockData);
    })
    .post((req,res)=> {
        mockData.push(req.body);
        res.status(201).send(req.body);
    })

router
    .route('/api/TodoItems/:number')
    .get((req,res)=> {
        res.status(200).send(mockData[req.params.number])
    })
    .delete((req,res)=> {
        res.status(200).send(mockData[req.params.number]);
        delete mockData[req.params.number];
    })

module.exports = app;
