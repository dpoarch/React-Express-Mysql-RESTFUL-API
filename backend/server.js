const express = require('express');
const app = express();
const connection = require('./secret');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3002;

connection.connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
var body = "[GET]<br>"+
"<a href='http://localhost:3002/api/getVideoUrl'>/api/getVideoUrl</a>"+
"<br><br>"+
"[POST]<br>"+
"<a href='#'>/api/CreateUrl</a>"+
"<br><br>"+
"[PUT]<br>"+
"<a href='#'>/api/modifyVideo/{url}</a>"+
"<br><br>"+
"[DELETE]<br>"+
"<a href='#'>/api//modifyVideo/{url}</a>";
app.get(`/`, (req, res) => {
  res.status(200).send(body);
});

app.post(`/api/CreateUrl`, (req, res) => {
  const { videoUrl } = req.body;
  if (!videoUrl) return;
  connection.query(`INSERT INTO video (video_url) VALUES (?);`, videoUrl, err => {
    if (err) throw err;
    console.log(`${videoUrl} INSERTED`);
  });
});

app.get('/api/getVideoUrl',  (req, res) => {
  connection.query('SELECT * FROM video;', (err, rows, fields) => {
    if (err) throw err;
    res.status(200).send(rows);
  });
});

app.delete('/api/deleteVideo/:urlId', (req, res) => {
  const { urlId } = req.params;
  if (!urlId) return;
  connection.query('DELETE FROM video WHERE id = ?', urlId, (err, rows, fields) => {
    if (err) throw err;
    console.log(`you delete ${rows.affectedRows} row`);
  });
});

app.put('/api/modifyVideo/:urlId', (req, res) => {
  const { urlId } = req.params;
  const NewvideoUrl = req.body.newName;
  if (!NewvideoUrl) return;
  connection.query('UPDATE video SET video_url = ? WHERE id = ?', [NewvideoUrl, urlId], err => {
    if (err) throw err;
    console.log(`you modify row number ${urlId} for ${NewvideoUrl}`);
  });
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`Server is listening on ${port}`);
});