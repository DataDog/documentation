import { alertDefinition, Alert } from './components/alert';
import { imgDefinition, Img } from './components/img';

export const transformConfig = {
  tags: {
    alert: alertDefinition,
    img: imgDefinition
  }
};

export const customComponents = {
  Alert,
  Img
};
