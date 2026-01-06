---
title: API Testing Errors
description: Detailed description of API test errors
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "/synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a Browser Test"
---
## HTTP errors

The most common HTTP errors include the following:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 250px;">Error</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>AUTHENTICATION_ERROR</code></td>
<td>Synthetic Monitoring automatically disables test retries when authentication failures occur. This safety measure remains in effect until you update the test with valid credentials. This prevents unnecessary test executions that would generate false alerts and increase billable usage.</td>
</tr>
<tr>
<td><code>CONNREFUSED</code></td>
<td>No connection could be made because the target machine actively refused it.</td>
</tr>
<tr>
<td><code>CONNRESET</code></td>
<td>The connection was abruptly closed by the remote server. Possible causes include the web server encountering an error or crashing while responding, or loss of connectivity of the web server.</td>
</tr>
<tr>
<td><code>DNS</code></td>
<td>DNS entry not found for the test URL. Possible causes include misconfigured test URL or the wrong configuration of your DNS entries.</td>
</tr>
<tr>
<td><code>Error performing HTTP/2 request</code></td>
<td>The request could not be performed. This may occur when a remote server's HTTP support is inconsistent. For example, suppose you run a test that reaches an endpoint on a server that supports HTTP 2. On the next run, if the test comes across the same endpoint on a server that only has HTTP 1.1 support, the test fails to establish an HTTP 2 connection and returns an error. In this scenario, switching to HTTP/1.1 prevents the error.</td>
</tr>
<tr>
<td><code>INVALID_REQUEST</code></td>
<td>The configuration of the test is invalid (for example, a typo in the URL).</td>
</tr>
<tr>
<td><code>SSL</code></td>
<td>The SSL connection couldn't be performed. See the <a href="#ssl-errors">SSL errors</a> section for more information.</td>
</tr>
<tr>
<td><code>TIMEOUT</code></td>
<td>The request couldn't be completed in a reasonable time. There are two types of timeout errors:<br><br><strong>Request timeout</strong>: The request duration exceeded the test's configured timeout (default: 60s). The network waterfall displays only the completed stages. For example, if only <code>Total response time</code> appears, the timeout occurred during DNS resolution.<br><br><strong>Overall timeout</strong>: The combined test duration (request + assertions) exceeded the maximum allowed time (60s).</td>
</tr>
<tr>
<td><code>MALFORMED_RESPONSE</code></td>
<td>The remote server responded with a payload that does not comply with HTTP specifications. This error can happen when remote servers differ in their HTTP support. To prevent issues, run tests with a consistent HTTP version: either HTTP/2 (if available) or HTTP/1.1.</td>
</tr>
<tr>
<td><code>INCORRECT_ASSERTION</code></td>
<td>The expected value of the assertion does not match the actual value. For example, when asserting on an HTTP response status code, if you expect <code>200</code> but the response returns <code>400</code>, the INCORRECT_ASSERTION error is thrown.</td>
</tr>
</tbody>
</table>
</div>

## SSL errors

