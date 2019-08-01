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

Some parts of your system might not be available to robots without the right identification, or you might want to avoid collecting analytics from Datadog robots. Use the headers added to Synthetics tests to spot Datadog robots and filter their requests once in your analytics tool.

Header attached to all Datadog API tests:

`Sec-Datadog: Request sent by a Datadog Synthetics API Test (https://docs.datadoghq.com/synthetics/) - public_id: <SYNTHETICS_TEST_PUBLIC_ID>`

Header attached to all Datadog Browser tests:

`Sec-Datadog: Request sent by a Datadog Synthetics Browser Test (https://docs.datadoghq.com/synthetics/) - public_id: <SYNTHETICS_TEST_PUBLIC_ID>`


If APM is enabled, [**other APM specific headers**][1] such as `x-datadog-trace-id` are added to all the requests launched for API tests.

Choose any or a variety of the following methods to identify the robots to make sure they are performing the actions you expect.

1. You can use the [**headers set for APM integration**][1]. The `x-datadog-origin: synthetics` header, for instance, is added to all the requests launched for API tests. Using one of these headers allows you to filter these bot requests once in your analytics tool. No headers are added for browser tests.

    If you want these requests to be completely removed, and not sent at all to your analytics tool, you can use the below JavaScript variable on your website, wrapped around your analytics tool code snippet:

    ```
    if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
      initializeAnalytics()
    }
    ```

Alternatively, there are other ways to flag Datadog Synthetics robots:

* You can use the **Advanced options** to set custom headers for your API and Browser tests.

* You can locally add **cookies, headers or basic auth** to your API tests and **cookies and headers** to your Browser tests.

* You can use Datadog's [**Synthetics IP ranges**][2].

[1]: /synthetics/apm/#how-are-traces-linked-to-checks
[2]: https://ip-ranges.datadoghq.com/synthetics.json
