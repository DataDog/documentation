---
aliases:
- wem-cvg-42m
- /security_monitoring/default_rules/wem-cvg-42m
- /security_monitoring/default_rules/aws-route53-disassociated-query-logging
disable_edit: true
iaas: aws
integration_id: route53
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: route53
security: attack
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: AWS Route 53 VPC disassociated from query logging configuration
type: security_rules
---

## Goal
Detect when a user disassociates a VPC from the query logging configuration.

## Strategy
This rule lets you monitor this CloudTrail API call to detect if a user has disassociated.

* [DisassociateResolverQueryLogConfig][1]

## Triage and response
1. Determine if {{@userIdentity.arn}} is expected to perform the {{@evt.name}} API call.
2. Contact the principal owner and see if this was an API call that was made by the user.
3. If the API call was not made by the user, rotate the user credentials and investigate what other APIs were successfully accessed.
   * Rotate the credentials.
   * Investigate if the same credentials made other unauthorized API calls.

## Changelog
7 April 2022 - Update rule and signal message.

[1]: https://docs.aws.amazon.com/Route53/latest/APIReference/API_route53resolver_DisassociateResolverQueryLogConfig.html
