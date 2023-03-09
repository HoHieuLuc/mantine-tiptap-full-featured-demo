import { ActionIcon, Popover, PopoverProps } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { openModal } from '@mantine/modals';
import ImageSettingsModal from './ImageSettingsModal';
import { ScalableImageNodeViewRenderedProps } from '../image.type';

interface Props extends PopoverProps {
    children: React.ReactNode;
    nodeViewRenderedProps: ScalableImageNodeViewRenderedProps;
}

const ImagePopover = ({ children, nodeViewRenderedProps, ...props }: Props) => {
    return (
        <Popover
            withinPortal
            position='right'
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
                <ActionIcon
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
                >
                    <IconSettings />
                </ActionIcon>
            </Popover.Dropdown>
        </Popover>
    );
};
export default ImagePopover;
