---
aliases:
- oky-4op-88y
- /security_monitoring/default_rules/oky-4op-88y
- /security_monitoring/default_rules/aws-cloudtrail-console-logins-impossible-travel-mfa
disable_edit: true
iaas: aws
integration_id: cloudtrail
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: cloudtrail
security: attack
source: cloudtrail
tactic: TA0001-initial-access
technique: T1078-valid-accounts
title: AWS ConsoleLogin with MFA triggered Impossible Travel scenario
type: security_rules
---

## Goal
Detect an Impossible Travel event when a `@userIdentity.type:` `{{@userIdentity.type}}` performs a `consoleLogin` with a multi-factor authentication (MFA) device.

## Strategy
The Impossible Travel detection type's algorithm compares the GeoIP data of the last log and the current log to determine if the user with `@userIdentity.session_name:` `{{@userIdentity.session_name}}` traveled more than 500km at over 1,000km/h and the user used MFA.

## Triage and response
1. Determine if `{{@userIdentity.session_name}}` should be connecting from  `{{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}}` and `{{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}` in a short period of time.
2. If the user should not be connecting from `{{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}}` and `{{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}`, then consider isolating the account and reset credentials.
3. Use the Cloud SIEM - User Investigation dashboard to audit any user actions that may have occurred after the illegitimate login. 

## Changelog
10 Mar 2022 - Rule updated.
