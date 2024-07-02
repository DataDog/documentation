---
title: マルチステップ API テスト
kind: documentation
description: Chain requests to monitor sophisticated transactions on your key services.
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-apis-with-datadog/"
  tag: Blog
  text: Monitor your workflows with Datadog multistep API tests
- link: "https://learn.datadoghq.com/courses/intro-to-synthetic-tests"
  tag: Learning Center
  text: Introduction to Synthetic Tests
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: Get started with API tests
- link: /synthetics/private_locations
  tag: Documentation
  text: Run Multistep API tests on internal endpoints
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: Learn about Synthetic test monitors
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test"
  tag: 外部サイト
  text: Create and manage Synthetic Multistep API Tests with Terraform
---

## Overview

Multistep API tests allow you to chain several [HTTP requests][1] or [gRPC requests][20] at once to proactively monitor and ensure that the sophisticated journeys on your key services are available at anytime, and from anywhere. If you want to perform single requests to your services, use [API tests][2].

You can accomplish the following:

* Execute HTTP requests on API endpoints requiring authentication (for example, through a token)
* Monitor key business transactions at the API level
* Simulate end-to-end mobile application journeys

{{< img src="synthetics/multistep_tests/multistep_test_steps.png" alt="Multiple test steps in a multistep API test" style="width:90%;" >}}

If one of your services starts answering more slowly, or in an unexpected way (for example, unexpected response body or status code), your test can [**alert your team**][3], [**block your CI pipeline**][4], or even [**roll back the faulty deployment**][4].

Multistep API tests can run from Datadog [managed](#select-locations) and [private locations][5], allowing **full coverage of your systems**, both external and internal.

## Configuration

### Name and tag your test

1. Name your Multistep API test.
2. Add `env` and other tags to your Multistep API test. You can use these tags to filter through your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page][6].

### Select locations

Select the **Locations** for your Multistep API test. Multistep API tests can run from both managed and [private locations][5] depending on your preference for running the test from outside or inside your network.

{{% managed-locations %}} 

### Define steps

To create an API request step, click **Create Your First Step**.

{{< img src="synthetics/api_tests/ms_create_request.png" alt="Create your Multistep API test requests" style="width:90%;" >}}

By default, you can create up to 10 test steps. To increase this limit, contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a>.

#### Define the request

1. **Name** your step.
2. Choose a request type: HTTP or gRPC.

   {{< tabs >}}
   {{% tab "HTTP" %}}

   See the [HTTP Tests documentation][101] to create an HTTP request and add assertions. Assertions are optional in multistep API tests.

   [101]: /synthetics/multistep#define-the-request

   {{% /tab %}}
   {{% tab "gRPC" %}}

   See the [gRPC Tests documentation][101] to create a gRPC request and add assertions for a behavior check or a health check. Assertions are optional in multistep API tests.

   [101]: /synthetics/api_tests/grpc_tests#define-the-request

   {{% /tab %}}
   {{< /tabs >}}

#### Add execution parameters

Click **Continue with test if this step fails** to allow your test to move on with subsequent steps after step failure. This ensures your tests are able to clean up after themselves. For example, a test may create a resource, perform a number of actions on that resource, and end with the deletion of that resource. 

In case one of the intermediary steps fail, you want to have this setting enabled on every intermediary step to ensure that the resource is deleted at the end of the test and that no false positives are created.

The test generates an alert if an endpoint does not answer as expected. Your test can trigger retries X times after Y ms in case of a failed test result. Customize the retry interval to suit your alerting sensibility.

#### Extract variables from the response

Optionally, extract variables from the response of your API request by parsing its response headers or body. The value of the variable updates each time the API request step runs.

To start parsing a variable, click **Extract a variable from response content**:

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores and must have at least three characters.
2. Decide whether to extract your variable from the response headers or from the response body.

   * Extract the value from **response header**: use the full response header of your API request as the variable value, or parse it with a [`regex`][9].
   * Extract the value from **response body**: use the full response body of your API request as the variable value or parse it with a [`regex`][9], a [`JSONPath`][7], or a [`XPath`][8].

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="Extract variables from API requests in Multistep API test" style="width:90%;" >}}

