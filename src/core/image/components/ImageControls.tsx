import {
    RichTextEditor,
    RichTextEditorControlProps,
    useRichTextEditorContext,
} from '@mantine/tiptap';
import { IconPhotoPlus } from '@tabler/icons-react';
import { useRef } from 'react';
import imageService from '../image.service';

interface Props extends RichTextEditorControlProps {
    isResponsive?: boolean;
}

const ImageControl = ({ isResponsive = true, ...props }: Props) => {
    const { editor } = useRichTextEditorContext();
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = () => {
        imageInputRef.current?.click();
    };

    const onImageInputChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.currentTarget.files?.[0];
        if (!file) {
            return;
        }
        const image = new Image();
        const imageUrl = await imageService.upload(file);
        image.src = imageUrl;
        await image.decode();
        editor
            .chain()
            .focus()
            .setScalableImage({
                src: imageUrl,
                alt: image.alt,
                width: image.width,
                height: image.height,
                'data-responsive': isResponsive,
                'data-original-width': image.width,
                'data-original-height': image.height,
            })
            .run();
    };

    const onInputClick = (
        event: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
        const element = event.target as HTMLInputElement;
        element.value = '';
    };

    return (
        <RichTextEditor.Control
            onClick={handleUpload}
            aria-label='Insert image'
            title='Insert image'
            {...props}
        >
            <IconPhotoPlus stroke={1.5} size={16} />
            <input
                type='file'
                accept='image/png,image/jpeg'
                style={{ display: 'none' }}
                ref={imageInputRef}
                onChange={(e) => void onImageInputChange(e)}
                onClick={onInputClick}
            />
        </RichTextEditor.Control>
    );
};

export default ImageControl;
