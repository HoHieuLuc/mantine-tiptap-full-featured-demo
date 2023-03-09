import { NodeViewRendererProps } from '@tiptap/react';

export interface ScalableImageOptions {
    HTMLAttributes: Record<string, unknown>;
    defaultWidth: number;
    defaultHeight: number;
    maxWidth: number;
    maxHeight: number;
}

export interface ScalableImageAttrs {
    src: string;
    alt?: string;
    title?: string;
    width?: number;
    height?: number;
    'data-responsive'?: 'true' | 'false',
    'data-image-component'?: 'true' | 'false',
}

type Node = NodeViewRendererProps['node'] & {
    attrs: ScalableImageAttrs;
};

type NodeViewRendererPropsExtension = NodeViewRendererProps['extension'];

interface Extension extends NodeViewRendererPropsExtension {
    options: ScalableImageOptions;
}

export interface ScalableImageNodeViewRenderedProps extends NodeViewRendererProps {
    updateAttributes(attrs: Partial<ScalableImageAttrs>): void;
    node: Node;
    extension: Extension;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        imageComponent: {
            setScalableImage(attrs: ScalableImageAttrs): ReturnType;
        }
    }
}
