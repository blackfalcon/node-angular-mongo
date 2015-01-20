var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Note = require('./models/notes');
var app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/notes');

app.get('/notes', function(req, res) {
  Note.find({}, function(err, data) {
    if (err) return res.status(500).send({'err': 'you got no notes bitches!'});
    res.send(data);
  });
});

app.post('/notes', function(req, res) {
  var newNote = new Note(req.body);
  newNote.save(function(err, data) {
    if (err) return res.status(500).send({'err': 'internal server error'});
    res.send(data);
  });
});

app.put('/notes/:id', function(req, res) {
  var note = req.body;
  delete note._id;
  Note.update({_id: req.params.id}, note, function(err, data) {
    if (err) return res.status(500).send({'err': 'internal server error'});
    red.send(data);
  });
});

app.delete('/notes/:id', function(req, res) {
  Note.remove({_id: req.params.id}, function(err) {
    if (err) return res.status(500).send({'err': 'internal server error'});
    res.send({'msg': 'success!'});
  });
});

app.listen(3000, function() {
  console.log('server listening -p 3000');
});