SSL errors can occur during an API test run. They are different from failing assertions on SSL tests and can occur on all types of API tests.

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 340px;">Error</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>CERT_CHAIN_TOO_LONG</code></td>
<td>The certificate chain length is greater than the supplied maximum depth.</td>
</tr>
<tr>
<td><code>CERT_HAS_EXPIRED</code></td>
<td>The certificate is expired.</td>
</tr>
<tr>
<td><code>CERT_NOT_YET_VALID</code></td>
<td>The certificate is not valid until a future date.</td>
</tr>
<tr>
<td><code>CERT_REJECTED</code></td>
<td>The root CA is marked to reject the purpose specified.</td>
</tr>
<tr>
<td><code>CERT_REVOKED</code></td>
<td>The certificate was revoked by the issuer.</td>
</tr>
<tr>
<td><code>CERT_UNTRUSTED</code></td>
<td>The root CA is not marked as trusted for its intended purpose.</td>
</tr>
<tr>
<td><code>CERT_SIGNATURE_FAILURE</code></td>
<td>The signature of the certificate is not valid.</td>
</tr>
<tr>
<td><code>CRL_HAS_EXPIRED</code></td>
<td>The certificate revocation list (CRL) has expired.</td>
</tr>
<tr>
<td><code>CRL_NOT_YET_VALID</code></td>
<td>The certificate revocation list (CRL) is not valid until a future date.</td>
</tr>
<tr>
<td><code>CRL_SIGNATURE_FAILURE</code></td>
<td>The CRL signature of the certificate is not valid.</td>
</tr>
<tr>
<td><code>DEPTH_ZERO_SELF_SIGNED_CERT</code></td>
<td>The passed certificate is self-signed and the same certificate cannot be found in the list of trusted certificates.</td>
</tr>
<tr>
<td><code>ERROR_IN_CERT_NOT_AFTER_FIELD</code></td>
<td>There is a format error in the notAfter field in the certificate.</td>
</tr>
<tr>
<td><code>ERROR_IN_CERT_NOT_BEFORE_FIELD</code></td>
<td>There is a format error in the notBefore field in the certificate.</td>
</tr>
<tr>
<td><code>ERROR_IN_CRL_LAST_UPDATE_FIELD</code></td>
<td>The CRL lastUpdate field contains an invalid time.</td>
</tr>
<tr>
<td><code>ERROR_IN_CRL_NEXT_UPDATE_FIELD</code></td>
<td>The CRL nextUpdate field contains an invalid time.</td>
</tr>
<tr>
<td><code>INVALID_CA</code></td>
<td>A CA certificate is not valid because it is not a CA or its extensions are not consistent with the intended purpose.</td>
</tr>
<tr>
<td><code>INVALID_PURPOSE</code></td>
<td>The certificate that was provided cannot be used for its intended purpose.</td>
</tr>
<tr>
<td><code>OUT_OF_MEM</code></td>
<td>An error occurred while allocating memory.</td>
</tr>
<tr>
<td><code>PATH_LENGTH_EXCEEDED</code></td>
<td>The basicConstraints pathlength parameter was exceeded.</td>
</tr>
<tr>
<td><code>SELF_SIGNED_CERT_IN_CHAIN</code></td>
<td>A self-signed certificate exists in the certificate chain. The certificate chain can be built using the untrusted certificates, but the root CA cannot be found locally.</td>
</tr>
<tr>
<td><code>UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY</code></td>
<td>The public key in the certificate cannot be read.</td>
</tr>
<tr>
<td><code>UNABLE_TO_DECRYPT_CERT_SIGNATURE</code></td>
<td>Unable to decrypt the signature of the certificate.</td>
</tr>
<tr>
<td><code>UNABLE_TO_DECRYPT_CRL_SIGNATURE</code></td>
<td>The CRL signature cannot be decrypted. (The actual signature value cannot be determined.)</td>
</tr>
<tr>
<td><code>UNABLE_TO_GET_CRL</code></td>
<td>The certificate revocation list (CRL) is not found.</td>
</tr>
<tr>
<td><code>UNABLE_TO_GET_ISSUER_CERT</code></td>
<td>Unable to find the certificate for one of the certificate authorities (CAs) in the signing hierarchy, and that CA is not trusted by the local application. For example, this error may be thrown when the self-signed root CA, but not the intermediate CA, is missing from the list of trusted certificates.</td>
</tr>
<tr>
<td><code>UNABLE_TO_GET_ISSUER_CERT_LOCALLY</code></td>
<td>The issuer certificate of a locally found certificate is not found. This usually means that the list of trusted certificates is not complete. For example, this error may be thrown when the self-signed root CA and intermediate CA are both missing from the list of trusted certificates.</td>
</tr>
<tr>
<td><code>UNABLE_TO_VERIFY_LEAF_SIGNATURE</code></td>
<td>No signatures are verified because the certificate chain contains only one certificate, which is not self-signed, and the issuer is not trusted.</td>
</tr>
</tbody>
</table>
</div>

## DNS errors

The most common DNS errors include the following:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 200px;">Error</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>CONNRESET</code></td>
<td>The connection was abruptly closed by the remote server. Possible causes include the web server encountering an error or crashing while responding, or loss of connectivity of the web server.</td>
</tr>
<tr>
<td><code>DNS</code></td>
<td>DNS entry not found for the test URL. Possible causes include misconfigured test URL or the wrong configuration of your DNS entries.</td>
</tr>
<tr>
<td><code>INVALID_REQUEST</code></td>
<td>The configuration of the test is invalid (for example, a typo in the URL).</td>
</tr>
<tr>
<td><code>TIMEOUT</code></td>
<td>The request couldn't be completed in a reasonable time. There are two types of timeout errors:<br><br><strong>Request timeout</strong>: The request duration exceeded the test's configured timeout (default: 60s). The network waterfall displays only the completed stages. For example, if only <code>Total response time</code> appears, the timeout occurred during DNS resolution.<br><br><strong>Overall timeout</strong>: The combined test duration (request + assertions) exceeded the maximum allowed time (60s).</td>
</tr>
</tbody>
</table>
</div>

## TCP errors

