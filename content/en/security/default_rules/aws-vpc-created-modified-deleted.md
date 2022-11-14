---
aliases:
- f6b-3b4-aef
- /security_monitoring/default_rules/f6b-3b4-aef
- /security_monitoring/default_rules/aws-vpc-created-modified-deleted
control: '4.14'
disable_edit: true
framework: cis-aws
iaas: aws
integration_id: vpc
kind: documentation
requirement: Monitoring
rule_category:
- Cloud SIEM (Log Detection)
scope: vpc
security: compliance
source: cloudtrail
title: AWS VPC created or modified
type: security_rules
---

## Goal
Detect when an attacker is destroying a VPC.

## Strategy
This rule lets you monitor this CloudTrail API call to detect if an attacker is deleting a VPC:

* [DeleteVpc][1]

## Triage and response
1. Determine if {{@userIdentity.arn}} is expected to perform the {{@evt.name}} API call on the account: {{@usr.account_id}}.
2. Contact the principal owner and see if this was an API call that was made by the user.
3. If the API call was not made by the user, rotate the user credentials and investigate what other APIs were successfully accessed.
   * Rotate the credentials.
   * Investigate if the same credentials made other unauthorized API calls.

## Changelog
7 April 2022 - Updated rule query, cases and signal message.

[1]: https://docs.aws.amazon.com/cli/latest/reference/ec2/delete-vpc.html
