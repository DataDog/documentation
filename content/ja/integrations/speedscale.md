---
app_id: speedscale
app_uuid: 35e3ad0c-9189-4453-b3c3-2b4aefa7c176
assets:
  dashboards:
    speedscale: assets/dashboards/SpeedscaleOverview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: speedscale.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10271
    source_type_name: Speedscale
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Speedscale
  sales_email: support@speedscale.com
  support_email: support@speedscale.com
categories:
- コンテナ
- kubernetes
- orchestration
- テスト
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/speedscale/README.md
display_on_public_website: true
draft: false
git_integration_title: speedscale
integration_id: speedscale
integration_title: Speedscale
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: speedscale
public_title: Speedscale
short_description: Speedscale のトラフィックリプレイ結果を Datadog に公開します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Orchestration
  - Category::Testing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Speedscale のトラフィックリプレイ結果を Datadog に公開します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Speedscale
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

このインテグレーションは、[Speedscale][1] のトラフィックリプレイ結果を Datadog に公開します。これにより、Datadog の観測可能性データと Speedscale の特定のリプレイ結果を組み合わせて、パフォーマンス低下の根本原因を調査することができます。Speedscale と Datadog のインテグレーションにより、潜在的なパフォーマンスの問題が本番環境に現れる前に発見し、トラブルシューティングすることができます。

## 計画と使用

### ブラウザトラブルシューティング

1. このインテグレーションを使用するには、Datadog にイベントを送信できるように、Datadog の [API キー][2]が必要です。

   ベストプラクティスは、この値を環境変数に保存することです。たいていの場合、この環境変数は継続的インテグレーションシステムに保存されますが、単発のテストを行う場合は、ターミナルからこのようにアクセスすることができます。

   ```
   export DDOG_API_KEY=0
   ```

2. Datadog にアップロードしたい特定のレポートのレポート ID を取得します。継続的インテグレーションで作業する場合は、コミットハッシュと関連付けられたレポート ID を取得します。このレポート ID を環境変数に格納します。

   ```
   export SPD_REPORT_ID=0
   ```

3. 特定のレポート ID と Datadog API キーで、`speedctl` コマンドを実行し、そのトラフィックリプレイレポートを Datadog イベントとしてエクスポートします。

   ```
   speedctl export datadog ${SPD_REPORT_ID} --apiKey ${DDOG_API_KEY}
   {"status":"ok",...}
   ```
### 検証

Datadog の[イベントストリーム][2]を表示すると、エクスポートしたレポートが表示されます。

## リアルユーザーモニタリング

### データセキュリティ

Speedscale には、メトリクスは含まれません。

### ヘルプ

Speedscale には、サービスのチェック機能は含まれません。

### ヘルプ

Speedscale インテグレーションは、トラフィックリプレイが完了すると [Datadog イベントストリーム][3]にイベントを送信し、これがメトリクスに与える影響を理解するのに役立ちます。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.speedscale.com/reference/integrations/datadog/
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[3]: https://app.datadoghq.com/event/stream
[4]: https://docs.datadoghq.com/ja/help/