---
aliases:
- 1y1-elh-nph
- /security_monitoring/default_rules/1y1-elh-nph
- /security_monitoring/default_rules/aws-kinesis-firehose-destination-modified
disable_edit: true
iaas: aws
integration_id: firehose
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: firehose
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: AWS Kinesis Firehose stream destination modified
type: security_rules
---

## Goal
Detects when an AWS Kinesis Firehose Destination is modified.

## Strategy
The rule monitors AWS Kinesis Firehose logs `@eventSource:firehose.amazonaws.com` and detects when the `@evt.name` is `UpdateDestination`.  

## Triage and response
1. Determine if {{@userIdentity.arn}} is expected to perform the {{@evt.name}} API call on the account: {{@usr.account_id}}.
2. If the API call was not made by the user, rotate the user credentials and investigate what other APIs were successfully accessed.
   * Rotate the credentials.
   * Investigate if the same credentials made other unauthorized API calls.
