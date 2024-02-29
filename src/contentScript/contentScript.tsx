import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { BreadcrumbItem, BreadcrumbsBar, Button, Icon, Toast } from 'monday-ui-react-core';
import { Board, Item, Subitems } from 'monday-ui-react-core/icons';
import 'monday-ui-style/dist/index.css';

import { getStoredOptions, LocalStorageOptions } from '../utils/storage';

import './contentScript.css';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState(false);

  let audioURL = chrome.runtime.getURL('error_sound.wav');
  let myAudio = new Audio(audioURL);

  const handleClick = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      myAudio.play();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const actions = useMemo(
    () => [
      {
        type: Toast.actionTypes.BUTTON,
        content: 'Go to item',
      },
      {
        type: Toast.actionTypes.BUTTON,
        content: 'Open details',
      },
    ],
    []
  );

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setIsActive(options.hasAutoOverlay);
    });
  }, []);

  return (
    <div className="black-app-theme">
      <Toast
        open={isOpen}
        actions={actions}
        type={Toast.types.NEGATIVE}
        autoHideDuration={10000}
        onClose={handleClose}
        className="toast-container"
      >
        <header className="toast-header">
          <h1>An error occured</h1>

          <p>
            Reiciendis quam non odit alias rerum repellendus, illum, repellat blanditiis maxime
            earum iure molestias accusantium quasi, vitae laudantium animi explicabo dolore numquam
            rem provident nisi. Provident suscipit iste minus inventore.
          </p>
        </header>

        <BreadcrumbsBar type={BreadcrumbsBar.types.NAVIGATION} className="toast-breadcrumbs">
          <BreadcrumbItem text="Board name" icon={Board} />
          <BreadcrumbItem text="Item name" icon={Item} />
          <BreadcrumbItem text="Subitem name" icon={Subitems} />
        </BreadcrumbsBar>
      </Toast>

      <Button onClick={handleClick} className="floating-button">
        Open Toast
      </Button>
    </div>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
