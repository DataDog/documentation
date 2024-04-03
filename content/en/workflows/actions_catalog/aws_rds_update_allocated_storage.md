---
bundle: com.datadoghq.aws.rds
bundle_title: AWS RDS
description: The new amount of storage in gibibytes (GiB) to allocate for the DB instance.
icon:
  integration_id: amazon-rds
  type: integration_logo
input: '#/$defs/UpdateAllocatedStorageInputs'
inputFieldOrder:
- dbInstanceIdentifier
- region
- allocatedStorage
- iops
- applyImmediately
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateAllocatedStorageOutputs'
permissions:
- rds:ModifyDBInstance
source: amazon-rds
stability: stable
title: Update allocated storage
---

The new amount of storage in gibibytes (GiB) to allocate for the DB instance.

{{< workflows >}}
