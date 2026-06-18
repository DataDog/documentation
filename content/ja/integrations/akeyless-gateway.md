---
aliases:
- /ja/integrations/akeyless_gateway
app_id: akeyless-gateway
categories:
- security
- kubernetes
custom_kind: integration
description: Akeyless Gateway のキーメトリクスを追跡します。
integration_version: 1.0.0
media:
- caption: Akeyless Gateway メトリクスダッシュボード
  image_url: images/AKs-Graphs-Light.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: Akeyless Gateway
---
## 概要

Akeyless Platform は、資格情報、証明書、暗号化キーの保存、保護、ローテーション、および動的な作成を可能にする統合シークレット管理システムです。当社のプラットフォームは、静的および動的な資格情報の管理、証明書の自動化、暗号化と電子署名、社内リソースへのリモートアクセスを保護するゼロトラストアプリケーションアクセスなど、複数のユースケースをサポートしています。

このインテグレーションを使うと、[Akeyless Gateway](https://docs.akeyless.io/docs/api-gw) のパフォーマンスを可視化して監視できます。Telemetry メトリクスは、アプリケーション本体とランタイム環境の両方から取得されます。

## セットアップ

Akeyless は、プライベートネットワークとクラウドの間に保護レベルを追加する独自のゲートウェイを提供します。当社のコアサービスの SaaS 拡張機能として機能するステートレスゲートウェイは、すぐに使える堅牢なメカニズムで透過的な内部運用を可能にし、お客様の内部リソースと連携するためにネットワークインフラストラクチャーを変更することなく、サービスの継続と復旧を保証します。

Datadog とのインテグレーションを構成して重要な Akeyless Gateway メトリクスを表示するには、ゲートウェイのデプロイメントに使用している (または使用していた) 方法に応じて、以下の手順に従ってください。

### 前提条件

- 稼動しているか、初めてデプロイされている Akeyless Gateway

### 構成

このインテグレーションは、1 つのゲートウェイまたは同じ API キーを使用する複数のインスタンスで動作します。メトリクスは **Akeyless GW** ダッシュボードの `host` または `instance` ごとに表示できます。

#### Kubernetes 上で動作するゲートウェイの場合

[K8s 上で動作する Gateway](https://docs.akeyless.io/docs/gateway-k8s) に対して Akeyless Gateway インテグレーションを設定するには:

1. Kubernetes 上に Gateway をデプロイする際に使用する `values.yaml` ファイルの `metrics` セクションに、次の設定を追加します。Datadog サーバーの API Key と、`app.datadoghq.com` のような適切な [Datadog site](https://docs.datadoghq.com/getting_started/site/) を設定してください。

```
metrics:
  enabled: true  
  config: |
    exporters:    
      datadog:
        api:
          key: "<Your Datadog API key>"
          site: <Your Datadog server site>         
    service:
      pipelines:
        metrics:
          exporters: [datadog]
```

2. まだゲートウェイをデプロイしていない場合は、通常どおりインストールを続行し、デプロイの準備ができたら次のコマンドを実行します。

```
helm install <your-gateway-name> akeyless/akeyless-api-gateway -f values.yaml
```

3. Kubernetes 上の既存のゲートウェイを更新する場合は、以下のコマンドを実行して更新します。

```
helm upgrade <your-gateway-name> akeyless/akeyless-api-gateway -f values.yaml
```

#### Docker 上で動作するスタンドアロンゲートウェイの場合

[スタンドアロン Gateway](https://docs.akeyless.io/docs/install-and-configure-the-gateway) に対して Akeyless Gateway インテグレーションを設定するには:

1. `otel-config.yaml` というローカル ファイルを作成し、次の設定を追加します。Datadog サーバーの API Key と、`app.datadoghq.com` のような適切な [Datadog site](https://docs.datadoghq.com/getting_started/site/) を設定してください。

```
exporters:
  datadog:
    api:
      key: "<Your Datadog API key>"
      site: <Your Datadog server site>
service:
  pipelines:
    metrics:
      exporters: [datadog]
```

2. まだゲートウェイをデプロイしていない場合は、以下のコマンドを実行して `ENABLE_METRICS=true` 変数を指定して Akeyless Gateway をスピンアップし、`otel-config.yaml` ファイルをマウントします。

```
docker run -d -p 8000:8000 -p 8200:8200 -p 18888:18888 -p 8080:8080 -p 8081:8081 -p 5696:5696 -e ENABLE_METRICS="true" -v $PWD/otel-config.yaml:/akeyless/otel-config.yaml --name <your-gateway-name> akeyless/base:latest-akeyless
```

3. 既存のゲートウェイを更新している場合、以前に削除した Docker インスタンスから最新の設定とデータを取得するために、更新したゲートウェイに同じ `Admin Access ID` と `Cluster Name` を使用します。

```
docker run -d -p 8000:8000 -p 8200:8200 -p 18888:18888 -p 8080:8080 -p 8081:8081 -p 5696:5696 -e ADMIN_ACCESS_ID="p-xxxxxx" -e ADMIN_ACCESS_KEY="62Hu...xxx....qlg=" -e ENABLE_METRICS="true" -v $PWD/otel-config.yaml:/akeyless/otel-config.yaml --name <your-gateway-name> akeyless/base:latest-akeyless
```

### 検証

Gateway のセットアップが正常に完了したら、Datadog site の [Metrics Explorer](https://app.datadoghq.com/metric/explorer) を開き、Summary ページで Akeyless のメトリクスを絞り込んで確認します。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **akeyless.gw.system.cpu** <br>(gauge) | CPU 使用率メトリクス。|
| **akeyless.gw.system.disk** <br>(gauge) | ディスク I/O メトリクス。|
| **akeyless.gw.system.load** <br>(gauge) | CPU load メトリクス。|
| **akeyless.gw.system.memory** <br>(gauge) | メモリ使用率メトリクス。|
| **akeyless.gw.system.network** <br>(gauge) | ネットワーク インターフェイスの I/O メトリクスと TCP 接続メトリクス。|
| **akeyless.gw.quota.current_transactions_number** <br>(gauge) | 現在のトランザクション数。|
| **akeyless.gw.quota.gw_admin_client_transactions** <br>(gauge) | 管理クライアントによる総トランザクション数。|
| **akeyless.gw.quota.total_transactions_limit** <br>(gauge) | 1 時間あたりの総トランザクション上限。|
| **akeyless.gw.system.http_response_status_code** <br>(gauge) | HTTP レスポンスのステータス。|
| **akeyless.gw.system.request_count** <br>(gauge) | 総リクエスト数。|
| **akeyless.gw.system.healthcheck.status** <br>(gauge) | コンテナの health check ステータスを監視します。|

### サービス チェック

Akeyless Gateway インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Akeyless Gateway インテグレーションには、イベントは含まれません。

## サポート

サポートが必要な場合は、[Akeyless Support](mailto:support@akeyless.io) にお問い合わせください。