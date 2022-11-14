---
aliases:
- 3fe-1fm-dlw
- /security_monitoring/default_rules/3fe-1fm-dlw
- /security_monitoring/default_rules/aws-fsx-excessive-file-denied
disable_edit: true
iaas: aws
integration_id: amazon-fsx
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: amazon-fsx
security: attack
source: amazon-fsx
tactic: TA0007-discovery
technique: T1083-file-and-directory-discovery
title: AWS FSx Excessive File Denied
type: security_rules
---

## Goal
Detect and identify users accessing files they do not have permission to access.

## Strategy
Monitor AWS FSx logs and detect more than 10 occurrences where `@evt.id` is equal to `4656` and `@Event.System.Keywords` is equal to `0x8010000000000000`. 

## Triage & Response
1. Inspect the log and determine if the user should be accessing the file: `{{@ObjectName}}`.
2. If access is not legitimate, investigate user `({{@usr.id}})` activity.
