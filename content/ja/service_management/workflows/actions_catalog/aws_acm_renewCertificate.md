---
aliases:
- /ja/workflows/actions_catalog/aws_acm_renewCertificate
bundle: com.datadoghq.aws.acm
bundle_title: AWS Certificate Manager
description: 対象となる証明書を更新します。
icon:
  integration_id: amazon-certificate-manager
  type: integration_logo
input: '#/$defs/GenericCertificateInputs'
inputFieldOrder:
- region
- certificateARN
output: '#/$defs/DeleteRenewCertificateOutputs'
source: amazon-certificate-manager
title: 証明書の更新
---

対象となる証明書を更新します。

{{< workflows >}}