---
bundle: com.datadoghq.aws.codedeploy
bundle_title: AWS CodeDeploy
description: Attempts to stop an ongoing deployment.
icon:
  integration_id: amazon-codedeploy
  type: integration_logo
input: '#/$defs/StopDeploymentInputs'
inputFieldOrder:
- region
- deploymentId
- autoRollbackEnabled
keywords:
- stop
- terminate
output: '#/$defs/StopDeploymentOutputs'
permissions:
- codedeploy:StopDeployment
source: amazon-codedeploy
title: Stop deployment
---

Attempts to stop an ongoing deployment.

{{< workflows >}}
