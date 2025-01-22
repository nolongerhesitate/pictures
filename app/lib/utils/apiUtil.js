import instance from "./axiosInstance";

export default {
  uploadPictures(formData) {
    return instance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getAllPictures(page, limit = 30) {
    return instance.get(`/getPictures?page=${page}&limit=${limit}`);
  },
  downloadPictureById(pictureId) {
    return instance.get(`/downloadPictureById?pictureId=${pictureId}`, {
      responseType: "blob",
    });
  },
};
