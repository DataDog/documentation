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

To be able to record your steps without logging out from your application, just leverage the recorder’s incognito mode:

{{< img src="synthetics/incognito_mode.mp4" alt="Using Incognito Mode Browser Tests" video="true"  width="90%" >}}

Opening a pop up in incognito mode allows you to start your test’s recording from the start URL set in your test configuration with a session completely isolated from your own browser's main session and user data. The freshly opened incognito pop up ignores all your previous browser history: cookies, local data, etc. You are consequently automatically logged out from your account and can start recording your login steps as if you were visiting your website for the first time.

## API & Browser Tests

### Forbidden errors

When creating Synthetics tests, you might get `403 Forbidden` errors at first. It's coming from the `Sec-Datadog: Request sent by a Datadog Synthetics Browser Test (https://docs.datadoghq.com/synthetics/) - test_id: <TEST_ID>` header that is automatically being sent by Datadog.
Make sure this header is not blacklisted by your servers in order to remove this error.
Additionally, you might also have to whitelist [Datadog Synthetics IP ranges][2] to make sure Datadog servers are allowed to send requests to your infrastructure.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://ip-ranges.datadoghq.com/synthetics.json
