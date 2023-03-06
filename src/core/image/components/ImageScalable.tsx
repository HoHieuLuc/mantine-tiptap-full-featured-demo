import { Box, Image } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { NodeViewRendererProps, NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';
import Moveable from 'react-moveable';

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
    const imageRef = useClickOutside<HTMLDivElement>(() => setIsImageFocused(false));
    const [{ width, height }, setContainerRect] = useState({
        width: props.node.attrs.width as number,
        height: props.node.attrs.height as number,
    });

    return (
        <Box
            component={NodeViewWrapper}
            className='container image-component'
            pos='relative'
            data-drag-handle
            sx={{
                width: width,
                height: height,
            }}
        >
            <Image
                {...props.node.attrs}
                withPlaceholder
                ref={imageRef}
                onClick={() => setIsImageFocused(true)}
                fit='fill'
            />
            <Moveable
                target={isImageFocused ? imageRef : null}
                scalable={true}
                keepRatio={false}
                origin={false}
                throttleScale={0}
                renderDirections={['se']}
                snappable={true}
                bounds={{
                    left: 0,
                    top: 0,
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
