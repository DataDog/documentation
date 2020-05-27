---
title: Synthetics Troubleshooting
kind: documentation
description: Troubleshoot common Synthetics issues.
further_reading:
- link: "/synthetics/"
  tag: "Documentation"
  text: "Manage your Synthetics tests"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API Test"
---

If you experience issues setting up or configuring Datadog Synthetics, use this information to begin troubleshooting. If you continue to have trouble, [contact our AWESOME support team][1].

## Browser Tests

### I don't see the login page in the recorder. What is happening?

By default, the iframe/pop up of the recorder uses your own browser. This means that if you’re already logged into your application, the iframe/pop up might directly display a post login page, therefore preventing you from recording your login steps without logging out first.

To be able to record your steps without logging out from your application, just leverage the recorder’s **incognito mode**:

{{< img src="synthetics/incognito_mode.mp4" alt="Using Incognito Mode Browser Tests" video="true"  width="90%" >}}

**Opening a pop up in incognito mode** allows you to start your test’s recording from the start URL set in your test configuration with a session completely isolated from your own browser's main session and user data. 

The freshly opened incognito pop up ignores all your previous browser history: cookies, local data, etc. You are consequently automatically logged out from your account and can start recording your login steps as if you were visiting your website for the first time.

## API & Browser Tests

### Unauthorized errors

If one of your Synthetic tests is throwing a 401, it most likely means that it is unable to authenticate on the endpoint. You should use the method that you use to authenticate on that endpoint (outside of Datadog) and replicate it when configuring your Synthetics test.

* Is your endpoint using **header-based authentication**?
  * **Basic Authentication**: specify the associated credentials in the **Advanced options** of your [HTTP][2] or [Browser test][3].
  * **Token based authentication**: extract your token with a first [HTTP test][2], create a [global variable][4] by parsing the response of that first test, and re-inject that variable in a second [HTTP][5] or [Browser test][6] requiring the authentication token.
  * **Session based authentication**: add the required headers or cookies in the **Advanced options** of your [HTTP][2] or [Browser test][3].
  
* Is this endpoint using **query parameters for authentication** (e.g. do you need to add a specific API key in your URL parameters?)

* Is this endpoint using **IP-based authentication**? If so, you might need to whitelist part or all of the [IPs from which Synthetics tests originate][7].

### Forbidden errors

When creating Synthetics tests, you might get `403 Forbidden` errors at first. It's coming from the `Sec-Datadog: Request sent by a Datadog Synthetics Browser Test (https://docs.datadoghq.com/synthetics/) - test_id: <TEST_ID>` header that is automatically being sent by Datadog.
Make sure this header is not blacklisted by your servers in order to remove this error.
Additionally, you might also have to whitelist [Datadog Synthetics IP ranges][7] to make sure Datadog servers are allowed to send requests to your infrastructure.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /synthetics/api_tests/?tab=httptest#make-a-request
[3]: /synthetics/browser_tests/#test-details
[4]: /synthetics/settings/?tab=createfromhttptest#global-variables
[5]: /synthetics/api_tests/?tab=httptest#use-global-variables
[6]: /synthetics/browser_tests/#use-global-variables
[7]: https://ip-ranges.datadoghq.com/synthetics.json
