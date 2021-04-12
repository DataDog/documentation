---
aliases:
- 37f-a98-5cd
disable_edit: true
kind: documentation
rule_category:
- Log Detection
source: kubernetes
title: Anonymous Request Authorized
type: security_rules
---

### Goal
Detect when an unauthenticated request user is permitted in Kubernetes.

### Strategy
This rule monitors when any action is permitted (`@http.status_code:[100 TO 299]`) for an unauthenticated user (`@user.username:\"system:anonymous\"`).
The `/healthz` endpoint is commonly accessed unauthenticated and it is excluded in the query filter.

### Triage & Response
1. Inspect all of the HTTP paths accessed and determine if any of the path should be permitted by unauthenticated users.
2. Determine what IP addresses accessed Kubernetes endpoints which may contain sensitive data.
