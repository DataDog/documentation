---
bundle: com.datadoghq.aws.acm
bundle_title: AWS Certificate Manager
description: Retrieves a list of certificate ARNs and domain names.
icon:
  integration_id: amazon-certificate-manager
  type: integration_logo
input: '#/$defs/ListCertificatesInputs'
inputFieldOrder:
- region
- certificateStatuses
- limit
keywords:
- all
- list
output: '#/$defs/ListCertificatesOutputs'
source: amazon-certificate-manager
title: List certificates
---

Retrieves a list of certificate ARNs and domain names.

{{< workflows >}}
