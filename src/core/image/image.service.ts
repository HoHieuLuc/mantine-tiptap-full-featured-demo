const upload = (file: File): Promise<string> => {
    return Promise.resolve(URL.createObjectURL(file));
};

export default {
    upload,
};
