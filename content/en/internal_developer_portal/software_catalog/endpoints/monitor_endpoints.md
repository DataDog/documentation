---
title: Monitoring Endpoints
further_reading:
- link: "/tracing/api_catalog/get_started/"
  tag: "Documentation"
  text: "Endpoints List Overview"
- link: "/monitors/"
  tag: "Documentation"
  text: "Alerting with Monitors"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Synthetic API Tests"
- link: "/security/application_security/"
  tag: "Documentation"
  text: "App and API Protection Monitoring"
aliases:
    - /tracing/api_catalog/monitor_apis/
    - /api_catalog/monitor_apis/
    - /service_catalog/endpoints/monitor_endpoints/
    - /software_catalog/endpoints/monitor_endpoints/
---

## Overview

The Endpoints list enables you to monitor and maintain the health of your endpoints. You can detect underperforming APIs, set up alerts for key performance metrics, track API reliability through alerts and test results, and establish standardized API testing and improve test coverage with Synthetic Monitoring.

## Monitoring endpoint performance

Create and manage monitors to track endpoint health and performance and respond to performance issues. You can create alerts to identify intermittent performance degradation or outliers, such as unusually slow response times or rare errors. Alerts can also track metrics, like error rates, that exceed defined thresholds.

Existing monitors are displayed in the **MONITORS** column:

{{< img src="tracing/software_catalog/monitors.png" alt="The monitor status menu and Create Monitor button in the Endpoints list" style="width:100%;" >}}


To set up a monitor for an endpoint:
1. Hover over the cell in the **MONITORS** column.
1. Click **+ Create Monitor**.
1. Complete the information on the APM Monitor page.
1. Click **Create**.

For more information, read [Monitors][1].

## Managing API test coverage

Use Synthetic API tests to set up automated testing of your endpoints. These tests alert you to failures so you can diagnose and fix problems before they impact your users.

To create a Synthetic API test for an endpoint:

1. Hover over the cell in the **MONITORS** column.
1. Click **+ Create Synthetic API Test**.
1. Configure the test settings on the New API Test page.
1. Click **Create Test**.

For more information, read [HTTP Testing][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
[2]: /synthetics/api_tests/http_tests/