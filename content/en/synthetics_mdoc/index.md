---
title: Synthetic Testing and Monitoring
description: >-
  Use automated testing to ensure the most critical parts of your systems and
  applications are up and running from various locations around the world.
breadcrumbs: Docs > Synthetic Testing and Monitoring
sourceUrl: https://docs.datadoghq.com/synthetics/index.html
---

# Synthetic Testing and Monitoring

{% callout %}
##### Join an enablement webinar session

Explore and register for Foundation Enablement sessions. Learn how Datadog Synthetic Monitoring is a proactive monitoring solution that enables you to create code-free API, browser, and mobile tests to automatically simulate user flows and requests to your applications, key endpoints, and network layers.

[SIGN UP](https://www.datadoghq.com/technical-enablement/session/synthetics/)
{% /callout %}

Synthetic tests allow you to observe how your systems and applications are performing using **simulated requests and actions from around the globe**. Datadog tracks the performance of your webpages and APIs from the backend to the frontend, and at various network levels (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP`, and `gRPC`) in a controlled and stable way, alerting you about faulty behavior such as regressions, broken features, high response times, and unexpected status codes.

**Computing SLOs** on your key endpoints and user journeys makes it easier to stick to your application performance targets and ultimately provide a consistent customer experience.

You can create Synthetic tests in the [Datadog application](https://app.datadoghq.com/synthetics/create#), with the [API](https://docs.datadoghq.com/api/latest/synthetics/#create-an-api-test), or with [Terraform](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test).

## Set up API tests and multistep API tests{% #set-up-api-tests-and-multistep-api-tests %}

API tests allow you to launch [single](https://docs.datadoghq.com/synthetics/api_tests/) or [chained](https://docs.datadoghq.com/synthetics/multistep) requests to perform verifications on your key systems at various network levels: [HTTP test](https://docs.datadoghq.com/synthetics/api_tests/http_tests), [SSL test](https://docs.datadoghq.com/synthetics/api_tests/ssl_tests), [DNS test](https://docs.datadoghq.com/synthetics/api_tests/dns_tests), [WebSocket test](https://docs.datadoghq.com/synthetics/api_tests/websocket_tests), [TCP test](https://docs.datadoghq.com/synthetics/api_tests/tcp_tests), [UDP test](https://docs.datadoghq.com/synthetics/api_tests/udp_tests), [ICMP test](https://docs.datadoghq.com/synthetics/api_tests/icmp_tests), and [gRPC test](https://docs.datadoghq.com/synthetics/api_tests/grpc_tests).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/api_test.ac4d7fbf910457f964974812b51b2375.png?auto=format"
   alt="API tests" /%}

## Record browser tests{% #record-browser-tests %}

Use [Synthetic browser tests](https://docs.datadoghq.com/synthetics/browser_tests) to monitor how your customers experience your webpages end-to-end from around the world.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/browser_test.mp4" /%}

## Record mobile application tests{% #record-mobile-application-tests %}

Use [Synthetic mobile application tests](https://docs.datadoghq.com/mobile_testing) to monitor how your customers experience your iOS and Android applications end-to-end from different device types.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/mobile_app_tests.b6df409677ae89fd23027a9007ae786e.png?auto=format"
   alt="Examples of the recording workflow for a Synthetic Mobile Test" /%}

## Launch private locations{% #launch-private-locations %}

Use [Synthetic private locations](https://docs.datadoghq.com/synthetics/private_locations) to monitor internal APIs and websites or create custom locations in areas that are mission-critical to your business.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations.e50282ca1df64041a30d588375f4e31b.png?auto=format"
   alt="Private locations" /%}

## Connect data and traces{% #connect-data-and-traces %}

Use the [integration between Synthetic tests and APM traces](https://docs.datadoghq.com/synthetics/apm/) to find the root cause of failures across frontend, network, and backend requests.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/synthetics_traces.mp4" /%}

## Access out-of-the-box dashboards{% #access-out-of-the-box-dashboards %}

Analyze performance information about your API tests, multistep API tests, browser tests, and private locations, as well as Datadog events, with [out-of-the-box Synthetic dashboards](https://docs.datadoghq.com/synthetics/dashboards/).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/dashboards/test_dashboard.ab620acdf8910722b53687e92597736e.png?auto=format"
   alt="Synthetic Monitoring & Continuous Testing Summary Dashboard" /%}

## Use the Synthetic Monitoring & Testing Results Explorer{% #use-the-synthetic-monitoring--testing-results-explorer %}

Create [search queries and visualizations](https://docs.datadoghq.com/continuous_testing/explorer/) for your Synthetic test runs or batches of tests running in CI/CD pipelines.

{% image
   source="https://datadog-docs.imgix.net/images/continuous_testing/explorer_ci_batches_1.d5b0a754d072c00ed09e370ad1949c98.png?auto=format"
   alt="Continuous Testing Explorer" /%}

## Track testing coverage{% #track-testing-coverage %}

Optimize your test suite by [ensuring that your application's most critical workflows are being tested](https://docs.datadoghq.com/synthetics/test_coverage).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/test_coverage/test_coverage.9cdf1c99240225a6df42ad66a1ff939a.png?auto=format"
   alt="Continuous Testing Explorer" /%}

## Synthetic Monitoring notifications{% #synthetic-monitoring-notifications %}

Use and enrich Synthetic monitors to send notifications when a Synthetic Monitoring test is failing. The following features are available:

{% dl %}

{% dt %}
Pre-filled monitor messages
{% /dt %}

{% dd %}
Pre-filled monitor messages provide a structured starting point for Synthetic test alerts. Each message includes a standardized title, summary, and footer containing test metadata, making it easier to understand the alert at a glance.
{% /dd %}

{% dt %}
Template variables
{% /dt %}

{% dd %}
Template variables let you inject test-specific data into monitor notifications dynamically. These variables pull from the `synthetics.attributes` object.
{% /dd %}

{% dt %}
Advanced usage
{% /dt %}

{% dd %}
Advanced usage includes techniques for surfacing deeper test insights or structuring complex messages using handlebars templating.
{% /dd %}

{% dt %}
Conditional alerting
{% /dt %}

{% dd %}
Conditional alerting allows you to change the content of a monitor notification based on specific test results or failure conditions.
{% /dd %}

{% /dl %}

For more information, see [Synthetic Monitoring notifications](https://docs.datadoghq.com/synthetics/notifications/).

## Version History{% #version-history %}

Use [Version History in Synthetic Monitoring](https://docs.datadoghq.com/synthetics/guide/version_history/) to run a previous version of a test, restore your test to any saved version, or clone a version to create a new Synthetic Monitoring test.

## Ready to start?{% #ready-to-start %}

See [Getting Started with Synthetic Monitoring](https://docs.datadoghq.com/getting_started/synthetics) for instructions on creating your first Synthetic test and monitoring your web applications. Then, explore [Getting Started with Private Locations](https://docs.datadoghq.com/getting_started/synthetics/private_location) for instructions on creating your private location and running Synthetic tests with your private location.

## Further Reading{% #further-reading %}

- [Check out the latest Datadog Synthetic Monitoring releases! (App login required)](https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring)
- [Datadog Learning Center: Getting started with Synthetic Browser Testing](https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing)
- [Synthetic Monitoring Guides](https://docs.datadoghq.com/synthetics/guide/)
- [Join an interactive session to enhance your synthetic testing capabilities](https://dtdg.co/fe)
- [How to secure HTTP headers with synthetic tests](https://www.datadoghq.com/blog/http-security-headers-synthetic-tests/)
- [Gain key insights into user experiences faster with Datadog Synthetic Monitoring](https://www.datadoghq.com/blog/synthetic-monitoring-updates/)
- [How to create efficient UX smoke tests with Synthetic Monitoring](https://www.datadoghq.com/blog/smoke-testing-synthetic-monitoring/)
- [Improve SLO accuracy and performance with Datadog Synthetic Monitoring](https://www.datadoghq.com/blog/slo-synthetic-monitoring/)
- [How to build reliable and accurate synthetic tests for your mobile apps](https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/)
- [How I helped my client scale their browser tests with Datadog](https://www.datadoghq.com/blog/ambassador-browser-tests/)
