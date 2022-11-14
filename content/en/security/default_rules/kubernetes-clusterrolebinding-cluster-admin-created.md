---
aliases:
- q2g-reo-fw1
- /security_monitoring/default_rules/q2g-reo-fw1
- /security_monitoring/default_rules/kubernetes-clusterrolebinding-cluster-admin-created
disable_edit: true
integration_id: kubernetes
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: kubernetes
tactic: TA0004-privilege-escalation
title: A Kubernetes user was assigned cluster administrator permissions
type: security_rules
---

## Goal

Identify when a Kubernetes user is assigned cluster-level administrative permissions.

## Strategy

This rule monitory when a `ClusterRoleBinding` object is created to bind a Kubernetes user to the `cluster-admin` [default cluster-wide role](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles). This effectively grants the referenced user with full administrator permissions over all the Kubernetes cluster.

## Triage and response

1. Determine if the Kubernetes user referenced in `@requestObject.subjects` is expected to have been granted administrator permissions on the cluster
2. Determine if the actor (`@usr.id`) is authorized to assign administrator permissions
3. Use the Cloud SIEM `User Investigation` dashboard to review any user actions that may have occurred after the potentially malicious action.

## Changelog
* 20 September 2022 - Updated tags
