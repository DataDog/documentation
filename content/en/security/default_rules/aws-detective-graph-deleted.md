---
aliases:
- 9fq-2av-prp
- /security_monitoring/default_rules/9fq-2av-prp
- /security_monitoring/default_rules/aws-detective-graph-deleted
disable_edit: true
iaas: aws
integration_id: aws-detective
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: aws-detective
security: attack
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: AWS Detective Graph deleted
type: security_rules
---

## Goal
Detect when a user deletes an Amazon Detective behavior graph.

## Strategy
This rule lets you monitor this CloudTrail API call to detect if a user has deleted an Amazon Detective behavior graph:

* [DeleteGraph][1]

## Triage and response
1. Determine if the behavior graph should have been deleted.
2. Determine which user ({{@userIdentity.arn}}) in your organization deleted the behavior graph.
3. If the user did not make the API call:
   * Rotate the credentials.
   * Investigate if the same credentials made other unauthorized API calls.

## Changelog
1 April 2022 - Updated rule and signal message.

[1]: https://docs.aws.amazon.com/detective/latest/APIReference/API_DeleteGraph.html
