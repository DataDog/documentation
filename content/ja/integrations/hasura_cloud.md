---
app_id: hasura-cloud
app_uuid: d7eb9597-f00b-48dc-9100-7afda5fe4bce
assets:
  dashboards:
    Hasura Cloud Datadog Integration Dashboard: assets/dashboards/hasura_cloud.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - hasura_cloud.requests_per_minute
      - hasura_cloud.average_execution_time
      - hasura_cloud.success_rate
      metadata_path: metadata.csv
      prefix: hasura_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10175
    source_type_name: Hasura Cloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Hasura
  sales_email: support@hasura.io
  support_email: support@hasura.io
categories:
- クラウド
- ログの収集
- トレーシング
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hasura_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: hasura_cloud
integration_id: hasura-cloud
integration_title: Hasura Cloud
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: hasura_cloud
public_title: Hasura Cloud
short_description: Hasura Cloud プロジェクトを監視します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Category::Tracing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Hasura Cloud プロジェクトを監視します
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Hasura Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Hasura Cloud][1] は、スケーラブルで可用性が高くグローバルに分散された
セキュアで実稼働準備の整った GraphQL API をデータソースに提供します。

Datadog インテグレーションは Hasura Cloud の観測可能性機能で、Hasura Cloud プロジェクトのオペレーションログ、メトリクス、トレースを Datadog ダッシュボードにエクスポートします。

## 計画と使用

Hasura Cloud プロジェクトに Hasura Cloud Datadog インテグレーションをセットアップするには、Datadog API キーとリージョンを Hasura Cloud に提供します。

Hasura Cloud プロジェクトの Datadog インテグレーションを構成する方法については、[Hasura Cloud のドキュメント][2]を参照してください。

完了したら、Datadog の[ログセンション][3]に移動し、以下の上位レベルのフィールドのファセットを作成します。

* `operation_name`
* `operation_type`
* `error_code`
* `is_error`

ログからファセットを作成する方法については、[Datadog のログファセットのドキュメント][4]を参照してください。

Hasura Cloud プロジェクトのログ、メトリクス、トレースは、プロジェクトがトラフィックを受けると、自動的に Datadog に送信されます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "hasura_cloud" >}}


### ヘルプ

Hasura Cloud インテグレーションには、サービスのチェック機能は含まれません。

### ヘルプ

Hasura Cloud インテグレーションには、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://hasura.io/cloud/
[2]: https://hasura.io/docs/latest/observability/integrations/datadog/
[3]: http://app.datadoghq.com/logs
[4]: https://docs.datadoghq.com/ja/logs/explorer/facets/#create-facets
[5]: https://docs.datadoghq.com/ja/help/