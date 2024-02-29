import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import './popup.css';
import {
  setStoredCities,
  setStoredOptions,
  getStoredCities,
  getStoredOptions,
  LocalStorageOptions,
} from '../utils/storage';
import { Messages } from '../utils/messages';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('');
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return;
    }
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput('');
    });
  };

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleTempScaleButtonClick = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
    };
    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions);
    });
  };

  const handleOverlayButtonClick = () => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
        }
      }
    );
  };

  if (!options) {
    return null;
  }

  return <div></div>;
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
