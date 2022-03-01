---
title: Getting Started with Synthetic Monitoring
kind: documentation
further_reading:
    - link: 'https://learn.datadoghq.com/course/view.php?id=39'
      tag: 'Learning Center'
      text: 'Introduction to Synthetic Tests'
    - link: '/synthetics/api_tests'
      tag: 'Documentation'
      text: 'Learn more about API tests'
    - link: '/synthetics/multistep'
      tag: 'Documentation'
      text: 'Learn more about Multistep API tests'
    - link: '/synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Learn more about Browser tests'
    - link: '/synthetics/private_locations'
      tag: 'Documentation'
      text: 'Learn more about Private locations'
      
---

## Overview

Synthetic tests allow you to observe how your systems and applications are performing using **simulated requests and actions from around the globe**. 

Datadog tracks the performance of your webpages and APIs from the backend to the frontend, and at various network levels (`HTTP`, `SSL`, `DNS`, `TCP`, `UDP`, `ICMP`, and `WebSocket`) in a controlled and stable way. These tests alert you when faulty behaviors like regressions, broken features, high response times, and unexpected status codes happen.

## Prerequisites

If you haven't already, create a [Datadog account][1].

## Synthetic test types

To monitor your application, choose a test type: 

- [API tests][2] to monitor the uptime of your API endpoints
- [Multistep API tests][3] to link several HTTP requests
- [Browser tests][4] to test key user journeys

Run your tests from managed locations or [private locations][5] to monitor any internal-facing applications. Synthetic tests can be triggered manually, on a schedule, or directly from your [CI/CD pipelines][6].

{{< img src="getting_started/synthetics/synthetic-monitoring-overview.png" alt="Synthetic Monitoring Tests" style="width:100%;" >}}

## Configure your first test

To set up your first Synthetic test with Datadog, choose from the following options:

- [Create an API test][7] to start monitoring your API endpoints' uptime.
- [Create a multistep API test][8] to start monitoring key workflows at the API level.
- [Create a browser test][9] to start testing critical business transactions on your applications.
- [Create a private location][10] to monitor internal applications using all Synthetic test types.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: /synthetics/api_tests/
[3]: /synthetics/multistep
[4]: /synthetics/browser_tests/
[5]: /synthetics/private_locations
[6]: /synthetics/cicd_integrations
[7]: /getting_started/synthetics/api_test/
[8]: /getting_started/synthetics/api_test/#create-a-multistep-api-test
[9]: /getting_started/synthetics/browser_test/
[10]: /getting_started/synthetics/private_location/
