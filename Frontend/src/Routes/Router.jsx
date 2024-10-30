import { Routes, Route } from 'react-router-dom';
import Layout from '../Pages/Layout';
import Home from '../Components/Home';
import Login from '../Components/Login';
import Register from '../Components/Register';
import SavedPasswords from '../Components/SavedPasswords';
import { ProtectedRoute, PublicRoute } from './privateRoute';
import PageNotFound from '../Pages/PageNotFound';
const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route path="/" element={<Home />} />
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/saved" element={<SavedPasswords />} />
                </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} /> 
        </Routes>
    );
};

export default Router;
