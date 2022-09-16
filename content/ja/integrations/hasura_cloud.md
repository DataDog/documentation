---
app_id: hasura-cloud
app_uuid: d7eb9597-f00b-48dc-9100-7afda5fe4bce
assets:
  dashboards:
    Hasura Cloud Datadog Integration Dashboard: assets/dashboards/hasura_cloud.json
  integration:
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
    source_type_name: Hasura Cloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: support@hasura.io
  support_email: support@hasura.io
categories:
- モニタリング
- ログの収集
- cloud
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hasura_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: hasura_cloud
integration_id: hasura-cloud
integration_title: Hasura Cloud
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: hasura_cloud
oauth: {}
public_title: Hasura Cloud
short_description: Hasura Cloud プロジェクトを監視します
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Monitoring
  - Category::Log Collection
  - Category::Cloud
  configuration: README.md#Setup
  description: Hasura Cloud プロジェクトを監視します
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Hasura Cloud
---



## 概要

[Hasura Cloud][1] は、スケーラブルで可用性が高くグローバルに分散された
セキュアで実稼働準備の整った GraphQL API をデータソースに提供します。

Datadog インテグレーションは Hasura Cloud の可観測性機能で、
Hasura Cloud プロジェクトのオペレーションログやメトリクスを Datadog ダッシュボードにエクスポートします。

## セットアップ

Hasura Cloud プロジェクトに Hasura Cloud Datadog インテグレーションをセットアップするには、Datadog API キーとリージョンを Hasura Cloud に提供します。

Hasura Cloud プロジェクトの Datadog インテグレーションを構成するには、[Hasura Cloud のドキュメント][2]を参照してください。

完了したら、Datadog の[ログセンション][3]に移動し、以下の上位レベルのフィールドのファセットを作成します。

* `operation_name`
* `operation_type`
* `error_code`
* `is_error`

ログからファセットを作成する方法については、[Datadog のログファセットのドキュメント][4]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "hasura_cloud" >}}


### サービスのチェック

Hasura Cloud インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Hasura Cloud インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://hasura.io/cloud/
[2]: https://hasura.io/docs/latest/graphql/cloud/metrics/integrations/datadog.html
[3]: http://app.datadoghq.com/logs
[4]: https://docs.datadoghq.com/ja/logs/explorer/facets/#create-facets
[5]: https://docs.datadoghq.com/ja/help/