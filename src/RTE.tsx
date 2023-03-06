import { Anchor, Box, Overlay, Switch } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import ImageNodeView from './core/image/components/ImageNodeView';
import RTEControls from './RTEControls';
import { useStyles } from './RTE.styles';
import { useDisclosure } from '@mantine/hooks';

const RTE = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageNodeView,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: `
            <p>hello</p>
            <img />
            <p>world</p>
        `,
    });
    const [showHtml, { toggle }] = useDisclosure();

    const { classes } = useStyles();

    return (
        <Box p={10}>
            <Switch onClick={toggle} />
            <Box pos='relative'>
                <RichTextEditor editor={editor} classNames={classes}>
                    <RichTextEditor.Toolbar>
                        <RTEControls />
                    </RichTextEditor.Toolbar>

                    <RichTextEditor.Content />
                </RichTextEditor>
                {showHtml && <Overlay />}
            </Box>
            {showHtml && <Box sx={{ wordBreak: 'break-word' }}>{editor?.getHTML()}</Box>}
            <Anchor href='https://tiptap.dev/guide/node-views#render-java-scriptvuereact'>
                https://tiptap.dev/guide/node-views#render-java-scriptvuereact
            </Anchor>
        </Box>
    );
};

export default RTE;
