const multer = require("multer");
const path = require("path");


var profilePicstorage = multer.diskStorage({
    destination: 'assets/user',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const profilePicfileFilter = (req, file, cb) => {
    // reject all files except jpeg
    if (file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

var upload = multer({
    storage: profilePicstorage,
    limits: {
        fileSize: 1024 * 1024 * 15 //15mb
    },
    fileFilter:profilePicfileFilter
})



// module.exports=profilePicUpload
module.exports.upload=upload