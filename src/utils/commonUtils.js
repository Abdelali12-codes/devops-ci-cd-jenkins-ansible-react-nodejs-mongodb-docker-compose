export function renderIf (flag) {
  return function (viewContent) {
    return flag ? viewContent : null;
  };
}