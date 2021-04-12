---
aliases:
- aoc-jdx-q3d
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: compliance
source: azure
title: Azure SQL Server Firewall Rules Created or Modified
type: security_rules
---

## Goal

Detect when an Azure network security rule has been created, modified, or deleted.

## Strategy

Monitor Azure activity logs and detect when the `@evt.name` is equal to any of the following names:
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE` 
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/DELETE`

and `@evt.outcome` is equal to `Success`.

## Triage && Response

1. Inspect the security rule and determine if it exposes any Azure resources that should not be made public.
