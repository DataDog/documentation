---
app_id: redisenterprise
app_uuid: a353f8c5-240c-48f9-b2a1-c86d2da0c07e
assets:
  dashboards:
    Redis Enterprise Active/Active Statistics: assets/dashboards/redis_enterprise_active_active.json
    Redis Enterprise Cluster Overview: assets/dashboards/redisenterprise_cluster_top_view.json
    Redis Enterprise Database Overview: assets/dashboards/redisenterprise_overview.json
    Redis Enterprise Redis on Flash: assets/dashboards/redisenterprise_rof.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: redisenterprise.total_node_count
      metadata_path: metadata.csv
      prefix: redisenterprise.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10190
    source_type_name: Redis Enterprise
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Redis
  sales_email: github@mague.com
  support_email: github@mague.com
categories:
- data stores
- キャッシュ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/README.md
display_on_public_website: true
draft: false
git_integration_title: redisenterprise
integration_id: redisenterprise
integration_title: RedisEnterprise
integration_version: 1.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: redisenterprise
public_title: RedisEnterprise
short_description: Redis Enterprise 可視性
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Caching
  configuration: README.md#Setup
  description: Redis Enterprise 可視性
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: RedisEnterprise
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


![img][1]

## 概要

このインテグレーションにより、Datadog で [Redis Enterprise][2] を監視しメトリクスを取得できます。

### Redis Enterprise とは？

[Redis Enterprise][2] は、Redis のフルサポートエンタープライズ版です。Redis のオープンソースの主要機能セットに加え、Redis Enterprise ならアクティブなジオディストリビューション、マルチモデルデータベース機能、可視化の強化、そしてマルチテナンシー管理による稼働時間の増加が可能になります。

### Redis Enterprise Datadog ダッシュボード

Redis Enterprise Datadog インテグレーションで提供される、クラスターおよびデータベースのすべてに対するテンプレートビューを使用すると、他製品では不可能なオペレーションに関するインサイトを利用できます。使用パターンを把握し、データに裏付けされた成長プランを理解することで、情報に基づいた意思決定が可能になります。

#### データベースの概要
![overview][3]

#### クラスターの概要
![overview][4]

#### Redis on Flash
![rofdash][5]

#### アクティブ/アクティブ Redis
![rofdash][6]

#### Redis Enterprise のイベント
![イベント][7]

### プロバイダー

![プロバイダー][8]

このインテグレーションは、Redis Labs により提供されています。

## 計画と使用

### インフラストラクチャーリスト

Agent  v7.21 / v6.21 以降を使用している場合は、以下の手順に従って、ホストに RedisEnterprise チェックをインストールしてください。[v7.21 / v6.21 以前の Agent][10] または [Docker Agent][11] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][9]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][12]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-redisenterprise==<INTEGRATION_VERSION>
   ```
  最新版は、[Datadog インテグレーションリリースページ][13]で確認することができます

   **注**: I必要に応じて、インストールコマンドの先頭に `sudo -u dd-agent` を追加します。

3. [他のパッケージ化されたインテグレーション][14]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

[サンプルコンフィギュレーション][15]をコピーして必要なセクションを更新し、Redis Enterprise クラスターからデータを収集します

```yml
    ## @param host - 文字列 - 必須
    ## RedisEnterprise ホスト
    #
    host: myrediscluster.example.com

    ## @param port - 整数 - オプション - デフォルト: 9443
    #
    port: 9443

    ## @param user - 文字列 - 必須
    ## RedisEnterprise API ユーザー
    #
    username: redisadmin@example.com

    ## @param password - 文字列 - 必須
    ## RedisEnterprise API 資格情報
    #
    password: mySecretPassword
```

クラスターコンフィギュレーションに一致するその他の設定オプションについては、例の完全ファイルをご参照ください。

[ドキュメント][16]に従いユーザーを構成します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "redisenterprise" >}}


### ヘルプ

**`redisenterprise.running`**

チェックは次の内容を返します。

- RedisEnterprise クラスター API がコマンドに適切に応答している場合は `OK`
- API が適切に応答していない場合は `CRITICAL`

**`redisenterprise.license_check`**

チェックは次の内容を返します。

- クラスターライセンスが 1 週間以上有効な場合は `OK`。
- クラスターライセンスの期限が 7 日以内に切れる場合は `WARNING`。
- クラスターライセンスの期限が切れている場合は `CRITICAL`。

**注:** クラスターは、期限の切れたライセンスでも引き続き通常どおり動作しますが、この間はコンフィギュレーションを変更できません。更新するには、営業担当までお問い合わせください。

### ヘルプ

すべての [Redis Enterprise イベント][18]が収集されます。

## ヘルプ

[Redis フィールドエンジニアリングチーム][19]にお問い合わせください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/redis-enterprise.jpg
[2]: http://www.redislabs.com
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/dashboard.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/datadog_cluster_top_view.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/ROF_dashboard.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/active_active_dashboard.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/events.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/logo-redis.png
[9]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/?tab=agentv721v621
[10]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/?tab=agentearlierversions
[11]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/?tab=docker
[12]: https://app.datadoghq.com/account/settings/agent/latest
[13]: https://github.com/DataDog/integrations-extras/tags
[14]: https://docs.datadoghq.com/ja/getting_started/integrations/
[15]: https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/datadog_checks/redisenterprise/data/conf.yaml.example
[16]: https://docs.redislabs.com/latest/rc/security/database-security/passwords-users-roles/
[17]: https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/metadata.csv
[18]: https://docs.redislabs.com/latest/rs/administering/monitoring-metrics/#cluster-alerts
[19]: mailto:redis.observability@redis.com?subject=Datadog%20Integration%20Support