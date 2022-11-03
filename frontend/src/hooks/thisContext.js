import { useContext } from 'react';
import Contexts from '../contexts/index.js';

const useAuth = () => useContext(Contexts);

export default useAuth;
