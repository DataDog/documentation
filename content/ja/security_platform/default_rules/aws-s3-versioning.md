---
aliases:
  - /ja/rxi-7oi-e5x
  - /ja/security_monitoring/default_rules/rxi-7oi-e5x
  - /ja/security_monitoring/default_rules/aws-s3-versioning
cloud: AWS
disable_edit: true
integration_id: amazon-s3
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: s3
security: コンプライアンス
source: s3
title: S3 バケットでバージョン管理が有効になっています
type: security_rules
---
## 説明

S3 バケットでバージョン管理を有効にして、オブジェクトの複数のバージョンを 1 つのバケットに保持します。

## 根拠

バージョン管理が有効なバケットは、[誤って削除または上書きした場合にオブジェクトを回復する][1]のに役立ちます。

## 修復

### コンソール

AWS のドキュメント[バケットでのバージョン管理の有効化][2]に従って、S3 コンソール内でバケットのバージョン管理を有効にします。

### CLI

AWS のドキュメント[バケットでのバージョン管理の有効化][2]に従って、AWS CLI でバケットのバージョン管理を有効にします。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/manage-versioning-examples.html