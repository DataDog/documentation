---
bundle: com.datadoghq.aws.acm
bundle_title: AWS Certificate Manager
description: Requests a public certificate for use with other AWS services with DNS
  validation.
icon:
  integration_id: amazon-certificate-manager
  type: integration_logo
input: '#/$defs/RequestPublicCertificateInputs'
inputFieldOrder:
- region
- domainName
- additionalDomainNames
- tags
output: '#/$defs/RequestCertificateOutputs'
source: amazon-certificate-manager
title: Request public certificate
---

Requests a public certificate for use with other AWS services with DNS validation.

{{< workflows >}}
