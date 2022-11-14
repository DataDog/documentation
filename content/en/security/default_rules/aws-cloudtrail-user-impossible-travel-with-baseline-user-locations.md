---
aliases:
- fc6-4t7-vx9
- /security_monitoring/default_rules/fc6-4t7-vx9
- /security_monitoring/default_rules/aws-cloudtrail-user-impossible-travel-with-baseline-user-locations
disable_edit: true
iaas: aws
integration_id: iam
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: iam
source: cloudtrail
title: User travel was impossible in AWS CloudTrail IAM log
type: security_rules
---

## Event Summary
`@userIdentity.accessKeyId:` `{{@userIdentity.accessKeyId}}` had activity from `{{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}}` and `{{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}` which are approximately `{{@impossible_travel.triggering_locations.travel_distance}}km` apart within `{{@impossible_travel.triggering_locations.travel_time_human_readable}}`. This indicates a potential impossible travel.

## Goal
Detect an Impossible Travel event when a `@userIdentity.type:` `{{@userIdentity.type}}` uses an AWS IAM access key in CloudTrail logs.

## Strategy
The Impossible Travel detection type's algorithm compares the GeoIP data of the last log and the current log to determine if the IAM user with `@userIdentity.session_name:` `{{@userIdentity.session_name}}`  traveled more than 500km at over 1,000km/hr and used an AWS IAM access key in CloudTrail logs.

## Triage and response
1. Determine if the `@userIdentity.accessKeyId:` `{{@userIdentity.accessKeyId}}` for `@userIdentity.session_name:` `{{@userIdentity.session_name}}` should be used from `{{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}}` and `{{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}`.
2. If the IAM user should not be used from `{{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}}` and `{{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}`, then consider isolating the account and reset credentials.
3. Audit any user actions that may have occurred after the illegitimate login.
