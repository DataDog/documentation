---
title: Synthetic Monitoring Data Security
aliases:
    - /synthetics/security/
further_reading:
- link: /data_security/
  tag: Documentation
  text: Review the main categories of data submitted to Datadog
---

<div class="alert alert-info">This page is about the security of data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security/" target="_blank">Security</a> section.</div>

The [Synthetic Monitoring product][2] allows you to proactively monitor how your systems and applications are performing using simulated requests and business transactions. Synthetic tests can be initiated from all around the globe, from either managed or private locations.

## Information security

### Encryption in managed locations

#### Test configurations and variables

* **Transport**: Asymmetric encryption - RSA (4096-bit key). All requests are signed using Datadog Signature v1 (based on the same signing process as [AWS Signature v4][3]), ensuring both authentication and integrity.
* **Storage**: Symmetric encryption - AES-GCM (256-bit key).

#### Test results

* **Transport**: Asymmetric encryption - RSA (4096-bit key). All requests are signed using Datadog Signature v1 (based on the same signing process as [AWS Signature v4][3]), ensuring both authentication and integrity.
* **Storage**: Sensitive parts (response headers and body) of test results are stored encrypted with an asymmetric encryption - RSA (4096-bit key) and decrypted on-the-fly when test results are fetched.

#### Artifacts

Artifacts are browser test screenshots, snapshots, errors, and resources.

{{< site-region region="us,us3,us5,gov,ap1" >}}

* **Storage**: Encryption for [Amazon S3 buckets][1].
* **Transport**: Encryption in transit using [AWS Signature Version 4 for S3][2].

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/network-isolation.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **Storage**: Encryption through [service accounts in GCS][1] (using [AES256][2]).
* **Transport**: Encryption in transit using [Authentication, integrity, and encryption for GCS][3].

[1]: https://cloud.google.com/storage/docs/encryption/customer-managed-keys
[2]: https://cloud.google.com/security/encryption-at-rest/default-encryption
[3]: https://cloud.google.com/security/encryption-in-transit/resources/encryption-in-transit-whitepaper.pdf

{{< /site-region >}}

### Encryption in private locations

#### Private locations credentials

* **Storage**: Private locations credentials used to sign test configuration, variables, and test results requests are stored encrypted (symmetric encryption - AES-GCM), with audit logging and access policies.

#### Test configurations and variables

* **Transport**: Asymmetric encryption - RSA (4096-bit key). Communication between private locations and Datadog is secured using Datadog Signature v1 (based on the same signing process as [AWS Signature v4][3]), ensuring both authentication and integrity.
* **Storage**: Symmetric encryption - AES-GCM (256-bit key).

#### Test results

* **Transport**: Asymmetric encryption - RSA (4096-bit key). Communication between private locations and Datadog is secured using Datadog Signature v1 (based on the same signing process as [AWS Signature v4][3]), ensuring both authentication and integrity.

* **Storage**: Sensitive parts (by default, response headers and body) of test results are stored encrypted with an asymmetric encryption - RSA (4096-bit key) and decrypted on-the-fly when test results are fetched.

#### Artifacts

Artifacts are browser test screenshots, snapshots, errors, and resources.

{{< site-region region="us,us3,us5,gov,ap1" >}}

* **Storage**: Encryption for [AWS][1].
* **Transport**: HTTPS transport between the private location and Datadog (authentication through API key), then from Datadog to storage: encryption in transit using [AWS Signature Version 4 for S3][2].

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/network-isolation.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **Storage**: Encryption through [service accounts in GCS][1] (using [AES256][2]).
* **Transport**: HTTPS transport between the private location and Datadog (authentication through API key), then from Datadog to storage: encryption in transit using [Authentication, integrity, and encryption for GCS][3].

[1]: https://cloud.google.com/storage/docs/encryption/customer-managed-keys
[2]: https://cloud.google.com/security/encryption-at-rest/default-encryption
[3]: https://cloud.google.com/security/encryption-in-transit/resources/encryption-in-transit-whitepaper.pdf

{{< /site-region >}}

## Testing accounts

It is strongly recommended to leverage accounts dedicated to testing for your Synthetics tests.

## Storing secrets

You can store secrets in [global variables][4] with the obfuscation feature to ensure global variable values do not leak into your test configurations and results. The access to global variables can then be restricted using the dedicated [global variable RBAC permissions][5].

## Privacy options

Use the [API][6], [Multistep API][7] and [Browser tests' privacy options][8] to limit the amount of data stored in test results. However, be mindful of the usage of these options as enabling them can make failures troubleshooting more difficult.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_security/
[2]: /synthetics/
[3]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html
[4]: /synthetics/settings/?tab=specifyvalue#global-variables
[5]: /account_management/rbac/permissions/#synthetic-monitoring
[6]: /synthetics/api_tests/http_tests?tab=privacy#define-request
[7]: /synthetics/multistep?tab=privacy#define-the-request
[8]: /synthetics/browser_tests/?tab=privacy#test-configuration
