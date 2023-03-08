import { Box, Image } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { NodeViewRendererProps, NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';
import { makeMoveable, Scalable, ScalableProps } from 'react-moveable';
import { scalableImageComponentDataAttributes } from './ImageExtension';
import ImagePopover from './ImagePopover';

const Moveable = makeMoveable<ScalableProps>([Scalable]);

interface Props extends NodeViewRendererProps {
    updateAttributes({
        width,
        height,
    }: {
        width: number;
        height: number;
    }): void;
}

const ImageScalable = (props: Props) => {
    const [isImageFocused, setIsImageFocused] = useState(false);
    const imageRef = useClickOutside<HTMLDivElement>(() =>
        setIsImageFocused(false)
    );
    const [{ width, height }, setContainerRect] = useState({
        width: props.node.attrs.width as number,
        height: props.node.attrs.height as number,
    });

    return (
        <Box
            component={NodeViewWrapper}
            className='image-component'
            pos='relative'
            data-drag-handle
            sx={{
                width: width,
                height: height,
            }}
        >
            <ImagePopover
                opened={isImageFocused}
                positionDependencies={[width, height]}
            >
                <Image
                    {...props.node.attrs}
                    imageProps={{
                        width: width,
                        height: height,
                    }}
                    withPlaceholder
                    ref={imageRef}
                    onClick={() => setIsImageFocused(true)}
                    fit='fill'
                />
            </ImagePopover>
            {isImageFocused && (
                <Image
                    {...props.node.attrs}
                    withPlaceholder
                    pos='absolute'
                    top={0}
                    opacity={0.3}
                    fit='fill'
                />
            )}
            <Moveable
                target={isImageFocused ? imageRef : null}
                scalable={true}
                keepRatio={
                    props.node.attrs[
                        scalableImageComponentDataAttributes.DATA_RESPONSIVE
                    ] === 'true'
                }
                origin={false}
                throttleScale={0}
                renderDirections={['se']}
                snappable={true}
                bounds={{
                    left: 10,
                    top: 10,
                    position: 'css',
                }}
                onScale={(e) => {
                    e.target.style.transform = e.drag.transform;
                    setContainerRect({
                        width: e.target.getBoundingClientRect().width,
                        height: e.target.getBoundingClientRect().height,
                    });
                }}
                onScaleEnd={(e) => {
                    props.updateAttributes({
                        width: e.target.getBoundingClientRect().width,
                        height: e.target.getBoundingClientRect().height,
                    });
                    e.target.style.transform = '';
                    //imageRef.current.click();
                    setIsImageFocused(false);
                }}
            />
        </Box>
    );
};

export default ImageScalable;
