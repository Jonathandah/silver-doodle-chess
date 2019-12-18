let timer;

export default function debounce(value) {
  clearTimeout(timer);

  timer = setTimeout(() => {
    return value;
  }, 1000);
}
