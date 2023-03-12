import { Attribute } from '@tiptap/core';
import { NodeViewRendererProps } from '@tiptap/react';

export interface ImageExtensionOptions {
    HTMLAttributes: Record<string, unknown>;
    defaultWidth: number;
    defaultHeight: number;
    maxWidth: number;
    maxHeight: number;
    classes: Array<string>;
}

export interface ImageExtensionAttrs {
    src: string;
    alt?: string;
    title?: string;
    width?: number;
    height?: number;
    'data-responsive'?: boolean;
    'data-class'?: string;
}

export type ImageExtensionAttributes = Record<keyof ImageExtensionAttrs, Attribute> | object;

type Node = NodeViewRendererProps['node'] & {
    attrs: ImageExtensionAttrs;
};

type NodeViewRendererPropsExtension = NodeViewRendererProps['extension'];

interface Extension extends NodeViewRendererPropsExtension {
    options: ImageExtensionOptions;
}

export interface ImageExtensionNodeViewRenderedProps extends NodeViewRendererProps {
    updateAttributes(attrs: Partial<ImageExtensionAttrs>): void;
    node: Node;
    extension: Extension;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        imageComponent: {
            setScalableImage(attrs: ImageExtensionAttrs, position?: number): ReturnType;
        }
    }
}

export type ImageSettingsForm = Required<ImageExtensionAttrs>;