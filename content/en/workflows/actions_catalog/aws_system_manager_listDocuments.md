---
bundle: com.datadoghq.aws.system_manager
bundle_title: AWS System Manager
description: Return all Systems Manager (SSM) documents in the current Amazon Web
  Services account and region. Use a filter to limit the results.
icon:
  integration_id: amazon-ssm
  type: integration_logo
input: '#/$defs/ListDocumentsInputs'
inputFieldOrder:
- region
- filters
keywords:
- all
- list
output: '#/$defs/ListDocumentsOutputs'
permissions:
- ssm:ListDocuments
source: amazon-ssm
title: List documents
---

Return all Systems Manager (SSM) documents in the current Amazon Web Services account and region. Use a filter to limit the results.

{{< workflows >}}
