---
title: HTTP Testing
description: Simulate HTTP requests to monitor public and internal API endpoints.
aliases:
  - /synthetics/http_test
  - /synthetics/http_check
  - /synthetics/guide/or-logic-api-tests-assertions
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "https://learn.datadoghq.com/courses/intro-to-synthetic-tests"
  tag: "Learning Center"
  text: "Introduction to Synthetic Tests"
- link: "/getting_started/synthetics/api_test"
  tag: "Documentation"
  text: "Get started with HTTP tests"
- link: "/synthetics/private_locations"
  tag: "Documentation"
  text: "Run HTTP tests on internal endpoints"
- link: "/synthetics/multistep"
  tag: "Documentation"
  text: "Run multistep HTTP tests"
- link: "/synthetics/guide/synthetic-test-monitors"
  tag: "Documentation"
  text: "Learn about Synthetic test monitors"
algolia:
  rank: 70
  category: Documentation
  subcategory: Synthetic API Tests
  tags: ["http", "http test", "http tests"]
---
## Overview

HTTP tests allow you to send HTTP requests to your applications' API endpoints to verify responses and defined conditions, such as overall response time, expected status code, header, or body content.

HTTP tests can run from both [managed](#select-locations) and [private locations][1] depending on your preference for running the test from outside or inside your network. HTTP tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][2].

## Configuration

You may create a test using one of the following options:

   - **Create a test from a template**:
   
     1. Hover over one of the pre-populated templates and click **View Template**. This opens a side panel displaying pre-populated configuration information, including: Test Details, Request Details, Assertions, Alert Conditions, and Monitor Settings. 
     2. Click **+Create Test** to open the **Define Request** page, where you can review and edit the pre-populated configuration options. The fields presented are identical to those available when creating a test from scratch.
     3. Click **Save Details** to submit your API test. <br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Video of Synthetics API test landing page with templates" video="true" >}}

  - **Build a test from scratch**:
    
     1. To build a test from scratch, click the **+ Start from scratch** template, then select the `HTTP` request type and specify the **URL** to query. 
        Available methods are: `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE`, and `OPTIONS`. Both `http` and `https` URLs are supported.

        <div class="alert alert-info">See <a href=#advanced-options>Advanced options</a> for more options.</div>

     2. **Name** your HTTP test.

     3. Add Environment **Tags** as well as any other tag to your HTTP test. You can then use these tags to filter through your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page][3]. 
     
     4. Click **Send** to try out the request configuration. A response preview is displayed on the right side of your screen.<br /><br>

       {{< img src="getting_started/synthetics/api-test-config-4.png" alt="Define HTTP request" style="width:90%;" >}}

     5. Click **Create Test** to submit your API test.

### Snippets

{{% synthetics-api-tests-snippets %}}

