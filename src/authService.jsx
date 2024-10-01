import { useNavigate } from 'react-router-dom';

export const logoutUser = () => {
    //const navigate = useNavigate();
    localStorage.clear();
    //navigate('/');
};