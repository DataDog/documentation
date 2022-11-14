---
aliases:
- jlu-h6s-of3
- /security_monitoring/default_rules/jlu-h6s-of3
- /security_monitoring/default_rules/cloudtrail-aws-anomalous-get-object-unique-bucket-60minBucket
disable_edit: true
iaas: aws
integration_id: s3
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: s3
security: attack
source: cloudtrail
tactic: TA0007-discovery
technique: T1619-cloud-storage-object-discovery
title: Anomalous number of S3 buckets accessed
type: security_rules
---

## Goal
Detect when an AWS assumed role accesses S3 buckets that they do not usually access. 

## Strategy
Monitor cloudtrail logs to identify when a `@userIdentity.assumed_role` makes an anomalous amount of `GetObject` calls to a unique number of S3 buckets (`@requestParameters.bucketName`).

## Triage and response
1. Determine if the user using the assumed role: {{@userIdentity.assumed_role}} should be accessing a bunch of random buckets.
   * Here is a list of buckets that were accessed (up to 10): {{@requestParameters.bucketName}}

## Changelog
* 30 March 2022 - Updated query and signal message.
* 17 October 2022 - Updated tags.
