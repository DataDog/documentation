/**
 * Build the configuration objects required
 * to provide custom components to Markdoc.
 */
import { alertDefinition, Alert } from './components/alert';
import { imgDefinition, Img } from './components/img';
import { regionParamDefinition, RegionParam } from './components/regionParam';
import { siteRegionDefinition, SiteRegion } from './components/siteRegion';
import { tabDefinition, Tab } from './components/tab';
import { tabsDefinition, Tabs } from './components/tabs';
import { fenceDefinition, Fence } from './components/fence';
import { xDefinition, X } from './components/x';
import { calloutDefinition, Callout } from './components/callout';

export const transformConfig = {
  tags: {
    alert: alertDefinition,
    img: imgDefinition,
    'region-param': regionParamDefinition,
    'site-region': siteRegionDefinition,
    tabs: tabsDefinition,
    tab: tabDefinition,
    x: xDefinition,
    callout: calloutDefinition
  },
  nodes: {
    fence: fenceDefinition
  }
};

export const customComponents = {
  Alert,
  Img,
  RegionParam,
  SiteRegion,
  Tabs,
  Tab,
  Fence,
  X,
  Callout
};
