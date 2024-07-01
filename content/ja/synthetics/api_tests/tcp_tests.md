---
title: TCP Testing
kind: documentation
description: Simulate TCP connections on your hosts
aliases:
  - /synthetics/tcp_test
  - /synthetics/tcp_check
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: Blog
  text: Introducing Datadog Synthetic Monitoring
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: Get started with API tests
- link: /synthetics/private_locations
  tag: Documentation
  text: Run TCP tests on internal hosts
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: Learn about Synthetic test monitors
algolia:
  rank: 70
  category: Documentation
  subcategory: Synthetic API Tests
  tags: [tcp, tcp test, tcp tests]
---

## Overview

TCP tests allow you to monitor whether or not low-level TCP connections can be established on the ports of given hosts, ensuring the availability of several key services such as `SSH` (22), `SMTP` (25), `DNS` (53), VPN over `HTTPS` (443), and any custom services living on other ports. With built-in response time data, track the performance of your network applications and receive alerts in case of unexpected slowness.

TCP tests can run from both [managed](#select-locations) and [private locations][1] depending on your preference for running the test from outside or inside your network. TCP tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][2].

## Configuration

After choosing to create a `TCP` test, define your test's request.

### Define request

1. Specify the **Host** and the **Port** to run your test on.
2. Decide whether or not to **Track number of network hops (TTL)**. This option allows you to assert on the number of network hops and to have access to a TCP Traceroute in your test results.
3. Specify the amount of time in seconds before the test times out (optional).
4. **Name** your TCP test.
5. Add `env` **Tags** as well as any other tag to your TCP test. You can then use these tags to filter through your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page][3].

{{< img src="synthetics/api_tests/tcp_test_config.png" alt="Define TCP connection" style="width:90%;" >}}

Click **Test URL** to try out the request configuration. A response preview is displayed on the right side of your screen.

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

These reasons include the following:

`CONNRESET`
: The connection was abruptly closed by the remote server. Possible causes include the web server encountering an error or crashing while responding, or loss of connectivity of the web server.

`DNS`
: DNS entry not found for the test URL. Possible causes include misconfigured test URL or the wrong configuration of your DNS entries.

`INVALID_REQUEST` 
: The configuration of the test is invalid (for example, a typo in the URL).

`TIMEOUT`
: The request couldn't be completed in a reasonable time. Two types of `TIMEOUT` can happen:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indicates that the request duration hit the test defined timeout (default is set to 60s). 
  For each request only the completed stages for the request are displayed in the network waterfall. For example, in the case of `Total response time` only being displayed, the timeout occurred during the DNS resolution.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indicates that the test duration (request + assertions) hits the maximum duration (60.5s).

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][9] can create, edit, and delete Synthetic TCP tests. To get create, edit, and delete access to Synthetic TCP tests, upgrade your user to one of those two [default roles][9].

If you are using the [custom role feature][10], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access

Access restriction is available for customers using [custom roles][11] on their accounts.

You can restrict access to a TCP test based on the roles in your organization. When creating a TCP test, choose which roles (in addition to your user) can read and write your test. 

{{< img src="synthetics/settings/restrict_access_1.png" alt="Set permissions for your test" style="width:70%;" >}}

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
[11]: /account_management/rbac/#create-a-custom-role
