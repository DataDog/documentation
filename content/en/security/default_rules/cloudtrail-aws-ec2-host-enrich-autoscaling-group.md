---
aliases:
- 0cg-j5s-svt
- /security_monitoring/default_rules/0cg-j5s-svt
- /security_monitoring/default_rules/cloudtrail-aws-ec2-host-enrich-autoscaling-group
disable_edit: true
iaas: aws
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
source: cloudtrail
title: Anomalous amount of Autoscaling Group events
type: security_rules
---

## Goal
Detect when an attacker is attempting to hijack an EC2 AutoScaling Group.

## Strategy
This rule lets you monitor AWS EC2 Autoscaling logs (`@eventSource:autoscaling.amazonaws.com`) to detect when an Autoscaling group receives an anomalous amount of API calls (`{{@evt.name}}`).

## Triage and response
1. Confirm if the user `{{@userIdentity.arn}}` intended to make the `{{@evt.name}}` API calls.
2. If the user did not make the API calls:
    * Rotate the credentials.
    * Investigate if the same credentials made other unauthorized API calls.
