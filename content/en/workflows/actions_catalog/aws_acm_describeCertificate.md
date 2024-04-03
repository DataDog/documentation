---
bundle: com.datadoghq.aws.acm
bundle_title: AWS Certificate Manager
description: Returns detailed metadata about the specified ACM certificate.
icon:
  integration_id: amazon-certificate-manager
  type: integration_logo
input: '#/$defs/GenericCertificateInputs'
inputFieldOrder:
- region
- certificateARN
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeCertificateOutputs'
source: amazon-certificate-manager
title: Describe certificate
---

Returns detailed metadata about the specified ACM certificate.

{{< workflows >}}
