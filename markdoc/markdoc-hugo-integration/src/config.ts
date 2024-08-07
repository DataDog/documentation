import { alertDefinition, Alert } from './components/alert';
import { imgDefinition, Img } from './components/img';
import { regionParamDefinition, RegionParam } from './components/regionParam';
import { siteRegionDefinition, SiteRegion } from './components/siteRegion';

export const transformConfig = {
  tags: {
    alert: alertDefinition,
    img: imgDefinition,
    'region-param': regionParamDefinition,
    'site-region': siteRegionDefinition
  }
};

export const customComponents = {
  Alert,
  Img,
  RegionParam,
  SiteRegion
};
