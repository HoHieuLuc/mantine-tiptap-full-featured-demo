import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ImageScalable from './ImageScalable';

export default Node.create({
    name: 'imageComponent',
    group: 'inline',
    inline: true,
    atom: true,
    draggable: true,

    addAttributes() {
        return {
            src: {
                default: '',
            },
            alt: {
                default: '',
            },
            width: {
                default: 200,
            },
            height: {
                default: 200,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'img',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['img', mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageScalable);
    },
});
