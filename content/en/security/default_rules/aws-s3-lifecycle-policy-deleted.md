---
aliases:
- wse-vbo-0hc
- /security_monitoring/default_rules/wse-vbo-0hc
- /security_monitoring/default_rules/aws-s3-lifecycle-policy-deleted
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
title: An AWS S3 bucket lifecycle policy was deleted
type: security_rules
---

# WARNING: Rule is being deprecated on 10 April 2022

## Goal
Detect if an entire AWS S3 Lifecycle configuration is deleted from a bucket.

## Strategy
Using the `@evt.name`, the Datadog standard attribute that shows the API call, determine if a `DeleteBucketLifecycle` call occurred.

## Triage & Response
1. Determine if `{{@evt.name}}` should have occurred on the `{{@requestParameters.bucketName}}` by `username:` `{{@usr.name}}`, `accountId:` `{{@usr.id}}` of `type:` `{{@userIdentity.type}}`.
2. If the `{{@evt.name}}` API call accidentally occurred, restore the configuration to the `{{@requestParameters.bucketName}}`. Otherwise, investigate further.

## Changelog
08 Mar 2022 - Deprecating rule. If a policy is deleted, the data remains forever.
