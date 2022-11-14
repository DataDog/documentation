---
aliases:
- 5ee-d08-7fa
- /security_monitoring/default_rules/5ee-d08-7fa
- /security_monitoring/default_rules/aws-cloudtrail-root-account-activity
control: '3.2'
disable_edit: true
framework: cis-aws
iaas: aws
integration_id: iam
kind: documentation
requirement: Monitoring
rule_category:
- Cloud SIEM (Log Detection)
scope: iam
security: attack
source: cloudtrail
tactic: TA0001-initial-access
technique: T1078-valid-accounts
title: AWS root account activity
type: security_rules
---

## Goal
Detect AWS root user activity. 

## Strategy
Monitor CloudTrail and detect when any `@userIdentity.type` has a value of `Root`, but is not invoked by an AWS service or SAML provider.

## Triage and response
1. Reach out to the user to determine if the login was legitimate. 
2. If the login wasn't legitimate, rotate the credentials, enable 2FA, and open an investigation. 

* For best practices, check out the [AWS Root Account Best Practices][1] documentation.
* For compliance, check out the [CIS AWS Foundations Benchmark controls][2] documentation.

## Changelog
30 March 2022 - Updated query and signal message.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html
[2]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html
