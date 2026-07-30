import 'dotenv/config';
import {v2 as cloudinary} from "cloudinary";


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

export const SigGen = ()=>{
    const timestamp = Math.round(new Date().getTime()/1000)

    const signature = cloudinary.utils.api_sign_request({
        folder:"File_Uploader_Project",
        timestamp
    },
    process.env.CLOUDINARY_API_SECRET)

    return {
        signature: signature,
        timestamp: timestamp,
        api_key: process.env.CLOUDINARY_API_KEY,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME
    };
}