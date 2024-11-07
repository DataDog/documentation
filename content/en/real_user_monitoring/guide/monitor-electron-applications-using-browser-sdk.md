---
title: Monitor Electron Applications Using the Browser SDK

description: Learn how to monitor desktop applications built with Electron through the browser RUM SDK.
further_reading:
  - link: '/real_user_monitoring/'
    tag: 'Documentation'
    text: 'Learn about Real User Monitoring'
---

## Overview

[Electron][1] is an open source framework that can be used to build cross-platform macOS and Windows desktop applications.

You can install and configure the Datadog Browser SDK to start monitoring applications built using Electron.

**Note**: The Browser SDK only supports monitoring the *renderer processes* of an application. It does not initialize or monitor anything installed on the *main process*. For more information, see Electron's documentation on its [renderer process][3].

{{< img src="real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk/diagram_electron-js-browser-rum.png" alt="The Datadog Browser SDK only supports monitoring the renderer processes of an Electron application" style="width:100%" >}}

## Installation

To install the Datadog Browser SDK to support Electron apps:

1. Set up and install [RUM Browser Monitoring][2] inside **every renderer process**, following the steps for CDN sync, CDN async, or npm.

2. Set the `allowFallbackToLocalStorage` parameter to `true` in the RUM initialization configuration of each renderer process, as shown below. 

   **Note**: This setting allows Datadog to collect RUM data without relying on browser cookies.
   
   - If you are targeting pages **available on the internet** (using the `https://` protocol), you **do not** need this parameter.
   - if you are embedding pages **inside your application** (using the `file://` protocol), Datadog needs to store sessions in local storage, as cookies are not available. 

   ```javascript
   datadogRum.init({
     applicationId: '<DATADOG_APPLICATION_ID>',
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     ...
     allowFallbackToLocalStorage: true
     });
   ```
 
3. Once you've configured the SDK correctly, your data populates the [RUM Explorer][4].

## Troubleshooting

### Support for hybrid Electron applications
The same-origin policy prevents tracking an application for the same session in which pages load from both local (`file://`) and remote (`http(s)://`).

This means that an application that uses Electron to embed a landing page, then later redirects the user to a website hosted on the Internet results in two sessions being created for that user - one for the embedded local files (`file://`) landing part of the application, and one for the remote part (`https://` files available on the internet).

### Short-lived sessions for instances with multiple windows at once
An issue with local storage replication latency between windows can cause a short-lived session to be created (<1 second). To work around this, ensure multiple windows are created and initialized with a gap of more than 10 ms.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.electronjs.org/
[2]: /real_user_monitoring/browser/setup
[3]: https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process
[4]: /real_user_monitoring/explorer/
