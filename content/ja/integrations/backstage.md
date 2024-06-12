---
app_id: backstage
app_uuid: 2b89148d-0938-46fc-a9dc-fd8a45e583a9
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: backstage.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10281
    source_type_name: backstage
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Roadie
  sales_email: oss@roadie.io
  support_email: oss@roadie.io
categories:
- developer tools
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/backstage/README.md
display_on_public_website: true
draft: false
git_integration_title: backstage
integration_id: backstage
integration_title: Backstage
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: backstage
public_title: Backstage
short_description: Datadog のダッシュボードとグラフを Backstage インスタンスに埋め込むことができます。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog のダッシュボードとグラフを Backstage インスタンスに埋め込むことができます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Backstage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Backstage][1] は、デベロッパーポータルを構築するためのオープンプラットフォームです。このインテグレーションにより、Datadog のグラフやダッシュボードを Backstage インスタンスに埋め込むことができるようになります。

## 計画と使用

### インフラストラクチャーリスト

1. Datadog プラグインを Backstage にインストールします。

```shell
cd packages/app
yarn add @roadiehq/backstage-plugin-datadog
```

2. Backstage Overview タブに Datadog プラグインウィジェットを追加します。詳しくは、[詳細説明][2]を参照してください。
3. Datadog ダッシュボードの[公開 URL][3] を検索または作成します。
4. プラグインのメタデータにダッシュボードの URL を追加します。

```yaml
apiVersion: backstage.io/v1alpha1
metadata:
  name: sample-service
  description: |
    A sample service
  annotations:
    datadoghq.com/dashboard-url: <DATADOGURL>
```

### 検証

Backstage インスタンスの Overview タブを開き、Datadog のダッシュボードやグラフが期待通りにレンダリングされることを確認します。

## リアルユーザーモニタリング

### データセキュリティ

Backstage インテグレーションには、メトリクスは含まれません。

### ヘルプ

Backstage インテグレーションには、サービスのチェック機能は含まれません。

### ヘルプ

Backstage インテグレーションには、イベントは含まれません。

## ヘルプ

サポートが必要な場合は、[Backstage Community][4] にお問い合わせください。

[1]: https://backstage.io
[2]: https://roadie.io/backstage/plugins/datadog/
[3]: https://docs.datadoghq.com/ja/dashboards/sharing/#share-a-dashboard-by-public-url
[4]: https://backstage.io/community