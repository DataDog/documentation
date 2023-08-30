---
aliases:
- /ja/workflows/actions_catalog/aws_acm_deleteCertificate
bundle: com.datadoghq.aws.acm
bundle_title: AWS Certificate Manager
description: 証明書とそれに関連する秘密キーを削除します。
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
title: 証明書の削除
---

証明書とそれに関連する秘密キーを削除します。

{{< workflows >}}