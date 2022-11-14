---
aliases:
- nl3-tm7-ujl
- /security_monitoring/default_rules/nl3-tm7-ujl
- /security_monitoring/default_rules/sqreen-users-logged-in-new-country
disable_edit: true
integration_id: sqreen
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
source: sqreen
title: User Logged into an Application from a New Country
type: security_rules
---

## Goal
Detect when a user logs into an application that is using Sqreen from a new country.

## Strategy
This rule lets you monitor when a user logs into an application from a country that has not been seen before.

## Triage and response
1. Review the user activity on the [Sqreen dashboard][1].

[1]: https://my.sqreen.com/application/goto/users/
