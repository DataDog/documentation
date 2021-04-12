---
aliases:
- 4cd-f56-dfa
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: s3
security: compliance
source: cloudtrail
title: AWS S3 Public Access Block removed
type: security_rules
---

### Goal
Detect when the S3 Public Access Block configuration has been removed 

### Strategy
This rule lets you monitor this CloudTrail API call to detect if an attacker is deleting the S3 Public Access Block configuration:

* [DeleteAccountPublicAccessBlock][1]

### Triage & Response
1. Determine who the user was who made this API call.
2. Contact the user and inform them of best practices of enabling Public Access Block on S3 buckets.
3. Re-enable Public Access Block on the S3 bucket.

More details on S3 Public Block Public Access can be found [here][2].

[1]: https://docs.aws.amazon.com/cli/latest/reference/s3api/delete-public-access-block.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html
