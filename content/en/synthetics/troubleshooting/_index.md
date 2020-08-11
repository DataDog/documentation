---
title: Synthetic Monitoring Troubleshooting
kind: documentation
description: Troubleshoot common Synthetic Monitoring issues.
further_reading:
- link: "/synthetics/"
  tag: "Documentation"
  text: "Manage your Synthetic tests"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API Test"
---

If you experience issues setting up or configuring Datadog Synthetic Monitoring, use this information to begin troubleshooting. If you continue to have trouble, [contact our AWESOME support team][1].

## Browser Tests

### I don't see the login page in the recorder. What is happening?

By default, the iframe/pop up of the recorder uses your own browser. This means that if you’re already logged into your application, the iframe/pop up might directly display a post login page, therefore preventing you from recording your login steps without logging out first.

To be able to record your steps without logging out from your application, just leverage the recorder’s **incognito mode**:

{{< img src="synthetics/incognito_mode.mp4" alt="Using Incognito Mode Browser Tests" video="true"  width="90%" >}}

**Opening a pop up in incognito mode** allows you to start your test’s recording from the start URL set in your test configuration with a session completely isolated from your own browser's main session and user data. 

The freshly opened incognito pop up ignores all your previous browser history: cookies, local data, etc. You are consequently automatically logged out from your account and can start recording your login steps as if you were visiting your website for the first time.

## API & Browser Tests

### Unauthorized errors

If one of your Synthetic tests is throwing a 401, it most likely means that it is unable to authenticate on the endpoint. You should use the method that you use to authenticate on that endpoint (outside of Datadog) and replicate it when configuring your Synthetic test.

* Is your endpoint using **header-based authentication**?
  * **Basic Authentication**: specify the associated credentials in the **Advanced options** of your [HTTP][2] or [Browser test][3].
  * **Token based authentication**: extract your token with a first [HTTP test][2], create a [global variable][4] by parsing the response of that first test, and re-inject that variable in a second [HTTP][5] or [Browser test][6] requiring the authentication token.
  * **Session based authentication**: add the required headers or cookies in the **Advanced options** of your [HTTP][2] or [Browser test][3].
  
* Is this endpoint using **query parameters for authentication** (e.g. do you need to add a specific API key in your URL parameters?)

* Is this endpoint using **IP-based authentication**? If so, you might need to allow part or all of the [IPs from which Synthetic tests originate][7].

### Forbidden errors

If you observe `403 Forbidden` errors returned by Synthetic tests, it may be the result of your web server blocking or filtering requests that include the `Sec-Datadog` header.  This header is added to each Synthetic request Datadog initiates to identify the source of the traffic and assist Datadog support in identifying the specific test execution.  

Additionally, you might also have to ensure [Datadog Synthetic Monitoring IP ranges][7] are allowed as traffic sources by your firewalls.

### Missing notifications

Synthetic tests by default do not [renotify][8]. This means that if you add your notification handle (email address, Slack handle, etc.) after a transition got generated (e.g., test going into alert or recovering from a previous alert), no notification is sent for that very transition. A notification will be sent for the next transition.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /synthetics/api_tests/?tab=httptest#make-a-request
[3]: /synthetics/browser_tests/#test-details
[4]: /synthetics/settings/?tab=createfromhttptest#global-variables
[5]: /synthetics/api_tests/?tab=httptest#use-global-variables
[6]: /synthetics/browser_tests/#use-global-variables
[7]: https://ip-ranges.datadoghq.com/synthetics.json
[8]: /synthetics/api_tests/?tab=httptest#notify-your-team
