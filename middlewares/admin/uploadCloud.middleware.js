const cloudinary = require("cloudinary").v2; 
const streamifier = require("streamifier");

// Cloudinary
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_KEY, 
        api_secret: process.env.CLOUD_SECRET,
    });
// End Cloudinary

module.exports.uploadCloudinary = async (req, res, next) => {
  if (!req.file) {
    console.log("No file uploaded");
    return next();
  }

  try {
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    const result = await streamUpload();
    console.log(result.secure_url);

    req.body[req.file.fieldname] = result.secure_url;
    next();
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
};