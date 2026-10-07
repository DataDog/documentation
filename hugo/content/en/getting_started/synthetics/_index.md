---
title: Getting Started with Synthetic Monitoring
description: Monitor system performance with simulated requests for API, browser, and mobile tests across global locations.
further_reading:
- link: 'https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing'
  tag: 'Learning Center'
  text: 'Getting Started with Synthetic Browser Testing'
- link: '/synthetics/api_tests'
  tag: 'Documentation'
  text: 'Learn more about API tests'
- link: '/synthetics/multistep'
  tag: 'Documentation'
  text: 'Learn more about multistep API tests'
- link: '/synthetics/mobile_app_testing'
  tag: 'Documentation'
  text: 'Learn more about mobile tests'
- link: '/synthetics/browser_tests'
  tag: 'Documentation'
  text: 'Learn more about browser tests'
- link: '/synthetics/private_locations'
  tag: 'Documentation'
  text: 'Learn more about private locations'
- link: '/continuous_testing/cicd_integrations'
  tag: 'Documentation'
  text: 'Learn about running Synthetic tests in a CI pipeline'
- link: "https://dtdg.co/fe"
  tag: "Foundation Enablement"
  text: "Join an interactive session to enhance your synthetic testing capabilities"
algolia:
  tags: ["synthetics"]
---

## Overview

Synthetic tests allow you to observe how your systems and applications are performing using **simulated requests and actions from around the globe**. Datadog tracks the performance of your webpages and APIs from the backend to the frontend, and at various network levels (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP`, and `gRPC`) in a controlled and stable way, alerting you about faulty behavior such as regressions, broken features, high response times, and unexpected status codes.

{{< img src="getting_started/synthetics/synthetic-monitoring-overview.png" alt="Synthetic Monitoring Tests" style="width:100%;" >}}

## Synthetic test types

Datadog offers **API tests**, **Multistep API tests**, **Browser tests**, and **Mobile tests**.

To monitor internal-facing applications, run your tests from managed locations or private locations. Synthetic tests can be triggered manually, on a schedule, or [directly from your CI/CD pipelines][7].

## Prerequisites

If you haven't already, create a [Datadog account][1].

## Configure your first test

To set up your first Synthetic test with Datadog, choose from the following options:

- [Create an API test][2] to start monitoring your API endpoints' uptime.
- [Create a multistep API test][3] to link several HTTP requests and start monitoring key workflows at the API level.
- [Create a browser test][4] to start testing critical business transactions on your applications.
- [Create a mobile test][6] to start testing key business workflows on your Android and iOS applications.
- [Create a private location][5] to start monitoring internal applications using all Synthetic test types.

## Synthetic Monitoring notifications

Use and enrich Synthetic monitors to send notifications when a Synthetic Monitoring test is failing. The following use cases are available:

Pre-filled monitor messages
: Pre-filled monitor messages provide a structured starting point for Synthetic test alerts. Each message includes a standardized title, summary, and footer containing test metadata, making it easier to understand the alert at a glance.

Template variables
: Template variables let you inject test-specific data into monitor notifications dynamically. These variables pull from the `synthetics.attributes` object.

Advanced usage
: Advanced usage includes techniques for surfacing deeper test insights or structuring complex messages using handlebars templating.

Conditional alerting
: Conditional alerting allows you to change the content of a monitor notification based on specific test results or failure conditions.

For more information, see [Synthetic Monitoring notifications][9].

## Version History

Use [Version History in Synthetic Monitoring][8] to run a previous version of a test, restore your test to any saved version, or clone a version to create a new Synthetic Monitoring test.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: /getting_started/synthetics/api_test/
[3]: /getting_started/synthetics/api_test/#create-a-multistep-api-test
[4]: /getting_started/synthetics/browser_test/
[5]: /getting_started/synthetics/private_location/
[6]: /getting_started/synthetics/mobile_app_testing/
[7]: /getting_started/continuous_testing/
[8]: /synthetics/guide/version_history/
[9]: /synthetics/notifications/