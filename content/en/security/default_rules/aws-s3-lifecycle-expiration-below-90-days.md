---
aliases:
- zhb-369-800
- /security_monitoring/default_rules/zhb-369-800
- /security_monitoring/default_rules/aws-s3-lifecycle-expiration-below-90-days
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
title: An AWS S3 bucket lifecycle policy expiration is set to < 90 days
type: security_rules
---

## Goal
Detect when an S3 bucket has a lifecycle configuration set with an expiration policy of less than 90 days.

## Strategy
Look for `@requestParameters.LifecycleConfiguration.Rule.Expiration.Days:<90` in your Cloudtrail logs.

**NOTE**: This rule should be set to logs that this policy applies to. The `@requestParameters.LifecycleConfiguration.Rule.Expiration.Days` key path must be set as a measure to do a query.


## Triage & response
1. Determine if `{{@evt.name}}` should have occurred on the `{{@requestParameters.bucketName}}` by `username:` `{{@userIdentity.sessionContext.sessionIssuer.userName}}`, `accountId:` `{{@usr.account_id}}` of `type:` `{{@userIdentity.assumed_role}}` and that the `{{@requestParameters.bucketName}}` bucket should have a file expiration of less than 90 days.
2. If `{{@requestParameters.bucketName}}` is equal to `{{@aws.s3.bucket}}`, the CloudTrail bucket, consider escalating to higher severity and investigating further.
