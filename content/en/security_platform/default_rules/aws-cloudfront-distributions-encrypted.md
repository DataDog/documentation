---
aliases:
- 292-15d-f17
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: cloudfront
security: compliance
source: cloudfront
title: Cloudfront distribution is encrypted
type: security_rules
---

## Description

Verify that HTTPS is used to secure AWS CloudFront distributions communications.

## Rationale

HTTPS ensures that malicious activity cannot occur when data is sent within AWS CloudFront's Content Distribution Network (CDN).

## Remediation

### Console

Follow the [configure CloudFront to require HTTPS between CloudFront and your custom origin][1] docs to change your Origin Protocol Policy to HTTPS only.

### CLI

1. Run `get-distribution-config` with your AWS CloudFront distribution ID to retrieve your [distribution's configuration information][2].

	{{< code-block lang="bash" filename="get-distribution-config.sh" >}}
    aws cloudfront get-distribution-config
        --id ID000000000000
    {{< /code-block >}}

2. In a new JSON file, modify the returned configuration. Set `OriginProtocolPolicy` to `https-only` and save the configuration file.

    {{< code-block lang="json" filename="https-only.sh" >}}
    {
      "ETag": "ETAG0000000000",
      "DistributionConfig": {
        "Origins": {
          "Items": [
            {
              "CustomOriginConfig": {
                "OriginProtocolPolicy": "https-only",
                ...
              }
            }
          ]
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

[1]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-cloudfront-to-custom-origin.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/get-distribution-config.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/update-distribution.html
