---
bundle: com.datadoghq.aws.codedeploy
bundle_title: AWS CodeDeploy
description: Get information about an AWS CodeDeploy deployment.
icon:
  integration_id: amazon-codedeploy
  type: integration_logo
input: '#/$defs/GetDeploymentInputs'
inputFieldOrder:
- region
- deploymentId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetDeploymentOutputs'
permissions:
- codedeploy:GetDeployment
source: amazon-codedeploy
title: Get deployment
---

Get information about an AWS CodeDeploy deployment.

{{< workflows >}}