### Advanced options

   {{< tabs >}}

   {{% tab "Request Options" %}}
   * **HTTP version**: Select `HTTP/1.1 only`, `HTTP/2 only`, or `HTTP/2 fallback to HTTP/1.1`.
   * **Follow redirects**: Select to have your HTTP test follow up to ten redirects when performing the request.
   * **Ignore server certificate error**: Select to have your HTTP test go on with connection even if there are errors when validating the SSL certificate.
   * **Timeout**: Specify the amount of time in seconds before the test times out.
   * **Request headers**: Define headers to add to your HTTP request. You can also override the default headers (for example, the `user-agent` header).
   * **Cookies**: Define cookies to add to your HTTP request. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

   {{% /tab %}}

   {{% tab "Authentication" %}}

   * **Client Certificate**: Authenticate through mTLS by uploading your client certificate (`.crt`) and the associated private key (`.key`) in `PEM` format. You can use the `openssl` library to convert your certificates. For example, convert a `PKCS12` certificate to `PEM` formatted private keys and certificates.

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   * **HTTP Basic Auth**: Add HTTP basic authentication credentials.
   * **Digest Auth**: Add Digest authentication credentials.
   * **NTLM**: Add NTLM authentication credentials. Support both NTLMv2 and NTLMv1.
   * **AWS Signature v4**: Enter your Access Key ID and Secret Access Key. Datadog generates the signature for your request. This option uses the basic implementation of SigV4. Specific signatures such as Amazon S3 are not supported out-of-the box.
     For "Single Chunk" transfer requests to Amazon S3 buckets, add `x-amz-content-sha256` containing the sha256-encoded body of the request as a header (for an empty body: `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`).
   * **OAuth 2.0**: Choose between granting client credentials or a resource owner password and enter an access token URL. Depending on your selection, enter a client ID and secret, or a username and password. From the dropdown menu, select an option to either send the API token as a basic authentication header, or send the client credentials in the body. Optionally, you can provide additional information such as the audience, resource, and scope (as well as the client ID and secret, if you selected **Resource Owner Password**).

   {{% /tab %}}

   {{% tab "Query Parameters" %}}

   * **Encode parameters**: Add the name and value of query parameters that require encoding.

   {{% /tab %}}

   {{% tab "Request Body" %}}

   * **Body type**: Select the type of the request body (`application/json`, `application/octet-stream`, `application/x-www-form-urlencoded`, `multipart/form-data`, `text/html`, `text/plain`, `text/xml`, `GraphQL`, or `None`) you want to add to your HTTP request.
   * **Request body**: Add the content of your HTTP request body.
       * The request body is limited to a maximum size of 50 kilobytes for `application/json`, `application/x-www-form-urlencoded`, `text/html`, `text/plain`, `text/xml`, `GraphQL`.
       * The request body is limited to one file of 3 megabytes for `application/octet-stream`.
       * The request body is limited to three files of 3 megabytes each for `multipart/form-data`.
   {{% /tab %}}

   {{% tab "Proxy" %}}

   * **Proxy URL**: Specify the URL of the proxy the HTTP request should go through (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * **Proxy header**: Add headers to include in the HTTP request to the proxy.

   {{% /tab %}}

   {{% tab "Privacy" %}}

   * **Do not save response body**: Select this option to prevent response body from being saved at runtime. This can be helpful to ensure no sensitive data gets featured in your test results. Use mindfully as it can make failures troubleshooting more difficult. For more security recommendations, see [Synthetic Monitoring Security][1].


[1]: /data_security/synthetics
   {{% /tab %}}

   {{% tab "Javascript" %}}

Define variables for your HTTP API tests with JavaScript:

{{< img src="synthetics/api_tests/http_javascript.png" alt="Define HTTP API test with Javascript" style="width:90%;" >}}

<div class="alert alert-info">JavaScript capabilities are not supported for API tests in Windows private locations.</div>

   {{% /tab %}}

   {{< /tabs >}}

### Define assertions

Assertions define what an expected test result is. After you click **Test URL**, basic assertions on `response time`, `status code`, and `header` `content-type` are added based on the response that was obtained. You must define at least one assertion for your test to monitor.

| Type          | Operator                                                                                               | Value type                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| body          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][4], [`xpath`][5] | _String_ <br> _[Regex][6]_ |
| header        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _String_ <br> _[Regex][6]_                                      |
| response time | `is less than`                                                                                         | _Integer (ms)_                                                  |
| status code   | `is`, `is not`, <br> `matches`, `does not match`                                                                                         | _Integer_ <br> _[Regex][6]_                                                     |

HTTP tests can decompress bodies with the following `content-encoding` headers: `br`, `deflate`, `gzip`, and `identity`.

You can create up to 20 assertions per API test by clicking **New Assertion** or by clicking directly on the response preview:

{{< img src="synthetics/api_tests/assertions_http.png" alt="Define assertions for your HTTP test to succeed or fail on" style="width:90%;" >}}

To perform `OR` logic in an assertion, use the `matches regex` comparator to define a regex with multiple expected values like `(200|302)`. For example, you may want your HTTP test to succeed when a server must respond with a `200` or `302` status code. The `status code` assertion succeeds if the status code is 200 or 302. You can also add `OR` logic on a `body` or `header` assertion.

If a test does not contain an assertion on the response body, the body payload drops and returns an associated response time for the request within the timeout limit set by the Synthetics Worker.

If a test contains an assertion on the response body and the timeout limit is reached, an `Assertions on the body/response cannot be run beyond this limit` error appears.

### Select locations

