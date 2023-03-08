import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

function ThemeProvider({ children }: Props) {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'dark',
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value: ColorScheme) => {
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{ colorScheme }}
                withGlobalStyles
                withNormalizeCSS
            >
                <ModalsProvider>{children}</ModalsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default ThemeProvider;
