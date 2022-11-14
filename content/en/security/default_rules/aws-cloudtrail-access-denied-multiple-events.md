---
aliases:
- 1b1-37a-74c
- /security_monitoring/default_rules/1b1-37a-74c
- /security_monitoring/default_rules/aws-cloudtrail-access-denied-multiple-events
control: '4.1'
disable_edit: true
framework: cis-aws
iaas: aws
integration_id: amazon
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: amazon
security: compliance
source: cloudtrail
tactic: TA0007-discovery
title: A user received multiple AccessDenied errors
type: security_rules
---

## Goal
Detect when a user is assessing privileges in AWS through API bruteforcing technique.

## Strategy
This rule lets you monitor CloudTrail to detect when the error message of `AccessDenied` is returned on more than 5 unique API calls.

## Triage and response
1. Determine if {{@userIdentity.arn}} should be attempting to use {{@evt.name}} API commands.
   * Use the Cloud SIEM - User Investigation dashboard to assess user activity.
2. Contact the user to see if they intended to make these API calls.
3. If the user did not make the API calls:
   * Rotate the credentials.
   * Investigate to see what API calls might have been made that were successful throughout the rest of the environment.

## Changelog
Rule updated on 3 March 2022.
