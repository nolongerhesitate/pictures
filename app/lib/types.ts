/** Class representing a Json DataResult */
export interface DataResult<T> {
  /**
  * Create a DataResult
  * @param {DataResultStatus} status - It has two values: success or failed;
  * @param {string} message
  * @param {T} data 
  * @param {Pagination} pagination
  */
  status: DataResultStatus;
  message: string;
  data: T;
  pagination: Pagination;
};

export class DataResultImpl<T> implements DataResult<T> {
  status: DataResultStatus;
  message: string;
  data: T;
  pagination: Pagination;

  constructor(status: DataResultStatus, message: string, data?: T, pagination?: Pagination) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.pagination = pagination;
  }
}

export enum DataResultStatus {
  Success = "success",
  Failed = "failed"
}

/** Class representing a Pagination */
export interface Pagination {
  /**
   * Create a Pagination
   * @param {number} page - It is a current page number;
   * @param {number} limit - It is a page size;
   * @param {number} totalCount - It is a total count of items;
   */
  page: number;
  limit: number;
  totalCount: number;
}

/** Class representing a Picture Entity */
export interface Picture {
  /**
   * Create a Picture
   * @param {string} path - Picture whole absolute path
   * @param {string} displayName
   * @param {number} uploadTime - It is a timestamp
   * @param {number} size - Picture size in Bytes
   * @param {number} lastModified - Can be null
   * @param {string} type - Picture type (jpg, png, gif, etc.); 50 length
   * @param {number} width - Picture width in Pixels; can be null
   * @param {number} height - Picture height in Pixels; can be null
   * @param {string} hash - 64 length
   * @param {uuid} id
   * @param {boolean} isDeleted
   * @param {string} thumbFileName - Optional thumbnail file name
   * @param {number} thumbWidth - Optional thumbnail width
   * @param {number} thumbHeight - Optional thumbnail height
   * @param {string} blobUrl - blob url
   */
  id: string;
  path: string;
  displayName: string;
  uploadTime: number;
  size: number;
  lastModified: number;
  type: string;
  width: number;
  height: number;
  hash: string;
  isDeleted: boolean;
  thumbFileName?: string;
  thumbWidth?: number;
  thumbHeight?: number;
  blobUrl?: string,
}

export class PictureImpl implements Picture {
  id: string;
  path: string;
  displayName: string;
  uploadTime: number;
  size: number;
  lastModified: number;
  type: string;
  width: number;
  height: number;
  hash: string;
  isDeleted: boolean;
  thumbFileName?: string;
  thumbWidth?: number;
  thumbHeight?: number;

  constructor(id: string, path: string, displayName: string, uploadTime: number, size: number, lastModified: number, type: string, width: number, height: number, hash: string, isDeleted: boolean) {
    this.id = id;
    this.path = path;
    this.displayName = displayName;
    this.uploadTime = uploadTime;
    this.size = size;
    this.lastModified = lastModified;
    this.type = type;
    this.width = width;
    this.height = height;
    this.hash = hash;
    this.isDeleted = isDeleted;
  }
}

/**
* Create a UploadTask object
* @param {number} id - It can be timestamp;
* @param {number} completedCount
* @param {number} totalCount
* @param {number} skippedCount - Count of skipped items;
* @param {number} failedCount - Count of failed items;
* @param {string} content - It just a test string;
* @param {boolean} isCompleted
* @param {boolean} isCanceled 
* @return {object}
*/
export function createUploadTask(
  id: number,
  completedCount: number,
  totalCount: number,
  skippedCount: number = 0,
  failedCount: number = 0,
  content: string = "",
  isCompleted: boolean = false,
  isCanceled: boolean = false
): UploadTask {
  const uploadTask: UploadTask = {
    id: id,
    completedCount: completedCount,
    totalCount: totalCount,
    skippedCount: skippedCount,
    failedCount: failedCount,
    content: content,
    isCompleted: isCompleted,
    isCanceled: isCanceled,
  };
  return uploadTask;
}
export interface UploadTask {
  id: number;
  completedCount: number;
  totalCount: number;
  skippedCount: number;
  failedCount: number;
  content: string;
  isCompleted: boolean;
  isCanceled: boolean;
}

/**
 * Create an ErrorDetail object
 * @param {number} id
 * @param {string} taskId - It is a relative id of an UploadTask object; 
 * @param {string} fileName
 * @param {string} reason
 * @return {object}
 */
export interface ErrorDetail {
  id: number;
  taskId: number;
  fileName: string;
  reason: string;
}

/**
 * User interface
 */
export interface User {
  id?: string;
  username: string;
  password: string;
  enabled?: boolean;
  description?: string;
}

/**
 * Picture interface
 */
export interface Picture {
  id: string;
  path: string;
  displayName: string;
  uploadTime: number;
  size: number;
  lastModified: number;
  type: string;
  width: number;
  height: number;
  hash: string;
  isDeleted: boolean;
  thumbFileName?: string;
  thumbWidth?: number;
  thumbHeight?: number;
}

/**
 * A type alias for a function that sets the state of a React component
 * useState()
 */
export type SetUseState<S> = React.Dispatch<React.SetStateAction<S>>;
