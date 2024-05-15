---
aliases:
- /ja/workflows/actions_catalog/aws_acm_describeCertificate
bundle: com.datadoghq.aws.acm
bundle_title: AWS Certificate Manager
description: 指定された ACM 証明書の詳細なメタデータを返します。
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
title: 証明書の記述
---

指定された ACM 証明書の詳細なメタデータを返します。

{{< workflows >}}