---
aliases:
- azr-i96-fmv
- /security_monitoring/default_rules/azr-i96-fmv
- /security_monitoring/default_rules/cis-aws-1.3.0-3.2
disable_edit: true
integration_id: cloudtrail
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
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

## Default value

Not Enabled

## References

1. [http://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-enabling.html][2]
2. CCE-78914-9

## CIS controls

Version 7, 6 - Maintenance, Monitoring, and Analysis of Audit Logs

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: http://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-enabling.html
