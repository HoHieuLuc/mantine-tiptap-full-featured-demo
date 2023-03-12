import { Box, Button, Group, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import {
    ImageExtensionNodeViewRenderedProps,
    ImageSettingsForm,
} from '../image.type';
import ImageSettingsAdvanced from './ImageSettingsAdvanced';
import ImageSettingsGeneral from './ImageSettingsGeneral';

const ImageSettingsModal = ({
    node: { attrs },
    extension,
    updateAttributes,
}: ImageExtensionNodeViewRenderedProps) => {
    const form = useForm<ImageSettingsForm>({
        initialValues: {
            src: attrs.src,
            title: attrs.title || '',
            alt: attrs.alt || '',
            width: attrs.width || extension.options.defaultWidth,
            height: attrs.height || extension.options.defaultHeight,
            'data-responsive': !!attrs['data-responsive'],
            'data-class': attrs['data-class'] || '',
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        updateAttributes(values);
    };

    return (
        <Box component='form' onSubmit={form.onSubmit(handleSubmit)}>
            <Tabs defaultValue='general'>
                <Tabs.List>
                    <Tabs.Tab value='general'>General</Tabs.Tab>
                    <Tabs.Tab value='advanced'>Advanced</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value='general' pt='xs'>
                    <ImageSettingsGeneral form={form} />
                </Tabs.Panel>

                <Tabs.Panel value='advanced' pt='xs'>
                    <ImageSettingsAdvanced
                        form={form}
                        imageExtensionOptions={extension.options}
                    />
                </Tabs.Panel>
            </Tabs>
            <Group position='right' mt='xs'>
                <Button
                    color='gray'
                    type='button'
                    onClick={() => modals.close('image-settings')}
                >
                    Cancel
                </Button>
                <Button type='submit'>Save</Button>
            </Group>
        </Box>
    );
};
export default ImageSettingsModal;
