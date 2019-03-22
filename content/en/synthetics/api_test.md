---
title: API Tests
kind: documentation
beta: true
description: Simulate and monitor HTTP requests from specific locations
aliases:
  - synthetics/uptime_check
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

<div class="alert alert-warning">Synthetics is only available in the US. Browser tests are available in beta: to request access complete the <a href="https://app.datadoghq.com/synthetics/beta">Datadog Synthetics Request form</a>.</div>

## Overview

API tests are HTTP requests (GET, POST, PUT, etc.) executed by Datadog to your web properties or application endpoints at configurable periodic intervals from multiple locations around the world. These checks verify that your applications are responding to requests, as well as that they meet any conditions you define—such as response time, HTTP status code, and header or body contents.

## Configuration
### Request

Define the request you want to be executed by Datadog:

{{< img src="synthetics/api_test/uptime_check_make_request.png" alt="API Tests make request" responsive="true" style="width:80%;">}}

1. Choose the `Method` and `URL` to query. Available `Method`s are:
    * GET
    * POST
    * PATCH
    * PUT
    * DELETE
    * OPTIONS

2. Optionally, click on **Advanced options** to enrich your request with custom request headers, authentication credentials, body content, or cookies.

3. Name your API test.
4. Optionally, add tags to filter your API test in the [Synthetics page][1].

5. Pick locations to run the test from. Available locations are:
    * Frankfurt (Request made from an AWS Datacenter)
    * Tokyo (Request made from an AWS Datacenter)
    * Oregon (Request made from an AWS Datacenter)
    * London (Request made from an AWS Datacenter)

6. Choose a check frequency between "1 run per minute" and "1 run per week".
7. Finish by clicking on **Test URL** to try out the request configuration. You should see a response preview show up in the right side of your screen.

### Validation

When running an API test, you must define at least one assertion that should be monitored by Datadog. An assertion is defined by a parameter, a comparator, and a value.

| Parameter     | Comparators                           | Value type                                                                    |
| ------------- | ------------------------------------- | ----------------------------------------------------------------------------- |
| Status Code   | `is`, `is not`                        | Integer                                                                       |
| Response time | `less than`                           | Integer                                                                       |
| Headers       | `contains`, `is`, `is not`, `matches` | for `contains`/`is`/`is not`: String <br> for `matches`: [RegexStrings][2]    |
| Body          | `contains`, `is`, `is not`, `matches` | for `contains`/`is`/`is not`: String <br> for `matches`: [RegexStrings][2]    |

If you define an assertion on the content of `Headers`, you must define the headers name and the associated value.

Click on **Add new assertion** to add up to 10 assertions for your API test.

**Note**: If you clicked on **Test URL**, then the basic assertions are automatically filled:

{{< img src="synthetics/api_test/assertion.png" alt="Assertions" responsive="true" style="width:80%;">}}

Use the **Test URL** response to quickly add status code, response time or headers from the test response as one of the API test assertions:

{{< img src="synthetics/api_test/assertion_setup.gif" alt="Assertions" responsive="true" style="width:80%;">}}

### Notifications

A notification is sent if at least one of the assertion fails. To configure notifications:

1. Select users and/or [services][3] to send the notifications to. Note that you can use the [`@-notification` feature][4] in the **message** field.
2. Enter a **message** for the API test. This field allows standard [Markdown formatting][5]. Notification messages include the **message** defined in this section and information about which assertion failed and why.
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

[1]: /synthetics
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[3]: /integrations/#cat-notification
[4]: /developers/faq/what-do-notifications-do-in-datadog
[5]: http://daringfireball.net/projects/markdown/syntax
