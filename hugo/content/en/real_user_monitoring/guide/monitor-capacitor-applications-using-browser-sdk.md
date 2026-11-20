---
title: Monitor Capacitor Applications Using the Browser SDK
description: Learn how to monitor cross-platform applications built with Capacitor through the browser RUM SDK.
further_reading:
  - link: '/real_user_monitoring/'
    tag: 'Documentation'
    text: 'Learn about Real User Monitoring'
---

## Overview

[Capacitor][1] is an open source native runtime for building Web Native applications that run natively on iOS, Android, and progressive web applications with JavaScript, HTML, and CSS.

You can install and configure the Datadog Browser SDK to start monitoring applications you've built with Capacitor. The configuration provides you with visibility into the JavaScript portion of your application (excludes native application visibility).

**Note**: Applications wrapped by Capacitor to run an **iOS** target uses `capacitor://` as the default scheme to serve local assets.

## Installation

To install the Datadog Browser SDK to support Capacitor apps:

1. Set up and install [RUM Browser Monitoring][3], following the steps for CDN sync, CDN async, or npm.
2. Set the `sessionPersistence` parameter to `"local-storage"` in the RUM initialization configuration.

   **Note**: This setting allows Datadog to collect RUM data without relying on browser cookies.

   ```javascript
   datadogRum.init({
     applicationId: '<DATADOG_APPLICATION_ID>',
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     ...
     sessionPersistence: "local-storage"
   });
   ```

3. Once you've configured the SDK correctly, your data populates the [RUM Explorer][3].

## Troubleshooting

### I only have visibility on the JavaScript portion of my application, but not the native part

This is expected behavior. The native part of a Capacitor application, whether it is through the usage of plugins or custom code, is not monitored. Usually plugins forward a response status that can be tracked from the JavaScript side of the application. However, if a plugin crashes, or the entire application crashes due to native code issues, it is not reported to Datadog.

### Why can't I track hybrid Capacitor applications that target both local and remote assets?

The same-origin policy prevents tracking (using the same session) an application that loads pages from both local (`capacitor://`) and remote (`http(s)://`).

This means that any application using Capacitor to embed a landing page, then later redirects the user to a website hosted on the Internet, can see **two** sessions created for that user:

- One for the (embedded) landing part of the application
- One for the remote part of the application

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://capacitorjs.com/
[2]: /real_user_monitoring/application_monitoring/browser/setup/
[3]: /real_user_monitoring/explorer/
