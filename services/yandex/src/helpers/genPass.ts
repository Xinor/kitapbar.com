import generator from 'generate-password';

export function genPass() {
  return generator.generate({
    length: 20,
    numbers: true
  });
}
