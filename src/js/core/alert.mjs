export function toast(msg, ms = 2000) {
  const div = Object.assign(document.createElement('div'), {
    className: 'toast',
    textContent: msg,
  });
  document.body.append(div);
  setTimeout(() => div.remove(), ms);
}