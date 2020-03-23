---
title: Identify Synthetics Bots
kind: documentation
description: Identify incoming Synthetics requests
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
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

Some parts of your system might not be available to robots without the right identification, or you might want to avoid collecting analytics from Datadog robots. To detect Datadog robots, use:

* The [headers](#headers) attached to all Datadog robot requests.
* Datadog's [**Synthetics IP ranges**][1].
* The **Advanced options** configuration to set custom headers for your API and browser tests. You can also locally add **cookies, headers, or basic auth** to your API tests and **cookies and headers** to your browser tests.
* The `window._DATADOG_SYNTHETICS_BROWSER` [JavaScript variable in your application code](#datadog-synthetics-browser-variable).

#### Headers

Use the header attached to Datadog robots to detect them for your API and browser tests:

{{< tabs >}}
{{% tab "API Tests" %}}

The following header is attached to all Datadog API tests robots:

`Sec-Datadog: Request sent by a Datadog Synthetics API Test (https://docs.datadoghq.com/synthetics/) - public_id: <SYNTHETICS_TEST_PUBLIC_ID>`

The `x-datadog-origin: synthetics` header is also added to all the requests launched for a Datadog API test.

{{% /tab %}}
{{% tab "Browser tests" %}}

The following header is attached to all Datadog browser tests robots:

`Sec-Datadog: Request sent by a Datadog Synthetics Browser Test (https://docs.datadoghq.com/synthetics/) - public_id: <SYNTHETICS_TEST_PUBLIC_ID>`

{{% /tab %}}
{{< /tabs >}}

##### APM headers

If APM is enabled, [**other APM specific headers**][2] such as `x-datadog-trace-id` are added to all the requests launched for API tests.

#### _DATADOG_SYNTHETICS_BROWSER variable

When a Datadog robot is rendering your application, the `window._DATADOG_SYNTHETICS_BROWSER` variable is set to `true`. To remove the robot actions from your analytics data, wrap your analytics tool code with the following test:

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/synthetics.json
[2]: /synthetics/apm/#how-are-traces-linked-to-tests
