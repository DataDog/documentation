---
aliases:
- wpm-g1s-8yx
- /security_monitoring/default_rules/wpm-g1s-8yx
- /security_monitoring/default_rules/kubernetes-new-admission-controller
disable_edit: true
integration_id: kubernetes
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: kubernetes
tactic: TA0003-persistence
title: A new Kubernetes admission controller was created
type: security_rules
---

## Goal
Identify when a new Kubernetes [admission controller][1] is created in the cluster.

Admission controllers can intercept all incoming requests to the API server. An attacker can use them to establish persistence or to access sensitive data (such as secrets) sent to the API server.

## Strategy
This rule identifies when a `MutatingWebhookConfiguration` or `ValidatingWebhookConfiguration` is created.

## Triage and response
1. Determine if the admission controller being created is expected.
2. Determine if the user: `{{@usr.id}}` should be creating the admission controller.
3. Use the Cloud SIEM `User Investigation` dashboard to review user actions that occurred after the potentially malicious action.

## Changelog
* 20 September 2022 - Updated tags

[1]: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/
