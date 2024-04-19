export function readable(n: number) {
  if (n < 1e3)
    return n.toPrecision(4);

  if (n < 1e6)
    return ((n) / 1e3).toString().slice(0, 5) + ' тыс.';

  return ((n) / 1e6).toString().slice(0, 5) + ' млн.';
}

function wrap(n?: number) {
  if (n)
    return '(' + n.toString() + ')';
}