You can extract up to ten variables per test step. Once created, this variable can be used in the following steps of your multistep API test. For more information, see [Use variables](#use-variables).

### Specify test frequency

Multistep API tests can run:

* **On a schedule** to ensure your most important endpoints are always accessible to your users. Select the frequency you want Datadog to run your multistep API test.
* [**Within your CI/CD pipelines**][4] to start shipping without fearing faulty code might impact your customers' experience.
* **On-demand** to run your tests whenever makes the most sense for your teams.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### Extract variables

In addition to creating local variables, you can [extract variables from any step](#extract-variables-from-the-response) of your multistep API test and [re-inject the values in subsequent steps](#use-variables).

### Use variables

You can use the [global variables defined in the `Settings`][14] and the [locally defined variables](#create-local-variables) in the URL, advanced options, and assertions of your API tests.

To display your list of variables, type `{{` in your desired field.

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Using Variables in Multistep API tests" video="true" width="90%" >}}

## Test failure

A test is considered `FAILED` if a step does not satisfy one or several assertions or if a step's request prematurely failed. In some cases, the test can indeed fail without being able to test the assertions against the endpoint, these reasons include:

`CONNREFUSED`
: No connection could be made because the target machine actively refused it.

`CONNRESET`
: The connection was abruptly closed by the remote server. Possible causes include the webserver encountering an error or crashing while responding, or loss of connectivity of the webserver.

`DNS`
: DNS entry not found for the test URL. Possible causes include a misconfigured test URL or a wrong configuration in your DNS entries.

`INVALID_REQUEST` 
: The configuration of the test is invalid (for example, a typo in the URL).

`SSL`
: The SSL connection couldn't be performed. [See the dedicated error page for more information][15].

`TIMEOUT`
: The request couldn't be completed in a reasonable time. Two types of `TIMEOUT` can happen:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indicates that the request duration hit the test defined timeout (default is set to 60s). 
  For each request only the completed stages for the request are displayed in the network waterfall. For example, in the case of `Total response time` only being displayed, the timeout occurred during the DNS resolution.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indicates that the request and assertions duration hit the maximum duration (10 minutes).

For HTTP steps, see [common HTTP step failures][15]. For gRPC steps, see [common gRPC step failures][16].

## 権限

By default, only users with the [Datadog Admin and Datadog Standard roles][17] can create, edit, and delete Synthetic multistep API tests. To get create, edit, and delete access to Synthetic multistep API tests, upgrade your user to one of those two [default roles][17].

If you are using the [custom role feature][18], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions for Synthetic Monitoring.

### Restrict access

Access restriction is available for customers using [custom roles][19] on their accounts.

You can restrict access to a multistep API test based on the roles in your organization. When creating a multistep API test, choose which roles (in addition to your user) can read and write your test. 

{{< img src="synthetics/settings/restrict_access_1.png" alt="Set permissions for your test" style="width:70%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/http_tests
[2]: /synthetics/api_tests/
[3]: /synthetics/api_tests/http_tests?tab=requestoptions#configure-the-test-monitor
[4]: /synthetics/cicd_integrations
[5]: /synthetics/private_locations
[6]: /synthetics/search/#search-for-tests
[7]: https://restfulapi.net/json-jsonpath/
[8]: https://www.w3schools.com/xml/xpath_syntax.asp
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[10]: /monitors/notify/?tab=is_alert#configure-notifications-and-automations
[11]: http://daringfireball.net/projects/markdown/syntax
[12]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[13]: /synthetics/guide/synthetic-test-monitors
[14]: /synthetics/settings/#global-variables
[15]: /synthetics/api_tests/http_tests?tab=requestoptions#test-failure
[16]: /synthetics/api_tests/grpc_tests?tab=unarycall#test-failure
[17]: /account_management/rbac/
[18]: /account_management/rbac#custom-roles
[19]: /account_management/rbac/#create-a-custom-role
[20]: /synthetics/api_tests/grpc_tests