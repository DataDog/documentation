---
title: Monitor RUM Data for Electron JS Apps 
kind: guide
beta: true
description: Learn how to monitor desktop applications built with Electron.js through the browser RUM SDK
aliases:
- /real_user_monitoring/guide/getting-started-feature-flags/
further_reading:
  - link: '/real_user_monitoring/'
    tag: 'Documentation'
    text: 'Learn about Real User Monitoring'
---

<div class="alert alert-warning">
    Electron.js support for RUM is in beta.
</div>

## Overview

Electron JS is an open source framework that can be used to build cross-platform macOS and Windows desktop applications.

You can install and configure the Datadog Browser SDK to start monitoring applications built using Electron JS.

## Installation

To install the Datadog Browser SDK to support Electron JS apps:

1. Set up and install [RUM Browser Monitoring][1], following the steps for CDN sync, CDN async, or npm.

2. Set the `allowFallbackToLocalStorage` parameter to true in the RUM initialization configuration of each renderer process:

   ```javascript
   datadogRum.init({
     applicationId: '<DATADOG_APPLICATION_ID>',
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     ...
     allowFallbackToLocalStorage: true
     });
   ```

   **Note**: The Browser SDK only supports monitoring the *renderer processes* of an application. It does not initialize or monitor anything installed on the *main process*.
 
3. Once you've configured the SDK correctly, you will see...tk.

## Troubleshooting

### Support for hybrid Electron JS applications
The same-origin policy prevents tracking an application for the same session in which pages load from both local (`file://`) and remote (`http(s)://`).

This means that an application that uses Electron to embed a landing page, then later redirects the user to a website hosted on the Internet results in two sessions being created for that user - one for the (embedded) landing part of the application, and one for the remote part. 

### Short-lived sessions for instances with multiple windows at once
An issue with local storage replication latency between windows can cause a short-lived session to be created (<1 second). To workaround this, ensure multiple windows are created and initialized with a gap of more than 10 ms.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/#setup