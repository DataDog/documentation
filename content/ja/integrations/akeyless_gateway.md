---
app_id: akeyless-gateway
app_uuid: a71a3b29-5921-4bc9-8a7e-38de5a940ad8
assets:
  dashboards:
    akeyless_gateway_dashboard: assets/dashboards/akeyless_gateway_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - akeyless.gw.system.cpu
      - akeyless.gw.system.disk
      - akeyless.gw.system.load
      - akeyless.gw.system.memory
      - akeyless.gw.system.network
      - akeyless.gw.quota.current_transactions_number
      - akeyless.gw.quota.gw_admin_client_transactions
      - akeyless.gw.quota.total_transactions_limit
      - akeyless.gw.system.http_response_status_code
      - akeyless.gw.system.request_count
      metadata_path: metadata.csv
      prefix: akeyless
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10426
    source_type_name: Akeyless Gateway
author:
  homepage: https://www.akeyless.io
  name: Akeyless Security
  sales_email: sales@akeyless.io
  support_email: support@akeyless.io
categories:
- セキュリティ
- kubernetes
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/akeyless_gateway/README.md
display_on_public_website: true
draft: false
git_integration_title: akeyless_gateway
integration_id: akeyless-gateway
integration_title: Akeyless Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akeyless_gateway
public_title: Akeyless Gateway
short_description: Akeyless Gateway のキーメトリクスを追跡します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Security
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Akeyless Gateway のキーメトリクスを追跡します。
  media:
  - caption: Akeyless Gateway メトリクスダッシュボード
    image_url: images/AKs-Graphs-Light.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Akeyless Gateway
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Akeyless Platform は、資格情報、証明書、暗号化キーの保存、保護、ローテーション、および動的な作成を可能にする統合シークレット管理システムです。当社のプラットフォームは、静的および動的な資格情報の管理、証明書の自動化、暗号化と電子署名、社内リソースへのリモートアクセスを保護するゼロトラストアプリケーションアクセスなど、複数のユースケースをサポートしています。

このインテグレーションにより、[Akeyless Gateway][1] のパフォーマンスを視覚化し、監視することができます。テレメトリーメトリクスはアプリケーションとランタイム環境から取得されます。

## 計画と使用

Akeyless は、プライベートネットワークとクラウドの間に保護レベルを追加する独自のゲートウェイを提供します。当社のコアサービスの SaaS 拡張機能として機能するステートレスゲートウェイは、すぐに使える堅牢なメカニズムで透過的な内部運用を可能にし、お客様の内部リソースと連携するためにネットワークインフラストラクチャーを変更することなく、サービスの継続と復旧を保証します。

Datadog とのインテグレーションを構成して重要な Akeyless Gateway メトリクスを表示するには、ゲートウェイのデプロイメントに使用している (または使用していた) 方法に応じて、以下の手順に従ってください。

### 前提条件
- 稼動しているか、初めてデプロイされている Akeyless Gateway

### 構成

このインテグレーションは、1 つのゲートウェイまたは同じ API キーを使用する複数のインスタンスで動作します。メトリクスは **Akeyless GW** ダッシュボードの `host` または `instance` ごとに表示できます。

#### Kubernetes 上で動作するゲートウェイの場合

[K8s 上で動作するゲートウェイ][2]で Akeyless Gateway インテグレーションを構成するには

1. Kubernetes 上にゲートウェイをデプロイするために使用する `values.yaml` ファイルの `metrics` セクションの下に、以下の構成を追加します。Datadog サーバーの関連する API キーと、`app.datadoghq.com` のような関連する [Datadog サイト][3]を設定します。

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

[スタンドアロンゲートウェイ][4]で Akeyless Gateway インテグレーションを構成するには

1. 以下の構成で、`otel-config.yaml` というローカルファイルを作成します。Datadog サーバーの関連する API キーと、`app.datadoghq.com` などの関連する [Datadog サイト][3]を設定します。

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

ゲートウェイのセットアップに成功したら、Datadog サイトの[メトリクスエクスプローラー][5]にアクセスし、サマリーページで Akeyless メトリクスをフィルタリングします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "akeyless_gateway" >}}


### ヘルプ

Akeyless Gateway インテグレーションには、サービスのチェック機能は含まれません。

### ヘルプ

Akeyless Gateway インテグレーションには、イベントは含まれません。

## Agent

ご不明な点は、[Akeyless のサポートチーム][7]までお問い合わせください。


[1]: https://docs.akeyless.io/docs/api-gw
[2]: https://docs.akeyless.io/docs/gateway-k8s
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://docs.akeyless.io/docs/install-and-configure-the-gateway
[5]: https://app.datadoghq.com/metric/explorer
[6]: https://github.com/DataDog/integrations-extras/blob/master/akeyless_gateway/metadata.csv
[7]: mailto:support@akeyless.io