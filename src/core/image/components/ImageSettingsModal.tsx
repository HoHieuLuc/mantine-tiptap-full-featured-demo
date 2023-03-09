import {
    Button,
    Group,
    NumberInput,
    Stack,
    Switch,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { ScalableImageNodeViewRenderedProps } from '../image.type';

const ImageSettingsModal = ({
    node: { attrs },
    updateAttributes,
}: ScalableImageNodeViewRenderedProps) => {
    const form = useForm({
        initialValues: {
            src: attrs.src,
            title: attrs.title,
            alt: attrs.alt,
            width: attrs.width || 0,
            height: attrs.height || 0,
            'data-responsive': attrs['data-responsive'] === 'true',
        },
        validate: {
            width: (value) =>
                value <= 0 ? 'Width must be greater than 0' : null,
            height: (value) =>
                value <= 0 ? 'Height must be greater than 0' : null,
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        updateAttributes({
            ...values,
            'data-responsive': values['data-responsive'] ? 'true' : 'false',
        });
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack spacing='xs'>
                {attrs.src.startsWith('data:image/') ? (
                    <TextInput
                        label='Source'
                        defaultValue='Base 64 image is hidden to save performance'
                        readOnly
                    />
                ) : (
                    <TextInput label='Source' {...form.getInputProps('src')} />
                )}
                <TextInput label='Title' {...form.getInputProps('title')} />
                <TextInput
                    label='Alternative description'
                    {...form.getInputProps('alt')}
                />
                <Group align='center' noWrap>
                    <NumberInput
                        label='Width'
                        {...form.getInputProps('width')}
                    />
                    <NumberInput
                        label='Height'
                        {...form.getInputProps('height')}
                    />
                    <Switch
                        label='Responsive'
                        checked={form.values['data-responsive']}
                        {...form.getInputProps('data-responsive')}
                        pt={25}
                    />
                </Group>
                <Group position='right'>
                    <Button
                        color='gray'
                        type='button'
                        onClick={() => modals.close('image-settings')}
                    >
                        Cancel
                    </Button>
                    <Button type='submit'>Save</Button>
                </Group>
            </Stack>
        </form>
    );
};
export default ImageSettingsModal;
