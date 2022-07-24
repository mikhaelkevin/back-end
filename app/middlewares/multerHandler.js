const multer = require('multer');
const { ErrorResponse } = require('../../utils/errorResponse');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const imageAllowed = file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg';
    const isProfilePicture = imageAllowed && file.fieldname === 'profilePicture';
    const isCoverImage = imageAllowed && file.fieldname === 'coverImage';
    const isAppPicture = imageAllowed && file.fieldname === 'appPicture';
    if (isProfilePicture) return callback(null, './public/profilePicture');
    if (isCoverImage) return callback(null, './public/coverImage');
    if (isAppPicture) return callback(null, './public/appPicture');
  },
  filename: (req, file, callback) => {
    let fileName;
    if (file.fieldname === 'profilePicture') fileName = `Profile-${Date.now()}-${file.originalname}`;
    if (file.fieldname === 'coverImage') fileName = `Cover-${Date.now()}-${file.originalname}`;
    if (file.fieldname === 'appPicture') fileName = `APP-${Date.now()}-${file.originalname}`;
    callback(null, fileName);
  }
});

const uploadFile = multer({
  storage,
  fileFilter: async (req, file, callback) => {
    console.log('file', file);
    const uploadRules = {
      imageFormat: file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg',
      pictureField: file.fieldname === 'profilePicture' || file.fieldname === 'coverImage' || file.fieldname === 'appPicture'
    };

    const pictureFormatNotValid = uploadRules.pictureField && !uploadRules.imageFormat;

    // User & Recipe validate for file format
    if (pictureFormatNotValid) return callback(new ErrorResponse('Sorry, only png/jpg/jpeg is allowed', 400), false);
    callback(null, true);
  }
});

const multerFields = uploadFile.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]);
const multerSingle = uploadFile.single('appPicture');
module.exports = { multerFields, multerSingle };
