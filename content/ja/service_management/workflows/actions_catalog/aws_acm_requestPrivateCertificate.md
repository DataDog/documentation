---
aliases:
- /ja/workflows/actions_catalog/aws_acm_requestPrivateCertificate
bundle: com.datadoghq.aws.acm
bundle_title: AWS Certificate Manager
description: 他の AWS サービスで使用するための非公開証明書をリクエストします。
icon:
  integration_id: amazon-certificate-manager
  type: integration_logo
input: '#/$defs/RequestPrivateCertificateInputs'
inputFieldOrder:
- region
- domainName
- certificateAuthorityARN
- additionalDomainNames
- タグ
output: '#/$defs/RequestCertificateOutputs'
source: amazon-certificate-manager
title: 非公開証明書のリクエスト
---

他の AWS サービスで使用するための非公開証明書をリクエストします。

{{< workflows >}}