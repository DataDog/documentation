---
app_id: pinecone
categories:
- メトリクス
- data stores
- ai/ml
custom_kind: インテグレーション
description: 高性能 AI アプリケーションのためのクラウドベースのベクターデータベース。
further_reading:
- link: https://www.datadoghq.com/blog/ai-integrations/
  tag: blog
  text: 'インテグレーションのまとめ: AI スタックのモニタリング'
- link: https://docs.datadoghq.com/integrations/pinecone/
  tag: blog
  text: Pinecone
integration_version: 1.1.0
media:
- caption: Pinecone ポッド ベース ダッシュボード概要
  image_url: images/pinecone-dashboard.png
  media_type: image
- caption: Pinecone サーバーレス ダッシュボード概要
  image_url: images/pinecone-serverless-dashboard.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: Pinecone
---
## 概要

- **パフォーマンスを最適化し、使用量を制御**: Pinecone 内の特定アクション (例: リクエスト カウント) を監視して、レイテンシーや使用量が高いアプリケーション リクエストを特定します。トレンドを可視化し、リソース利用率を改善してコストを削減するためのインサイトを取得できます。

- **メトリクスで自動アラート**: インデックスの充填率がしきい値に達したときにアラートを受け取ります。また、特定のメトリクスやしきい値に対してカスタム モニターを作成することも可能です。

- **使用量やレイテンシーの突発的なスパイクを特定・トリアージ**: Datadog の Pinecone ダッシュボードで使用量やレイテンシーの異常を迅速に可視化。メトリクスを時系列で表示し、スパイクの傾向と重大度を把握します。

## 要件

Datadog で Pinecone を監視するための前提条件

- Enterprise または Enterprise Dedicated の Pinecone プラン
- ポッド ベースまたはサーバーレス インデックス: Datadog は両方のメトリクス取得をサポートします。

## セットアップ

### インストール

