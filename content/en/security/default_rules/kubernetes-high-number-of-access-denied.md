---
aliases:
- bz1-7ay-vqj
- /security_monitoring/default_rules/bz1-7ay-vqj
- /security_monitoring/default_rules/kubernetes-high-number-of-access-denied
disable_edit: true
integration_id: kubernetes
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: kubernetes
tactic: TA0007-discovery
title: A Kubernetes user attempted to perform a high number of actions that were denied
type: security_rules
---

## Goal
Identify when a Kubernetes user attempts to perform a high number of actions that are denied in a short amount of time.

## Strategy
This rule identifies responses of the API server where the reason for the error is set to `Forbidden`, indicating that an authenticated user attempted to perform an action that they are not explicitly authorized to perform.

The rule flags users who receive permission denied errors on several distinct API endpoints in a short amount of time.

## Triage and response
1. Determine if the user: `{{@usr.id}}` is expected to perform the denied actions. If yes, the alert may be due to a misconfigured application or a service account with insufficient privileges.
2. Use the Cloud SIEM `User Investigation` dashboard to review any user actions that may have occurred after the potentially malicious action.
