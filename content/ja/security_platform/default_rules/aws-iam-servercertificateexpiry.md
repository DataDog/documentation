---
aliases:
  - /ja/qrd-odv-n89
  - /ja/security_monitoring/default_rules/qrd-odv-n89
  - /ja/security_monitoring/default_rules/aws-iam-servercertificateexpiry
cloud: AWS
disable_edit: true
integration_id: amazon-iam
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: iam
security: コンプライアンス
source: iam
title: IAM サーバー証明書は 30 日以内に期限切れになります
type: security_rules
---
## 説明

IAM サービスの SSL/TLS 証明書を、有効期間が終了する 30 日前に確実に更新してください。

## 根拠

証明書が無効になると、クライアントと証明書を実装する AWS リソース間の通信は安全ではなくなります。

## 修復

### コンソール

AWS のドキュメント [ACM 証明書の管理された更新][1] に従って、検証タイプ (DNS、メール、またはプライベート PKI) ごとに更新を設定します。

### CLI

AWS のドキュメント [ACM 証明書の管理された更新][1] に従って、検証タイプ (DNS、メール、またはプライベート PKI) ごとに更新を設定します。

[1]: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html