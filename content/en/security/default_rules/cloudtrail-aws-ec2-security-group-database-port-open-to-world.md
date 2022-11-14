---
aliases:
- tb5-gf8-kj7
- /security_monitoring/default_rules/tb5-gf8-kj7
- /security_monitoring/default_rules/cloudtrail-aws-ec2-security-group-database-port-open-to-world
control: '4.10'
disable_edit: true
framework: cis-aws
iaas: aws
integration_id: ec2
kind: documentation
requirement: Monitoring
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: compliance
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: Potential database port open to the world via AWS security group
type: security_rules
---

## Goal
Detect when an AWS security group is opened to the world on a port commonly associated with a database service.

## Strategy
Monitor CloudTrail and detect when an AWS security group has been created or modified with one of the following API calls:
* [`AuthorizeSecurityGroupIngress`][1]

This rule inspects the `@requestParameters.ipPermissions.items.ipRanges.items.cidrIp` or `@requestParameters.cidrIp` array to determine if either of the strings are contained - `0.0.0.0/0` or `::/0` for the following ports:
* 1433 (MSSQL)
* 3306 (MySQL)
* 5432 (PostgresSQL)
* 5984/6984 (CouchDB)
* 6379 (Redis)
* 9200 (Elasticsearch)
* 27017 (MongoDB)

Database ports that are open to the world are a common target for attackers to gain unauthorized access to resources or data.

**Note:** There is a separate rule to detect AWS [Security Group Open to the World][2].

## Triage and response
1. Determine if `{{@userIdentity.session_name}}` should have made a `{{@evt.name}}` API call.
2. If the API call was not made by the user:
  * Rotate the user credentials.
  * Determine what other API calls were made by the user.
  * Investigate VPC flow logs and OS system logs to determine if unauthorized access occurred.
3. If the API call was made legitimately by the user:
  * Advise the user to modify the IP range to the company private network or bastion host.
4. Revert security group configuration back to known good state if required:
  * Use the `aws-cli` command [`revoke-security-group-ingress`][3] or the [AWS console][4] to remove the rule.
  * Use the `aws-cli` command [`modify-security-group-rules`][5] or [AWS console][6] to modify the existing rule.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_AuthorizeSecurityGroupIngress.html
[2]: https://docs.datadoghq.com/security_platform/default_rules/aws-security-group-open-to-world/
[3]: https://docs.aws.amazon.com/cli/latest/reference/ec2/revoke-security-group-ingress.html
[4]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#deleting-security-group-rules
[5]: https://docs.aws.amazon.com/cli/latest/reference/ec2/modify-security-group-rules.html
[6]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#updating-security-group-rules
