---
aliases:
- /ja/tracing/api_catalog/monitor_apis/
further_reading:
- link: /tracing/api_catalog/get_started/
  tag: Documentation
  text: Setting Up API Catalog
- link: /monitors/
  tag: Documentation
  text: Alerting with Monitors
- link: /synthetics/api_tests/
  tag: Documentation
  text: Synthetic API Tests
- link: /security/application_security/
  tag: Documentation
  text: Application Security Monitoring
is_beta: true
title: Monitoring APIs
---

## 概要

After you have [registered your endpoints][1] and [assigned team ownership][2], you can start managing and improving them. Use API Catalog to start activities such as:

 - Detecting and investigating APIs that are underperforming.
 - Creating alerts based on key performance metrics such as latency and error rate.
 - Keeping track of an API's reliability in terms of triggered alerts, test results, and security signals.
 - Standardizing API testing and improving test coverage with Synthetic Monitoring.

 <div class="alert alert-info">After you have registered endpoints, Datadog starts collecting a new endpoint metric for better monitoring capabilities. It might take some time for the metric to display, depending on the traffic of the registered endpoints.</div>

## Alerting on endpoints that deviate from expected performance

You can set up monitors to alert you if something causes your endpoints to perform unexpectedly (like occasionally slow performance), to report outlier data (like extremely slow performance or rare errors), or to achieve metrics beyond a desired threshold (high error rates). 

The latest monitor status is displayed in the **Explorer** where you can see more information about why a monitor is alerting and how to address it. You can also determine if you should launch an investigation by clicking through to view the monitors.

{{< img src="tracing/api_catalog/api-catalog-monitor.png" alt="The monitor status menu and Create Monitor button in API Catalog Explorer" style="width:40%;" >}}

You can also create a monitor on **Latency** or **Error rate** directly from API Catalog by clicking **+ Monitor** in the **MONITORS** column. Read [Alerting][5] for additional information about setting up and managing monitor alerts.

## Tracking and improving API test coverage

Using synthetic API tests, you can set up automated scheduled tests of your endpoints that alert you if the tests fail so you can diagnose and fix the problem. 

The **API TESTS** column on the Explorer page shows you which of your endpoints have tests and if any of them are failing. If tests are failing, the test status to investigate further.

{{< img src="tracing/api_catalog/api-catalog-tests.png" alt="The API tests status menu and Create Test button in API Catalog Explorer" style="width:40%;" >}}

Click **+ API Test** in the **API TESTS column** to create another synthetic API test for this endpoint. Read the documentation about [Synthetic HTTP API Tests][3] for more information about setting up tests.

## Finding and closing security gaps

Powered by Datadog [Application Security Management (ASM)][4], the **SECURITY SIGNALS** column in the Explorer shows you if ASM has detected threats to the services associated with your endpoints. Sort the table by this column to see which of your endpoints are most affected. Click **View in ASM** to investigate and address the threats and vulnerabilities in your code or your upstream dependencies.

{{< img src="tracing/api_catalog/api-catalog-security-signals.png" alt="The Security Signals status menu and View in ASM button in API Catalog Explorer" style="width:60%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api_catalog/add_entries/#register-automatically-detected-endpoints
[2]: /ja/api_catalog/owners_and_tags/#establishing-owners
[3]: /ja/synthetics/api_tests/http_tests/
[4]: /ja/security/application_security/threats/
[5]: /ja/monitors/