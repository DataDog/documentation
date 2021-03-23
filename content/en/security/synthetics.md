---
title: Synthetics Monitoring Security
kind: documentation
aliases:
    - /synthetics/security/
further_reading:
- link: "/security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
---

<div class="alert alert-info">This page is about the security of Datadog; if you're looking for the Security Monitoring product, see the <a href="/security_monitoring" target="_blank">Security Monitoring section</a>.</div>

This article is part of a [series on data security][1].

The [Synthetic Monitoring product][2] allows you to proactively monitor how your systems and applications are performing using simulated requests and business transactions. Synthetic tests can be initiated from all around the globe, from either managed or private locations.  
This article describes the main security guarantees available to users leveraging the Synthetics product, for both location types.

## Encryption in managed locations 

### Test configurations and variables

* **Transport**: Asymmetric encryption - RSA (4096-bit key). All requests are signed using Datadog Signature v1 (based on the same signing process as [AWS Signature v4][3]), ensuring both authentication and integrity. 
* **Storage**: Symmetric encryption - AES-GCM (256-bit key).

### Test results

* **Transport**: Asymmetric encryption - RSA (4096-bit key). All requests are signed using Datadog Signature v1 (based on the same signing process as [AWS Signature v4][3]), ensuring both authentication and integrity.
* **Storage**: Sensitive parts (response headers and body) of test results are stored encrypted with an asymmetric encryption - RSA (4096-bit key) and decrypted on-the-fly when test results are fetched.

## Artifacts

Artifacts are browser test screenshots, snapshots, errors, and resources.

{{< site-region region="us" >}}

* **Transport**: Encryption in transit using [AWS Signature Version 4 for S3][1].

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/network-isolation.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **Transport**: Encryption in transit using [Authentication, integrity, and encryption for GCS][1].

[1]: https://cloud.google.com/security/encryption-in-transit/resources/encryption-in-transit-whitepaper.pdf

{{< /site-region >}}

{{< site-region region="us" >}}

* **Storage**: Encryption for [AWS S3 buckets][1].

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **Storage**: Encryption through [service accounts in GCS][1] (using [AES256][2]).

[1]: https://cloud.google.com/storage/docs/encryption/customer-managed-keys
[2]: https://cloud.google.com/security/encryption-at-rest/default-encryption

{{< /site-region >}}

## Encryption in private locations 

### Private locations credentials

* **Storage**: Private locations credentials used to sign test configuration, variables, and test results requests are stored encrypted (symmetric encryption - AES-GCM), with audit logging and access policies.

### Test configurations and variables

* **Transport**: Asymmetric encryption - RSA (4096-bit key). Communication between private locations and Datadog is secured using Datadog Signature v1 (based on the same signing process as [AWS Signature v4][3]), ensuring both authentication and integrity. 
* **Storage**: Symmetric encryption - AES-GCM (256-bit key).

## Test results

* **Transport**: Asymmetric encryption - RSA (4096-bit key). Communication between private locations and Datadog is secured using Datadog Signature v1 (based on the same signing process as [AWS Signature v4][3]), ensuring both authentication and integrity.
   
* **Storage**: Sensitive parts (by default, response headers and body) of test results are stored encrypted with an asymmetric encryption - RSA (4096-bit key) and decrypted on-the-fly when test results are fetched.

### Artifacts

Artifacts are browser test screenshots, snapshots, errors, and resources.

{{< site-region region="us" >}}

* **Transport**: HTTPS transport between the private location and Datadog (authentication through API key), then from Datadog to storage: encryption in transit using [AWS Signature Version 4 for S3][1].

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/network-isolation.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **Transport**: HTTPS transport between the private location and Datadog (authentication through API key), then from Datadog to storage: encryption in transit using [Authentication, integrity, and encryption for GCS][1].

[1]: https://cloud.google.com/security/encryption-in-transit/resources/encryption-in-transit-whitepaper.pdf

{{< /site-region >}}

{{< site-region region="us" >}}

* **Storage**: Encryption for [AWS][1].

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **Storage**: Encryption through [service accounts in GCS][1] (using [AES256][2]).

[1]: https://cloud.google.com/storage/docs/encryption/customer-managed-keys
[2]: https://cloud.google.com/security/encryption-at-rest/default-encryption

{{< /site-region >}}

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/
[2]: /synthetics/
[3]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html
