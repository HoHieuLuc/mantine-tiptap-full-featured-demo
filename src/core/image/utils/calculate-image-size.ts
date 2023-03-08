interface Params {
    width: number;
    height: number;
    maxWidth: number;
    maxHeight: number;
}

/** Calculate new image size respect ratio */
export const calculateImageSize = ({ width, height, maxWidth, maxHeight }: Params) => {
    if (width <= maxWidth && height <= maxHeight) {
        return [width, height];
    }
    
    const ratio = width / height;

    const maximizedToWidth = [maxWidth, maxWidth / ratio];
    const maximizedToHeight = [maxHeight * ratio, maxHeight];

    return maximizedToWidth[1] > maxHeight ? maximizedToHeight : maximizedToWidth;
};