Select the **Locations** to run your HTTP test from. HTTP tests can run from both managed and [private locations][1] depending on your preference for running the test from outside or inside your network.

{{% managed-locations %}}

### Specify test frequency

HTTP tests can run:

* **On a schedule** to ensure your most important endpoints are always accessible to your users. Select the frequency at which you want Datadog to run your HTTP test.
* [**Within your CI/CD pipelines**][2] to start shipping without fearing faulty code might impact your customers' experience.
* **On-demand** to run your tests whenever makes the most sense for your team.

{{% synthetics-alerting-monitoring %}}

## One-click

API test creation suggests endpoints from the [Software Catalog][17] and existing API tests to prefill your test form with relevant options.
Use existing Datadog data sources such as APM traces, Software Catalog endpoints discovery, and existing similar Synthetic tests created by users.

Start typing in the API test **URL** input to get endpoint suggestions or similar tests in Synthetic Monitoring:

   {{< img src="synthetics/api_tests/api-one-click.png" alt="HTTP API Test showing a GET search for an existing API test" style="width:90%;" >}}

Then, select a suggestion to prefill your test configuration (request options and headers, authentication, and variables):

   {{< img src="synthetics/api_tests/api-test-monitor-search.png" alt="Select" style="width:90%;" >}}

{{% synthetics-variables %}}

### Use variables

You can use the [global variables defined on the **Settings** page][11] in the URL, advanced options, and assertions of your HTTP tests.

To display your list of variables, type `{{` in your desired field:

{{< img src="synthetics/api_tests/http_use_variable.mp4" alt="Using variables in an HTTP test" video="true" width="100%" >}}

## Test failure

A test is considered `FAILED` if it does not satisfy one or more assertions or if the request prematurely failed. In some cases, the test can fail without testing the assertions against the endpoint.

The most common errors include the following:

`AUTHENTICATION_ERROR`
: Synthetic Monitoring automatically disables test retries when authentication failures occur. This safety measure remains in effect until you update the test with valid credentials. This prevents unnecessary test executions that would generate false alerts and increase billable usage.

`CONNREFUSED`
: No connection could be made because the target machine actively refused it.

`CONNRESET`
: The connection was abruptly closed by the remote server. Possible causes include the web server encountering an error or crashing while responding, or loss of connectivity of the web server.

`DNS`
: DNS entry not found for the test URL. Possible causes include misconfigured test URL or the wrong configuration of your DNS entries.

`Error performing HTTP/2 request`
: The request could not be performed. See the dedicated [error][16] page for more information.

`INVALID_REQUEST`
: The configuration of the test is invalid (for example, a typo in the URL).

`SSL`
: The SSL connection couldn't be performed. [See the dedicated error page for more information][12].

`TIMEOUT`
: The request couldn't be completed in a reasonable time. Two types of `TIMEOUT` can happen:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indicates that the request duration hit the test defined timeout (default is set to 60s).
  For each request only the completed stages for the request are displayed in the network waterfall. For example, in the case of `Total response time` only being displayed, the timeout occurred during the DNS resolution.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indicates that the test duration (request + assertions) hits the maximum duration (60.5s).

`MALFORMED_RESPONSE`
: The remote server responded with a payload that does not comply with HTTP specifications. This error can happen when remote servers differ in their HTTP support. To prevent issues, run tests with a consistent HTTP version: either HTTP/2 (if available) or HTTP/1.1.

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][13] can create, edit, and delete Synthetic HTTP tests. To get create, edit, and delete access to Synthetic HTTP tests, upgrade your user to one of those two [default roles][13].

If you are using the [custom role feature][14], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access

{{% synthetics_grace_permissions %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/private_locations
[2]: /synthetics/cicd_integrations
[3]: /synthetics/search/#search
[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[7]: /monitors/notify/#configure-notifications-and-automations
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[10]: /synthetics/guide/synthetic-test-monitors
[11]: /synthetics/settings/#global-variables
[12]: /synthetics/api_tests/errors/#ssl-errors
[13]: /account_management/rbac/
[14]: /account_management/rbac#custom-roles
[15]: /account_management/rbac/#create-a-custom-role
[16]: /synthetics/api_tests/errors/#http-errors
[17]: /api_catalog
