---
aliases:
- a8d-afd-la9
- /security_monitoring/default_rules/a8d-afd-la9
- /security_monitoring/default_rules/aws-ec2-new-instance-type-detected
disable_edit: true
iaas: aws
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: attack
source: cloudtrail
tactic: TA0040-impact
technique: T1496-resource-hijacking
title: New EC2 Instance Type
type: security_rules
---

## Goal
Detect when an attacker spawns an instance for malicious purposes. 

## Strategy
This rule lets you monitor this CloudTrail API call to detect when a new instance type (`@responseElements.instancesSet.items.instanceType`) is spawned:

* [RunInstances][1]

It does this by inspecting the AWS Instance types each AWS account are seen over a 7-day window. Newly detected instance types after this 7-day window till generate security signals.

## Triage and response
1. Determine whether the instance type `{{@responseElements.instancesSet.items.instanceType}}` is expected to be used in your AWS account by checking the [Datadog Infrastructure List][2].
2. If not, determine who spawned this instance and ask the user whether their activity was legitimate or whether their credentials were compromised and this instance is being used by an attacker.

## Changelog
7 April 2022 - Updated rule query.

[1]: https://docs.aws.amazon.com/cli/latest/reference/ec2/run-instances.html
[2]: https://app.datadoghq.com/infrastructure?tab=details&tags=instance-type%3A{{@responseElements.instancesSet.items.instanceType}}
