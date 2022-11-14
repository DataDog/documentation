---
aliases:
- gay-o0u-6in
- /security_monitoring/default_rules/gay-o0u-6in
- /security_monitoring/default_rules/aws-ec2-sts-creds-impossible-travel-no-vpns
disable_edit: true
iaas: aws
integration_id: iam
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: iam
source: cloudtrail
title: Compromised AWS EC2 Instance
type: security_rules
---

## Goal
Detect an Impossible Travel event when a `@userIdentity.type:` `{{@userIdentity.type}}` uses an AWS EC2 access key and filter out VPNs and AWS Internal IPs.

## Strategy
The Impossible Travel detection type's algorithm compares the GeoIP data of the last log and the current log to determine if the EC2 instance with `@userIdentity.session_name:` `{{@userIdentity.session_name}}`  traveled more than 500km at over 1,000km/hr and used an AWS EC2 access key.

## Triage and response
1. Determine if the `@userIdentity.accessKeyId:` `{{@userIdentity.accessKeyId}}` for `@userIdentity.session_name:` `{{@userIdentity.session_name}}` instance should be used from `{{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}}` and `{{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}`.
2. If the EC2 access key should not be used from `{{@impossible_travel.triggering_locations.first_location.city}}, {{@impossible_travel.triggering_locations.first_location.country}}` and `{{@impossible_travel.triggering_locations.second_location.city}}, {{@impossible_travel.triggering_locations.second_location.country}}`., then consider isolating the account and reset credentials.
3. Audit any instance actions that may have occurred after the illegitimate login.

**NOTE** VPNs and other anonymous IPs are filtered out of this signal

## Changelog
7 April 2022 - Updated rule name and signal message.
