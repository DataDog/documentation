---
aliases:
- 715-d44-428
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: cloudfront
security: compliance
source: cloudfront
title: CloudFront logging is enabled
type: security_rules
---

## Description

Ensure logging is enabled for AWS CloudFront to track things like client IP addresses and access points.

## Rationale

Logging tracks requests made through the CDN. With this information, you can detect changes in requests, complete security audits, and use other AWS tooling such as AWS WAF to block requests from certain IP addresses.

## Remediation

### Console

Follow the [Configuring and using standard logs][1] docs to enable logging for AWS CloudFront.

### CLI

1. Run `create-bucket` to [create an S3 bucket][2] for your CloudFront log files.

    {{< code-block lang="bash" filename="create-bucket.sh" >}}
    aws s3api create-bucket
        --bucket your-bucket-name
    {{< /code-block >}}

2. Once the S3 bucket location is returned, run `get-distribution-config` with your AWS CloudFront distribution ID to retrieve your [distribution's configuration information][3].

    {{< code-block lang="bash" filename="get-distrbution-config.sh" >}}
    aws cloudfront get-distribution-config
        --id ID000000000000
    {{< /code-block >}}

3. Create a new JSON file with the returned configuration. Enable logging and set an S3 bucket location (returned in step 1) to configure where the logs will be located. Save the file.

    {{< code-block lang="json" filename="logging-enabled.json" >}}
    {
      "ETag": "ID000000000000",
      "DistributionConfig": {
          ...
          "Logging": {
            "Bucket": "your-bucket-name.s3.amazonaws.com",
            "Enabled": true,
          },
          ...
        }
      }
    }
    {{< /code-block >}}

4. Run `update-distribution` to [update your distribution][4] with your distribution `id`, the path of the configuration file (created in step 3), and your `etag`.

    {{< code-block lang="bash" filename="update-distribution.sh" >}}
    aws cloudfront update-distribution
        --id ID000000000000
        --distribution-config logging-enabled.json
        --if-match ETAG1000000000
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#AccessLogsBucketAndFileOwnership
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/create-bucket.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/get-distribution-config.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/update-distribution.html
