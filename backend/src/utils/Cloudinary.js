import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload_On_Cloudinary = async (localfilepath) => {
  try {
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
      access_mode:"public"
    });
    fs.unlinkSync(localfilepath);
    return response.url;
  } catch (error) {
    fs.unlinkSync(localfilepath);
    console.log(
      "Cloudinary.js :: Error Occured While File Uploading on Cloudinary",
      error,
    );
  }
};



export { upload_On_Cloudinary};
