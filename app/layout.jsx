import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/globalContext';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';
import 'photoswipe/dist/photoswipe.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'PropertyPulse | Find The Perfect Rental',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, find properties',
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang='en'>
            <body>
                <Navbar />
                <main>
                    {children}
                </main>
                <Footer />
                <ToastContainer />
            </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
