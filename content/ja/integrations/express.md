---
aliases:
  - /ja/integrations/expressjs/
categories:
  - web
ddtype: ライブラリ
dependencies: []
description: 全体的な応答時間と応答コード別のリクエスト率を監視。
doc_link: https://docs.datadoghq.com/integrations/express/
draft: false
git_integration_title: express
has_logo: true
integration_id: express
integration_title: ExpressJS
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: express
public_title: Datadog-ExpressJS インテグレーション
short_description: 全体的な応答時間と応答コード別のリクエスト率を監視。
version: '1.0'
---
{{< img src="integrations/expressjs/expressjs_graph.png" alt="ExpressJS のグラフ" popup="true">}}

## 概要

Datadog の [Connect-Datadog ミドルウェア][1]をアプリケーションに追加すると、以下のことができます。

- 応答時間に関するアラートを生成できます。
- 応答コードを監視できます。

## セットアップ

Express インテグレーションは、収集したメトリクス Datadog に転送するのに Datadog Agent DogStatsD サーバーを必要とします。

[ホストに Agent をインストールしたら][2]、[DogStatsD セットアップドキュメント][3]を参照して有効にしてください。

### コンフィギュレーション

1. ミドルウェアをインストールします。

    ```shell
    npm install connect-datadog
    ```

2. コードを変更して Datadog ミドルウェアを追加します。

    ```js
    var dd_options = {
      'response_code':true,
      'tags': ['app:my_app']
    }

    var connect_datadog = require('connect-datadog')(dd_options);

    // Add your other middlewares
    app.use(...);

    // Add the datadog-middleware before your router
    app.use(connect_datadog);
    app.use(router);
    ```

## 収集データ

### メトリクス
{{< get-metrics-from-git "express" >}}


### イベント

Express インテグレーションには、イベントは含まれません。

### サービスのチェック

Express インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://www.npmjs.com/package/connect-datadog
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=hostagent#setup
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/express/express_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/