---
"assets":
  "configuration":
    "spec": assets/configuration/spec.yaml
  "dashboards":
    "Redis Enterprise Cluster Overview": assets/dashboards/redisenterprise_cluster_top_view.json
    "Redis Enterprise Database Overview": assets/dashboards/redisenterprise_overview.json
    "Redis Enterprise Redis on Flash": assets/dashboards/redisenterprise_rof.json
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- data store
- キャッシュ
"creates_events": true
"ddtype": "check"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/README.md"
"display_name": "Redis Enterprise"
"draft": false
"git_integration_title": "redisenterprise"
"guid": "727dcbe6-9ed6-409f-ad72-265939b90da8"
"integration_id": "redisenterprise"
"integration_title": "RedisEnterprise"
"is_public": true
"kind": "integration"
"maintainer": "github@mague.com"
"manifest_version": "1.0.0"
"metric_prefix": "redisenterprise."
"metric_to_check": "redisenterprise.total_node_count"
"name": "redisenterprise"
"public_title": "RedisEnterprise Integration"
"short_description": "Redis Enterprise 可視性"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



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

#### Redis Enterprise のイベント
![events][6]


### プロバイダー

![dashboard][7]

このインテグレーションは、Redis Labs により提供されています。



## セットアップ

[サンプルコンフィギュレーション][8]をコピーして必要なセクションを更新し、Redis Enterprise クラスターからデータを収集します

```yml
    ## @param host - 文字列 - 必須
    ## RedisEnterprise ホスト
    #
    host: myrediscluster.example.com

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

[文書][9]に従いユーザーを構成します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "redisenterprise" >}}
およびそれぞれの説明。

### サービスのチェック

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


### イベント

すべての [Redis Enterprise イベント][11]が収集されます。

## トラブルシューティング

[Redis Enterprise サポートチーム][12]にお問い合わせください


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/redis-enterprise.jpg
[2]: http://www.redislabs.com
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/dashboard.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/datadog_cluster_top_view.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/ROF_dashboard.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/events.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/redislabs-logo.png
[8]: https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/datadog_checks/redisenterprise/data/conf.yaml.example
[9]: https://docs.redislabs.com/latest/rc/security/database-security/passwords-users-roles/
[10]: https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/metadata.csv
[11]: https://docs.redislabs.com/latest/rs/administering/monitoring-metrics/#cluster-alerts
[12]: https://redislabs.com/deployment/support/

