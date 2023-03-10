import { Box, Image } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';
import { makeMoveable, Scalable, ScalableProps } from 'react-moveable';
import { ScalableImageNodeViewRenderedProps } from '../image.type';
import { scalableImageDataAttributes } from './ImageExtension';
import ImagePopover from './ImagePopover';

const Moveable = makeMoveable<ScalableProps>([Scalable]);

const ImageScalable = (props: ScalableImageNodeViewRenderedProps) => {
    const [isImageFocused, setIsImageFocused] = useState(false);
    const imageRef = useClickOutside<HTMLDivElement>(() =>
        setIsImageFocused(false)
    );
    const width = props.node.attrs.width;
    const height = props.node.attrs.height;

    return (
        <Box
            component={NodeViewWrapper}
            className='image-component'
            pos='relative'
            data-drag-handle
            sx={{
                width,
                height,
            }}
        >
            <ImagePopover opened={isImageFocused} nodeViewRenderedProps={props}>
                <Image
                    {...props.node.attrs}
                    imageProps={{
                        width,
                        height,
                    }}
                    withPlaceholder
                    ref={imageRef}
                    onClick={() => setIsImageFocused(true)}
                    opacity={isImageFocused ? 0.3 : 1}
                    fit={props.node.attrs['data-responsive'] === 'true' ? 'contain' : 'fill'}
                />
            </ImagePopover>
            {isImageFocused && (
                <Image
                    {...props.node.attrs}
                    withPlaceholder
                    pos='absolute'
                    top={0}
                    fit={props.node.attrs['data-responsive'] === 'true' ? 'contain' : 'fill'}
                />
            )}
            <Moveable
                target={isImageFocused ? imageRef : null}
                scalable={true}
                keepRatio={
                    props.node.attrs[
                        scalableImageDataAttributes.DATA_RESPONSIVE
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
                }}
                onScaleEnd={(e) => {
                    props.updateAttributes({
                        width: e.target.getBoundingClientRect().width,
                        height: e.target.getBoundingClientRect().height,
                    });
                    e.target.style.transform = '';
                   
                    setIsImageFocused(false);
                }}
            />
        </Box>
    );
};

export default ImageScalable;
