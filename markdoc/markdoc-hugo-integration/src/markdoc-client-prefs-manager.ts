/**
 * This file is the entry point used to build the client-side bundle,
 * which is then loaded by the Hugo template. It makes the ClientPrefsManager
 * class available to the window object, so that it can be accessed by the
 * client-side code in the browser.
 */
import { ClientPrefsManager } from './helperModules/ClientPrefsManager';

// @ts-ignore
window.clientPrefsManager = ClientPrefsManager.instance;
