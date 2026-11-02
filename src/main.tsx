import * as React from 'react';
import { createRoot } from 'react-dom/client'
import './lib/fitScreen'
import App from './App'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);