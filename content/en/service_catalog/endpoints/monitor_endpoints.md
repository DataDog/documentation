---
title: Monitoring Endpoints
further_reading:
- link: "/tracing/api_catalog/get_started/"
  tag: "Documentation"
  text: "Setting Up API Catalog"
- link: "/monitors/"
  tag: "Documentation"
  text: "Alerting with Monitors"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Synthetic API Tests"
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Application Security Monitoring"
aliases:
    - /tracing/api_catalog/monitor_apis/
    - /api_catalog/monitor_apis/
---

## Overview

Use the endpoints list to start activities such as:

 - Detecting and investigating APIs that are underperforming.
 - Creating alerts based on key performance metrics such as latency and error rate.
 - Keeping track of an API's reliability in terms of triggered alerts, test results, and security signals.
 - Standardizing API testing and improving test coverage with Synthetic Monitoring.


## Alerting on endpoints that deviate from expected performance

You can set up monitors to alert you if something causes your endpoints to perform unexpectedly (like occasionally slow performance), to report outlier data (like extremely slow performance or rare errors), or to achieve metrics beyond a desired threshold (high error rates). 

The latest monitor status is displayed in the monitors column where you can see more information about why a monitor is alerting and how to address it. You can also determine if you should launch an investigation by clicking through to view the monitors.

{{< img src="tracing/api_catalog/api-catalog-monitor.png" alt="The monitor status menu and Create Monitor button in API Catalog Explorer" style="width:40%;" >}}

You can also create a monitor on **Latency** or **Error rate** directly from the endpoints list by clicking **+ Monitor** in the **MONITORS** column. Read [Alerting][5] for additional information about setting up and managing monitor alerts.

## Tracking and improving API test coverage

Using synthetic API tests, you can set up automated scheduled tests of your endpoints that alert you if the tests fail so you can diagnose and fix the problem. 
כ
The **API TESTS** column on the Explorer page shows you which of your endpoints have tests and if any of them are failing. If tests are failing, the test status to investigate further.

{{< img src="tracing/api_catalog/api-catalog-tests.png" alt="The API tests status menu and Create Test button in API Catalog Explorer" style="width:40%;" >}}

Click **+ API Test** in the **API TESTS column** to create another synthetic API test for this endpoint. Read the documentation about [Synthetic HTTP API Tests][3] for more information about setting up tests.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_catalog/customize/create_entries
[2]: /service_catalog/manage
[3]: /synthetics/api_tests/http_tests/
[4]: /security/application_security/threats/
[5]: /monitors/