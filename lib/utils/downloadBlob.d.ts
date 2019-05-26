interface DownloadParam {
    base64: string;
    filename: string;
    mimeType: string;
}
export declare const downloadBlob: ({ base64, filename, mimeType }: DownloadParam) => void;
export {};
