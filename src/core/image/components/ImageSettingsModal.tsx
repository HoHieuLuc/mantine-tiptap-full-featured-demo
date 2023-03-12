import { Box, Button, Group, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import {
    ImageExtensionNodeViewRenderedProps,
    ImageSettingsForm,
} from '../image.type';
import { calculateImageSize } from '../utils/calculate-image-size';
import ImageSettingsAdvanced from './ImageSettingsAdvanced';
import ImageSettingsGeneral from './ImageSettingsGeneral';

const ImageSettingsModal = ({
    node: { attrs },
    extension: { options },
    updateAttributes,
}: ImageExtensionNodeViewRenderedProps) => {
    const form = useForm<ImageSettingsForm>({
        initialValues: {
            src: attrs.src,
            title: attrs.title || '',
            alt: attrs.alt || '',
            width: attrs.width || options.defaultWidth,
            height: attrs.height || options.defaultHeight,
            'data-responsive': !!attrs['data-responsive'],
            'data-class': attrs['data-class'] || '',
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        const isResponsive = form.values['data-responsive'];
        if (
            isResponsive &&
            attrs['data-original-width'] &&
            attrs['data-original-height']
        ) {
            const [width, height] = calculateImageSize({
                width: attrs['data-original-width'] || options.defaultWidth,
                height: attrs['data-original-height'] || options.defaultHeight,
                maxWidth: form.values.width,
                maxHeight: form.values.height,
            });
            updateAttributes({
                ...values,
                width,
                height,
            });
            form.setValues({
                width,
                height,
            });
            return;
        }
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
                        imageExtensionOptions={options}
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
