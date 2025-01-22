import mitt from "mitt";

const emitter = mitt();

export default emitter;

export const EVENTS = {
  // for upload-task.jsx
  UPLOADTASK_OPENED: "UPLOADTASK_OPENED",
  UPLOADTASK_CLOSED: "UPLOADTASK_CLOSED",

  // get pictures for main-content.jsx 
  PICTURES_FETCH: "PICTURES_FETCH",
};
