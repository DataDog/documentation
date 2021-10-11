---
assets:
  dashboards:
    Hasura Cloud Datadog Integration Dashboard: assets/dashboards/hasura_cloud.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - モニタリング
  - ログの収集
  - cloud
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/hasura_cloud/README.md
display_name: Hasura Cloud
draft: false
git_integration_title: hasura_cloud
guid: fa26fe8b-6dbf-43fc-9597-a7dd1b56abaa
integration_id: hasura-cloud
integration_title: Hasura Cloud
is_public: true
kind: integration
maintainer: support@hasura.io
manifest_version: 1.0.0
metric_prefix: hasura_cloud.
metric_to_check:
  - hasura_cloud.requests_per_minute
  - hasura_cloud.average_execution_time
  - hasura_cloud.success_rate
name: hasura_cloud
public_title: Datadog-Hasura Cloud インテグレーション
short_description: Hasura Cloud プロジェクトを監視します
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
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