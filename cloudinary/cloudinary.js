import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const saveImgToCloud = async (imgOrBuffer, folderName = 'images') => {
  try {
    let buffer;
    
    if (!imgOrBuffer) {
      console.error("No image provided");
      return null;
    }

    if (imgOrBuffer.buffer) {
      if (!imgOrBuffer.mimetype.includes('image')) {
        console.error("File is not an image");
        return null;
      }
      buffer = imgOrBuffer.buffer;
    } else {
      buffer = imgOrBuffer;
    }

    const image = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: folderName }, (err, uploadRes) => {
        if (err) {
          return reject(err);
        }
        resolve(uploadRes);
      }).end(buffer);
    }).then(uploadedImg => {
      return {
        image_url: uploadedImg.url,
        image_public_id: uploadedImg.public_id
      };
    }).catch(err => {
      console.error("Error uploading to Cloudinary:", err);
      return null;
    });
    return image;
  } catch (error) {
    console.error("Error processing the image:", error.message);
    return null;
  }
};


const deleteImageFromCloud = async (imageId) => {
  try {
      const result = await cloudinary.uploader.destroy(imageId);
      console.log("Response from Cloudinary:", result);
      if (result.result === 'ok') {
          console.log("Image deleted successfully 💥", imageId);
          return result
      } else {
          console.log("Failed to delete image:", result);
      }
  } catch (err) {
      console.error("Error deleting image from Cloudinary:", err);
  }
};

export { saveImgToCloud, deleteImageFromCloud };
