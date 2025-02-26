/**
 * Markdoc takes a configuration object that should contain
 * definitions for any custom tags. This file combines all
 * of our custom tags (such as alert) into
 * that configuration object and exports it.
 *
 * You can read more about the Markdoc config object here:
 * https://markdoc.dev/docs/config
 */
import { alertDefinition, Alert } from './tags/alert';
import { imgDefinition, Img } from './tags/img';
import { regionParamDefinition, RegionParam } from './tags/regionParam';
import { siteRegionDefinition, SiteRegion } from './tags/siteRegion';
import { tabDefinition, Tab } from './tags/tab';
import { tabsDefinition, Tabs } from './tags/tabs';
import { fenceDefinition, Fence } from './tags/fence';
import { xDefinition, X } from './tags/x';
import { calloutDefinition, Callout } from './tags/callout';
import { nextlinkDefinition, Nextlink } from './tags/nextlink';
import { whatsnextDefinition, Whatsnext } from './tags/whatsnext';

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
