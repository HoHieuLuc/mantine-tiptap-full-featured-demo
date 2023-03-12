import { Editor } from '@tiptap/core';

const upload = (file: File): Promise<string> => {
    return Promise.resolve(URL.createObjectURL(file));
};

const getImage = async (src: string) => {
    const image = new Image();
    image.src = src;
    await image.decode();
    return image;
};

const handleImagePasting = async (editor: Editor, file: File, position?: number) => {
    const imageUrl = await upload(file);
    const image = await getImage(imageUrl);
    editor
        .chain()
        .focus()
        .setScalableImage(
            {
                src: imageUrl,
                alt: image.alt,
                width: image.width,
                height: image.height,
                'data-responsive': true,
                'data-original-width': image.width,
                'data-original-height': image.height,
            },
            position,
        )
        .run();
};

export default {
    upload,
    getImage,
    handleImagePasting,
};
