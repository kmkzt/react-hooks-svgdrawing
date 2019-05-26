export var downloadBlob = function (_a) {
    var base64 = _a.base64, filename = _a.filename, mimeType = _a.mimeType;
    var bin = atob(base64.replace(/^.*,/, ''));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    var blob = new Blob([buffer.buffer], {
        type: mimeType
    });
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else if (window.URL && window.URL.createObjectURL) {
        var a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    else {
        window.open(base64, '_blank');
    }
};
