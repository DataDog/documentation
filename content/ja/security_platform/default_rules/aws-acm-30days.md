---
aliases:
  - /ja/mpg-nle-oki
  - /ja/security_monitoring/default_rules/mpg-nle-oki
  - /ja/security_monitoring/default_rules/aws-acm-30days
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: acm
security: コンプライアンス
source: acm
title: ACM 証明書は 30 日以内に期限が切れます
type: security_rules
---
## 説明

AWS Certificate Manager (ACM) により管理されている SSL/TLS 証明書を 30日 以内（期限が切れる前）に更新してください。

## 根拠

期限前に更新しない場合、証明書は無効になります。無効の証明書では、クライアントと AWS リソース間の通信の安全が確保されません。

## 修復

### コンソール

ACM により、証明書は自動的に更新（DNS 検証を使用している場合）または期限が近づくとメール通知が送信されます。詳しくは、[ACM 証明書のマネージド更新][1]ドキュメントを参照してください。

### CLI

1. 更新する [SSL/TLS 証明書の ARN][2] を使用して `import-certificate` を実行します。更新された SSL/TLS 証明書の ARN が返されます。

  {{< code-block lang="bash" filename="import-certificate.sh" >}}
    aws acm import-certificate
      --certificate-arn <value>
      --certificate <value>
      --private-key <value>
      --certificate-chain <value>
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/acm/import-certificate.html