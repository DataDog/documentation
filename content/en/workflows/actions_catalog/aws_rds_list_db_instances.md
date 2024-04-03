---
bundle: com.datadoghq.aws.rds
bundle_title: AWS RDS
description: List DB instances with optional filters.
icon:
  integration_id: amazon-rds
  type: integration_logo
input: '#/$defs/ListDBInstancesInputs'
inputFieldOrder:
- region
- filters
- maxRecords
keywords:
- all
- list
output: '#/$defs/ListDbInstancesOutputs'
permissions:
- rds:DescribeDBInstances
source: amazon-rds
stability: stable
title: List DB instances
---

List DB instances with optional filters.

{{< workflows >}}
