---
app_id: coreweave
app_uuid: 74da15c6-f6f3-4d03-b44e-9e126e5da9e7
assets:
  dashboards:
    coreweave: assets/dashboards/coreweave_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - coreweave.kube_pod_status_phase
      metadata_path: metadata.csv
      prefix: coreweave.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10368
    source_type_name: coreweave
  monitors:
    Container CPU load is high: assets/monitors/coreweave_high_cpu.json
    Container memory usage is high: assets/monitors/coreweave_high_mem.json
    Hourly billing cost is increasing: assets/monitors/coreweave_billing.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- メトリクス
- ai/ml
- kubernetes
- プロビジョニング
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: coreweave
integration_id: coreweave
integration_title: CoreWeave
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: coreweave
public_title: CoreWeave
short_description: Coreweave から prometheus メトリクスを収集
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::AI/ML
  - Category::Kubernetes
  - Category::Provisioning
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Coreweave から prometheus メトリクスを収集
  media:
  - caption: CoreWeave ダッシュボード概要
    image_url: images/coreweave_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: CoreWeave
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

CoreWeave インテグレーションにより、Datadog は CoreWeave の Prometheus メトリクスをスクレイピングし、Prometheus が提供するタグ (ポッド、コンテナ、ネームスペースなど) を含むタグを完全に補完してインポートすることができます。

Datadog を通じて利用パターンを追跡し、組織による CoreWeave クラウドプラットフォームの利用状況の理解を深め、最適化します。

また、このインテグレーションは、組織がどのように請求されているかを視覚化し、CoreWeave Cloud 内のどこから費用が発生しているかを特定します。請求の異常を検出し、異常が発生した場合にアラートを受け取ることで、チームは変化に迅速に対処し、どのポッドやネームスペースに最も費用がかかっているかを判断できます。

## セットアップ

**ステップ 1: CoreWeave のアクセストークンを取得する**

まずは、[CoreWeave アクセストークンを取得][1]します。トークンの生成、閲覧、削除ができるのは組織管理者のみです。

以下の手順に従って、CoreWeave アカウントにインテグレーションを追加し、ベアラートークンを作成します。

1. CoreWeave の[アクセストークン][1]ページにアクセスし、**Create a New Token** をクリックします。
2. **トークン名**を入力します。できれば Datadog に固有の名前を入力します。
3. トークンを **Available Namespaces** から **Selected Namespaces** に移動して、トークンに**ネームスペース**を割り当てます。Datadog は、CoreWeave インテグレーションを使用する場合、1 つのネームスペースに 1 つのアクセストークンを推奨します。
4. **Generate** をクリックします。

ステップ 2 でこのアクセストークンが必要になります。

**ステップ 2: CoreWeave アカウントを Datadog に接続する**

まず、ステップ 1 のアクセストークンキーをコピーします。

1. [CoreWeave インテグレーションタイル][2]に移動します。
1. アカウントの **Name** を入力します。
2. CoreWeave アカウントの**アクセストークンキー**をアクセストークンフィールドに貼り付けます。
3. オプションで、これらのログに**タグ**を定義することができます。
4. その後、**Save** をクリックします。

### 検証

1. `coreweave.` というプレフィックスを持つメトリクスを確認します。このメトリクスが存在すれば、インテグレーションは機能しています。

## 収集データ

### メトリクス
{{< get-metrics-from-git "coreweave" >}}


### サービスチェック

coreweave には、サービスのチェック機能は含まれません。

### イベント

coreweave には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。


[1]: https://cloud.coreweave.com/tokens/api-access
[2]: https://app.datadoghq.com/integrations/coreweave
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/coreweave/metadata.csv
[4]: https://docs.datadoghq.com/ja/help/