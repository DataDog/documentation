---
aliases:
- 9d1-0fa-76a
- /security_monitoring/default_rules/9d1-0fa-76a
- /security_monitoring/default_rules/aws-ecs-cluster-deleted
disable_edit: true
iaas: aws
integration_id: ecs
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ecs
security: attack
source: cloudtrail
tactic: TA0040-impact
technique: T1485-data-destruction
title: AWS ECS cluster deleted
type: security_rules
---

## Goal
Detect when an attacker is destroying an ECS Cluster

## Strategy
This rule lets you monitor this CloudTrail API call to detect if an ECS cluster is deleted:

* [DeleteCluster][1]

## Triage and response
1. Determine if {{@userIdentity.arm}} should be making a {{@evt.name}} API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

## Changelog
1 April 2022 - Updated rule query.

[1]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeleteCluster.html
