---
aliases:
- m0j-qd1-5he
- /security_monitoring/default_rules/m0j-qd1-5he
- /security_monitoring/default_rules/aws-iam-new-aws-account-assumerole
disable_edit: true
iaas: aws
integration_id: cloudtrail
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: cloudtrail
tactic: TA0001-initial-access
technique: T1199-trusted-relationship
title: New AWS Account Seen Assuming a Role into AWS Account
type: security_rules
---

## Goal
Detect when an attacker accesses your AWS account from their AWS Account.

## Strategy
This rule lets you monitor AssumeRole (`@evt.name:AssumeRole`) CloudTrail API calls to detect when an external AWS account (`@usr.account_id`) assumes a role into your AWS account (`account`). It does this by learning all AWS accounts from which the AssumeRole call occurs within a 7-day window. Newly detected accounts after this 7-day window will generate security signals.

## Triage and response
1. Determine if the `@usr.account_id` is an AWS account is managed by your company.
2. If not, try to determine who is the owner of the AWS account.
3. Inspect the role the account is assuming. Determine who created this role and who allowed this AWS account to assume this role.

## Changelog
7 April 2022 - Update rule query and signal message.
