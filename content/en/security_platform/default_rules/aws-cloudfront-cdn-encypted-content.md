---
aliases:
- 7bd-206-905
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: cloudfront
security: compliance
source: cloudfront
title: Cloudfront viewer is encrypted
type: security_rules
---

## Description

Ensure that the AWS CloudFront Content Delivery Network (CDN) for your distribution is using HTTPS to send and receive content.

## Rationale

HTTPS ensures encrypted communication for your AWS CloudFront distribution, alleviating the possibility of malicious attacks like packet interception.

## Remediation

### Console

Follow the [configure CloudFront to require HTTPS between viewers and CloudFront][1] docs to change your Viewer Protocol Policy to HTTPS only.

### CLI

1. Run `get-distribution-config` with your AWS CloudFront distribution ID to retrieve your [distribution's configuration information][2].

	{{< code-block lang="bash" filename="get-distribution-config.sh" >}}
    aws cloudfront get-distribution-config
        --id ID000000000000
    {{< /code-block >}}

2. In a new JSON file, modify the returned configuration. Set `ViewerProtocolPolicy` to `https-only` and save the configuration file.

    {{< code-block lang="json" filename="https-only.sh" >}}
    {
      "ETag": "ETAG0000000000",
      "DistributionConfig": {
        "Origins": {
          "ViewerProtocolPolicy": "https-only",
          ...
        }
      }
    }
    {{< /code-block >}}

3. Run `update-distribution` to [update your distribution][3] with your distribution `id`, the path of the configuration file (created in step 2), and your `etag`.

    {{< code-block lang="bash" filename="update-distribution.sh" >}}
    aws cloudfront update-distribution
        --id ID000000000000
        --distribution-config https-only.json
        --if-match ETAG0000000000
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/get-distribution-config.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/update-distribution.html
