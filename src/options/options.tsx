import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';

import './options.css';
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from '../utils/storage';

type FormState = 'ready' | 'saving';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>('ready');

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
    setOptions({
      ...options,
      hasAutoOverlay,
    });
  };

  const handleSaveButtonClick = () => {
    setFormState('saving');
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState('ready');
      }, 1000);
    });
  };

  if (!options) {
    return null;
  }

  const isFieldsDisabled = formState === 'saving';

  return <div></div>;
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
