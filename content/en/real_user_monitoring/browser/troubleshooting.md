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

If you experience unexpected behavior with Datadog RUM, there are a few common issues you can investigate and this guide may help resolve issues quickly. Reach out to [Datadog support][1] for further assistance. We also recommend regularly updating to the latest version of the [RUM Browser SDK][2], as each release contains improvements and fixes.

## Missing data

If you can't see any RUM data or that data is missing for some users, here are the common causes and recommended fixes:

| Common causes                                                                                               | Recommended fix                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Ad blockers][3] prevent the Browser RUM SDK from being downloaded or from sending the data to Datadog.     | Some ad blockers extend their restrictions to performance and marketing tracking tools. We recommend [installing the Browser RUM SDK via npm][4] and [forwarding the collected data through a proxy][5]. |
| Network rules or VPN prevent the Browser RUM SDK from being downloaded or from sending the data to Datadog. | You may need to grant access to the endpoints required to download the SDK or to send the data. The list of endpoints is available in our [CSP documentation][6].                                        |

You may also want to check our [Content Security Policy guidelines][6] to make sure your website successfully grants access to the Browser RUM SDK CDN and the intake endpoint.

### Check that the Browser RUM SDK is initialized

Run the `window.DD_RUM.getInternalContext()` command in your browser console and check that an `application_id`, `session_id`, and view object are returned:

{{< img src="real_user_monitoring/browser/troubleshooting/success_rum_internal_context.png" alt="Successful get internal context command">}}

If the SDK is not installed, or if it is not successfully initialized, you may see the `ReferenceError: DD_RUM is not defined` error like the one below:

{{< img src="real_user_monitoring/browser/troubleshooting/error_rum_internal_context.png" alt="Error get internal context command">}}

You can also check in your browser console if you notice any errors related to the loading of the Browser RUM SDK.

### Check that data is sent to the Datadog intake

The Browser RUM SDK sends batches of data periodically to the Datadog intake. You should see network requests targeting `/v1/input` (the URL origin part may differ due to RUM configuration) in the Network section of your browser Developer Tools:

{{< img src="real_user_monitoring/browser/troubleshooting/network_intake.png" alt="RUM requests to Datadog intake">}}

## RUM Cookies

The Browser RUM SDK relies on cookies to group all events generated from a unique [user session][7]. The cookies are 1st party (they are set on your domain) and are not used for cross-site tracking. Here are the cookies set by the Browser RUM SDK:

| Cookie name        | Details                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_dd_s`             | Session cookie, used to group all events generated from a unique user session across multiple pages. It is extended for an extra 15 minutes when the user interacts with the website, in the limit of the maximum user session duration of 4 hours. It also contains whether the session should be sampled. |
| `dd_site_test_*`   | Temporary cookie used to test for cookie support. Expires instantly.                                                                                                                                                                                                                                     |
| `dd_cookie_test_*` | Temporary cookie used to test for cookie support. Expires instantly.                                                                                                                                                                                                                                     |

**Note**: The following cookies have been used in the past: `_dd_l`, `_dd_r` and `_dd`. They have since been replaced by `_dd_s` in recent versions of the SDK and had the same purpose.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://github.com/DataDog/browser-sdk/blob/master/CHANGELOG.md
[3]: https://en.wikipedia.org/wiki/Ad_blocking
[4]: /real_user_monitoring/browser/#npm
[5]: /real_user_monitoring/faq/proxy_rum_data/?tab=npm
[6]: /real_user_monitoring/faq/content_security_policy/
[7]: /real_user_monitoring/browser/data_collected/?tab=session
