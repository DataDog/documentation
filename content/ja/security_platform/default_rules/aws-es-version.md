---
aliases:
  - /ja/b48-4xm-roq
  - /ja/security_monitoring/default_rules/b48-4xm-roq
  - /ja/security_monitoring/default_rules/aws-es-version
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elasticsearch
security: コンプライアンス
source: elasticsearch
title: Elasticsearch クラスターは最新のエンジンバージョンを使用しています
type: security_rules
---
## 説明

Amazon Elasticsearch (ES) エンジンの最新バージョンにアップグレードします。

## 根拠

Amazon ES の最新バージョンを使用することで、最新のバグ修正、セキュリティパッチ、および機能を享受できます。

## 修復

### コンソール

[ドメインを Elasticsearch の新しいバージョンにアップグレードする (コンソール)][1] ドキュメントに従って、アップグレード手順と AWS コンソールからのアップグレードを完了させる方法を確認してください。

### CLI

[ドメインを Elasticsearch の新しいバージョンにアップグレードする (コンソール)][1] ドキュメントに従って、AWS CLI を使用したアップグレードを適用します。

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-version-migration.html#starting-upgrades
[2]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-version-migration.html#starting-upgrades