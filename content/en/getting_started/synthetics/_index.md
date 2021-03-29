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

Datadog Synthetic Monitoring offers two different ways to monitor your applications: API tests to monitor the uptime of your API endpoints and browser tests to check key user journeys. Your tests can be run either from managed locations or from private locations. Synthetic Monitoring helps you ensure uptime, identify regional issues, and make sure key web transactions can be performed on your application.

{{< img src="synthetics/synthetics_home.png" alt="Synthetic Monitoring home page" >}}

By unifying Synthetic Monitoring data with your metrics, traces, and logs, Datadog allows you to observe how all your systems are performing, as experienced by your users. The [Synthetic Monitoring][1] homepage details all of this information to give you real-time status updates, response times, and uptimes.

The following guides show you how to set up your first Synthetic tests with Datadog. Follow the sections below to learn how to create a browser or API test and configure a test with a private location to monitor internal-facing applications or any private URLs.

## Prerequisites

If you haven't already, create a [Datadog account][2].

## Configure your first test

- [Create a private location][3] (if needed)
- [Create a browser test][4]
- [Create an API test][5]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/list
[2]: https://www.datadoghq.com/
[3]: /getting_started/synthetics/private_location/
[4]: /getting_started/synthetics/browser_test/
[5]: /getting_started/synthetics/api_test/
