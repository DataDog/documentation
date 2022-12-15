---
title: Tips when using browser's developer tools
kind: guide
further_reading:
    - link: '/real_user_monitoring/browser'
      tag: 'Documentation'
      text: 'RUM Browser Monitoring'
    - link: '/logs/log_collection/javascript'
      tag: 'Documentation'
      text: 'Browser Log Collection'
---

## Overview

This guide provides some tips when using the browser's developer tools to debug an application instrumented with the Datadog browser SDKs.

## File and line number mismatch in DevTools console

The browser SDK instruments the console functions (`console.error`, but also `.log`, `.info` and `.warn`) to collect data about the behavior of the application.
This leads to inconvenient side-effects, as shown below:
{{< img src="real_user_monitoring/guide/devtools-tips/issue_console.jpg" alt="Devtools console showing issue about wrong file and line numbers for a console.error statement.">}}

In the picture above, the `console.error` function is instrumented. As a developer, it is expected to see the real file and line number on which this statement was called. However, instead of displaying `VM505:1`, the console shows `datadog-rum-v4.js:1`.

### Add scripts to your browser ignore list

Most browsers allow developers to select scripts and add them to an ignore list. Doing so for `datadog-rum-v*.js` and `datadog-logs-v*.js` ensures the DevTools display the proper file and line number.

How to use this feature on Google Chrome:
{{< img src="real_user_monitoring/guide/devtools-tips/script_ignore_list.jpg" alt="How to add script to the ignore list in Google Chrome.">}}

In the console tab, expand the output from the console statement. Right-click on each script you wish to ignore, and select the option 'add script to ignore list'.
Note: The ignore list can be managed in Developer Tools > Settings > Ignore List

This method works well when using the CDN (sync/async) installation methods. If you are using the NPM package, make sure that you have sourcemaps enabled. Else, SDK code may be bundled with your application code, preventing DevTools to ignore the SDK.

Another advantage from using the ignore list is seen in the network panel:
{{< img src="real_user_monitoring/guide/devtools-tips/network_initiator.jpg" alt="Network initiator properly showing after adding scripts to ignore list.">}}

Instead of displaying the browser SDK as the initiator of the request, the proper file and line number are shown for the application.

## Remove noise in the network tab

The browser SDKs send several network requests to record an application's behavior. This can generate a significant number of lines in the network tab, and makes it hard to spot the requests initiated by your application. Most browsers allow to filter the requests coming from the browser SDKs.

Below an example of this feature on Google Chrome:
{{< img src="real_user_monitoring/guide/devtools-tips/network_ignore_intake.jpg" alt="Network panel filtering browser SDKs requests.">}}

In the network tab, add a filter of the form `-url:intake-datadoghq.com` (update the pattern to match the url of your [datacenter's intake][1], or the one of your [proxy][2]).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site
[2]: /real_user_monitoring/guide/proxy-rum-data
