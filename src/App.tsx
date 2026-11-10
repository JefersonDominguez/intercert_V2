import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useParams, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { COUNTRIES } from './config/countries';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Home = React.lazy(() => import('./pages/Home'));
const CertificateVerification = React.lazy(() => import('./pages/CertificateVerification'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));
const CertificateDetail = React.lazy(() => import('./pages/CertificateDetail'));
const CompanyResults = React.lazy(() => import('./pages/CompanyResults'));

const VALID_COUNTRY_CODES = Object.values(COUNTRIES)
    .map((country) => country.code)
    .filter((code): code is string => !!code && code !== 'global');

function CountryValidator({ children }: { children: React.ReactNode }) {
    const { countryCode } = useParams<{ countryCode: string }>();

    if (countryCode && !VALID_COUNTRY_CODES.includes(countryCode)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout><Outlet /></Layout>}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/form-successfully-received" element={<Home />} />
                <Route path="/verify-certificate" element={<CertificateVerification />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/certificate" element={<CertificateDetail />} />
                <Route path="/company-results" element={<CompanyResults />} />

                <Route path="/:countryCode" element={<CountryValidator><Outlet /></CountryValidator>}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="form-successfully-received" element={<Home />} />
                    <Route path="verify-certificate" element={<CertificateVerification />} />
                    <Route path="search-results" element={<SearchResults />} />
                    <Route path="certificate" element={<CertificateDetail />} />
                    <Route path="company-results" element={<CompanyResults />} />
                </Route>
            </Route>
        </Routes>
    );
}

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <Router>
                    <ScrollToTop />
                    <Suspense fallback={<LoadingSpinner />}>
                        <AppRoutes />
                    </Suspense>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </Router>
            </HelmetProvider>
        </QueryClientProvider>
    );
}

export default App;
