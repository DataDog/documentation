---
assets:
  dashboards:
    speedscale: assets/dashboards/SpeedscaleOverview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- 自動化
- コンテナ
- orchestration
- テスト
creates_events: true
ddtype: crawler
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/speedscale/README.md
display_name: Speedscale
draft: false
git_integration_title: speedscale
guid: f2e3ed64-a756-440f-9a1f-43089536aa08
integration_id: speedscale
integration_title: Speedscale
integration_version: ''
is_public: true
kind: integration
maintainer: support@speedscale.com
manifest_version: 1.0.0
metric_prefix: speedscale.
metric_to_check: ''
name: speedscale
public_title: Speedscale
short_description: Speedscale のトラフィックリプレイ結果を Datadog に公開します。
support: contrib
supported_os:
- linux
- mac_os
- windows
---

## 概要

このインテグレーションは、[Speedscale][1] のトラフィックリプレイ結果を Datadog に公開します。これにより、Datadog の観測可能性データと Speedscale の特定のリプレイ結果を組み合わせて、パフォーマンス低下の根本原因を調査することができます。Speedscale と Datadog のインテグレーションにより、潜在的なパフォーマンスの問題が本番環境に現れる前に発見し、トラブルシューティングすることができます。

## セットアップ

### コンフィギュレーション

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
   speedctl export datadog report ${SPD_REPORT_ID} --apiKey ${DDOG_API_KEY}
   {"status":"ok",...}
   ```
### 検証

Datadog の[イベントストリーム][2]を表示すると、エクスポートしたレポートが表示されます。

## 収集データ

### メトリクス

Speedscale には、メトリクスは含まれません。

### サービスのチェック

Speedscale には、サービスのチェック機能は含まれません。

### イベント

Speedscale インテグレーションは、トラフィックリプレイが完了すると [Datadog イベントストリーム][3]にイベントを送信し、これがメトリクスに与える影響を理解するのに役立ちます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.speedscale.com/reference/integrations/datadog/
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[3]: https://app.datadoghq.com/event/stream
[4]: https://docs.datadoghq.com/ja/help/