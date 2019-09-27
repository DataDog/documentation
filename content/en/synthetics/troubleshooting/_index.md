---
title: Synthetics Troubleshooting
kind: documentation
description: Troubleshoot common Synthetics isses.
beta: true
further_reading:
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "synthetics/browser_tests"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "synthetics/api_tests"
  tag: "Documentation"
  text: "Configure an API Test"
---

If you experience issues setting up or configuring Datadog Synthetics, use this information to begin troubleshooting. If you continue to have trouble, [contact our awesome support team][1].

## Failed requests on a working endpoint

You can sometimes get `5xx` or `4xx` when setting an API or Browser test on your endpoints. This happens most when hitting `Test URL` to perform a fast test, and then the error shows up in your regular test results. However, you know there's not actually an issue, because when you visit your website in a browser (or cURL it), you're getting `2xx`. 

This happens because cURL automatically sets a `user-agent` as a request header, and this also automatically happens when you visit the website in your browser. Datadog API tests and Browser tests don't automatically set a `user-agent`. This can be a problem because some websites ban requests that don't have a `user-agent` set, which causes Datadog API tests and Browser tests to return a `5xx` or `4xx`.

The solution to this problem is to manually set a `user-agent` in your API tests and Browser. Set the `user-agent` in your API or Browser test under **Make a request** > **Advanced Options** > **Header** > **Request Header**. Set the **Name** to `user-agent` and set the **Value** to the `user-agent` value.

The `user-agent` is a standard value used to identify the device and browser accessing to the website. The site can then return information specific to the requester. For example, this is how mobile-optimized sites work. So, if you're on a Mac OS X-based computer using a Safari browser, your `user-agent` value is `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9`. When you're adding a `user-agent` manually to Datadog, you can use any valid `user-agent` value.

{{< img src="synthetics/user-agent.gif" alt="Synthetics home page" responsive="true">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
