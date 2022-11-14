---
aliases:
- ugx-lde-wnu
- /security_monitoring/default_rules/ugx-lde-wnu
- /security_monitoring/default_rules/cloudtrail-user-executed-command-on-ecs-container
disable_edit: true
iaas: aws
integration_id: ecs
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ecs
security: attack
source: cloudtrail
tactic: TA0004-privilege-escalation
title: New user seen executing a command in an ECS task
type: security_rules
---

## Goal
Detect when a user executes a command on an ECS container for the first time. An attacker may use this as a technique to escalate their privileges
because they can run arbitrary commands on behalf of the container with the role and permissions associated with the
container.

## Strategy
This rule lets you monitor this CloudTrail API call to detect if a user is executing a command on an ECS container:

* `ExecuteCommand`

## Triage and response
1. Investigate the command that the user ({{@userIdentity.arn}}) ran on the container, which is located in the Cloudtrail log at `@requestParameters.container`, if the telemetry exists.
2. Analyze Cloudtrail logs with {{@userIdentity.arn}} that are within the same time frame as this security signal.
3. Review any other security signals generated for this container.
