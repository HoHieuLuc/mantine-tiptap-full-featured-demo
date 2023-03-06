import ReactDOM from 'react-dom/client';
import AppProvider from './providers';
import RTE from './RTE';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AppProvider>
        <RTE />
    </AppProvider>
);
