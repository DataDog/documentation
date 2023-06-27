---
aliases:
- /ja/workflows/actions_catalog/aws_acm_requestPublicCertificate
bundle: com.datadoghq.aws.acm
bundle_title: AWS Certificate Manager
description: 他の AWS サービスで使用するための公開証明書を DNS 検証でリクエストします。
icon:
  integration_id: amazon-certificate-manager
  type: integration_logo
input: '#/$defs/RequestPublicCertificateInputs'
inputFieldOrder:
- region
- domainName
- additionalDomainNames
- タグ
output: '#/$defs/RequestCertificateOutputs'
source: amazon-certificate-manager
title: 公開証明書のリクエスト
---

他の AWS サービスで使用するための公開証明書を DNS 検証でリクエストします。

{{< workflows >}}