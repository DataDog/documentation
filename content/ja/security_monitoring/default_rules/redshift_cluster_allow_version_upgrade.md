---
aliases:
  - /ja/4da-22a-46b
cloud: AWS
disable_edit: true
kind: ドキュメント
rule_category:
  - クラウドコンフィギュレーション
scope: redshift
security: コンプライアンス
source: redshift
title: Redshift クラスター Allow Version Upgrade
type: security_rules
---
## 概要

### 説明

`AllowVersionUpgrade` が有効になっていることを確認して、[Redshift クラスター][1]が自動的に最新バージョンにアップグレードできるようにします。

### 根拠

有効化により、最新バージョンが自動的にインストールされ、最新のバグ修正とセキュリティパッチがデプロイされます。

### 修復

1. `modify-cluster` を実行して、[クラスターの `allow-version-upgrade` を設定します][2]。

    {{< code-block lang="bash" filename="allow-version-upgrade.sh" >}}
    aws redshift modify-cluster
        --cluster-identifier cluster-id-name
        --allow-version-upgrade
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/modify-cluster.html