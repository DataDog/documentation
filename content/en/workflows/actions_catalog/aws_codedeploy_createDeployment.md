---
bundle: com.datadoghq.aws.codedeploy
bundle_title: AWS CodeDeploy
description: Deploys an application revision through the specified deployment group.
icon:
  integration_id: amazon-codedeploy
  type: integration_logo
input: '#/$defs/CreateDeploymentInputs'
inputFieldOrder:
- region
- applicationName
- autoRollbackConfiguration
- deploymentConfigName
- deploymentGroupName
- fileExistsBehavior
- ignoreApplicationStopFailures
- revision
- targetInstances
- updateOutdatedInstancesOnly
output: '#/$defs/CreateDeploymentOutputs'
permissions:
- codedeploy:CreateDeployment
source: amazon-codedeploy
title: Create deployment
---

Deploys an application revision through the specified deployment group.

{{< workflows >}}
