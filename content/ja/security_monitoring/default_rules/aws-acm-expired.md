---
aliases:
  - /ja/2g5-b7o-dqd
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: acm
security: コンプライアンス
source: acm
title: ACM 証明書は有効です
type: security_rules
---
## 説明

AWS Certificate Manager (ACM) で、期限の切れた Secure Socket Layer/Transport Layer Security (SSL/TLS) 証明書を削除します。

## 根拠

他のリソースにデプロイされた期限切れの AWS ACM SSL/TLS 証明書は、フロントエンドエラーを引き起こし、Web アプリケーションの信頼性を損なうリスクをはらみます。

## 修復

### コンソール

AWS コンソールで SSL/TLS 証明書を削除する方法については、[ACM の管理する証明書を削除][1] に関するドキュメントを参照してください。

### CLI

1. [証明書 ARN][2]で `delete-certificate` を実行します。

    {{< code-block lang="bash" filename="delete-certificate.sh" >}}
    aws acm delete-certificate
        --certificate-arn arn:aws:acm:region:123456789012:certificate/12345678-1234-1234-1234-123456789012
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-delete.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/acm/delete-certificate.html