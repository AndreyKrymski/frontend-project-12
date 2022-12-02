import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './style/index.css';

App().then((vdom) => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(vdom);
});
