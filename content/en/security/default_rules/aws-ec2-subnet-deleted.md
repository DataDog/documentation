---
aliases:
- 506-0ba-81f
- /security_monitoring/default_rules/506-0ba-81f
- /security_monitoring/default_rules/aws-ec2-subnet-deleted
disable_edit: true
iaas: aws
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: attack
source: cloudtrail
tactic: TA0040-impact
technique: T1485-data-destruction
title: AWS EC2 subnet deleted
type: security_rules
---

## Goal
Detect when an attacker is destroying an EC2 subnet.

## Strategy
This rule lets you monitor this CloudTrail API call to detect if an attacker is deleting an EC2 subnet.

* [DeleteSubnet][1]

## Triage and response
1. Determine if {{@userIdentity.arn}} should be deleting EC2 subnets.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
   * Rotate the credentials.
   * Investigate if the same credentials made other unauthorized API calls.

## Changelog
1 April 2022 - Update rule and signal message

[1]: https://docs.aws.amazon.com/cli/latest/reference/ec2/delete-subnet.html
