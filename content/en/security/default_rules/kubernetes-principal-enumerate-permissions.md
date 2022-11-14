---
aliases:
- 68a-f97-42f
- /security_monitoring/default_rules/68a-f97-42f
- /security_monitoring/default_rules/kubernetes-principal-enumerate-permissions
disable_edit: true
integration_id: kubernetes
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: kubernetes
tactic: TA0007-discovery
title: Kubernetes principal attempted to enumerate their permissions
type: security_rules
---

## Goal
Identify when a user is attempting to enumerate their permissions.

## Strategy
This rule identifies when a user attempts to enumerate their permissions, for example, through the use of `kubectl auth can-i --list`. This can be an indicator of an attacker having compromised a Kubernetes service account or user and attempting to determine what permissions it has.

## Triage and response
1. Determine if enumerating the permissions of the user: `{{@usr.id}}` is suspicious. For example, a service account assigned to a web application and enumerating its privileges is highly suspicious, while a group assigned to operations engineers is likely to represent legitimate activity.
2. Use the Cloud SIEM `User Investigation` dashboard to review any user actions that may have occurred after the potentially malicious action.
