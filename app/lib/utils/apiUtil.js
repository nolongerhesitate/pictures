import instance from "./axiosInstance";

export default {
  uploadPictures(formData) {
    return instance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }
};
