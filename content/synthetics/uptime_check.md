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
---

<div class="alert alert-warning">Synthetics is in beta for the Datadog US Region. To request access, complete the <a href="https://app.datadoghq.com/synthetics/beta">Datadog Synthetics request form</a>.</div>

## Overview

Uptime Checks are HTTP requests (GET, POST, PUT, etc.) executed by Datadog to your web properties or application endpoints at configurable periodic intervals from multiple locations around the world. These checks verify that your applications are responding to requests, as well as that they meet any conditions you define—such as response time, HTTP status code, and header or body contents.

## Configuration
### Request

Define the request you want to be executed by Datadog:

{{< img src="synthetics/uptime_check/uptime_check_make_request.png" alt="Uptime Check make request" responsive="true" style="width:80%;">}}

1. Choose the `Method` and `URL` to query. Available `Method`s are:
    * GET
    * POST
    * PATCH
    * PUT
    * DELETE
    * OPTIONS

2. Optionally, click on **Advanced options** to enrich your request with custom request headers, authentication credentials, body content, or cookies.

3. Name your Uptime Check.
4. Optionally, add tags to filter your Uptime Check in the [Synthetics page][1].

5. Pick locations to run the test from. Available locations are:
    * Frankfurt (Request made from an AWS Datacenter)
    * Tokyo (Request made from an AWS Datacenter)

6. Choose a Check frequency between "1 run per minute" and "1 run per week".
7. Finish by clicking on **Test URL** to try out the request configuration. You should see a response preview show up in the right side of your screen.

### Validation

When running an Uptime Check, you must define at least one assertion that should be monitored by Datadog. An assertion is defined by a parameter, a comparator, and a value.

| Parameter     | Comparators                           | Value type                                                                    |
| ------------- | ------------------------------------- | ----------------------------------------------------------------------------- |
| Status Code   | `is`, `is not`                        | Integer                                                                       |
| Response time | `less than`                           | Integer                                                                       |
| Headers       | `contains`, `is`, `is not`, `matches` | for `contains`/`is`/`is not`: String <br> for `matches`: [RegexStrings][2]    |
| Body          | `contains`, `is`, `is not`, `matches` | for `contains`/`is`/`is not`: String <br> for `matches`: [RegexStrings][2]    |

If you define an assertion on the content of `Headers`, you must define the headers name and the associated value.

Click on **Add new assertion** to add up to 10 assertions for your Uptime Check. 

**Note**: If you clicked on **Test URL**, then the basic assertions are automatically filled:

{{< img src="synthetics/uptime_check/assertion.png" alt="Assertions" responsive="true" style="width:80%;">}}

Use the **Test URL** response to quickly add status code, tesponse time or headers from the test response as one of the Uptime Check assertions:

{{< img src="synthetics/uptime_check/assertion_setup.gif" alt="Assertions" responsive="true" style="width:80%;">}}

### Notifications

A notification is sent if at least one of the assertion fails. To configure notifications:

1. Select users and/or [services][3] to send the notifications to. Note that you can use the [`@-notification` feature][4] in the **message** field.
2. Enter a **message** for the Uptime Check. This field allows standard [Markdown formatting][5]. Notification messages include the **message** defined in this section and information about which assertion failed and why.
3. Click **Save** to save your Uptime Check.

Notifications example:

{{< img src="synthetics/uptime_check/uptime_check_notifications.png" alt="Assertions" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[3]: /integrations/#cat-notification
[4]: /developers/faq/what-do-notifications-do-in-datadog
[5]: http://daringfireball.net/projects/markdown/syntax
