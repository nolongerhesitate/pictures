import mitt from "mitt";

const emitter = mitt();

export default emitter;

export const EVENTS = {
  UPLOADTASK_OPENED: 'UPLOADTASK_OPENED',
  UPLOADTASK_CLOSED: 'UPLOADTASK_CLOSED',
};
