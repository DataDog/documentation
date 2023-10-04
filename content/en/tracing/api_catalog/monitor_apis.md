---
title: Monitoring your APIs
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

After you have set up your API Catalog with all the endpoints your organization has, and assigned team ownership, you can start managing and improving them, using the API Catalog as your jumping-off point for activities such as:

 - Detecting and investigating APIs that are under-performing.
 - Creating alerts based on key performance metrics such as latency and error rate.
 - Keeping track of an API's reliability in terms of triggered alerts, test results, and security signals.
 - Standardizing API testing and improving test coverage with Synthetic Monitoring.


## Detect under-performing APIs and identify opportunities for optimization

When exploring an endpoint, getting a higher resolution view of the API endpoint details is helpful.

Using the [filtering, sorting, and searching options in Explorer][2], find endpoints of interest.
Click one to open a details page that shows performance, errors and issues, deployments, monitors, ownership, dependency map, and metadata information, collected from various areas of Datadog into one place. Here you can also add custom tags. You can investigate the various types of telemetry using links into other areas of Datadog. 

In the Explorer view, for example, you can:
- Look up a specific endpoint by path (for example, `/checkout`) when it shows a high error rate and a high request count.
- View the Requests and Errors graph and correlated Response Code graph to identify issues.
- Navigate to related telemetry like traces, logs, and errors.

{{< img src="tracing/api_catalog/api-catalog-endpoint-details-pivot-to-traces.mp4" alt="Click into an endpoint to see Errors graph and dependency graph. Click through to related traces to investigate." video="true" >}}

The graphs on the details page are initially scoped to the same settings as on the Explorer page, and you can change those settings on the details page to suit your investigation by using the time frame selector and other scope dropdown menus. 

## Alert on endpoints that deviate from expected performance

You can set up monitors that will alert you if something causes your endpoints to not perform as usual (occasionally slow), to report outlier data (extremely slow or rare errors), or to achieve metrics beyond a desired threshold (high error rates). 

The latest monitor status is displayed in the Explorer, and you can see more information about why a monitor is alerting, how to address it, whether launch an investigation by clicking through to view the monitors.

{{< img src="tracing/api_catalog/api-catalog-monitor.png" alt="The monitor status menu and Create Monitor button in API Catalog Explorer" style="width:40%;" >}}

You can also create a monitor on Latency or Error Rate directly from API Catalog by clicking **Add Monitor**. Read [Alerting][1] for additional information about setting up and managing monitor alerts.

## Track and improve API test coverage

Using Synthetic API tests, you can set up automated scheduled tests of your endpoints that alert you if the tests fail and letting you diagnose and fix the problem. 

The Explorer page shows you which of your endpoints have, or more importantly _don't_ yet have tests created for them, and whether any of them are failing. If tests are failing, click through to investigate why.

{{< img src="tracing/api_catalog/api-catalog-tests.png" alt="The API tests status menu and Create Test button in API Catalog Explorer" style="width:40%;" >}}

Click **+ API Test** to create another synthetic API test for this endpoint. Read the documentation about [Synthetic HTTP API Tests][3] for more information about setting up tests.

## Find and close security gaps

Powered by Datadog [Application Security Management (ASM)][4], the Security Signals column in the Explorer shows you if ASM has detected threats to the services associated with your endpoints. Sort the table by the column to quickly see which of your endpoints is most affected. Click **View in ASM** to investigate the and address the threats and vulnerabilities in your code or your upstream dependencies.

{{< img src="tracing/api_catalog/api-catalog-security-signals.png" alt="The Security Signals status menu and View in ASM button in API Catalog Explorer" style="width:60%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
[2]: /tracing/api_catalog/explore_and_catalog_apis/
[3]: /synthetics/api_tests/http_tests/
[4]: /security/application_security/threats/