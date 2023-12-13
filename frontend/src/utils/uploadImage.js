

export const checkImage = (file) => {
    let err = ""
    if(!file) return err = "File does not exist."

    if(file.size > 1024 * 1024) 
    
    // 1mb
    
    err = "The largest image size must be 1mb."

    if(file.type !== 'image/jpeg' && file.type !== 'image/png' )
    err = "Image format is not correct."
    
    return err;
}

export const uploadImage = async (images) => {
    let imgArr = [];
    for(const item of images) {
        const formData = new FormData()
        formData.append("file", item)
        formData.append("upload_preset", "fmirnglg")
        formData.append("cloud_name", "dx4ykmm3b")

        console.log(formData)

        const res = await fetch("https://api.cloudinary.com/v1_1/dx4ykmm3b/image/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})
    }
    return imgArr
}