const rgx = /^.*\.(?:pdf|epub|mobi|doc|docx|ibooks|azw|azw3|kf8|kfx|txt|rtf|fb2|inf|apnx|mbp|mbp1|mbs)$/i;
const bookMediaTypes = ['book', 'compressed', 'document', 'text', 'data', 'backup', 'encoded', 'spreadsheet', 'unknown'];

export const isYaDiskBook = (file: IYaDiskFile) => {
  if (file.name) {
    return rgx.test(file.name) && bookMediaTypes.includes(file.media_type) && file.antivirus_status === 'clean';
  } else {
    return false;
  }
};
