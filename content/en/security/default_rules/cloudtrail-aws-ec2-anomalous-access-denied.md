---
aliases:
- 169-fd7-41b
- /security_monitoring/default_rules/169-fd7-41b
- /security_monitoring/default_rules/cloudtrail-aws-ec2-anomalous-access-denied
disable_edit: true
iaas: aws
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
source: cloudtrail
title: Anomalous amount of access denied events for AWS EC2 Instance
type: security_rules
---

## Goal
Detect when an EC2 instance is assessing privileges in AWS through various enumeration and discovery techniques.

## Strategy
Monitor CloudTrail logs to identify when an EC2 instance (`@userIdentity.session_name:i-*"`) generates an anomalous amount of `AccessDenied` events.

## Triage and response
1. Determine what events the EC2 instance `{{@userIdentity.session_name}}` are generating in the time frame of the signal.
2. If the root cause is not a misconfiguration, investigate any other signals around the same time of the signal by looking at the Host Investigation dashboard.
