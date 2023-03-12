import { Button, Popover, PopoverProps } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { openModal } from '@mantine/modals';
import ImageSettingsModal from './ImageSettingsModal';
import { ImageExtensionNodeViewRenderedProps } from '../image.type';

interface Props extends PopoverProps {
    children: React.ReactNode;
    nodeViewRenderedProps: ImageExtensionNodeViewRenderedProps;
}

const ImagePopover = ({ children, nodeViewRenderedProps, ...props }: Props) => {
    return (
        <Popover
            withinPortal
            position='bottom'
            styles={{
                dropdown: {
                    background: 'none',
                    border: 'none',
                    padding: 0,
                },
            }}
            {...props}
        >
            <Popover.Target>{children}</Popover.Target>
            <Popover.Dropdown>
                <Button
                    variant='filled'
                    color='blue'
                    onClick={() =>
                        openModal({
                            title: 'Image Settings',
                            modalId: 'image-settings',
                            children: <ImageSettingsModal {...nodeViewRenderedProps} />,
                            withinPortal: true,
                            centered: true,
                            size: 'lg',
                        })
                    }
                    leftIcon={<IconSettings />}
                >
                    Settings
                </Button>
            </Popover.Dropdown>
        </Popover>
    );
};
export default ImagePopover;
