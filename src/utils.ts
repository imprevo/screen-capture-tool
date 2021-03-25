export const downloadFile = (href: string, file: string) => {
  const link = document.createElement("a");
  document.body.appendChild(link);
  link.style.display = "none";
  link.href = href;
  link.download = file;
  link.click();
  window.URL.revokeObjectURL(href);
};

export const createFileName = (date: Date, ext: string) => {
  const name = [
    "capture",
    date.getFullYear(),
    date.getMonth(),
    date.getDay(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  ].join("-");
  return `${name}.${ext}`;
};
