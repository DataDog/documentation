---
aliases:
- rxi-7oi-e5x
- /security_monitoring/default_rules/rxi-7oi-e5x
- /security_monitoring/default_rules/aws-s3-versioning
disable_edit: true
integration_id: s3
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: s3
title: S3 bucket has versioning enabled
type: security_rules
---

## Description

Enable versioning on S3 buckets to keep multiple versions of an object in one bucket.

## Rationale

Versioning-enabled buckets help [recover objects in the case of accidental deletion or overwriting][1].

## Remediation

### From the console

Follow the [Enabling versioning on buckets][2] AWS documentation to enable bucket versioning within the S3 console.

### From the command line

Follow the [Enabling versioning on buckets][2] AWS documentation to enable bucket versioning with the AWS CLI.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/manage-versioning-examples.html
