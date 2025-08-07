---
app_id: bonsai
categories:
- モニター
custom_kind: インテグレーション
description: 'Bonsai: マネージド型 Elasticsearch'
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
title: Bonsai
---
## 概要

Bonsai クラスターのリクエストレベルのメトリクスを追跡すると、以下のことができます。

- クラスターのパフォーマンスを視覚化できます。
- 検索のパフォーマンスをアプリケーションのパフォーマンスと関連付けることができます。
- アラートを生成できます。

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/snapshot.png)

## セットアップ

クラスターを Datadog と統合するには、API キーを bonsai アプリに送信する必要があります。

### API キーを取得する

In Datadog, navigate to [Integrations --> API](https://app.datadoghq.com/organization-settings/api-keys) and copy your API Key.

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/copy_key.png)

### API キーを送信する

Navigate to [Bonsai --> Clusters](https://app.bonsai.io/clusters) and click the cluster you want to integrate. Navigate to the Manage tab and scroll to the bottom of the page.

"Datadog Integration" セクションで API キーを貼り付け、"Activate Datadog" をクリックします。

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/activate_datadog.png)

### 検証する

キーが有効であれば、インテグレーションが Active として表示されます。

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/datadog_activated.png)

数分以内に、Datadog のダッシュボードでリクエストメトリクスを使用できるようになります。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **bonsai.req.2xx** <br>(gauge) | Number of requests with a 2xx (successful) response code<br>_Shown as request_ |
| **bonsai.req.4xx** <br>(gauge) | Number of requests with a 4xx (client error) response code<br>_Shown as request_ |
| **bonsai.req.5xx** <br>(gauge) | Number of requests with a 5xx (server error) response code<br>_Shown as request_ |
| **bonsai.req.max_concurrency** <br>(gauge) | Peak concurrent requests<br>_Shown as connection_ |
| **bonsai.req.p50** <br>(gauge) | The median request duration<br>_Shown as minute_ |
| **bonsai.req.p95** <br>(gauge) | The 95th percentile request duration<br>_Shown as minute_ |
| **bonsai.req.p99** <br>(gauge) | The 99th percentile request duration<br>_Shown as minute_ |
| **bonsai.req.queue_depth** <br>(gauge) | Peak queue depth (how many requests are waiting due to concurrency limits)<br>_Shown as connection_ |
| **bonsai.req.reads** <br>(gauge) | The number of requests which read data<br>_Shown as request_ |
| **bonsai.req.rx_bytes** <br>(gauge) | The number of bytes sent to elasticsearch<br>_Shown as byte_ |
| **bonsai.req.total** <br>(gauge) | The total number of requests<br>_Shown as request_ |
| **bonsai.req.tx_bytes** <br>(gauge) | The number of bytes sent to client<br>_Shown as byte_ |
| **bonsai.req.writes** <br>(gauge) | The total number of writes<br>_Shown as request_ |

メトリクスはクラスターごとにタグ付けされるため、クラスターに基づいて分割できます。タグは次のようになります。

```text
cluster:my-cluster-slug
```

### イベント

Bonsai インテグレーションには、イベントは含まれません。

### サービス チェック

Bonsai インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

サポートが必要な場合は [Datadog サポート](https://docs.datadoghq.com/help/)にお問い合わせください。