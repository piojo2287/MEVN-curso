const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/kinesis', { useNewUrlParser: true })
    .then(db => console.log('DB is conected'))
    .catch(err => console.error(err));

//setting
app.set('port', process.env.port || 4000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/pacientes', require('./routes/pacientes'));
app.use('/api/turnos', require('./routes/turnos'));

//static files
app.use(express.static(__dirname + '/public'));


// server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})
