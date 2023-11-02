const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
});

const configStorage = (folder) => {
	const storage = new CloudinaryStorage({
		cloudinary,
		allowedFormats: ['jpg', 'png', 'mp3'],
		params: {
			folder: `spotify_fake/${folder}`
		},
	});

	return multer({ storage });
}


module.exports = configStorage;