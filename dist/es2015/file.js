export const COMMON_MIME_TYPES = new Map([
    ['avi', 'video/avi'],
    ['gif', 'image/gif'],
    ['ico', 'image/x-icon'],
    ['jpeg', 'image/jpeg'],
    ['jpg', 'image/jpeg'],
    ['mkv', 'video/x-matroska'],
    ['mov', 'video/quicktime'],
    ['mp4', 'video/mp4'],
    ['pdf', 'application/pdf'],
    ['png', 'image/png'],
    ['zip', 'application/zip'],
    ['doc', 'application/msword'],
    ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
]);
export function toFileWithPath(file, path) {
    const f = withMimeType(file);
    const { webkitRelativePath } = file;
    Object.defineProperty(f, 'path', {
        value: typeof path === 'string'
            ? path
            // If <input webkitdirectory> is set,
            // the File will have a {webkitRelativePath} property
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory
            : typeof webkitRelativePath === 'string' && webkitRelativePath.length > 0
                ? webkitRelativePath
                : file.name,
        writable: false,
        configurable: false
    });
    return f;
}
function withMimeType(file) {
    const { name } = file;
    const hasExtension = name && name.lastIndexOf('.') !== -1;
    if (hasExtension && !file.type) {
        const ext = name.split('.')
            .pop().toLowerCase();
        const type = COMMON_MIME_TYPES.get(ext);
        if (type) {
            Object.defineProperty(file, 'type', {
                value: type,
                writable: false,
                configurable: false
            });
        }
    }
    return file;
}
//# sourceMappingURL=file.js.map