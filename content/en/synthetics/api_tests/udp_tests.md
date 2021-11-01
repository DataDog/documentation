---
title: UDP Tests
kind: documentation
description: Simulate UDP connections on your hosts
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "/getting_started/synthetics/api_test/"
  tag: "Documentation"
  text: "Get started with API tests"
---
## Overview

UDP tests allow you to easily monitor that low-level UDP connections can be established on the ports of given hosts, ensuring availability of any services living on UDP ports. With built-in response time data, you can keep track of the performance of your network applications and be alerted in case of unexpected slowness.

UDP tests can run from both [managed][1] and [private locations][2] depending on your preference for running the test from outside or inside your network. UDP tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][3].

## Configuration

After choosing to create an `UDP` Test, define your test's request.

### Define request

1. Specify the **Host** and **Port** to run your test on. By default, the port is set to `443`.
2. Enter the string you want to send in your test. 
3. Specify the amount of time in seconds before the test times out.
4. **Name** your UDP test.
5. Add `env` **Tags** as well as any other tag to your UDP test. You can then use these tags to quickly filter through your Synthetic tests on the [Synthetic Monitoring homepage][4].

{{< img src="synthetics/api_tests/udp_test_config.png" alt="Define UDP request" style="width:90%;" >}}

Click **Test URL** to try out the request configuration. A response preview is displayed on the right side of your screen. 

### Define assertions

Assertions define what an expected test result is. When you click **Test URL**, a basic assertion on `response time` is added. You must define at least one assertion for your test to monitor.

| Type            | Operator                                                                        | Value Type                        |
|-----------------|---------------------------------------------------------------------------------|-----------------------------------|
| response time   | `is less than`                                                                  | *Integer (ms)*                    |
| string response | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`| *String* <br> *[Regex][12]*        |

Select the response preview directly or click **New Assertion** to create an assertion. You can create up to 20 assertions per UDP test.

{{< img src="synthetics/api_tests/udp_assertions.png" alt="Define assertions for your UDP test" style="width:90%;" >}}

{{< partial name="synthetics/partial.md" >}}

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
  - `TIMEOUT: The request couldn’t be completed in a reasonable time.` indicates that the timeout happened at the TCP socket connection level.
  - `TIMEOUT: Retrieving the response couldn’t be completed in a reasonable time.` indicates that the timeout happened on the overall run (which includes TCP socket connection, data transfer, and assertions).

## Permissions

By default, only users with the Datadog Admin and Datadog Standard roles can create, edit, and delete Synthetic UDP tests. To get create, edit, and delete access to Synthetic UDP tests, upgrade your user to one of those two [default roles][10].

If you have access to the [custom role feature][11], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/synthetics/#get-all-locations-public-and-private
[2]: /synthetics/private_locations/
[3]: /synthetics/cicd_testing
[4]: /synthetics/search/#search
[5]: /synthetics/cicd_testing/
[6]: /monitors/notify/#notify-your-team
[7]: https://www.markdownguide.org/basic-syntax/
[8]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[9]: /synthetics/settings/#global-variables
[10]: /account_management/rbac/
[11]: /account_management/rbac#custom-roles
[12]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
