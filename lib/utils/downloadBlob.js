export const downloadBlob = ({ base64, filename, mimeType }) => {
    const bin = atob(base64.replace(/^.*,/, ''));
    const buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    const blob = new Blob([buffer.buffer], {
        type: mimeType
    });
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else if (window.URL && window.URL.createObjectURL) {
        const a = document.createElement('a');
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
