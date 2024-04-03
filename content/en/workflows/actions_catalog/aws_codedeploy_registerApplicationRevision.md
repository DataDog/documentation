---
bundle: com.datadoghq.aws.codedeploy
bundle_title: AWS CodeDeploy
description: Registers a revision for the specified application with AWS CodeDeploy.
icon:
  integration_id: amazon-codedeploy
  type: integration_logo
input: '#/$defs/RegisterApplicationRevisionInputs'
inputFieldOrder:
- region
- applicationName
- description
- revisionType
- s3Location
- appSpecContent
- gitHubLocation
output: '#/$defs/RegisterApplicationRevisionOutputs'
permissions:
- codedeploy:RegisterApplicationRevision
source: amazon-codedeploy
title: Register application revision
---

Registers a revision for the specified application with AWS CodeDeploy.

{{< workflows >}}
