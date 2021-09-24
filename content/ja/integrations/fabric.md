---
categories:
  - orchestration
ddtype: crawler
dependencies: []
description: Datadog イベントストリームで Fabric タスクを参照および検索。
doc_link: https://docs.datadoghq.com/integrations/fabric/
draft: false
git_integration_title: fabric
has_logo: true
integration_id: fabric
integration_title: Fabric
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: fabric
public_title: Datadog-Fabric インテグレーション
short_description: Datadog イベントストリームで Fabric タスクを参照および検索。
version: '1.0'
---
## 概要

**警告**: このインテグレーションは非推奨になりました。今後、積極的な開発は行われません。

Fabric を Datadog に接続すると、以下のことができます。

- イベントストリームでデプロイイベントをキャプチャおよび検索できます。
- デプロイイベントをダッシュボード上のメトリクスの変化と関連付けることができます。

## セットアップ

### コンフィギュレーション

1. dogapi パッケージをインストールします。

    ```shell
    sudo easy_install --upgrade dogapi
    ```

    または

    ```shell
    sudo pip install dogapi
    ```

2. dogapi をインポートし、API キーを設定します。

    ```python
    from dogapi.fab import setup, notify
    setup("<YOUR_DATADOG_API_KEY")
    ```

3. Datadog に接続する各タスクに notify デコレータを追加します。@notify は必ず @task のすぐ上に記述してください

    ```python
    @notify
    @task
    def a_fabric_task(...):
        # do things
    ```

## 収集データ

### メトリクス

Fabric インテグレーションには、メトリクスは含まれません。

### イベント

Fabric インテグレーションには、イベントは含まれません。

### サービスのチェック

Fabric インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

[1]: https://docs.datadoghq.com/ja/help/