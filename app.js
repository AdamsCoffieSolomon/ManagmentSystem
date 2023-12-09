const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const Payment = require('./models/payment');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/solomonBase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();



const users = [
    { username: 'joy4561', password: 'Joy' },
    { username: 'nuru5678', password: 'Nurudeen' }
];

app.get('/', (req, res) => {
    res.render('loginfo');
});

app.post('/login', (req, res) => {
    const { userName, password } = req.body;
})
router.get('/addstudent', (req, res) => {
    res.render('addStudents');
});

router.get('/home', (req, res) => {
    res.render('index');
});

router.route('/paylog')
    .get((req, res) => {
        res.render('paymentLogin');
    })

router.route('/makePayment')
    .get((req, res) => {
        res.render('paymentmaking');
    })

.post(async(req, res) => {
    const formData = req.body;

    try {
        const payment = new Payment(formData);
        console.log(payment);
        await payment.save();
        res.redirect('/paymentmade');
    } catch (error) {
        console.error('Error saving payment:', error);
    }
});

router.route('/paymentmade').get(async(req, res) => {
    try {
        const payment = await Payment.find();
        res.render('payresult', { payment });
    } catch (err) {
        return res.status(500).send(err);
    }
});


app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});