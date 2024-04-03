---
bundle: com.datadoghq.aws.rds
bundle_title: AWS RDS
description: Stops an Amazon RDS DB instance.
icon:
  integration_id: amazon-rds
  type: integration_logo
input: '#/$defs/StopDBInstanceInputs'
inputFieldOrder:
- dbInstanceIdentifier
- region
- dbSnapshotIdentifier
keywords:
- stop
- terminate
output: '#/$defs/StopDBInstanceOutputs'
permissions:
- rds:StopDBInstance
source: amazon-rds
stability: stable
title: Stop DB instance
---

Stops an Amazon RDS DB instance.

{{< workflows >}}
