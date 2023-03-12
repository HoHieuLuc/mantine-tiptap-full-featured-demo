import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
    content: {
        'p:has(span.node-imageComponent)': {
            display: 'flex',
            flexWrap: 'wrap',
            wordBreak: 'break-word',
            '&[style*="text-align: center"]': {
                justifyContent: 'center',
            },
            '&[style*="text-align: right"]': {
                justifyContent: 'end',
            },
            '&[style*="text-align: left"]': {
                justifyContent: 'start',
            },
            '&[style*="text-align: justify"]': {
                justifyContent: 'space-between',
            },
        },
        'span.node-imageComponent': {
            height: '100%',
        },
        '.border-10px-white': {
            border: '10px solid white',
        },
        '.my-50px': {
            marginTop: 50,
            marginBottom: 50,
        },
        'img': {
            marginBottom: 0,
        },
    },
}));