import { Box, Grid, NumberInput } from '@mantine/core';

const ImageSettingsModal = () => {
    return (
        <Box>
            <Grid>
                <Grid.Col span={3}>Width:</Grid.Col>
                <Grid.Col span={9}>
                    <NumberInput min={10} max={16384} />
                </Grid.Col>
                <Grid.Col span={3}>Height:</Grid.Col>
                <Grid.Col span={9}>
                    <NumberInput min={10} max={16384} />
                </Grid.Col>
            </Grid>
        </Box>
    );
};
export default ImageSettingsModal;
