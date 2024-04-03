---
bundle: com.datadoghq.aws.acm
bundle_title: AWS Certificate Manager
description: Renews an eligible certificate.
icon:
  integration_id: amazon-certificate-manager
  type: integration_logo
input: '#/$defs/GenericCertificateInputs'
inputFieldOrder:
- region
- certificateARN
output: '#/$defs/DeleteRenewCertificateOutputs'
source: amazon-certificate-manager
title: Renew certificate
---

Renews an eligible certificate.

{{< workflows >}}
