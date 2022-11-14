---
aliases:
- 7h6-fp7-pc3
- /security_monitoring/default_rules/7h6-fp7-pc3
- /security_monitoring/default_rules/cis-aws-1.3.0-1.12
cloud: aws
disable_edit: true
integration_id: amazon-
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
title: Credentials have been used within the last 90 days
type: security_rules
---

## Description

AWS IAM users can access AWS resources using different types of credentials, such as passwords or access keys. You should remove or deactivate all credentials that have been unused in 90+ days.

## Rationale

Disabling or removing unnecessary credentials will reduce the window of opportunity for credentials associated with a compromised or abandoned account to be used.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default value

None

## References

1. CCE-78900-8 2. CIS CSC v6.0 #16.6

## CIS controls

16.9 Disable Dormant Accounts Automatically - Disable dormant accounts after a set period of inactivity.

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.3
