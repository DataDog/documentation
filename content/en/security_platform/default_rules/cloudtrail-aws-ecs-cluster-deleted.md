---
aliases:
- 9d1-0fa-76a
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ecs
security: attack
source: cloudtrail
tactic: TA0040-impact
technique: T1485-data-destruction
title: AWS ECS cluster deleted
type: security_rules
---

### Goal
Detect when an attacker is destroying an ECS Cluster

### Strategy
This rule lets you monitor this CloudTrail API call to detect if an ECS cluster is deleted:

* [DeleteCluster][1]

### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeleteCluster.html
