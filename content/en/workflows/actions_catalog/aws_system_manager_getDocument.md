---
bundle: com.datadoghq.aws.system_manager
bundle_title: AWS System Manager
description: Get the contents of the specified Amazon Web Services Systems Manager
  document (SSM document).
icon:
  integration_id: amazon-ssm
  type: integration_logo
input: '#/$defs/GetDocumentInputs'
inputFieldOrder:
- region
- documentName
keywords:
- describe
- get
- lookup
output: '#/$defs/GetDocumentOutputs'
permissions:
- ssm:GetDocument
source: amazon-ssm
title: Get document
---

Get the contents of the specified Amazon Web Services Systems Manager document (SSM document).

{{< workflows >}}
