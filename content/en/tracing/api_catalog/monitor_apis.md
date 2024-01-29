---
title: Monitoring APIs
kind: documentation
is_beta: true
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
---

## Overview

After you have [registered all your endpoints][1] and [assigned team ownership][2], you can start managing and improving them. Use the API Catalog to start activities such as:

 - Detecting and investigating APIs that are under-performing.
 - Creating alerts based on key performance metrics such as latency and error rate.
 - Keeping track of an API's reliability in terms of triggered alerts, test results, and security signals.
 - Standardizing API testing and improving test coverage with Synthetic Monitoring.

 <div class="alert alert-info">Once you have registered endpoints, Datadog starts collecting a new endpoint metric for better monitoring capabilities. It might take a few minutes for the data to display if you try to create a new monitor with this metric.</div>


## Detect under-performing APIs and identify opportunities for optimization

When exploring an endpoint, getting a higher resolution view of the API endpoint details is helpful.

Use the filtering, sorting, and searching options in the API Catalog to find endpoints of interest.
Click an endpoint to view its details page. Here you can see performance, errors, issues, deployments, monitors, ownership, a dependency map, and metadata information in one central location. From the details page, you can also add custom tags to the endpoint. You can also investigate the various types of telemetry using links to other areas of Datadog. 

In the details page, you can:
- Look up a specific endpoint by path (for example, `/checkout`) when it shows a high error rate and a high request count.
- View the **Requests & Errors** graph and correlated **Response Code** graph to identify issues.
- Navigate to related telemetry like traces, logs, and errors.

{{< img src="tracing/api_catalog/api-catalog-endpoint-details-pivot-to-traces.mp4" alt="Click into an endpoint to see Errors graph and dependency graph. Click through to related traces to investigate." video="true" >}}

The graphs on the details page are initially scoped to the same settings as the Explorer page. You can change those settings on the details page to suit your investigation by using the time frame selector and other scope dropdown menus. 

## Alert on endpoints that deviate from expected performance

You can set up monitors to alert you if something causes your endpoints to perform unexpectedly (like occasionally slow performance), to report outlier data (like extremely slow performance or rare errors), or to achieve metrics beyond a desired threshold (high error rates). 

The latest monitor status is displayed in the Explorer where you can see more information about why a monitor is alerting and how to address it. You can also determine if you should launch an investigation by clicking through to view the monitors.

{{< img src="tracing/api_catalog/api-catalog-monitor.png" alt="The monitor status menu and Create Monitor button in API Catalog Explorer" style="width:40%;" >}}

You can also create a monitor on **Latency** or **Error rate** directly from API Catalog by clicking **+ Monitor** in the **MONITORS** column. Read [Alerting][1] for additional information about setting up and managing monitor alerts.

## Track and improve API test coverage

Using synthetic API tests, you can set up automated scheduled tests of your endpoints that alert you if the tests fail so you can diagnose and fix the problem. 

The **API TESTS** column on the Explorer page shows you which of your endpoints have tests and if any of them are failing. If tests are failing, the test status to investigate further.

{{< img src="tracing/api_catalog/api-catalog-tests.png" alt="The API tests status menu and Create Test button in API Catalog Explorer" style="width:40%;" >}}

Click **+ API Test** in the **API TESTS column** to create another synthetic API test for this endpoint. Read the documentation about [Synthetic HTTP API Tests][3] for more information about setting up tests.

## Find and close security gaps

Powered by Datadog [Application Security Management (ASM)][4], the **SECURITY SIGNALS** column in the Explorer shows you if ASM has detected threats to the services associated with your endpoints. Sort the table by this column to see which of your endpoints are most affected. Click **View in ASM** to investigate and address the threats and vulnerabilities in your code or your upstream dependencies.

{{< img src="tracing/api_catalog/api-catalog-security-signals.png" alt="The Security Signals status menu and View in ASM button in API Catalog Explorer" style="width:60%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/api_catalog/get_started/#register-auto-discovered-endpoints
[2]: /tracing/api_catalog/explore_and_catalog_apis/#establishing-ownership
[3]: /synthetics/api_tests/http_tests/
[4]: /security/application_security/threats/