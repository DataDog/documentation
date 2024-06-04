---
title: DNS Testing
kind: documentation
description: Monitor resolvability and lookup times of your DNS records
aliases:
  - /synthetics/dns_test
  - /synthetics/dns_check
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "https://www.datadoghq.com/blog/monitor-dns-with-datadog/"
  tag: "Blog"
  text: "DNS monitoring with Datadog"
- link: "/getting_started/synthetics/api_test"
  tag: "Documentation"
  text: "Get started with API tests"
- link: "/synthetics/private_locations"
  tag: "Documentation"
  text: "Test DNS resolution of your internal endpoints"
- link: "/synthetics/guide/synthetic-test-monitors"
  tag: "Documentation"
  text: "Learn about Synthetic test monitors"
algolia:
  rank: 70
  category: Documentation
  subcategory: Synthetic API Tests
  tags: ["dns", "dns test", "dns tests"]
---

## Overview

DNS tests allow you to proactively monitor the resolvability and lookup times of your DNS records using any nameserver. If resolution is unexpectedly slow or a DNS server answers with unexpected A, AAAA, CNAME, TXT, or MX entries, Datadog sends you an alert with details on the failure, allowing you to quickly pinpoint the root cause of the issue and fix it.

DNS tests can run from both [managed](#select-locations) and [private locations][1] depending on your preference for running the test from outside or inside your network. DNS tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][2].

## Configuration

After choosing to create a `DNS` test, define your test's request.

### Define request

1. Specify the **Domain** you want your test to query. For example, `www.example.com`.
2. Specify the **DNS Server** to use (optional), it can be a domain name or an IP address. If not specified, your DNS test performs resolution using `8.8.8.8`, with a fallback on `1.1.1.1` and an internal AWS DNS server.
3. Specify your DNS Server **Port** (optional). If not specified, the DNS Server port defaults to 53.
4. Specify the amount of time in seconds before the test times out (optional).
5. **Name** your DNS test.
6. Add `env` **Tags** as well as any other tag to your DNS test. You can then use these tags to filter through your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page][3].

{{< img src="synthetics/api_tests/dns_test_config_new.png" alt="Define DNS query" style="width:90%;" >}}

Click **Test URL** to try out the request configuration. A response preview is displayed on the right side of your screen.

### Define assertions

Assertions define what an expected test result is. After you click **Test URL**, basic assertions on `response time` and available records are added. You must define at least one assertion for your test to monitor.

| Type                | Record type                                                     | Operator                                           | Value type                 |
|---------------------|-----------------------------------------------------------------|----------------------------------------------------|----------------------------|
| response time       |                                                                 | `is less than`                                     | _Integer (ms)_             |
| every available record        | of type A, of type AAAA, of type CNAME, of type MX, of type NS, of type TXT | `is`, `contains`, <br> `matches`, `does not match` | _String_ <br> _[Regex][4]_ |
| at least one record | of type A, of type AAAA, of type CNAME, of type MX, of type NS, of type TXT | `is`, `contains`, <br> `matches`, `does not match` | _String_ <br> _[Regex][4]_ |

You can create up to 20 assertions per API test by clicking **New Assertion** or by clicking directly on the response preview:

{{< img src="synthetics/api_tests/assertions_dns.png" alt="Define assertions for your DNS test to succeed or fail on" style="width:90%;" >}}

To perform `OR` logic in an assertion, use the `matches regex` comparator to define a regex with multiple expected values for the same assertion type like `(0|100)`. The test result is successful if every available record or at least one record assertions' value is 0 or 100.

If a test does not contain an assertion on the response body, the body payload drops and returns an associated response time for the request within the timeout limit set by the Synthetics Worker.

If a test contains an assertion on the response body and the timeout limit is reached, an `Assertions on the body/response cannot be run beyond this limit` error appears.

### Select locations

Select the **Locations** to run your DNS test from. DNS tests can run from both managed and [private locations][1] depending on your preference for monitoring a public or private domain.

{{% managed-locations %}} 

### Specify test frequency

DNS tests can run:

* **On a schedule** to ensure your most important services are always accessible to your users. Select the frequency at which you want Datadog to run your DNS test.
* [**Within your CI/CD pipelines**][2].
* **On-demand** to run your tests whenever makes the most sense for your team.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}} 

### Use variables

You can use the [global variables defined on the **Settings** page][9] in the URL, advanced options, and assertions of your DNS tests.

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

By default, only users with the [Datadog Admin and Datadog Standard roles][10] can create, edit, and delete Synthetic DNS tests. To get create, edit, and delete access to Synthetic DNS tests, upgrade your user to one of those two [default roles][10].

If you are using the [custom role feature][11], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access

Access restriction is available for customers using [custom roles][12] on their accounts.

You can restrict access to a DNS test based on the roles in your organization. When creating a DNS test, choose which roles (in addition to your user) can read and write your test. 

{{< img src="synthetics/settings/restrict_access_1.png" alt="Set permissions for your test" style="width:70%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/private_locations
[2]: /synthetics/cicd_integrations
[3]: /synthetics/search/#search
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: /monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /synthetics/guide/synthetic-test-monitors
[9]: /synthetics/settings/#global-variables
[10]: /account_management/rbac/
[11]: /account_management/rbac#custom-roles
[12]: /account_management/rbac/#create-a-custom-role
