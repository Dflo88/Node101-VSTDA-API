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
        let itemId = (req['body']['todoItemId']);
        let doesDataExist = false;
        mockData.forEach( object => {
            if((object['todoItemId']) === itemId) {
                doesDataExist = true;
                object['name'] = req['body']['name'];
                object['priority'] = req['body']['priority'];
                object['completed'] = req['body']['completed'];
                mockData.splice(itemId,1,object);
            };
        });
        if (!doesDataExist) mockData.push(req.body);
        res.status(201).send(req.body);
    })

router
    .route('/api/TodoItems/:number')
    .get((req,res)=> {
        let itemId = (req.params.number);
        let doesDataExist = false;
        let arrayIndex;
        mockData.forEach( (object, i) => {
            if((object['todoItemId']) == itemId) {
                doesDataExist = true;
                arrayIndex = i;
            };
        });
        if (doesDataExist) {
            res.status(200).send(mockData[arrayIndex]);
        } else {
            res.status(404).send('Sorry there is no todo item with this number to view');
            console.log(doesDataExist);
            console.log(arrayIndex);
        }
    })
    .delete((req,res)=> {
        let itemId = (req.params.number);
        let doesDataExist = false;
        let arrayIndex;
        mockData.forEach( (object, i) => {
            if((object['todoItemId']) == itemId) {
                doesDataExist = true;
                arrayIndex = i;
            };
        });
        if (doesDataExist) {
            res.status(200).send(mockData[arrayIndex]);
            mockData.splice(arrayIndex,1);
        } else {
            res.status(404).send('Sorry there is no todo item with this value to delete');
        }
    })

module.exports = app;