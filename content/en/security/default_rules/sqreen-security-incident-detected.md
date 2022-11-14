---
aliases:
- x8x-2yk-m3b
- /security_monitoring/default_rules/x8x-2yk-m3b
- /security_monitoring/default_rules/sqreen-security-incident-detected
disable_edit: true
integration_id: sqreen
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
source: sqreen
title: Security Incident Detected by Sqreen
type: security_rules
---

## Goal
Detect a threat on your application.

## Strategy
This rule creates a signal for every security incident created by Sqreen.

## Triage and response
1. Review the incident on the [Sqreen dashboard][1].

[1]: https://my.sqreen.com/incidents

## Changelog
23 June 2022 - Updated groupby count to reduce rule noise.
