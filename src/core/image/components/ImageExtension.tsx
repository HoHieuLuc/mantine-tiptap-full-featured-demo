import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ScalableImageOptions } from '../image.type';
import { calculateImageSize } from '../utils/calculate-image-size';
import ImageScalable from './ImageScalable';

export const scalableImageDataAttributes = {
    DATA_RESPONSIVE: 'data-responsive',
    DATA_IMAGE_COMPONENT: 'data-image-component',
};

export default Node.create<ScalableImageOptions>({
    name: 'imageComponent',
    group: 'inline',
    inline: true,
    atom: true,
    draggable: true,

    addOptions() {
        return {
            HTMLAttributes: {},
            defaultHeight: 200,
            defaultWidth: 200,
            useImageSize: false,
            maxWidth: 16384,
            maxHeight: 16384,
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
                default: this.options.defaultWidth,
            },
            height: {
                default: this.options.defaultHeight,
            },
            [scalableImageDataAttributes.DATA_RESPONSIVE]: {
                parseHTML: (element) =>
                    element.getAttribute(
                        scalableImageDataAttributes.DATA_RESPONSIVE
                    ),
                default: 'false',
            },
            [scalableImageDataAttributes.DATA_IMAGE_COMPONENT]: {
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
                    return element.hasAttribute(
                        scalableImageDataAttributes.DATA_IMAGE_COMPONENT
                    ) && null;
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'span',
            {
                class: 'node-imageComponent',
                [scalableImageDataAttributes.DATA_IMAGE_COMPONENT]:
                    'true',
            },
            [
                'img',
                mergeAttributes(
                    this.options.HTMLAttributes,
                    HTMLAttributes,
                    HTMLAttributes[
                        scalableImageDataAttributes.DATA_RESPONSIVE
                    ] === 'true'
                        ? {
                            style:
                                `width: 100%;` +
                                `height: ${
                                    HTMLAttributes.height as number
                                }px;` +
                                `object-fit: contain;`,
                        }
                        : {}
                ),
            ],
        ];
    },

    addCommands() {
        return {
            setScalableImage:
                (options) => ({ commands }) => {
                    const { width, height } = options;
                    const { defaultWidth, defaultHeight, maxWidth, maxHeight } = this.options;
                    const _width = width || defaultWidth;
                    const _height = height || defaultHeight;
                    const [newWidth, newHeight] = calculateImageSize({
                        width: _width,
                        height: _height,
                        maxWidth,
                        maxHeight,
                    });
                    return commands.insertContentAt(
                        this.editor.state.selection.head,
                        {
                            type: this.name,
                            attrs: {
                                ...options,
                                width: newWidth,
                                height: newHeight,
                            },
                        }
                    );
                },
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageScalable);
    },
});
