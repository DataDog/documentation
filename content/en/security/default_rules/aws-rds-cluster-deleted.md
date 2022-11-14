---
aliases:
- a11-897-de4
- /security_monitoring/default_rules/a11-897-de4
- /security_monitoring/default_rules/aws-rds-cluster-deleted
disable_edit: true
iaas: aws
integration_id: rds
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: rds
security: attack
source: cloudtrail
tactic: TA0040-impact
technique: T1485-data-destruction
title: AWS RDS Cluster deleted
type: security_rules
---

## Goal
Detect when a user deleted a database cluster in RDS.

## Strategy
This rule lets you monitor this CloudTrail API call to detect if an attacker is deleting a RDS cluster:

* [DeleteDBCluster][1]

## Triage and response
1. Determine if the API call: {{@evt.name}} should have occurred.
2. If it shouldn't have been made:
   * Contact the user: {{@userIdentity.arn}} and see if they made the API call.
3. If the API call was not made by the user:
   * Rotate the user credentials.
   * Determine what other API calls were made with the old credentials that were not made by the user.

## Changelog
6 April 2022 - Updated rule and signal message.

[1]: https://docs.aws.amazon.com/cli/latest/reference/rds/delete-db-cluster.html
