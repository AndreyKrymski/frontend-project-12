import { useContext } from 'react';
import SocketContexts from '../contexts/SocketContext';

const useSocket = () => useContext(SocketContexts);

export default useSocket;
