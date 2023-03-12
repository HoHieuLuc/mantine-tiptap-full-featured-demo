import { Stack, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { ImageSettingsForm } from '../image.type';

interface Props {
    form: UseFormReturnType<ImageSettingsForm>;
}

const ImageSettingsGeneral = ({ form }: Props) => {
    return (
        <Stack spacing='xs'>
            {form.values.src.startsWith('data:image/') ? (
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
        </Stack>
    );
};
export default ImageSettingsGeneral;
