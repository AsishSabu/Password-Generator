import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Routes/Router';
import { Provider } from 'react-redux';
import store, { persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Router />
          <Toaster/>
        </BrowserRouter>
      </PersistGate>
    </Provider>

  );
}

export default App;
