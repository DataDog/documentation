/**
 * This file is the entry point used to build the client-side bundle,
 * which is then loaded by the Hugo template. It makes the ClientFiltersManager
 * class available to the window object, so that it can be accessed by the
 * client-side code in the browser.
 */
import { ClientFiltersManager } from './ClientFiltersManager';

// @ts-ignore
window.clientFiltersManager = ClientFiltersManager.instance;
