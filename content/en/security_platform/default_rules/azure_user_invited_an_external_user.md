---
aliases:
- 8pu-lqe-4ze
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: compliance
source: azure
title: Azure user invited an external user
type: security_rules
---

## Goal

Detect when an invitation is sent to an external user.

## Strategy

Monitor Azure Active Directory Audit logs and detect when any `@evt.name` is equal to `Invite external user` and the `@evt.outcome` is equal to `success`.

## Triage & Response

1. Review and determine if the invitation and its recipient are valid.
