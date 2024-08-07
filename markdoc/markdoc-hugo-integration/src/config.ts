import { alertDefinition, Alert } from './components/alert';
import { imgDefinition, Img } from './components/img';
import { regionParamDefinition, RegionParam } from './components/regionParam';

export const transformConfig = {
  tags: {
    alert: alertDefinition,
    img: imgDefinition,
    'region-param': regionParamDefinition
  }
};

export const customComponents = {
  Alert,
  Img,
  RegionParam
};
