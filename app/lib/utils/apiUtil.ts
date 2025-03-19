import instance from "./axiosInstance";
import { DataResult, Picture } from "@/app/lib/types";

export default {
  uploadPictures(formData: FormData): Promise<DataResult<null>> {
    return instance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  // TODO: limit=32
  // Get all pictures when deleted be null, deleted be true, otherwise be true
  getAllPictures(feed: string, page: number, deleted: boolean | null, limit: number = 30)
    : Promise<DataResult<Picture[]>> | Promise<DataResult<null>> {
    return instance.get(`/getPictures?feed=${feed}&page=${page}&deleted=${deleted}&limit=${limit}`);
  },
  downloadPictureById(pictureId: string): Promise<Blob> {
    return instance.get(`/downloadPictureById?pictureId=${pictureId}`, {
      responseType: "blob",
    });
  },
  deletePictureByIds(ids: string[]): Promise<DataResult<null>> {
    return instance.post(`/deletePictureByIds`, {
      ids
    });
  },
  recyclePictureByIds(ids: string[], type: number): Promise<DataResult<null>> {
    return instance.post(`/recyclePictureByIds`, {
      ids,
      type
    });
  },
};
