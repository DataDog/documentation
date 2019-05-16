---
title: API Tests
kind: documentation
beta: true
description: Simulate and monitor HTTP requests from specific locations
aliases:
  - /synthetics/uptime_check
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "synthetics/browser_test"
  tag: "Documentation"
  text: "Configure a Browser Test"
---

## Overview

API tests are HTTP requests (GET, POST, PUT, etc.) executed by Datadog to your web properties or application endpoints at configurable periodic intervals from multiple locations around the world. These checks verify that your applications are responding to requests, as well as that they meet any conditions you define—such as response time, HTTP status code, and header or body contents.

## Configuration
### Request

Define the request you want executed by Datadog:

1. **Choose request type**: `HTTP` or `SSL`
2. Choose the **Method** and **URL** to query. Available methods are: `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE`, and `OPTIONS`.
    * Advanced Options (optional): Use custom request headers, authentication credentials, body content, or cookies.
        * Follow Redirects: Toggle to have the monitored endpoint follow up to ten redirects.
        * Headers: Defined headers override the default browser headers. For example, set the User Agent in the header to [identify Datadog scripts][1].
        * Authentication: HTTP basic authentication with username and password
        * Body: Request body and body type (`text/plain`, `application/json`, `text/xml`, `text/html`, or `None`)
        * Cookies: Defined cookies are added to the default browser cookies. Set multiple cookies using the format `cookie1=<YOUR_COOKIE_1>; cookie2=<YOUR_COOKIE_2>`.
