---
aliases:
- abe-6ab-a41
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: cloudfront
security: compliance
source: cloudfront
title: CloudFront distributions security policy is TLS v1.1 or greater
type: security_rules
---

## Description

Verify that AWS CloudFront distributions have a security policy of TLS v1.1 or greater.

## Rationale

TLS v1.1, the minimum protocol recommended for AWS CloudFront, and the cipher used to encrypt this content, improve application security.

## Remediation

### Console

Follow the [Values That You Specify When You Create or Update a Distribution][1] docs to update your CloudFront distribution's [Minimum Origin SSL Protocol][1] to TLC v1.1 or greater.

### CLI

1. Run `get-distribution-config` with your AWS CloudFront distribution ID to retrieve your [distribution's configuration information][2].

	{{< code-block lang="bash" filename="get-distribution-config.sh" >}}
    aws cloudfront get-distribution-config
        --id ID000000000000
    {{< /code-block >}}

2. In a new JSON file, modify the returned configuration by setting the minimum protocol version to TLC v1.1 (2016) or v1.2 (2018).

    {{< code-block lang="json" filename="tls-version.sh" >}}
    {
      "ETag": "ETAG0000000000",
      "DistributionConfig": {
        ...
        "ViewerCertificate": {
          ...
          "MinimumProtocolVersion": "TLSv1.1_2016",
        },
        ...
      }
    }
    {{< /code-block >}}

3. Run `update-distribution` to [update your distribution][3] with your distribution `id`, the path of the configuration file (created in step 2), and your `etag`.

    {{< code-block lang="bash" filename="update-distribution.sh" >}}
    aws cloudfront update-distribution
        --id ID000000000000
        --distribution-config tls-version.json
        --if-match ETAG0000000000
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginSSLProtocols
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/get-distribution-config.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/update-distribution.html
