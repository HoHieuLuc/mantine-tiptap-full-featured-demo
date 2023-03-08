import { ActionIcon, Popover, PopoverProps } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { openModal } from '@mantine/modals';
import ImageSettingsModal from './ImageSettingsModal';

interface Props extends PopoverProps {
    children: React.ReactNode;
}

const ImagePopover = ({ children, ...props }: Props) => {
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
                            children: <ImageSettingsModal />,
                            withinPortal: true,
                            centered: true,
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
