---
aliases:
- 6f3-c4d-9f0
- /security_monitoring/default_rules/6f3-c4d-9f0
- /security_monitoring/default_rules/aws-security-group-open-to-world
control: cis-3.10
disable_edit: true
framework: cis
iaas: aws
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: attack
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: Security group open to the world
type: security_rules
---

## Goal
Detect when an AWS security group is opened to the world.

## Strategy
Monitor CloudTrail and detect when an AWS security group has been created or modified with one of the following API calls:
* [AuthorizeSecurityGroupIngress][1]

This rule inspects the `@requestParameters.ipPermissions.items.ipRanges.items.cidrIp` array to determine if either of the strings are contained:
* `0.0.0.0/0`
* `::/0`

## Triage and response
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
  * Rotate the user credentials and investigate what other API calls.
  * Determine what other API calls the user made which were not made by the user.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_AuthorizeSecurityGroupIngress.html

## Changelog
18 March 2022 - Updated rule query.
