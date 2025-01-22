// This file contains entities

/** Class representing a Json DataResult */
export class DataResult {
  /**
  * Create a DataResult
  * @param {string} status - It has two values: success or failed;
  * @param {string} message
  * @param {*} data 
  * @param {Pagination} pagination
  */
  constructor(status, message, data = null, pagination = null) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.pagination = pagination;
  }

};

/** Class representing a Pagination */
export class Pagination {
  /**
   * Create a Pagination
   * @param {number} page - It is a current page number;
   * @param {number} limit - It is a page size;
   * @param {number} totalCount - It is a total count of items;
   */
  constructor(page, limit, totalCount) {
    this.page = page;
    this.limit = limit;
    this.totalCount = totalCount;
  }
}

/** Class representing a Picture Entity */
export class Picture {
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
   */
  constructor(path, displayName, uploadTime, size, lastModified, type, width, height, hash, id = null, isDeleted = false) {
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
    this.id = id;
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
export function UploadTask(id, completedCount, totalCount, skippedCount = 0, failedCount = 0, content = "", isCompleted = false, isCanceled = false) {
  return {
    id: id,
    completedCount: completedCount,
    totalCount: totalCount,
    skippedCount: skippedCount,
    failedCount: failedCount,
    content: content,
    isCompleted: isCompleted,
    isCanceled: isCanceled,
  };
}

/**
 * Create an ErrorDetail object
 * @param {number} id
 * @param {string} taskId - It is a relative id of an UploadTask object; 
 * @param {string} fileName
 * @param {string} reason
 * @return {object}
 */
export function ErrorDetail(id, taskId, fileName, reason) {
  return {
    id: id,
    taskId: taskId,
    fileName: fileName,
    reason: reason,
  };
}

