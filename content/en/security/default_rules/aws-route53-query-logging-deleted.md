---
aliases:
- aqn-nem-2ud
- /security_monitoring/default_rules/aqn-nem-2ud
- /security_monitoring/default_rules/aws-route53-query-logging-deleted
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
title: AWS Route 53 DNS query logging disabled
type: security_rules
---

## Goal
Detect when a user deletes a Route 53 query logging configuration.

## Strategy
Monitor cloudtrail logs where `@evt.name` is `DeleteResolverQueryLogConfig` which would stop Route53 Query logging for all of the Amazon VPCs that are associated with the configuration.

## Triage and response
1. Determine if {{@userIdentity.arn}} is expected to perform the {{@evt.name}} API call.
2. Contact the principal owner and see if this was an API call that was made by the user.
3. If the API call was not made by the user, rotate the user credentials and investigate what other APIs were successfully accessed.

## Changelog
7 April 2022 - Updated rule query and signal message.
