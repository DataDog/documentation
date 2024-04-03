---
bundle: com.datadoghq.aws.acm
bundle_title: AWS Certificate Manager
description: Requests a private certificate for use with other AWS services.
icon:
  integration_id: amazon-certificate-manager
  type: integration_logo
input: '#/$defs/RequestPrivateCertificateInputs'
inputFieldOrder:
- region
- domainName
- certificateAuthorityARN
- additionalDomainNames
- tags
output: '#/$defs/RequestCertificateOutputs'
source: amazon-certificate-manager
title: Request private certificate
---

Requests a private certificate for use with other AWS services.

{{< workflows >}}
