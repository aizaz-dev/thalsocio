const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: 'assets/post',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const uploadFilter =function (req, file, cb)  {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetyp = file.mimetype;
    if (
        extension !== '.jpg' ||
        extension !== '.jpeg' ||
        extension !== '.png' ||
        mimetyp !== 'image/png' ||
        mimetyp !== 'image/jpg' ||
        mimetyp !== 'image/jpeg'
    ) {
        cb(null, true);
    }
  };

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10 //15mb
    },
    fileFilter:uploadFilter
})



module.exports.upload=upload