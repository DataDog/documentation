---
"app_id": "convox"
"app_uuid": "4476973b-6e79-4861-a321-7e24e581873b"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": "metadata.csv"
      "prefix": "convox."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10006"
    "source_type_name": "Convox"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Convox"
  "sales_email": "help@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "configuration & deployment"
- "containers"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/convox/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "convox"
"integration_id": "convox"
"integration_title": "Convox"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "convox"
"public_title": "Convox"
"short_description": "Convox is an open-source PaaS designed for total privacy and zero upkeep."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Configuration & Deployment"
  - "Category::Containers"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Convox is an open-source PaaS designed for total privacy and zero upkeep."
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitor-aws-ecs-convox-integration/"
  "support": "README.md#Support"
  "title": "Convox"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Convox からリアルタイムにメトリクスを取得して、コンテナのパフォーマンスを視覚化します。

![Convox インテグレーションダッシュボードウィジェット][1]

## セットアップ

[Convox ドキュメント][2]を参照して、Datadog インテグレーションを設定してください。

### Datadog Agent のデプロイ

Datadog Agent は、`docker-compose.yml` マニフェストを使用することで、Convox アプリとしてデプロイすることができます。Rack の `InstanceCount` パラメーターと一致する `count` を使用します。

```shell
# リポジトリを確認
$ git clone https://github.com/convox-examples/datadog.git
$ cd dd-agent

# Agent アプリとシークレットをデプロイ
$ convox apps create
$ convox env set DD_API_KEY=<your api key>
$ convox deploy
$ convox scale agent --count=3 --cpu=10 --memory=128
```

`convox deploy` を実行して、Datadog Agent を ECS にデプロイします。

### オートスケーリング

Rack でオートスケーリングが有効になっている場合は、Rack のインスタンス数に合わせて Datadog Agent の数を動的にスケーリングする必要があります。

詳しくは、[Listening for ECS CloudWatch Events][3] チュートリアルをご覧ください。

## 収集データ

### メトリクス

Convox インテグレーションには、メトリクスは含まれません。

### イベント

Convox インテグレーションには、イベントは含まれません。

### サービスチェック

Convox インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

環境変数を `convox.yml` ファイルで構成する場合、`environment` パラメーターは `services` パラメーターと同じレベルで定義する必要があります。

![同じレベルで定義された Environment と Services のパラメーター][4]

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Convox と Datadog で AWS ECS プラットフォームを監視する][6]

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/convox/images/snapshot.png
[2]: https://docs.convox.com/integrations/monitoring/datadog
[3]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_cwet.html
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/convox/images/setting_environment_variables.png
[5]: https://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/monitor-aws-ecs-convox-integration/

