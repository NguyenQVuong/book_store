// const path = require('path')
// const multer = require('multer');

// const storage = multer.diskStorage({

//     destination: function(req, file, cb) {
//         cb(null, path.join(__dirname, './public/img'));
//     },

//     filename: function(req, file, cb) {
//         if(file.mimetype == 'image/png' ||
//         file.mimetype == 'image/jpg' ||
//         file.mimetype == 'image/jpeg' ||
//         file.mimetype == 'image/gif') {
//             cb(null, true);
//         }
//         else {
//             cb(null, false)
//         }
//     }

// })

// const upload = multer({ storage: storage }).single('image')
// module.exports = upload