3. **Name**: The name of your API test.
4. **Select your tags**: The tags attached to your browser test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` on the [Synthetics page][2].
5. **Locations**: The locations to run the test from. Many AWS locations from around the world are available. The full list is retrievable through the [Datadog API][3].
6. **How often should Datadog run the test?** Intervals are available between every five minutes to once per week.
7. Click on **Test URL** to try out the request configuration. You should see a response preview show up on the right side of your screen.

### Alert conditions

Set alert conditions to determine the circumstances under which you want a test to send an alert. When you set the alert conditions to: `An alert is triggered if any assertion fails for X minutes from any n of N locations`, an alert is triggered if:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes, **AND**
* At one moment during the last *X* minutes, at least *n* locations were in failure

The uptime bar is displayed differently on your test result: location uptime is displayed on a per-evaluation basis (whether the last test was up or down). Total uptime is displayed based on the configured alert conditions. Notifications sent are based on the total uptime bar.

### Validation

When running an API test, you must define at least one assertion that should be monitored by Datadog. An assertion is defined by a parameter, a comparator, and a value.

| Type          | Operator                              | Value type                                                                    |
| ------------- | ------------------------------------- | ----------------------------------------------------------------------------- |
| Status Code   | `is`, `is not`                        | Integer                                                                       |
| Response time | `less than`                           | Integer                                                                       |
| Headers       | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | for `contains`/`does not contain`/`is`/`is not`: String <br> for `matches`/`does not match`: [RegexStrings][4]    |
| Body          | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | for `contains`/`does not contain`/`is`/`is not`: String <br> for `matches`/`does not match`: [RegexStrings][4]    |

If you define an assertion on the content of `Headers`, you must define the `headers property` and its associated value.

Click on **Add new assertion** to add up to 10 assertions for your API test.

**Note**: If you clicked on **Test URL**, then the basic assertions are automatically filled:

{{< img src="synthetics/api_test/assertion.png" alt="Assertions" responsive="true" style="width:80%;">}}

Use the **Test URL** response to quickly add status code, response time or headers from the test response as one of the API test assertions:

{{< img src="synthetics/api_test/assertion_setup.gif" alt="Assertions" responsive="true" style="width:80%;">}}

### Notifications

A notification is sent according to the set [alert conditions](#alert-conditions). To configure notifications:

1. Select users and/or [services][5] to send the notifications to. Note that you can use the [`@-notification` feature][6] in the **message** field.
2. Enter a **message** for the API test. This field allows standard [Markdown formatting][7]. Notification messages include the **message** defined in this section and information about which assertion failed and why.
3. Click **Save** to save your API test.

Notifications example:

{{< img src="synthetics/api_test/uptime_check_notifications.png" alt="Assertions" responsive="true" style="width:80%;">}}

## Network timings

The Synthetics details page displays the following network timings:

| Timing                    | Description                                                                                           |
|---------------------------|-------------------------------------------------------------------------------------------------------|
| DNS                       | Time spent resolving the DNS name of the last request.                                                |
| Connect                   | Time spent establishing a connection to the server.                                                   |
| SSL                       | Time spent for the TLS handshake. If the last request is not over HTTPS, this metric does not appear. |
| TTFB (time to first byte) | Time spent waiting for the first byte of response to be received.                                     |
| Download                  | Time spent downloading the response.                                                                  |

Response time is the sum of these network timings.

## Failures

A check is considered `FAILED` if it doesn't satisfy the assertions configured for this check, or if the request failed for another reason. These reasons include:

| Error           | Description                                                                                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CONNRESET       | The connection was abruptly closed by the remote server. Possible causes include the webserver encountering an error or crashing while responding, loss of connectivity of the webserver, etc. |
| DNS             | DNS entry not found for the check URL. Possible causes include misconfigured check URL, wrong configuration of your DNS entries, etc.                                                        |
| INVALID_REQUEST | The configuration of the check is invalid (e.g., typo in the URL).                                                                                                                             |
| SSL             | The SSL connection couldn't be performed; see below for more detailed explanations.                                                                                                          |
| TIMEOUT         | The request couldn't be completed in a reasonable time.                                                                                                                                      |

If a test fails, the uptime directly considers the endpoint as `down`. It is not retested until the next test run.

### SSL errors

| Error                              | Description                                                                                                                                                            |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CERT_CHAIN_TOO_LONG                | The certificate chain length is greater than the supplied maximum depth.                                                                                               |
| CERT_HAS_EXPIRED                   | The certificate is expired.                                                                                                                                           |
| CERT_NOT_YET_VALID                 | The certificate is not valid until a future date.                                                                                                                      |
| CERT_REJECTED                      | The root CA is marked to reject the purpose specified.                                                                                                                 |
| CERT_REVOKED                       | The certificate was revoked by the issuer.                                                                                                                             |
| CERT_UNTRUSTED                     | The root CA is not marked as trusted for its intended purpose.                                                                                                         |
| CERT_SIGNATURE_FAILURE             | The signature of the certificate is not valid.                                                                                                                         |
| CRL_HAS_EXPIRED                    | The certificate revocation list (CRL) has expired.                                                                                                                     |
| CRL_NOT_YET_VALID                  | The certificate revocation list (CRL) is not valid until a future date.                                                                                                |
| CRL_SIGNATURE_FAILURE              | The CRL signature of the certificate is not valid.                                                                                                                     |
| DEPTH_ZERO_SELF_SIGNED_CERT        | The passed certificate is self-signed and the same certificate cannot be found in the list of trusted certificates.                                                    |
| ERROR_IN_CERT_NOT_AFTER_FIELD      | There is a format error in the notAfter field in the certificate.                                                                                                      |
| ERROR_IN_CERT_NOT_BEFORE_FIELD     | There is a format error in the notBefore field in the certificate.                                                                                                     |
| ERROR_IN_CRL_LAST_UPDATE_FIELD     | The CRL lastUpdate field contains an invalid time.                                                                                                                     |
| ERROR_IN_CRL_NEXT_UPDATE_FIELD     | The CRL nextUpdate field contains an invalid time.                                                                                                                     |
| INVALID_CA                         | A CA certificate is not valid because it is not a CA or its extensions are not consistent with the intended purpose.                                                   |
| INVALID_PURPOSE                    | The certificate that was provided cannot be used for its intended purpose.                                                                                             |
| OUT_OF_MEM                         | An error occurred while allocating memory.                                                                                                                             |
| PATH_LENGTH_EXCEEDED               | The basicConstraints pathlength parameter was exceeded.                                                                                                                |
| SELF_SIGNED_CERT_IN_CHAIN          | A self-signed certificate exists in the certificate chain. The certificate chain can be built using the untrusted certificates, but the root CA cannot be found locally. |
| UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY | The public key in the certificate cannot be read.                                                                                                                   |
| UNABLE_TO_DECRYPT_CERT_SIGNATURE   | Unable to decrypt the signature of the certificate.                                                                                                                    |
| UNABLE_TO_DECRYPT_CRL_SIGNATURE    | The CRL signature cannot be decrypted. (The actual signature value cannot be determined.)                                                                        |
| UNABLE_TO_GET_CRL                  | The certificate revocation list (CRL) is not found.                                                                                                                   |
| UNABLE_TO_GET_ISSUER_CERT          | Unable to find the certificate for one of the certificate authorities (CAs) in the signing hierarchy, and that CA is not trusted by the local application.             |
| UNABLE_TO_GET_ISSUER_CERT_LOCALLY  | The issuer certificate of a locally found certificate is not found. This usually means that the list of trusted certificates is not complete.                         |
| UNABLE_TO_VERIFY_LEAF_SIGNATURE    | No signatures are verified because the certificate chain contains only one certificate, which is not self-signed, and the issuer is not trusted.                      |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/identify_synthetics_bots
[2]: /synthetics
[3]: /api/?lang=bash#get-available-locations
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: /integrations/#cat-notification
[6]: /developers/faq/what-do-notifications-do-in-datadog
[7]: http://daringfireball.net/projects/markdown/syntax
