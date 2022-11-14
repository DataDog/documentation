---
aliases:
- 237-412-287
- /security_monitoring/default_rules/237-412-287
- /security_monitoring/default_rules/cloudtrail-aws-rds-snapshot-exfiltration
disable_edit: true
iaas: aws
integration_id: rds
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: rds
security: compliance
source: cloudtrail
tactic: TA0010-exfiltration
technique: T1537-transfer-data-to-cloud-account
title: Possible RDS Snapshot Exfiltration
type: security_rules
---

## Goal
Detect a user attempting to exfiltrate data from an RDS Snapshot.

## Strategy
This rule lets you monitor the [ModifyDBClusterSnapshotAttribute][1] CloudTrail API calls to detect when an RDS snapshot is made public.

This rule also inspects the:
 * `@requestParameters.valuesToAdd` array to determine if the string `all` is contained. This is the indicator which means the RDS snapshot is made public.
 * `@requestParameters.attributeName` array to determine if the string `restore` is contained. This is the indicator which means the RDS snapshot was shared with a new or unkown AWS Account.

## Triage and response
1. Confirm if the user: `{{@userIdentity.arn}}`intended to make the RDS snaphsot public.
2. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

## Changelog
* 11 October 2022 - updated severity.

[1]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/modify-db-cluster-snapshot-attribute.html#modify-db-cluster-snapshot-attribute
