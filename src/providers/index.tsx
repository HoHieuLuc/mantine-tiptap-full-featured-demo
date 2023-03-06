import ReactQueryProvider from './ReactQueryProvider';
import ThemeProvider from './ThemeProvider';

interface Props {
    children: React.ReactNode;
}

const AppProvider = ({ children }: Props) => {
    return (
        <ReactQueryProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </ReactQueryProvider>
    );
};

export default AppProvider;
