---
aliases:
- gzr-098-e6b
- /security_monitoring/default_rules/gzr-098-e6b
- /security_monitoring/default_rules/aws-s3-lifecycle-expiration-policy-disabled
disable_edit: true
iaas: aws
integration_id: s3
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: s3
security: attack
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: An AWS S3 bucket lifecycle expiration policy was set to disabled
type: security_rules
---

## Goal
Detect if an AWS S3 lifecycle expiration policy is set to disabled in your CloudTrail logs.

## Strategy
Check if `@requestParameters.LifecycleConfiguration.Rule.Expiration.Days`, `@requestParameters.LifecycleConfiguration.Status:Disabled` and `@evt.name:PutBucketLifecycle` fields are present in your S3 Lifecycle configuration log. If these fields are present together, a bucket's lifecycle configuration has been turned off.

## Triage & Response
1. Determine if `{{@evt.name}}` should have occurred on the `{{@requestParameters.bucketName}}` by `username:` `{{@userIdentity.sessionContext.sessionIssuer.userName}}`, `accountId:` `{{@usr.account_id}}` of `type:` `{{@userIdentity.assumed_role}}`.
2. If the `{{@requestParameters.bucketName}}` should not be disabled, escalate to engineering so they can re-enable it.
