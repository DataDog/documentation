---
aliases:
- o5s-014-bwz
- /security_monitoring/default_rules/o5s-014-bwz
- /security_monitoring/default_rules/m365-exchange-logins-impossible-travel
disable_edit: true
integration_id: exchange-server
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: exchange-server
source: microsoft-365
tactic: TA0001-initial-access
technique: T1078-valid-accounts
title: Abnormal successful Microsoft 365 Exchange login event
type: security_rules
---

## Goal
Detect an Impossible Travel event by a user logging in to Microsoft Exchange.

## Strategy
The Impossible Travel detection type’s algorithm compares the GeoIP data of the last and the current Microsoft-365 mailbox login event (`@evt.name:MailboxLogin`) to determine if the user `{{@usr.name}}` traveled more than 500km at over 1,000km/hr.

## Triage and response
1. Determine if `{{@usr.name}}` should be connecting from `{{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}}` and `{{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}` in a short period of time.
2. If the user should not be connecting from `{{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}}` and `{{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}`, then consider isolating the account and reset credentials.
3. Use the Cloud SIEM - User Investigation dashboard to audit any user actions that may have occurred after the illegitimate login.
