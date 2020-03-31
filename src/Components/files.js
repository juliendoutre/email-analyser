export const saveAsJson = (contents, name) => () => {
    let a = document.createElement("a");
    let blob = new Blob([contents], { type: "application/json" });
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
};


export const saveAsCSV = (data, name) => () => {
    let contents = "";
    Object.keys(data).forEach((key) => {
        contents += key + ',"' + (Array.isArray(data[key]) ? data[key].join('\n') : data[key]) + '"\n';
    });
    let a = document.createElement("a");
    let blob = new Blob([contents], { type: "text/csv" });
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
};
