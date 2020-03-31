const insertIn = (header, headers) => {
    if (header.name != null) {
        if (header.name in headers) {
            if (Array.isArray(headers[header.name])) {
                headers[header.name].push(header.contents);
            } else {
                headers[header.name] = [headers[header.name], header.contents];
            }
        } else {
            headers[header.name] = header.contents;
        }
    }
};

export default (text) => {
    let headers = {};
    let last_parsed_header = { name: null, contents: null };

    for (let line of text.split('\n')) {
        if (line !== "") {
            const matches = line.match(/^[-\w]*:/);

            if (matches != null && matches.length > 0) {
                insertIn(last_parsed_header, headers);

                last_parsed_header.name = matches[0].replace(':', '');
                last_parsed_header.contents = line.replace(matches[0], '').trim();
            } else {
                if (last_parsed_header.contents !== "") {
                    last_parsed_header.contents += '\n';
                }
                last_parsed_header.contents += line.trim();
            }
        }
    }

    insertIn(last_parsed_header, headers);

    return headers;
};
