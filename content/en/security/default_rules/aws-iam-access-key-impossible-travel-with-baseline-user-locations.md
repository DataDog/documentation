---
aliases:
- yqe-gyj-js8
- /security_monitoring/default_rules/yqe-gyj-js8
- /security_monitoring/default_rules/aws-iam-access-key-impossible-travel-with-baseline-user-locations
disable_edit: true
iaas: aws
integration_id: iam
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: iam
source: cloudtrail
title: Compromised AWS IAM User Access Key
type: security_rules
---

## Goal
Detect an Impossible Travel event when a `@userIdentity.type:` `{{@userIdentity.type}}` uses an AWS IAM access key and filter out VPNs and AWS Internal IPs.

## Strategy
The Impossible Travel detection type's algorithm compares the GeoIP data of the last log and the current log to determine if the IAM user with `@userIdentity.session_name:` `{{@userIdentity.session_name}}`  traveled more than 500km at over 1,000km/hr and used an AWS IAM access key.

## Triage and response
1. Determine if the `@userIdentity.accessKeyId:` `{{@userIdentity.accessKeyId}}` for `@userIdentity.session_name:` `{{@userIdentity.session_name}}` should be used from `{{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}}` and `{{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}`.
2. If the IAM user should not be used from `{{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}}` and `{{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}`, then consider isolating the account and reset credentials.
3. Audit any user actions that may have occurred after the illegitimate login.

## Changelog
- 7 April 2022 - Updated signal message.
- 3 August 2022 - Fixed null groupby field in query.
