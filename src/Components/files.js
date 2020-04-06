export const saveAsJson = (contents, name) => () => {
  const a = document.createElement('a');
  const blob = new Blob([contents], { type: 'application/json' });
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
};

export const saveAsCSV = (data, name) => () => {
  let contents = '';
  Object.keys(data).forEach((key) => {
    contents += `${key},"${Array.isArray(data[key]) ? data[key].join('\n') : data[key]}"\n`;
  });
  const a = document.createElement('a');
  const blob = new Blob([contents], { type: 'text/csv' });
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
};

export const copyToClipboard = (text) => {
  const tag = document.createElement('textarea');
  tag.innerText = text;
  document.body.appendChild(tag);

  tag.select();
  tag.setSelectionRange(0, 99999);

  document.execCommand('copy');
  tag.remove();
};
