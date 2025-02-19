/**
 * All custom tag definitions required to build
 * the configuration object that is expected by Markdoc
 * in order for it to parse our file content correctly,
 * and expected by our own custom render function as a source
 * of custom JSX templates and other rendering logic.
 *
 * You can read more about the Markdoc config object here:
 * https://markdoc.dev/docs/config
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
import { nextlinkDefinition, Nextlink } from './components/nextlink';
import { whatsnextDefinition, Whatsnext } from './components/whatsnext';

export const transformConfig = {
  tags: {
    alert: alertDefinition,
    img: imgDefinition,
    'region-param': regionParamDefinition,
    'site-region': siteRegionDefinition,
    tabs: tabsDefinition,
    tab: tabDefinition,
    x: xDefinition,
    callout: calloutDefinition,
    nextlink: nextlinkDefinition,
    whatsnext: whatsnextDefinition
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
  Callout,
  Nextlink,
  Whatsnext
};
