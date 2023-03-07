import { RichTextEditor } from '@mantine/tiptap';
import Image from './core/image';

const RTEControls = () => {

    return (
        <>
            <RichTextEditor.ControlsGroup>
                <Image.Controls title='Insert responsive image' />
                <Image.Controls isResponsive={false} title='Insert normal image' />
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter/>
                <RichTextEditor.AlignRight />
                <RichTextEditor.AlignJustify />
            </RichTextEditor.ControlsGroup>
        </>
    );
};

export default RTEControls;
