export const sleep = async (ms: number) => new Promise(res => {
  setTimeout(res, ms);
});
