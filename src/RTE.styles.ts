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
    },
}));