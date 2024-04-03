---
bundle: com.datadoghq.aws.acm
bundle_title: AWS Certificate Manager
description: Deletes a certificate and its associated private key.
icon:
  integration_id: amazon-certificate-manager
  type: integration_logo
input: '#/$defs/GenericCertificateInputs'
inputFieldOrder:
- region
- certificateARN
keywords:
- delete
- remove
output: '#/$defs/DeleteRenewCertificateOutputs'
source: amazon-certificate-manager
title: Delete certificate
---

Deletes a certificate and its associated private key.

{{< workflows >}}
