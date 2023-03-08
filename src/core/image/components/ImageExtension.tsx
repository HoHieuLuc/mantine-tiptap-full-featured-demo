import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ImageScalable from './ImageScalable';

export const scalableImageComponentDataAttributes = {
    DATA_RESPONSIVE: 'data-responsive',
    DATA_IMAGE_COMPONENT: 'data-image-component',
};

interface ImageNodeViewOptions {
    HTMLAttributes: Record<string, unknown>;
}

export default Node.create<ImageNodeViewOptions>({
    name: 'imageComponent',
    group: 'inline',
    inline: true,
    atom: true,
    draggable: true,

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

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
            [scalableImageComponentDataAttributes.DATA_RESPONSIVE]: {
                parseHTML: (element) =>
                    element.getAttribute(
                        scalableImageComponentDataAttributes.DATA_RESPONSIVE
                    ),
                default: 'false',
            },
            [scalableImageComponentDataAttributes.DATA_IMAGE_COMPONENT]: {
                default: 'true',
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'img',
                getAttrs: (element) => {
                    if (typeof element === 'string') return false;
                    return element.hasAttribute('data-image-component') && null;
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'span',
            {
                class: 'node-imageComponent',
                [scalableImageComponentDataAttributes.DATA_IMAGE_COMPONENT]: 'true',
            },
            [
                'img',
                mergeAttributes(
                    this.options.HTMLAttributes,
                    HTMLAttributes,
                    HTMLAttributes[
                        scalableImageComponentDataAttributes.DATA_RESPONSIVE
                    ] === 'true'
                        ? {
                            style:
                                `width: 100%;` +
                                `height: ${
                                    HTMLAttributes.height as number
                                }px;` +
                                `object-fit: scale-down;`,
                        }
                        : {}
                ),
            ],
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageScalable);
    },
});
