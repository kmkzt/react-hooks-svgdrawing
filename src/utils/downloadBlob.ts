interface DownloadParam {
  base64: string
  filename: string
  mimeType: string
}
export const downloadBlob = ({ base64, filename, mimeType }: DownloadParam) => {
  const bin = atob(base64.replace(/^.*,/, ''))
  const buffer = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) {
    buffer[i] = bin.charCodeAt(i)
  }
  // Blobを作成
  const blob = new Blob([buffer.buffer], {
    type: mimeType
  })
  // 画像をダウンロードする
  if (window.navigator.msSaveBlob) {
    // for IE
    window.navigator.msSaveBlob(blob, filename)
  } else if (window.URL && window.URL.createObjectURL) {
    // for Firefox, Chrome, Safari
    const a = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } else {
    // for Other
    window.open(base64, '_blank')
  }
}
