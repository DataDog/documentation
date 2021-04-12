---
aliases:
- be2-2a3-d91
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: cloudtrail
security: compliance
source: cloudtrail
title: CloudTrail trail file integration validation is enabled
type: security_rules
---

## Description

Ensure that an AWS CloudTrail trail has file integration validation enabled.

## Rationale

AWS CloudTrail file integration validation can verify whether files were modified or changed once delivered to an S3 bucket.

## Remediation

### Console

Follow the [Enabling Log File Integrity Validation for CloudTrail][1] docs to enable validation.

### CLI

1. Run `aws cloudtrail describe-trails`
2. Run `update-trail` on any returned trail name above to [enable-log-file-validation][1].

    {{< code-block lang="bash" filename="update-trail.sh" >}}
    aws cloudtrail update-trail
        --name GlobalTrailName
        --enable-log-file-validation
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-enabling.html
