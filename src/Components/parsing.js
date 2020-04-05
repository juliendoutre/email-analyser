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

export const parseHeaders = (text) => {
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

export const getStringIfExists = (key, source) => {
    for (let k of Object.keys(source)) {
        if (k.toLowerCase() === key.toLowerCase()) {
            return source[k];
        }
    }

    return "";
}

export const getEmailListFromField = (key, source) => {
    let emailRegexp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    for (let k of Object.keys(source)) {
        if (k.toLowerCase() === key.toLowerCase()) {
            let result = source[k].match(emailRegexp);
            return result !== null ? result : [];
        }
    }

    return [];
}

export const parseNode = (str) => {
    let node = {};

    let ipv4 = str.match(/[\s(,;[](?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\s),;\]]/);
    if (ipv4 !== null && ipv4.length > 0) {
        node['ipv4'] = ipv4[0].replace(/^[\s(,;[]/, '').replace(/[\s),;\]]$/, '');
    }

    let ipv6 = str.match(/([0-9a-f]|:){1,4}(:([0-9a-f]{0,4})*){1,7}/i);
    if (ipv6 !== null && ipv6.length > 0) {
        node['ipv6'] = ipv6[0];
    }

    let dns = str.match(/((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}/gi);
    if (dns !== null && dns.length > 0) {
        node['dns'] = dns[0];
    }

    return node;
};

export const parseRoutingNodes = (lines) => {
    let nodes = [];

    for (let line of lines) {
        let node = {};

        line = line.replace('\n', ' ').replace('\t', ' ');

        let dateStartIndex = line.indexOf(';');
        if (dateStartIndex !== -1) {
            node['timestamp'] = line.substring(dateStartIndex + 1, line.length);
            line = line.substring(0, dateStartIndex);
        }

        let byStartIndex = line.indexOf('by ');
        if (byStartIndex !== -1) {
            node['target'] = parseNode(line.substring(byStartIndex + 3, line.length));
            line = line.substring(0, byStartIndex);
        }

        let fromStartIndex = line.indexOf('from ');
        if (fromStartIndex !== -1) {
            node['source'] = parseNode(line.substring(fromStartIndex + 5, line.length));
        }

        nodes.push(node);
    }

    return nodes;
};
