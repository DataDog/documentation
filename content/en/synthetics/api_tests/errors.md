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

The message `Error performing HTTP/2 request` may occur when a remote server's HTTP support is inconsistent. For example, suppose you run a test that reaches an endpoint on a server that supports HTTP 2. On the next run, if the test comes across the same endpoint on a server that only has HTTP 1.1 support, the test fails to establish an HTTP 2 connection and returns an error. In this scenario, switching to HTTP/1.1 prevents the error.

## SSL errors

SSL errors can occur during an API test run. They are different from failing assertions on SSL tests and can occur on all types of API tests.

{{< img src="synthetics/api_tests/ssl-self-signed-error.png" alt="SSL Self Signed Error" style="width:60%;" >}}

| Error                                | Description                                                                                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CERT_CHAIN_TOO_LONG`                | The certificate chain length is greater than the supplied maximum depth.                                                                                                 |
| `CERT_HAS_EXPIRED`                   | The certificate is expired.                                                                                                                                              |
| `CERT_NOT_YET_VALID`                 | The certificate is not valid until a future date.                                                                                                                        |
| `CERT_REJECTED`                      | The root CA is marked to reject the purpose specified.                                                                                                                   |
| `CERT_REVOKED`                       | The certificate was revoked by the issuer.                                                                                                                               |
| `CERT_UNTRUSTED`                     | The root CA is not marked as trusted for its intended purpose.                                                                                                           |
| `CERT_SIGNATURE_FAILURE`             | The signature of the certificate is not valid.                                                                                                                           |
| `CRL_HAS_EXPIRED`                    | The certificate revocation list (CRL) has expired.                                                                                                                       |
| `CRL_NOT_YET_VALID`                  | The certificate revocation list (CRL) is not valid until a future date.                                                                                                  |
| `CRL_SIGNATURE_FAILURE`              | The CRL signature of the certificate is not valid.                                                                                                                       |
| `DEPTH_ZERO_SELF_SIGNED_CERT`        | The passed certificate is self-signed and the same certificate cannot be found in the list of trusted certificates.                                                      |
| `ERROR_IN_CERT_NOT_AFTER_FIELD`      | There is a format error in the notAfter field in the certificate.                                                                                                        |
| `ERROR_IN_CERT_NOT_BEFORE_FIELD`     | There is a format error in the notBefore field in the certificate.                                                                                                       |
| `ERROR_IN_CRL_LAST_UPDATE_FIELD`     | The CRL lastUpdate field contains an invalid time.                                                                                                                       |
| `ERROR_IN_CRL_NEXT_UPDATE_FIELD`     | The CRL nextUpdate field contains an invalid time.                                                                                                                       |
| `INVALID_CA`                         | A CA certificate is not valid because it is not a CA or its extensions are not consistent with the intended purpose.                                                     |
| `INVALID_PURPOSE`                    | The certificate that was provided cannot be used for its intended purpose.                                                                                               |
| `OUT_OF_MEM`                         | An error occurred while allocating memory.                                                                                                                               |
| `PATH_LENGTH_EXCEEDED`               | The basicConstraints pathlength parameter was exceeded.                                                                                                                  |
| `SELF_SIGNED_CERT_IN_CHAIN`          | A self-signed certificate exists in the certificate chain. The certificate chain can be built using the untrusted certificates, but the root CA cannot be found locally. |
| `UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY` | The public key in the certificate cannot be read.                                                                                                                        |
| `UNABLE_TO_DECRYPT_CERT_SIGNATURE`   | Unable to decrypt the signature of the certificate.                                                                                                                      |
| `UNABLE_TO_DECRYPT_CRL_SIGNATURE`    | The CRL signature cannot be decrypted. (The actual signature value cannot be determined.)                                                                                |
| `UNABLE_TO_GET_CRL`                  | The certificate revocation list (CRL) is not found.                                                                                                                      |
| `UNABLE_TO_GET_ISSUER_CERT`          | Unable to find the certificate for one of the certificate authorities (CAs) in the signing hierarchy, and that CA is not trusted by the local application.               |
| `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`  | The issuer certificate of a locally found certificate is not found. This usually means that the list of trusted certificates is not complete.                            |
| `UNABLE_TO_VERIFY_LEAF_SIGNATURE`    | No signatures are verified because the certificate chain contains only one certificate, which is not self-signed, and the issuer is not trusted.                         |
