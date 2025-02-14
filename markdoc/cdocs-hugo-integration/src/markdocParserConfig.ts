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
import { alertDefinition, Alert } from './helperModules/markdocCustomization/tags/alert';
import { imgDefinition, Img } from './helperModules/markdocCustomization/tags/img';
import {
  regionParamDefinition,
  RegionParam
} from './helperModules/markdocCustomization/tags/regionParam';
import {
  siteRegionDefinition,
  SiteRegion
} from './helperModules/markdocCustomization/tags/siteRegion';
import { tabDefinition, Tab } from './helperModules/markdocCustomization/tags/tab';
import { tabsDefinition, Tabs } from './helperModules/markdocCustomization/tags/tabs';
import { fenceDefinition, Fence } from './helperModules/markdocCustomization/tags/fence';
import { xDefinition, X } from './helperModules/markdocCustomization/tags/x';
import {
  calloutDefinition,
  Callout
} from './helperModules/markdocCustomization/tags/callout';
import {
  nextlinkDefinition,
  Nextlink
} from './helperModules/markdocCustomization/tags/nextlink';
import {
  whatsnextDefinition,
  Whatsnext
} from './helperModules/markdocCustomization/tags/whatsnext';

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
