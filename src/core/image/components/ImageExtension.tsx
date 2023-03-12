import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import {  ImageExtensionAttributes, ImageExtensionAttrs, ImageExtensionOptions } from '../image.type';
import { calculateImageSize } from '../utils/calculate-image-size';
import ImageExtensionView from './ImageExtensionView';
import { Plugin } from '@tiptap/pm/state';
import imageService from '../image.service';

export default Node.create<ImageExtensionOptions>({
    name: 'imageComponent',
    group: 'inline',
    inline: true,
    draggable: true,

    addOptions(): ImageExtensionOptions {
        return {
            HTMLAttributes: {},
            defaultHeight: 200,
            defaultWidth: 200,
            maxWidth: 16384,
            maxHeight: 16384,
            classes: [],
        };
    },

    addAttributes(): ImageExtensionAttributes {
        return {
            src: {
                default: '',
            },
            alt: {
                default: '',
            },
            title: {
                default: '',
            },
            width: {
                default: this.options.defaultWidth,
            },
            height: {
                default: this.options.defaultHeight,
            },
            ['data-responsive']: {
                parseHTML: (element) =>
                    element.getAttribute('data-responsive') === 'true',
                renderHTML(attributes: ImageExtensionAttrs) {
                    if (!attributes['data-responsive']) {
                        return {};
                    }
                    return {
                        style: [
                            'width: 100%',
                            'height: auto',
                            'object-fit: contain',
                            `max-width: ${attributes.width as number}px`
                        ].join(';'),
                    };
                },
                default: false,
            },
            ['data-class']: {
                parseHTML: (element: HTMLElement) =>
                    element.getAttribute('class'),
                renderHTML: (attrs: ImageExtensionAttrs) => {
                    return {
                        class: attrs['data-class'],
                    };
                },
                default: '',
            }
        };
    },

    parseHTML() {
        return [
            {
                tag: `img[data-type="${this.name}"]`,
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'span',
            {
                class: 'node-imageComponent',
            },
            [
                'img',
                mergeAttributes(
                    {
                        ['data-type']: this.name,
                    },
                    this.options.HTMLAttributes,
                    HTMLAttributes,
                ),
            ],
        ];
    },

    addCommands() {
        return {
            setScalableImage: (options, position) => ({ commands }) => {
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
                    position || this.editor.state.selection.head,
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

    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handlePaste: (_, clipboardEvent, slice) => {
                        const files = clipboardEvent.clipboardData?.files;
                        
                        // handle pasting imageComponent content
                        if (slice.content.firstChild?.type.name === this.name) {
                            this.editor.commands.setScalableImage(
                                slice.content.firstChild.attrs as ImageExtensionAttrs,
                            );
                            return true;
                        }

                        if (!files || files.length === 0) {
                            return false;
                        }

                        // handle pasting file contents
                        for (const file of files) {
                            void imageService.handleImagePasting(this.editor, file);
                        }
                        return true;
                    },
                    handleDrop: (_, dragEvent) => {
                        dragEvent.preventDefault();
                        const droppedFiles = dragEvent.dataTransfer?.files;
                        if (!droppedFiles || droppedFiles.length === 0) {
                            return false;
                        }

                        for (const file of droppedFiles) {
                            void imageService.handleImagePasting(this.editor, file);
                        }
                        return true;
                    },
                }
            }),
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageExtensionView);
    },
});
