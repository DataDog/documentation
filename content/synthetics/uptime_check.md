---
title: Uptime Check
kind: documentation
beta: true
description: Simulate and monitor HTTP requests from specific locations
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "synthetics/browser_check"
  tag: "Documentation"
  text: "Configure a Browser Check"
---

## Overview

Uptime checks are HTTP requests (GET, POST, PUT, etc.) executed by Datadog to your web properties or application endpoints at configurable periodic intervals from multiple locations around the world. These checks verify not only that your applications are up and responding to requests, but that any conditions you define are met, such as response time, HTTP response code, and header or body contents.

## Configuration
### Request

Define the request you want to be executed by Datadog:

{{< img src="synthetics/uptime_check/uptime_check_make_request.png" alt="Uptime check make request" responsive="true" style="width:80%;">}}

1. Choose the `Method` and `URL` to query. Available `Method` are:
    * GET
    * POST
    * PATCH
    * PUT
    * DELETE
    * OPTIONS

2. Optional - Click on **Advanced options** to enrich your request with any custom Request Headers, Authentication credentials, body content, or cookies.

3. Give a Name to your Uptime Check.
4. Optional - Add tags to filter your Uptime Check in the [Synthetics page][1].

5. Pick-up locations to run the test from, available locations are:
    * Frankfurt (Request made from an AWS Datacenter)
    * Tokyo (Request made from an AWS Datacenter)

6. Choose a Check frequency between 1 run/min to 1 run/week.
7. Finish by clicking on **Test URL** to try out the request configuration, you should see a Response Preview Showing up in the right side of your Screen.

### Validation

When running an Uptime check, define its associated assertions that should be monitored by Datadog. An Assertion is defined by a Content, a comparator, and a value.

| Content       | Comparators                | Value type |
| --------      | ---------                  | --------   |
| Status Code   | `is`, `is not`             | Integer    |
| Response time | `less than`                | Integer    |
| Headers       | `is`, `is not`, `contains` | Strings    |

If you define an assertion on the `Headers` content, define your headers name and its associated value.

Click on **Add new assertion** to add up to 10 assertions for your uptime check. 

**Note**: If you clicked on **Test URL** basic assertions are automatically filled:

{{< img src="synthetics/uptime_check/assertion.png" alt="Assertions" responsive="true" style="width:80%;">}}

### Notifications

A notification is sent if at least one of the assertion defined is failing, to configure your notifications:

1. Select users and/or [services][2] to send the notifications to.
2. Enter a **message** for the Uptime Check. This field allows standard [Markdown formatting][3]. Notifications message include the **message** defined in this section and information about which assertion failed and why.
3. Click **Save** to save your Uptime check.

Notifications example:

{{< img src="synthetics/uptime_check/uptime_check_notifications.png" alt="Assertions" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics
[2]: /integrations/#cat-notification
[3]: http://daringfireball.net/projects/markdown/syntax
