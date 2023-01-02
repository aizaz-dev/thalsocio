const multer = require("multer");
const path = require("path");

/*
const storage = multer.diskStorage({
    destination: 'assets/user',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const fileFilter = (req, file, cb) => {
    // reject all files except jpeg
    if (file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 //15mb
    },
    fileFilter:fileFilter
})

*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/user");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });


module.exports.upload=upload