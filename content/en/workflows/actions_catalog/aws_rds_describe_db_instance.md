---
bundle: com.datadoghq.aws.rds
bundle_title: AWS RDS
description: Describe a DB instance.
icon:
  integration_id: amazon-rds
  type: integration_logo
input: '#/$defs/DescribeDBInstanceInputs'
inputFieldOrder:
- region
- dbInstanceIdentifier
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeDbInstanceOutputs'
permissions:
- rds:DescribeDBInstances
source: amazon-rds
stability: stable
title: Describe DB instance
---

Describe a DB instance.

{{< workflows >}}
