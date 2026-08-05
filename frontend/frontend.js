const files = e.dataTransfer.files;

if (files.length === 0) return; 

console.log("File Grabbed!");

let accessToken="";

const handleLogin = async (username,passowrd)=>{

    try{
        const response = await fetch('http://localhost:8000/api/auth/login',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
        });

        const data = await response.json();

        accessToken = data.accessToken;
        console.log("Login Successful");
    }
    catch(err){
        console.log(err.message);
    }
}

const handleUpload = (file) => {
    try {
        const response = await fetch('http//localhost:8000/api/sign',{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${accessToken}` 
            }
        })

        if (!response.ok) {
            throw new Error(`Backend error! Status: ${response.status}`);
        }

        const authData = await response.json();
        const { signature, timestamp, api_key, cloud_name } = authData;
        
        const formData = new FormData();
        formData.append('file',files);
        formData.append('signature',signature);
        formData.append('timestamp',timestamp);
        formData.append('api_key',api_key);
        formData.append('folder',"File_Uploader_Project");

        const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

        console.log("Uploading directly to Cloudinary...");

        const result = await fetch(url,{
            method:"POST",
            body:formData,
        })

        const imageData = await result.json();
        const imageURL = imageData.url;

        const uploadResponse = await fetch('http//localhost:8000/api/files/upload',{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${accessToken}`
            },
            body:JSON.stringify({imageURL})
        })

        const uploadResult = await uploadResponse.json();

        console.log("Successfully Added to Backend" , uploadResult);
    }
    catch(err){
        console.log(err.message);
        
    }
}





