---
categories:
- cloud
- kubernetes
- google cloud
- ログの収集
dependencies: []
description: GKE リソースの使用状況を監視します。
doc_link: https://docs.datadoghq.com/integrations/google_kubernetes_engine/
draft: false
git_integration_title: google_kubernetes_engine
has_logo: true
integration_id: google-kubernetes-engine
integration_title: Google Kubernetes Engine
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: google_kubernetes_engine
public_title: Datadog-Google Kubernetes Engine インテグレーション
short_description: GKE リソースの使用状況を監視します。
version: '1.0'
---

## 概要

Google Kubernetes Engine (GKE)  は、Docker コンテナを実行するための強力なクラスターマネージャーおよびオーケストレーションシステムです。

Google Kubernetes Engine からメトリクスを取得して、以下のことができます。

- GKE コンテナおよび GKE コントロールプレーンのパフォーマンスを可視化する。
- GKE コンテナとアプリケーションのパフォーマンスを関連付ける。

このインテグレーションには、2 つの独立したプリセットダッシュボードが付属しています。

- 標準の GKE ダッシュボードには、Google インテグレーションから収集した GKE と GKE コントロールプレーンのメトリクスが表示されます。
- 拡張 GKE ダッシュボードには、Datadog の Agent ベースの Kubernetes インテグレーションからのメトリクスと、Google インテグレーションから収集した GKE コントロールプレーンメトリクスが表示されます。

標準のダッシュボードは、簡単なコンフィギュレーションで GKE での観測が可能です。拡張ダッシュボードは、追加のコンフィギュレーション手順が必要ですが、よりリアルタイムの Kubernetes メトリクスを提供し、本番でワークロードを監視するためのダッシュボードをクローンしてカスタマイズする際に、しばしばより良い場所から始めることができます。

セルフホスティングの Kubernetes クラスターとは異なり、GKE コントロールプレーンは Google によって管理され、クラスターで動作する Datadog Agent からはアクセスできません。そのため、クラスターの監視に Datadog Agent を主に使用している場合でも、GKE コントロールプレーンへの観測可能性は Google とのインテグレーションを必要とします。

## セットアップ

### メトリクスの収集

#### インストール

まだの方は、まず[Google Cloud Platform とのインテグレーション][1]を設定してください。標準のメトリクスとプリセットダッシュボードについては、他のインストール手順はありません。

拡張ダッシュボードを表示し、APM トレース、ロギング、プロファイリング、セキュリティ、およびその他の Datadog サービスを有効にするには、[GKE クラスターに Datadog Agent をインストールします][2]。


### ログの収集

Google Kubernetes Engine のログは Google Cloud Logging により収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。[HTTP プッシュフォワーダーを使用した Cloud Pub/Sub][3] をまだセットアップしていない場合は、これをセットアップしてください。

これが完了したら、Google Kubernetes Engine のログを Google Cloud Logging から Pub/Sub へエクスポートします。

1. [GCP Logs Explorer ページ][4]にアクセスし、Kubernetes と GKE のログをフィルタリングします。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_kubernetes_engine" >}}


### イベント

Google Kubernetes Engine インテグレーションには、イベントは含まれません。

### サービスのチェック

Google Kubernetes Engine インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/gke/?tab=standard
[3]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[4]: https://console.cloud.google.com/logs/viewer
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/google_kubernetes_engine/google_kubernetes_engine_metadata.csv
[6]: https://docs.datadoghq.com/ja/help/