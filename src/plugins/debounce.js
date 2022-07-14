let debounce = (fn) => {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn()
    }, 2000);
  }
}

export default debounce