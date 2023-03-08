import { Anchor, Box, Overlay, Paper, Switch, Text } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from './core/image';
import RTEControls from './RTEControls';
import { useStyles } from './RTE.styles';
import { useDisclosure } from '@mantine/hooks';

const exampleHtml = /* html */ `
    <div class="mantine-Paper-root mantine-2gyk2x" data-with-border="true">
    <p>resizable image with responsive style</p>
    <p style="text-align: center;">
        <span class="node-imageComponent" data-image-component="true">
            <img src="/NAILS.png"
                alt="" 
                width="200" 
                height="200"
                data-responsive="true"
                data-image-component="true" 
                style="width: 100%;height: 200px;object-fit: scale-down;"
            >
        </span>
    </p>
    <p>normal resizable image</p>
    <p>
        <span class="node-imageComponent" data-image-component="true">
            <img src="/NAILS.png" 
                alt="" 
                width="300" 
                height="200"
                data-image-component="true">
            <img src="/NAILS.png" alt="" width="100" height="100" data-image-component="true">
        </span>
        <img src="/NAILS.png" alt="" width="100" height="100" data-image-component="true">
    </p>
    <img src="/NAILS.png" alt="" width="100" height="100" data-image-component="true">
`;

const RTE = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.Extension,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: exampleHtml,
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
                            display: 'flex',
                            overflowX: 'auto',
                            width: '100%',
                            '& > div': {
                                flexGrow: 1,
                            },
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
            <Switch onClick={toggle} label='Show raw HTML string' />
            {showHtml && (
                <Paper sx={{ wordBreak: 'break-word' }} withBorder p={10} my={10}>
                    {editor?.getHTML()}
                </Paper>
            )}
            <Text>Result:</Text>
            <Paper
                dangerouslySetInnerHTML={{
                    __html: editor?.getHTML() || '',
                }}
                sx={{
                    overflowX: 'auto',
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
