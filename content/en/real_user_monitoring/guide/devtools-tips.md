---
title: Tips When Using Browser Developer Tools
kind: guide
further_reading:
    - link: '/real_user_monitoring/browser'
      tag: 'Documentation'
      text: 'RUM Browser Monitoring'
    - link: '/logs/log_collection/javascript'
      tag: 'Documentation'
      text: 'Browser Log Collection'
---

## Overviews

This guide provides some tips when using browser developer tools (DevTools) which are included in modern browsers to debug an application instrumented with a Datadog browser SDK.

## Ensure file and line numbers match in the DevTools console

The browser SDK instruments the console functions (`console.error`, but also `.log`, `.info` and `.warn`) to collect data about the behavior of the application.
This may lead to the DevTool console displaying the incorrect line number and file, as shown below:
{{< img src="real_user_monitoring/guide/devtools-tips/issue_console.png" alt="DevTools console showing issue about wrong file and line numbers for a console.error statement.">}}

In the picture above, the `console.error` function is instrumented. Notice that instead of displaying the actual file and line number on which this statement was called, `VM505:1`, the console shows `datadog-rum.js:1`.

### Adding scripts to your browser ignore list to display the correct file and line number

Most browsers allow developers to select scripts and add them to an ignore list. To display the correct file and line number, you can add the following scripts to your browser's ignore list: `datadog-rum*.js` and `datadog-logs*.js`.

Below is an example of where to find this feature in Google Chrome.
{{< img src="real_user_monitoring/guide/devtools-tips/script_ignore_list.png" alt="How to add script to the ignore list in Google Chrome.">}}

In the console tab, expand the output from the console statement. Right-click on each script you wish to ignore, and select the option **add script to ignore list**.\
**Note**: The ignore list can be managed in **Developer Tools > Settings > Ignore List**

This method works well when using the [CDN (sync/async) installation methods][3]. If you are using the NPM package method, make sure that you have `sourcemaps` enabled. Otherwise, the SDK code may be bundled with your application code, preventing DevTools from ignoring the SDK.

Another advantage of using the ignore list can be seen in the network panel:
{{< img src="real_user_monitoring/guide/devtools-tips/network_initiator.png" alt="Network initiator properly showing after adding scripts to ignore list.">}}

Instead of displaying the browser SDK as the initiator of the request, the correct file and line number are shown for the application.

## Remove noise in the network tab

The browser SDKs send several network requests to record an application's behavior. This can generate a significant number of lines in the network tab, which makes it hard to identify the requests initiated by your application. Most browsers allow you to filter the requests coming from the browser SDKs.

Below an example of this feature in Google Chrome:
{{< img src="real_user_monitoring/guide/devtools-tips/network_ignore_intake.png" alt="Network panel filtering browser SDKs requests.">}}

In the network tab, add a filter of the form `-url:intake-datadoghq.com` (update the pattern to match the url of your [datacenter's intake][1], or the one of your [proxy][2]).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site
[2]: /real_user_monitoring/guide/proxy-rum-data
[3]: /real_user_monitoring/browser/setup/#choose-the-right-installation-method
