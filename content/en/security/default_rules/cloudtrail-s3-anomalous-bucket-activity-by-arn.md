---
aliases:
- 66d-nnk-onm
- /security_monitoring/default_rules/66d-nnk-onm
- /security_monitoring/default_rules/cloudtrail-s3-anomalous-bucket-activity-by-arn
disable_edit: true
iaas: aws
integration_id: s3
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: s3
security: attack
source: cloudtrail
tactic: TA0009-collection
technique: T1530-data-from-cloud-storage
title: Anomalous S3 bucket activity from user ARN
type: security_rules
---

## Goal
Detect when an AWS user performs S3 bucket write activities they do not usually perform. 

## Strategy
Monitor cloudtrail logs for S3 Data Plane events (`@eventCategory:Data`) to detect when an AWS User (`@userIdentity.arn`) is detected performing anomalous S3 Write `(@evt.name:(Abort* OR Create* OR Delete* OR Initiate* OR Put* OR Replicate* OR Update*))` API calls. 

## Triage and response
1. Determine if user: `{{@userIdentity.arn}}` should be performing the: `{{@evt.name}}` API calls.
   * Use the Cloud SIEM - User Investigation dashboard to assess user activity.
2. If not, investigate the user: `{{@userIdentity.arn}}` for indicators of account compromise and rotate credentials as necessary.

## Changelog
* 27 October 2022 - updated tags.
