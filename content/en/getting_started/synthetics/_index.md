---
title: Getting Started with Synthetic Monitoring
kind: documentation
further_reading:
    - link: 'https://learn.datadoghq.com/course/view.php?id=39'
      tag: 'Learning Center'
      text: 'Introduction to Synthetic Tests'
    - link: '/synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Learn more about browser tests'
    - link: '/synthetics/api_tests'
      tag: 'Documentation'
      text: 'Learn more about API tests'
    - link: '/synthetics/browser_tests/#subtests'
      tag: 'Documentation'
      text: 'Create a browser subtest'
    - link: '/synthetics/settings/'
      tag: 'Documentation'
      text: 'Configure advanced Synthetic Monitoring settings'
      
---

## Overview

Datadog Synthetic Monitoring allows you to monitor uptime, identify regional issues, and ensure key business transactions can perform on your applications.

There are three ways to monitor your applications: API tests to monitor the uptime of your API endpoints, multistep API tests to link several HTTP requests, and browser tests to record key user journeys. You can run tests from publicly managed locations or run tests from private locations to monitor internal-facing applications and private URLs. 

{{< img src="synthetics/synthetics_home.png" alt="Synthetic Monitoring home page" >}}

With Synthetic Monitoring data, observe your systems' performance and user experience. The [Synthetic Monitoring][1] homepage displays real-time status updates, response times, and uptimes along with your metrics, logs, and traces.

To set up your first Synthetic test with Datadog, follow the sections below to learn how to create an API test, multistep API test, or browser test. 

## Prerequisites

If you haven't already, create a [Datadog account][2].

## Configure your first test

- [Create a private location][3] (as needed)
- [Create a browser test][4]
- [Create an API test][5]
- [Create a multistep API test][5]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/list
[2]: https://www.datadoghq.com/
[3]: /getting_started/synthetics/private_location/
[4]: /getting_started/synthetics/browser_test/
[5]: /getting_started/synthetics/api_test/
[6]: /getting_started/synthetics/api_test/#create-a-multistep-api-test
