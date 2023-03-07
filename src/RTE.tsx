import { Anchor, Box, Overlay, Paper, Switch, Text } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from './core/image';
import RTEControls from './RTEControls';
import { useStyles } from './RTE.styles';
import { useDisclosure } from '@mantine/hooks';

const RTE = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.Extension,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: `
            <p>resizable image with responsive style</p>
            <img src="/nails.png" data-image-component='true' data-responsive='true' />
            <p>normal resizable image</p>
            <img src="/nails.png" width="300" height="200" data-image-component='true' />
        `,
    });
    const [showHtml, { toggle }] = useDisclosure();

    const { classes } = useStyles();

    return (
        <Box p={10}>
            <Box pos='relative'>
                <RichTextEditor
                    editor={editor}
                    classNames={classes}
                    styles={{
                        content: {
                            overflowX: 'auto',
                        },
                    }}
                >
                    <RichTextEditor.Toolbar>
                        <RTEControls />
                    </RichTextEditor.Toolbar>

                    <RichTextEditor.Content />
                </RichTextEditor>
                {showHtml && <Overlay />}
            </Box>
            <Switch onClick={toggle} label='Show HTML string' />
            {showHtml && (
                <>
                    <Text>Raw HTML:</Text>
                    <Paper sx={{ wordBreak: 'break-word' }} withBorder p={10}>
                        {editor?.getHTML()}
                    </Paper>
                </>
            )}
            <Text>Result:</Text>
            <Paper
                dangerouslySetInnerHTML={{
                    __html: editor?.getHTML() || '',
                }}
                className={classes.content}
                withBorder
                p={10}
            />
            <Anchor href='https://tiptap.dev/guide/node-views#render-java-scriptvuereact'>
                https://tiptap.dev/guide/node-views#render-java-scriptvuereact
            </Anchor>
        </Box>
    );
};

export default RTE;
