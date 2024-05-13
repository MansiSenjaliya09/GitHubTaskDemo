import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Router from './routes';
import ThemeProvider from './theme';

export default function App() {
  return (
    <>
      <HelmetProvider>
        <BrowserRouter>
          <ToastContainer />
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}
