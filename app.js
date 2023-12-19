const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();
const port = process.env.PORT || 9000;
require('dotenv').config();
const Payment = require('./models/payment');
const Student = require('./models/Student');


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
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages.create({
        body: 'Congratulations!, Ray you won 2,000 from us ',
        from: '+19292276115',
        to: '+233598378049'
    })
    .then(message => console.log(message.sid));

const { MessagingResponse } = require('twilio').twiml;


router.route('/sending-sms')
    .get((req, res) => {
        res.render('Sms');
    })
app.post('/send-sms', (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message('The Robots are coming! Head for the hills!');

    res.type('text/xml').send(twiml.toString());
});


router.route('/login')
    .get((req, res) => {
        res.render('loginfo');
    })
    .post(async(req, res) => {
        const { userName, password } = req.body;

        const user = users.find(u => u.username === userName && u.password === password);

        console.log(user);

        if (user) {
            return res.redirect('/home');
        } else {
            return res.redirect('/login');
        }
    });

router.get('/home', (req, res) => {
    res.render('index');
});
router.route('/addstudent')
    .get((req, res) => {
        res.render('addStudents');
    })
    .post(async(req, res) => {
        const addStudent = req.body;
        try {
            const student = new Student(addStudent);
            console.log(student);
            await student.save();
            res.redirect('/students');
        } catch (error) {
            console.error('Error saving student:', error);
        }
    });
router.route('/students')
    .get(async(req, res) => {
        try {
            const students = await Student.find();
            res.render('addedStudents', { students });
        } catch (error) {
            console.log('cant render');
        }
    });

app.get('/delete/:id', async(req, res) => {
    const studentId = req.params.id;
    try {
        await Student.findByIdAndDelete(studentId);
        res.redirect('/students');
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/edit/:id', async(req, res) => {
    const studentId = req.params.id;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).send('Invalid student ID');
    }

    try {
        const student = await Student.findById(studentId);

        res.render('editStudents', { student });
    } catch (error) {
        console.error('Error fetching student for edit:', error);
    }
});


app.post('/update/:id', async(req, res) => {
    const studentId = req.params.id;
    const updatedData = req.body;

    try {
        await Student.findByIdAndUpdate(studentId, updatedData);
        res.redirect('/students');
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.route('/makePayment')
    .get((req, res) => {
        res.render('paymentmaking');
    })
    .post(async(req, res) => {
        const formData = req.body;

        formData.time = new Date();

        try {
            const payment = new Payment(formData);
            console.log(payment);
            await payment.save();

            res.redirect('/paymentmade');
        } catch (error) {
            console.error('Error saving payment:', error);
        }
    });

router.route('/paymentmade')
    .get(async(req, res) => {
        try {
            const payment = await Payment.find();
            res.render('payresult', { payment });
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.get('/school-fees-plan', (req, res) => {
    res.render('fessPlan')
})


app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});