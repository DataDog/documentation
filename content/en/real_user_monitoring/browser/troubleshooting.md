---
title: Troubleshooting
kind: documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
      tag: 'Blog'
      text: 'Real User Monitoring'
    - link: '/real_user_monitoring/faq/content_security_policy/'
      tag: 'Documentation'
      text: 'Content Security Policy'
---

If you experience unexpected behavior with Datadog Browser RUM, this guide may help resolve issues quickly. Reach out to [Datadog support][1] for further assistance. Regularly update to the latest version of the [RUM Browser SDK][2], as each release contains improvements and fixes. 

## Missing data

If you can't see any RUM data or if data is missing for some users:

| Common causes                                                                                               | Recommended fix                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ad blockers prevent the Browser RUM SDK from being downloaded or from sending the data to Datadog.     | Some ad blockers extend their restrictions to performance and marketing tracking tools. [Install the Browser RUM SDK with npm][3] and [forward the collected data through a proxy][4]. |
| Network rules or VPN prevent the Browser RUM SDK from being downloaded or sending data to Datadog. | Grant access to the endpoints required to download the SDK or to send data. The list of endpoints is available in the [Content Security Policy documentation][5].                                        |

Read the [Content Security Policy guidelines][6] and ensure your website grants access to the Browser RUM SDK CDN and the intake endpoint.

### Check that the Browser RUM SDK is initialized

Run the `window.DD_RUM.getInternalContext()` command in your browser console and check that an `application_id`, `session_id`, and view object are returned:

{{< img src="real_user_monitoring/browser/troubleshooting/success_rum_internal_context.png" alt="Successful get internal context command">}}

If the SDK is not installed, or if it is not successfully initialized, you may see the `ReferenceError: DD_RUM is not defined` error like the one below:

{{< img src="real_user_monitoring/browser/troubleshooting/error_rum_internal_context.png" alt="Error get internal context command">}}

You can also check your browser developer tools console or network tab if you notice any errors related to the loading of the Browser RUM SDK.

### Check that data is sent to the Datadog intake

The Browser RUM SDK sends batches of data periodically to the Datadog intake. You should see network requests targeting `/v1/input` (the URL origin part may differ due to RUM configuration) in the Network section of your browser developer tools:

{{< img src="real_user_monitoring/browser/troubleshooting/network_intake.png" alt="RUM requests to Datadog intake">}}

## RUM Cookies

The Browser RUM SDK relies on cookies to store session information and follow a [user session][6] across different pages. The cookies are first-party (they are set on your domain) and are not used for cross-site tracking. Here are the cookies set by the Browser RUM SDK:

| Cookie name        | Details                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_dd_s`             | Cookie used to group all events generated from a unique user session across multiple pages. It contains the current session ID, whether the session is excluded due to sampling, and the expiration date of the session. The cookie is extended for an extra 15 minutes every time the user interacts with the website, up to the maximum user session duration (4 hours).|
| `dd_site_test_*`   | Temporary cookie used to test for cookie support. Expires instantly.                                                                                                                                                                                                                                     |
| `dd_cookie_test_*` | Temporary cookie used to test for cookie support. Expires instantly.                                                                                                                                                                                                                                     |

**Note**: The following cookies have been used in the past: `_dd_l`, `_dd_r` and `_dd`. They have since been replaced by `_dd_s` in recent versions of the SDK and had the same purpose.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://github.com/DataDog/browser-sdk/blob/master/CHANGELOG.md
[3]: /real_user_monitoring/browser/#npm
[4]: /real_user_monitoring/faq/proxy_rum_data/?tab=npm
[5]: /real_user_monitoring/faq/content_security_policy/
[6]: /real_user_monitoring/browser/data_collected/?tab=session
