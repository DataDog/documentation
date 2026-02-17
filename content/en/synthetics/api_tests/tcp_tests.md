---
title: TCP Testing
description: Simulate TCP connections on your hosts
aliases:
  - /synthetics/tcp_test
  - /synthetics/tcp_check
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "/getting_started/synthetics/api_test"
  tag: "Documentation"
  text: "Get started with API tests"
- link: "/synthetics/private_locations"
  tag: "Documentation"
  text: "Run TCP tests on internal hosts"
- link: "/synthetics/guide/synthetic-test-monitors"
  tag: "Documentation"
  text: "Learn about Synthetic test monitors"
algolia:
  rank: 70
  category: Documentation
  subcategory: Synthetic API Tests
  tags: ["tcp", "tcp test", "tcp tests"]
---

## Overview

TCP tests allow you to monitor whether or not low-level TCP connections can be established on the ports of given hosts, ensuring the availability of several key services such as `SSH` (22), `SMTP` (25), `DNS` (53), VPN over `HTTPS` (443), and any custom services living on other ports. With built-in response time data, track the performance of your network applications and receive alerts in case of unexpected slowness.

TCP tests can run from both [managed](#select-locations) and [private locations][1] depending on your preference for running the test from outside or inside your network. TCP tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][2].

## Configuration

You may create a test using one of the following options:

- **Create a test from a template**:
   
     1. Hover over one of the pre-populated templates and click **View Template**. This opens a side panel displaying pre-populated configuration information, including: Test Details, Request Details, Assertions, Alert Conditions, and Monitor Settings.
     2. Click **+Create Test** to open the **Define Request** page, where you can review and edit the pre-populated configuration options. The fields presented are identical to those available when creating a test from scratch.
     3. Click **Save Details** to submit your API test.<br /><br>
        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Video of Synthetics API test landing page with templates" video="true" >}}

- **Build a test from scratch**:

    1. To build a test from scratch, click the **+ Start from scratch** template, then select the `TCP` request type.
    1. Specify the **Host** and the **Port** to run your test on.
    1. Decide whether or not to **Track number of network hops (TTL)**. This option allows you to assert on the number of network hops and to have access to a TCP Traceroute in your test results.
    1. Specify the amount of time in seconds before the test times out (optional).
    1. **Name** your TCP test.
    1. Add Environment **Tags** as well as any other tag to your TCP test. You can then use these tags to filter through your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page][3]. 
    1. Click **Test Host** to try out the request configuration. A response preview is displayed on the right side of your screen.<br /><br>

       {{< img src="synthetics/api_tests/tcp_test_config_2.png" alt="Define TCP connection" style="width:90%;" >}}

    8. Click **Create Test** to submit your API test.


### Snippets

{{% synthetics-api-tests-snippets %}}

### Define assertions

Assertions define what an expected test result is. When you click **Test URL**, basic assertions on `response time` are added. You must define at least one assertion for your test to monitor.

| Type          | Operator                                                                | Value type     |
|---------------|-------------------------------------------------------------------------|----------------|
| response time | `is less than`                                                          | _Integer (ms)_ |
| network hops    | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _integer_        |
| connection | `is`                                                          | `established`, `refused`, `timeout` |

You can create up to 20 assertions per API test by clicking **New Assertion** or by clicking directly on the response preview:

{{< img src="synthetics/api_tests/assertions_tcp.png" alt="Define assertions for your TCP test to succeed or fail on" style="width:90%;" >}}

If a test does not contain an assertion on the response body, the body payload drops and returns an associated response time for the request within the timeout limit set by the Synthetics Worker.

If a test contains an assertion on the response body and the timeout limit is reached, an `Assertions on the body/response cannot be run beyond this limit` error appears.

### Select locations

Select the **Locations** to run your TCP test from. TCP tests can run from both managed and [private locations][1] depending on your preference for launching the connection from outside or inside your network.

{{% managed-locations %}}

### Specify test frequency

TCP tests can run:

* **On a schedule** to ensure your most important services are always accessible to your users. Select the frequency at which you want Datadog to run your TCP test.
* [**Within your CI/CD pipelines**][2].
* **On-demand** to run your tests whenever makes the most sense for your team.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### Use variables

You can use the [global variables defined on the **Settings** page][8] in the URL, advanced options, and assertions of your TCP tests.

To display your list of variables, type `{{` in your desired field.

## Test failure

A test is considered `FAILED` if it does not satisfy one or more assertions or if the request prematurely failed. In some cases, the test can fail without testing the assertions against the endpoint.

For a complete list of error codes, see [API Testing Errors][11].

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][9] can create, edit, and delete Synthetic TCP tests. To get create, edit, and delete access to Synthetic TCP tests, upgrade your user to one of those two [default roles][9].

If you are using the [custom role feature][10], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access

{{% synthetics_grace_permissions %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/private_locations
[2]: /synthetics/cicd_integrations
[3]: /synthetics/search/#search
[4]: /monitors/notify/#configure-notifications-and-automations
[5]: https://www.markdownguide.org/basic-syntax/
[6]: /monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[7]: /synthetics/guide/synthetic-test-monitors
[8]: /synthetics/settings/#global-variables
[9]: /account_management/rbac/
[10]: /account_management/rbac#custom-roles
[11]: /synthetics/api_tests/errors/#tcp-errors
