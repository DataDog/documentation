---
aliases:
- y9g-1vn-tcd
- /security_monitoring/default_rules/y9g-1vn-tcd
- /security_monitoring/default_rules/jumpcloud-admin-impossible-travel
disable_edit: true
integration_id: jumpcloud
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: jumpcloud
security: attack
source: jumpcloud
tactic: TA0001-initial-access
technique: T1078-valid-accounts
title: Jumpcloud admin triggered impossible travel scenario
type: security_rules
---

## Goal
Detect an Impossible Travel event with a JumpCloud administrator.

## Strategy
The Impossible Travel detection type’s algorithm compares the GeoIP data of the last log and the current log to determine if the user (`@usr.name`) traveled more than 500km at over 1,000km/h.

## Triage and response
1. Determine if {@usr.name}} should be connecting from {{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}} and {{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}} in a short period of time.
2. If the user should not be connecting from {{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}} or {{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}, then consider isolating the account and reset credentials.
3. Use the Cloud SIEM - User Investigation dashboard to audit any user actions that may have occurred after the illegitimate login.