The most common TCP errors include the following:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 200px;">Error</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>CONNRESET</code></td>
<td>The connection was abruptly closed by the remote server. Possible causes include the web server encountering an error or crashing while responding, or loss of connectivity of the web server.</td>
</tr>
<tr>
<td><code>DNS</code></td>
<td>DNS entry not found for the test URL. Possible causes include misconfigured test URL or the wrong configuration of your DNS entries.</td>
</tr>
<tr>
<td><code>INVALID_REQUEST</code></td>
<td>The configuration of the test is invalid (for example, a typo in the URL).</td>
</tr>
<tr>
<td><code>TIMEOUT</code></td>
<td>The request couldn't be completed in a reasonable time. There are two types of timeout errors:<br><br><strong>Request timeout</strong>: The request duration exceeded the test's configured timeout (default: 60s). The network waterfall displays only the completed stages. For example, if only <code>Total response time</code> appears, the timeout occurred during DNS resolution.<br><br><strong>Overall timeout</strong>: The combined test duration (request + assertions) exceeded the maximum allowed time (60s).</td>
</tr>
</tbody>
</table>
</div>

## UDP errors

The most common UDP errors include the following:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 200px;">Error</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>CONNRESET</code></td>
<td>The connection was abruptly closed by the remote server. Possible causes include the web server encountering an error or crashing while responding, or loss of connectivity of the web server.</td>
</tr>
<tr>
<td><code>DNS</code></td>
<td>DNS entry not found for the test URL. Possible causes include misconfigured test URL or the wrong configuration of your DNS entries.</td>
</tr>
<tr>
<td><code>INVALID_REQUEST</code></td>
<td>The configuration of the test is invalid (for example, a typo in the URL).</td>
</tr>
<tr>
<td><code>TIMEOUT</code></td>
<td>The request couldn't be completed in a reasonable time. There are two types of timeout errors:<br><br><strong>Request timeout</strong>: The request duration exceeded the test's configured timeout (default: 60s). The network waterfall displays only the completed stages. For example, if only <code>Total response time</code> appears, the timeout occurred during DNS resolution.<br><br><strong>Overall timeout</strong>: The combined test duration (request + assertions) exceeded the maximum allowed time (60s).</td>
</tr>
</tbody>
</table>
</div>

## ICMP errors

The most common ICMP errors include the following:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 200px;">Error</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>DNS</code></td>
<td>DNS entry not found for the test URL. Possible causes include misconfigured test URL or the wrong configuration of your DNS entries.</td>
</tr>
</tbody>
</table>
</div>

## gRPC errors

The most common gRPC errors include the following:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 200px;">Error</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>gRPC specific errors</code></td>
<td>gRPC has a list of specific status codes that can be found in the <a href="https://grpc.github.io/grpc/core/md_doc_statuscodes.html">official gRPC documentation</a>.</td>
</tr>
<tr>
<td><code>CONNRESET</code></td>
<td>The connection was abruptly closed by the remote server. Possible causes include the web server encountering an error or crashing while responding, or losing connectivity to the web server.</td>
</tr>
<tr>
<td><code>DNS</code></td>
<td>DNS entry not found for the test URL. Possible causes include a misconfigured test URL or the wrong configuration of your DNS entries.</td>
</tr>
<tr>
<td><code>INVALID_REQUEST</code></td>
<td>The configuration of the test is invalid (for example, a typo in the URL).</td>
</tr>
<tr>
<td><code>SSL</code></td>
<td>The SSL connection couldn't be performed. See the <a href="#ssl-errors">SSL errors</a> section for more information.</td>
</tr>
<tr>
<td><code>TIMEOUT</code></td>
<td>The request couldn't be completed in a reasonable time. There are two types of timeout errors:<br><br><strong>Request timeout</strong>: The request duration exceeded the test's configured timeout (default: 60s). The network waterfall displays only the completed stages. For example, if only <code>Total response time</code> appears, the timeout occurred during DNS resolution.<br><br><strong>Overall timeout</strong>: The combined test duration (request + assertions) exceeded the maximum allowed time (60s).</td>
</tr>
</tbody>
</table>
</div>

## WebSocket errors

The most common WebSocket errors include the following:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 200px;">Error</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>CONNRESET</code></td>
<td>The connection was abruptly closed by the remote server. Possible causes include the web server encountering an error or crashing while responding, or loss of connectivity of the web server.</td>
</tr>
<tr>
<td><code>DNS</code></td>
<td>DNS entry not found for the test URL. Possible causes include misconfigured test URL or the wrong configuration of your DNS entries.</td>
</tr>
<tr>
<td><code>INVALID_REQUEST</code></td>
<td>The configuration of the test is invalid (for example, a typo in the URL).</td>
</tr>
<tr>
<td><code>SSL</code></td>
<td>The SSL connection couldn't be performed. See the <a href="#ssl-errors">SSL errors</a> section for more information.</td>
</tr>
<tr>
<td><code>WEBSOCKET</code></td>
<td>The WebSocket connection was closed or cannot be opened.<br><br><strong>WEBSOCKET: Received message longer than the maximum supported length</strong>: The response message length exceeds the maximum length (50kb).</td>
</tr>
</tbody>
</table>
</div>
