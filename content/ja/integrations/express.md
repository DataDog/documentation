---
aliases:
  - /ja/integrations/expressjs/
categories:
  - web
ddtype: ライブラリ
dependencies: []
description: 全体的な応答時間と応答コード別のリクエスト率を監視
doc_link: 'https://docs.datadoghq.com/integrations/express/'
git_integration_title: express
has_logo: true
integration_title: ExpressJS
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: express
public_title: Datadog-ExpressJS インテグレーション
short_description: 全体的な応答時間と応答コード別のリクエスト率を監視
version: '1.0'
---
{{< img src="integrations/expressjs/expressjs_graph.png" alt="ExpressJS graph" responsive="true" popup="true">}}

## 概要

Datadog の [Connect-Datadog ミドルウェア][1]をアプリケーションに追加すると、以下のことができます。

* 応答時間に関するアラートを生成できます。
* 応答コードを監視できます。

## セットアップ
### コンフィグレーション

**注**: Express インテグレーションには Datadog Agent が必要です。

1. ミドルウェアをインストールします。
```
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
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://www.npmjs.com/package/connect-datadog
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/express/express_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}