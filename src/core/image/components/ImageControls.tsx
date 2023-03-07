import { RichTextEditor, RichTextEditorControlProps, useRichTextEditorContext } from '@mantine/tiptap';
import { IconPhotoPlus } from '@tabler/icons-react';
import { useRef } from 'react';
import imageService from '../image.service';
import { scalableImageComponentDataAttributes } from './ImageExtension';

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
        const base64 = await imageService.upload(file);
        image.src = base64;
        await image.decode();
        editor
            .chain()
            .insertContentAt(editor.state.selection.head, {
                type: 'imageComponent',
                attrs: {
                    src: base64,
                    alt: image.alt,
                    width: image.width,
                    height: image.height,
                    [scalableImageComponentDataAttributes.DATA_RESPONSIVE]:
                        isResponsive ? 'true' : 'false',
                },
            })
            .focus()
            .run();
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
            />
        </RichTextEditor.Control>
    );
};

export default ImageControl;
