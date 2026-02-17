---
app_id: fabric
categories:
- オーケストレーション
custom_kind: インテグレーション
description: A Python library and command-line tool that simplifies SSH use for app
  deployment and system administration tasks.
media: []
title: Fabric
---
## 概要

**警告**: このインテグレーションは非推奨になりました。今後、積極的な開発は行われません。

Fabric を Datadog に接続すると、以下のことができます。

- イベントストリームでデプロイイベントをキャプチャおよび検索できます。
- デプロイイベントをダッシュボード上のメトリクスの変化と関連付けることができます。

## セットアップ

### 設定

1. dogapi パッケージをインストールします。

   ```shell
   sudo easy_install --upgrade dogapi
   ```

   または

   ```shell
   sudo pip install dogapi
   ```

1. dogapi をインポートし、API キーを設定します。

   ```python
   from dogapi.fab import setup, notify
   setup("<YOUR_DATADOG_API_KEY")
   ```

1. Datadog に接続する各タスクに notify デコレータを追加します。@notify は必ず @task のすぐ上に記述してください

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

### サービス チェック

Fabric インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。