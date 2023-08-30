---
aliases:
- /ja/workflows/actions_catalog/aws_acm_listCertificates
bundle: com.datadoghq.aws.acm
bundle_title: AWS Certificate Manager
description: 証明書の ARN とドメイン名の一覧を取得します。
icon:
  integration_id: amazon-certificate-manager
  type: integration_logo
input: '#/$defs/ListCertificatesInputs'
inputFieldOrder:
- region
- certificateStatuses
- limit
keywords:
- すべて
- list
output: '#/$defs/ListCertificatesOutputs'
source: amazon-certificate-manager
title: 証明書の一覧化
---

証明書の ARN とドメイン名の一覧を取得します。

{{< workflows >}}