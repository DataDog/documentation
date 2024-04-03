---
bundle: com.datadoghq.aws.rds
bundle_title: AWS RDS
description: A list of DB security groups or VPC security groups to authorize on this
  DB instance.
icon:
  integration_id: amazon-rds
  type: integration_logo
input: '#/$defs/UpdateDbInstanceSecurityGroupInputs'
inputFieldOrder:
- dbInstanceIdentifier
- region
- dbSecurityGroups
- vpcSecurityGroups
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateDbInstanceSecurityGroupOutputs'
permissions:
- rds:ModifyDBInstance
source: amazon-rds
stability: stable
title: Update instance security groups
---

A list of DB security groups or VPC security groups to authorize on this DB instance.

{{< workflows >}}
