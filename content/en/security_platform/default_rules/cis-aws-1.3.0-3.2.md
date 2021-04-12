---
aliases:
- azr-i96-fmv
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: cloudtrail
security: compliance
source: cloudtrail
title: CloudTrail log file validation is enabled
type: security_rules
---

## Description

CloudTrail log file validation creates a digitally signed digest file containing a hash of each log that CloudTrail writes to S3. Use these digest files to determine whether a log file was changed, deleted, or unchanged after CloudTrail delivered the log. You should enable file validation on all CloudTrails.

## Rationale

Enabling log file validation will provide additional integrity checking of CloudTrail logs.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default Value

Not Enabled

## References

1. [http://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-enabling.html][2] 
2. CCE-78914-9 3. CIS CSC v6.0 #6.3

## CIS Controls

6 Maintenance, Monitoring, and Analysis of Audit Logs

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-2.2
[2]: http://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-enabling.html
