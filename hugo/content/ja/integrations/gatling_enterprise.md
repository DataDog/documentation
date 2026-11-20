---
app_id: gatling-enterprise
app_uuid: 019662ce-ced4-7e23-9738-bd4c09f38b64
assets:
  dashboards:
    Gatling Enterprise Overview: assets/dashboards/gatling_enterprise_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - gatling_enterprise.user.start_count
      metadata_path: metadata.csv
      prefix: gatling_enterprise
    process_signatures: []
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 45953787
    source_type_name: gatling-enterprise
    supports_ddr_coordinated_failover: false
author:
  homepage: https://gatling.io
  name: Gatling Corp
  sales_email: contact@gatling.io
  support_email: contact@gatling.io
  vendor_id: gatling-corp
categories:
- developer tools
- testing
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gatling_enterprise/README.md
display_on_public_website: true
draft: false
git_integration_title: gatling_enterprise
integration_id: gatling-enterprise
integration_title: Gatling Enterprise
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: gatling_enterprise
public_title: Gatling Enterprise
short_description: Gatling Enterprise から負荷テストのメトリクスを収集
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Testing
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Gatling Enterprise から負荷テストのメトリクスを収集
  media:
  - caption: Gatling Enterprise の概要ダッシュボード - 応答とリクエスト
    image_url: images/app.datadoghq.com_dashboard_n9p-inx-6jn_gatling-enterprise-overview_fromUser=false&refresh_mode=sliding&from_ts=1747402829806&to_ts=1747403729806&live=true
      (2) 1.png
    media_type: image
  - caption: Gatling Enterprise の概要ダッシュボード - 応答時間
    image_url: images/app.datadoghq.com_dashboard_n9p-inx-6jn_gatling-enterprise-overview_fromUser=false&refresh_mode=sliding&from_ts=1747402829806&to_ts=1747403729806&live=true
      (2) 1-1.png
    media_type: image
  - caption: Gatling Enterprise の概要ダッシュボード - ユーザー
    image_url: images/app.datadoghq.com_dashboard_n9p-inx-6jn_gatling-enterprise-overview_fromUser=false&refresh_mode=sliding&from_ts=1747402829806&to_ts=1747403729806&live=true
      (2) 1-2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Gatling Enterprise
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Gatling Enterprise は、実際のトラフィックに近い条件でアプリケーションのスケーラビリティとパフォーマンスを検証できるように設計された負荷テスト プラットフォームです。

Datadog とのインテグレーションにより、チームは応答時間、スループット、エラーなどの負荷テストのメトリクスを Datadog で追跡しているインフラ データと突き合わせ、パフォーマンス上の問題を詳しく調べられます。

Gatling Enterprise は Datadog にメトリクスを送信するため、エンジニアリング チームや SRE チームはパフォーマンスに関する知見を 1 か所に集約し、スケーラビリティと信頼性に関する意思決定の質を高められます。


## セットアップ

> **注**: このインテグレーションは Gatling Enterprise をご利用のお客様向けです。Gatling Enterprise の詳細や無料で始める方法については、[gatling.io/products][1] を参照してください。

1. Datadog で **Integrations** に移動し、Gatling Enterprise タイルを選択して **Install Integration** をクリックします。

2. Gatling のコントロール プレーン環境で、[設定ファイル][2] を編集します。`system-properties` セクションに、次のようにパラメータを追加します。YOUR_API_KEY は [Datadog API キー][3] に置き換え、組織に対応した正しい [Datadog サイト][4] を指定してください:

```bash
control-plane {
  locations = [
    {
      id = "prl_example"
      # ... このロケーション向けのその他の設定
      system-properties {
        "gatling.enterprise.dd.api.key" = "YOUR_API_KEY" # ここに API キーを入力
        "gatling.enterprise.dd.site" = "datadoghq.com"  # ご利用の Datadog サイトに置き換え
      }
    }
  ]
}
```

3. コントロール プレーンをデプロイし、再起動します。


## 収集データ

Gatling Enterprise インテグレーションは、データ ベース、ノード、シャードに関するすべてのメトリクスを収集します。


### メトリクス

このインテグレーションで提供されるメトリクスの一覧は [metadata.csv][5] を参照してください。

## アンインストール

1. Datadog で **Integrations** に移動し、Gatling Enterprise タイルを選択して **Uninstall Integration** をクリックします。

2. Gatling のコントロール プレーン環境で、[設定ファイル][6] を編集します。`system-properties` セクションから `gatling.enterprise.dd` を含む行を削除します。

3. コントロール プレーンをデプロイし、再起動します。

## サポート

サポートが必要な場合は、[Gatling Enterprise サポート][7] にお問い合わせください。



[1]: https://gatling.io/products
[2]: https://docs.gatling.io/reference/install/cloud/private-locations/introduction/
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[4]: https://docs.datadoghq.com/ja/getting_started/site/
[5]: https://github.com/DataDog/integrations-extras/blob/master/gatling_enterprise/metadata.csv
[6]: https://docs.gatling.io/reference/install/cloud/private-locations/introduction
[7]: https://gatlingcorp.atlassian.net/servicedesk/customer/portal/8