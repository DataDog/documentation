---
title: Troubleshooting
further_reading:
- link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
  tag: 'Blog'
  text: 'Real User Monitoring'
- link: '/integrations/content_security_policy_logs/'
  tag: 'Documentation'
  text: 'Content Security Policy'
---

If you experience unexpected behavior with Datadog Browser RUM, use this guide to resolve issues quickly. If you continue to have trouble, contact [Datadog Support][1] for further assistance. Regularly update to the latest version of the [RUM Browser SDK][2], as each release contains improvements and fixes.

## Missing data

If you can't see any RUM data or if data is missing for some users:

| Common causes                                                                                               | Recommended fix                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ad blockers prevent the RUM Browser SDK from being downloaded or sending data to Datadog.     | Some ad blockers extend their restrictions to performance and marketing tracking tools. See the [Install the RUM Browser SDK with npm][3] and [forward the collected data through a proxy][4] docs. |
| Network rules, VPNs, or antivirus software can prevent the RUM Browser SDK from being downloaded or sending data to Datadog. | Grant access to the endpoints required to download the RUM Browser SDK or to send data. The list of endpoints is available in the [Content Security Policy documentation][5].                                        |
| Scripts, packages, and clients initialized before the RUM Browser SDK can lead to missed logs, resources, and user actions. For example, initializing ApolloClient before the RUM Browser SDK may result in `graphql` requests not being logged as XHR resources in the RUM Explorer. | Check where the RUM Browser SDK is initialized and consider moving this step earlier in the execution of your application code.                                             |
| If you've set `trackViewsManually: true` and notice that no sessions are present, the application may have suddenly stopped sending RUM information even though there are no network errors. | Be sure to start an initial view once you've initialized RUM to prevent any data loss. See [Advanced Configuration][6] for more information.|

Read the [Content Security Policy guidelines][5] and ensure your website grants access to the RUM Browser SDK CDN and the intake endpoint.

### The RUM Browser SDK is initialized

Check if the RUM Browser SDK is initialized by running `window.DD_RUM.getInternalContext()` in your browser console and verify an `application_id`, `session_id`, and view object are returned:

{{< img src="real_user_monitoring/browser/troubleshooting/success_rum_internal_context.png" alt="Successful get internal context command">}}

If the RUM Browser SDK is not installed, or if it is not successfully initialized, you may see the `ReferenceError: DD_RUM is not defined` error like the one below:

{{< img src="real_user_monitoring/browser/troubleshooting/error_rum_internal_context.png" alt="Error get internal context command">}}

You can also check your browser developer tools console or network tab if you notice any errors related to the loading of the RUM Browser SDK.

**Note**: To ensure accurate results, set `sessionSampleRate` to 100. For more information, see [Configure Your Setup For Browser RUM and Browser RUM & Session Replay Sampling][9].

### Data to the Datadog intake


The RUM SDK sends batches of event data to Datadog's intake every time one of these conditions have been met:

- Every 30 seconds
- When 50 events have been reached
- When the payload is >16 kB
- On `visibility:hidden` or `beforeUnload`

If data is being sent, you should see network requests targeting `/v1/input` (the URL origin part may differ due to RUM configuration) in the Network section of your browser developer tools:

{{< img src="real_user_monitoring/browser/troubleshooting/network_intake.png" alt="RUM requests to Datadog intake">}}

## RUM cookies

The RUM Browser SDK relies on cookies to store session information and follow a [user session][7] across different pages. The cookies are first-party (they are set on your domain) and are not used for cross-site tracking. Here are the cookies set by the RUM Browser SDK:

| Cookie name        | Details                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_dd_s`             | Cookie used to group all events generated from a unique user session across multiple pages. It contains the current session ID, whether the session is excluded due to sampling, and the expiration date of the session. The cookie is extended for an extra 15 minutes every time the user interacts with the website, up to the maximum user session duration (4 hours).|
| `dd_site_test_*`   | Temporary cookie used to test for cookie support. Expires instantly.                                                                                                                                                                                                                                     |
| `dd_cookie_test_*` | Temporary cookie used to test for cookie support. Expires instantly.                                                                                                                                                                                                                                     |

**Note**: The `_dd_l`, `_dd_r`, and `_dd` cookies have been replaced with `_dd_s` in recent versions of the RUM Browser SDK.

## Session IDs, cookies and RUM applications

There is a one-to-one relation between a RUM session and the RUM application it belongs to. Therefore, the domain set for the `_dd_s` cookie is fully dedicated to the RUM application it is monitoring and cannot monitor any additional applications.

## Technical limitations

Each event sent by the RUM Browser SDK is built with the following:

- RUM global context
- Event context (if any)
- Attributes specific to the event

Example:

```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('global', {'foo': 'bar'})
window.DD_RUM && window.DD_RUM.addAction('hello', {'action': 'qux'})
```

The example code creates the following action event:

```json
{
  "type": "action",
  "context": {
    "global": {
      "foo": "bar"
    },
    "action": "qux"
  },
  "action": {
    "id": "xxx",
    "target": {
      "name": "hello"
    },
    "type": "custom"
  },
  ...
}
```

If an event or a request goes beyond any of the following limitations, it is rejected by the Datadog intake.

| Property                                 | Limitation   |
| ---------------------------------------- | ------------ |
| Maximum number of attributes per event   | 256          |
| Maximum attribute depth per event        | 20           |
| Maximum event size                       | 256 KB       |
| Maximum intake payload size              | 5 MB         |

## "Customer data exceeds the recommended threshold" warning

The RUM browser SDK allows you to set [global context][10], [user information][11] and [feature flags][12] which are then included with the collected events.

To minimize the user bandwidth impact, the RUM browser SDK throttles the data sent to the Datadog intake. However, sending large volumes of data can still impact the performance for users on slow internet connections.

For the best user experience, Datadog recommends keeping the size of the global context, user information, and feature flags below 3KiB. If the data exceeds this limit, a warning is displayed: `The data exceeds the recommended 3KiB threshold.`

Since v5.3.0, the RUM Browser SDK supports data compression via the `compressIntakeRequest` [initialization parameter][13]. When enabled, this recommended limit is extended from 3KiB to 16KiB.

## Cross origin read blocking warning

On Chromium-based browsers, when the RUM Browser SDK sends data to the Datadog intake, a CORB warning is printed in the console: `Cross-Origin Read Blocking (CORB) blocked cross-origin response`.

The warning is shown because the intake returns a non-empty JSON object. This behavior is a reported [Chromium issue][8]. It does not impact the RUM Browser SDK and can safely be ignored.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: /real_user_monitoring/browser/setup/#npm
[4]: /real_user_monitoring/guide/proxy-rum-data/
[5]: /integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[6]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[7]: /real_user_monitoring/browser/data_collected/?tab=session
[8]: https://bugs.chromium.org/p/chromium/issues/detail?id=1255707
[9]: /real_user_monitoring/guide/sampling-browser-plans/
[10]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context
[11]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#user-session
[12]: /real_user_monitoring/guide/setup-feature-flag-data-collection/?tab=browser
[13]: /real_user_monitoring/browser/setup/#initialization-parameters
