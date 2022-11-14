---
aliases:
- fu0-rtv-2rb
- /security_monitoring/default_rules/fu0-rtv-2rb
- /security_monitoring/default_rules/aws-rds-public
disable_edit: true
integration_id: rds
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: rds
title: RDS instance is not publicly accessible
type: security_rules
---

## Description

Secure your RDS instance, so it is not publicly accessible.

## Rationale

Unrestricted access to your RDS instance allows everyone on the internet to establish a connection with your database. This can lead to brute-force, DoS/DDoS, or SQL injection attacks.

## Remediation

### From the console

Follow the [Modifying an Amazon RDS DB instance (Console)][2] docs to learn how to modify your RDS instance in the AWS console.

### From the command line

Follow the [Modifying an Amazon RDS DB instance (AWS CLI)][2] docs to learn how to modify your RDS instance connection configuration.

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html
[2]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html
