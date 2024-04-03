---
bundle: com.datadoghq.aws.rds
bundle_title: AWS RDS
description: Starts an Amazon RDS DB instance that was stopped using the Amazon Web
  Services console, the stop-db-instance CLI command, or the StopDBInstance action.
icon:
  integration_id: amazon-rds
  type: integration_logo
input: '#/$defs/StartDBInstanceInputs'
inputFieldOrder:
- dbInstanceIdentifier
- region
output: '#/$defs/StartDBInstanceOutputs'
permissions:
- rds:StartDBInstance
source: amazon-rds
stability: stable
title: Start DB instance
---

Starts an Amazon RDS DB instance that was stopped using the Amazon Web Services console, the stop-db-instance CLI command, or the StopDBInstance action.

{{< workflows >}}
