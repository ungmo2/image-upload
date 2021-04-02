/*  DEPENDENCIES */
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5500;

app.use(express.static('public'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Setup File upload */
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      // public/img 폴더에 파일을 저장한다. public/img 폴더가 존재해야 한다.
      cb(null, 'public/img/');
    },
    filename(req, file, cb) {
      // 전송된 파일 자신의 이름으로 파일을 저장한다.
      cb(null, file.originalname);
    }
  })
});

/* ROUTERS */
app.post('/upload', upload.single('img'), (req, res) => {
  console.log('UPLOAD SUCCESS!', req.file);
  res.json({ success: true, file: req.file });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
