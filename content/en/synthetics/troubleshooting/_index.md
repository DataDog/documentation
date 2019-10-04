---
title: Synthetics Troubleshooting
kind: documentation
description: Troubleshoot common Synthetics issues.
further_reading:
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your Synthetics tests"
- link: "synthetics/browser_tests"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "synthetics/api_tests"
  tag: "Documentation"
  text: "Configure an API Test"
---

If you experience issues setting up or configuring Datadog Synthetics, use this information to begin troubleshooting. If you continue to have trouble, [contact our AWESOME support team][1].

## API Tests

### Failed requests on a working endpoint

Sometimes you know you have a working endpoint because when you visit your website in a browser (or cURL it), you get `2xx` status code. But when setting an API test on this endpoints or when hitting `Test URL` to perform a fast test you get `5xx` or `4xx` status code.

This happens because cURL automatically sets a `user-agent` as a request header (as your browser), but Datadog API tests don't automatically set one. 
This can be a problem because some websites ban requests that don't have a `user-agent` set, which causes Datadog API tests to return a `5xx` or `4xx` status code.

The solution to this problem is to manually set a `user-agent` in your API tests. Set the `user-agent` in your API test under **Make a request** > **Advanced Options** > **Header** > **Request Header**. Set the **Name** to `user-agent` and set the **Value** to any valid `user-agent` value like `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9` which represents a Mac OS X-based computer using a Safari browser.


{{< img src="synthetics/user-agent.gif" alt="Synthetics home page" responsive="true">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
