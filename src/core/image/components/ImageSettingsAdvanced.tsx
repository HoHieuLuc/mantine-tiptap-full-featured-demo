import { Stack, MultiSelect, Group, NumberInput, Switch } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useState } from 'react';
import { ImageExtensionOptions, ImageSettingsForm } from '../image.type';

interface Props {
    form: UseFormReturnType<ImageSettingsForm>;
    imageExtensionOptions: ImageExtensionOptions;
}

const ImageSettingsAdvanced = ({ form, imageExtensionOptions }: Props) => {
    const [selectedClasses, setSelectedClasses] = useState(
        form.values['data-class'].split(' ').filter(Boolean)
    );
    const [classes, setClasses] = useState([
        ...new Set([...imageExtensionOptions.classes, ...selectedClasses]),
    ]);

    return (
        <Stack spacing='xs'>
            <MultiSelect
                label='Class'
                data={classes}
                searchable
                hoverOnSearchChange
                creatable
                onCreate={(query) => {
                    setClasses((prev) => [...prev, query]);
                    return query;
                }}
                getCreateLabel={(query) => `Add ${query}`}
                clearable
                value={selectedClasses}
                onChange={(value) => {
                    setSelectedClasses(value);
                    form.setFieldValue('data-class', value.join(' '));
                }}
                withinPortal
            />
            <Group align='center' grow noWrap>
                <NumberInput
                    label='Width'
                    {...form.getInputProps('width')}
                    disabled={form.values['data-responsive']}
                    stepHoldDelay={500}
                    stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                    min={1}
                />
                <NumberInput
                    label='Height'
                    {...form.getInputProps('height')}
                    disabled={form.values['data-responsive']}
                    stepHoldDelay={500}
                    stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                    min={1}
                />
                <Switch
                    label='Responsive'
                    checked={form.values['data-responsive']}
                    {...form.getInputProps('data-responsive')}
                    pt={25}
                />
            </Group>
        </Stack>
    );
};
export default ImageSettingsAdvanced;
