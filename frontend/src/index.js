import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './style/index.css';

const init = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  await root.render(<App />);
};

init();
