---
aliases:
  - /ja/3h4-mr3-76y
  - /ja/security_monitoring/default_rules/3h4-mr3-76y
  - /ja/security_monitoring/default_rules/aws-es-vpc
cloud: AWS
disable_edit: true
integration_id: amazon-elasticsearch
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elasticsearch
security: コンプライアンス
source: elasticsearch
title: Elasticsearch ドメインは VPC にあります
type: security_rules
---
## 説明

Amazon Elasticsearch (ES) ドメインが AWS VPC からのみアクセス可能であることを確認します。

## 根拠

VPC を使用すると、Amazon ES ドメインのセキュリティを強化できます。VPC 内でクラスターを起動することで、クラスターと他の AWS サービス間のコミュニケーションがセキュアになります。

## 修復

公開エンドポイントでドメインが作成されたら、VPC アクセスに変更することはできません。新しいドメインの作成方法および手動でデータを再インデックス化または移行する方法については、[公開アクセスから VPC アクセスへの移行][1]ドキュメントを参照してください。

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-vpc.html#es-migrating-public-to-vpc