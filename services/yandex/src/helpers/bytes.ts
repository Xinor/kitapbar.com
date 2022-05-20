const units = ['bytes', 'kb', 'mb'];

export function bytes(byte: number, fractionDigits: number = 1) {
  if (!byte)
    return '0 bytes';

  const i = Math.floor(Math.log(byte) / Math.log(1024));
  const unit = units[i];

  return `${parseFloat((byte / Math.pow(1024, i)).toFixed(fractionDigits))} ${unit}`;
}
