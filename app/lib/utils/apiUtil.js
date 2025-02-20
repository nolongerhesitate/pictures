import instance from "./axiosInstance";

export default {
  uploadPictures(formData) {
    return instance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  // TODO: limit=32
  // Get all pictures when deleted be null, deleted be true, otherwise be true
  getAllPictures(feed, page, deleted = null, limit = 30) {
    return instance.get(`/getPictures?feed=${feed}&page=${page}&deleted=${deleted}&limit=${limit}`);
  },
  downloadPictureById(pictureId) {
    return instance.get(`/downloadPictureById?pictureId=${pictureId}`, {
      responseType: "blob",
    });
  },
  deletePictureByIds(ids) {
    return instance.post(`/deletePictureByIds`, {
      ids
    });
  },
  recyclePictureByIds(ids, type) {
    return instance.post(`/recyclePictureByIds`, {
      ids,
      type
    });
  },
};