1. [Pinecone アカウント](https://app.pinecone.io/) にログインします。
1. **API Keys** タブに移動します。
1. API キーを作成します。
1. 作成した API キーをクリップボードにコピーします。

### 設定

1. Datadog の [Pinecone インテグレーション タイル](https://app.datadoghq.com/account/settings#integrations/pinecone) 内の Configuration タブへ移動します。
1. Pinecone コンソールのプロジェクト一覧に表示される Pinecone Project ID を入力します。
1. ポッド ベース環境のみ: 使用している環境を選択します。サーバーレス環境のプロジェクトは空欄のままで構いません。
1. コピーした API キーを貼り付けます。

## 収集されるデータ

### メトリクス

| **タイプ** | **説明** | **収集されるメトリクス プレフィックス** |
|------|-------------|-----------------------------|
| **アカウント 使用量** | インデックス内のポッド当たりレコード数を判定するためのメトリクス集 | `pinecone.vector` |
| **レイテンシー** | Pinecone データ プレーン コールのサーバー サイド レイテンシー メトリクス集 | `pinecone.request` |
| **Serverless** | タイプが `Serverless` として定義されたインデックスのメトリクス集 | `pinecone.db` |

| | |
| --- | --- |
| **pinecone.vector.count** <br>(gauge) | インデックス内の Pod あたりのレコード数。<br>_record として表示_ |
| **pinecone.request.count.total** <br>(count) | クライアントによって行われたデータ プレーン コール数。<br>_request として表示_ |
| **pinecone.request.error.count.total** <br>(count) | エラーとなったクライアントのデータ プレーン コール数。<br>_request として表示_ |
| **pinecone.request.latency.seconds.min** <br>(gauge) | Pinecone データ プレーン コールのサーバー サイド処理レイテンシー分布の最小値。<br>_second として表示_ |
| **pinecone.request.latency.seconds.max** <br>(gauge) | Pinecone データ プレーン コールのサーバー サイド処理レイテンシー分布の最大値。<br>_second として表示_ |
| **pinecone.request.latency.seconds.avg** <br>(gauge) | Pinecone データ プレーン コールのサーバー サイド処理レイテンシー分布の平均値。<br>_second として表示_ |
| **pinecone.request.latency.seconds.50percentile** <br>(gauge) | Pinecone データ プレーン コールのサーバー サイド処理レイテンシー分布の p50。<br>_second として表示_ |
| **pinecone.request.latency.seconds.90percentile** <br>(gauge) | Pinecone データ プレーン コールのサーバー サイド処理レイテンシー分布の p90。<br>_second として表示_ |
| **pinecone.request.latency.seconds.95percentile** <br>(gauge) | Pinecone データ プレーン コールのサーバー サイド処理レイテンシー分布の p95。<br>_second として表示_ |
| **pinecone.request.latency.seconds.99percentile** <br>(gauge) | Pinecone データ プレーン コールのサーバー サイド処理レイテンシー分布の p99。<br>_second として表示_ |
| **pinecone.request.latency.seconds.99.9percentile** <br>(gauge) | Pinecone データ プレーン コールのサーバー サイド処理レイテンシー分布の p99.9。<br>_second として表示_ |
| **pinecone.request.latency.seconds.count** <br>(count) | Pinecone データ プレーン コールのサーバー サイド処理レイテンシー分布のカウント。<br>_request として表示_ |
| **pinecone.index.fullness** <br>(gauge) | インデックスの充填率 (0〜1 のスケール)。<br>_unit として表示_ |
| **pinecone.db.op.query.total** <br>(count) | インデックス (サーバーレス) への Query リクエスト数。<br>_request として表示_ |
| **pinecone.db.op.fetch.total** <br>(count) | インデックス (サーバーレス) への Fetch リクエスト数。<br>_request として表示_ |
| **pinecone.db.op.update.total** <br>(count) | インデックス (サーバーレス) への Update リクエスト数。<br>_request として表示_ |
| **pinecone.db.op.delete.total** <br>(count) | インデックス (サーバーレス) への Delete リクエスト数。<br>_request として表示_ |
| **pinecone.db.op.upsert.total** <br>(count) | インデックス (サーバーレス) への Upsert リクエスト数。<br>_request として表示_ |
| **pinecone.db.op.query.duration.total** <br>(count) | インデックス (サーバーレス) の Query リクエスト処理に要した総時間。<br>_millisecond として表示_ |
| **pinecone.db.op.fetch.duration.total** <br>(count) | インデックス (サーバーレス) の Fetch リクエスト処理に要した総時間。<br>_millisecond として表示_ |
| **pinecone.db.op.update.duration.total** <br>(count) | インデックス (サーバーレス) の Update リクエスト処理に要した総時間。<br>_millisecond として表示_ |
| **pinecone.db.op.delete.duration.total** <br>(count) | インデックス (サーバーレス) の Delete リクエスト処理に要した総時間。<br>_millisecond として表示_ |
| **pinecone.db.op.upsert.duration.total** <br>(count) | インデックス (サーバーレス) の Upsert リクエスト処理に要した総時間。<br>_millisecond として表示_ |
| **pinecone.db.op.write.unit.total** <br>(count) | 消費された書き込みユニット合計 (サーバーレス)。<br>_request として表示_ |
| **pinecone.db.op.read.unit.total** <br>(count) | 消費された読み取りユニット合計 (サーバーレス)。<br>_request として表示_ |
| **pinecone.db.storage.size.bytes** <br>(gauge) | インデックスの合計サイズ (バイト、サーバーレス)。<br>_byte として表示_ |
| **pinecone.db.record.total** <br>(gauge) | レコード総数 (サーバーレス)。<br>_record として表示_ |
| **pinecone.db.op.list.duration.total** <br>(count) | インデックスの list リクエスト処理に要した総時間 (ミリ秒)。<br>_millisecond として表示_ |
| **pinecone.db.op.list.total** <br>(count) | インデックスへの list リクエスト数。<br>_request として表示_ |

### ログ

Pinecone には、収集ログは含まれません。

### サービス チェック

Pinecone には、サービスのチェック機能は含まれません。

### イベント

Pinecone には、イベントは含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。