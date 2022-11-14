---
aliases:
- dex-13e-z6w
- /security_monitoring/default_rules/dex-13e-z6w
- /security_monitoring/default_rules/auth0-impossible-travel
disable_edit: true
integration_id: auth0
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: auth0
security: attack
source: auth0
tactic: TA0001-initial-access
technique: T1078-valid-accounts
title: Impossible Travel Auth0 login
type: security_rules
---

## Goal
Detect an Impossible Travel event when two successful authentication events occur in a short time frame.

## Strategy
The Impossible Travel detection type's algorithm compares the GeoIP data of the last log and the current log to determine if the user `{{@usr.name}}` traveled more than 500km at over 1,000km/hr.

## Triage and response
1. Determine if the user `{{@usr.name}}` should have authenticated from `{{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}}` and `{{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}`.
2. If `{{@user.name}}` should not authenticated from `{{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}}` and `{{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}`, then consider isolating the account and reset credentials.
3. Audit any instance actions that may have occurred after the illegitimate login.

**NOTE** VPNs and other anonymous IPs are filtered out of this signal

## Changelog
* 10 October 2022 - Updated query.
