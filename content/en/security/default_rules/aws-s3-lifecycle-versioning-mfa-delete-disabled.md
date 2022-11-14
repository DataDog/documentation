---
aliases:
- vvv-5pb-z59
- /security_monitoring/default_rules/vvv-5pb-z59
- /security_monitoring/default_rules/aws-s3-lifecycle-versioning-mfa-delete-disabled
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
title: An AWS S3 bucket mfaDelete is disabled
type: security_rules
---

## Goal
Detect if versioning or MFA delete was disabled within an AWS S3 bucket's Lifecycle configuration.

## Strategy
This rule has two separate queries. The first query determines if `@requestParameters.VersioningConfiguration.MfaDelete` is set to `Disabled`. The second query determines if `@requestParameters.VersioningConfiguration.Status` is set to `Suspended`. For generating a signal, there are two cases. Case one generates a `Medium` signal if query one AND two return `true`. Case two will generate a `Low` signal if query one OR two returns `true`.

**NOTE**: Versioning cannot be disabled permanently; only suspended until turned back on, once it has been enabled on a bucket.

## Triage & Response
1. Determine if `{{@evt.name}}` should have occurred on the `{{@requestParameters.bucketName}}` by `username:` `{{@userIdentity.sessionContext.sessionIssuer.userName}}`, `accountId:` `{{@usr.account_id}}` of `type:` `{{@userIdentity.assumed_role}}`.
