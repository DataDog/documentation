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

Synthetic tests allow you to observe how your systems and applications are performing using **simulated requests and actions from around the globe**. Datadog tracks the performance of your webpages and APIs from the backend to the frontend, and at various network levels (`HTTP`, `TCP`, `SSL`, `DNS`, and `ICMP`) in a controlled and stable way, alerting you in case of faulty behavior (such as regression, broken feature, high response time, or unexpected status code).

There are three ways to monitor your applications: 
- [API tests][1] to monitor the uptime of your API endpoints
- [Multistep API tests][2] to link several HTTP requests
- [Browser tests][3] to test key user journeys

Run all tests from managed locations or from [private locations][4] to monitor internal-facing applications. Synthetic tests can be triggered manually, on a schedule, or directly from your [CI/CD pipelines][5].

{{< img src="synthetics/synthetics_home.png" alt="Synthetic Monitoring home page" >}}

To set up your first Synthetic test with Datadog, follow the sections below.

## Prerequisites

If you haven't already, create a [Datadog account][6].

## Configure your first test

- [Create an API test][7] to start monitoring your API endpoints' uptime.
- [Create a multistep API test][8] to start monitoring key workflows at the API level.
- [Create a browser test][9] to start testing critical business transactions on your applications.
- [Create a private location][10] to monitor internal applications using all Synthetic test types.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/
[2]: /synthetics/multistep
[3]: /synthetics/browser_tests/
[4]: /synthetics/private_locations
[5]: /synthetics/cicd_testing/
[6]: https://www.datadoghq.com/
[7]: /getting_started/synthetics/api_test/
[8]: /getting_started/synthetics/api_test/#create-a-multistep-api-test
[9]: /getting_started/synthetics/browser_test/
[10]: /getting_started/synthetics/private_location/
