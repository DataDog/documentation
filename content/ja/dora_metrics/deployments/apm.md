---
aliases:
- /ja/continuous_integration/dora_metrics/setup/apm
description: DORA Metrics のデプロイメントのデータソースとして APM Deployment Tracking を構成する方法を説明します。
further_reading:
- link: /dora_metrics/deployments
  tag: ドキュメント
  text: 他のデプロイデータソースのオプションを見る
- link: /dora_metrics/failures/
  tag: ドキュメント
  text: DORA Metrics の障害データのセットアップについて
- link: /tracing/service_catalog
  tag: ドキュメント
  text: サービスカタログについて
- link: https://github.com/DataDog/datadog-ci
  tag: ソースコード
  text: datadog-ci CLI ツールについて
- link: /continuous_delivery/deployments
  tag: ドキュメント
  text: Deployment Visibility について
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
is_beta: true
title: DORA Metrics のための  APM Deployment Tracking の構成
---

{{< site-region region="gov" >}}
DORA Metrics は、選択されたサイト ({{< region-param key="dd_site_name" >}}) では現在利用できません。{{< /site-region >}} DORA Metrics は公開ベータ版です。

## 概要

APM [Deployment Tracking][2] は、DORA Metrics のデプロイメントのデータソースとして構成できます。

## セットアップ

APM によって追跡されるサービスデプロイを DORA Metrics に貢献させるには、次の要件を満たす必要があります。

- サービスの[メタデータ][1]がサービスカタログで定義されていること。
- サービスで、[統合サービスタグ付け][3]が有効になっていること。デプロイは `version` タグを使用して識別されます。

### 変更のリードタイム

APM によって追跡されるサービスデプロイが変更リードタイムに寄与できるよう、次の点を確認してください。

- アプリケーションのテレメトリーには Git の情報がタグ付けされます。これは [APM で][4]有効にできます。または、[ソースコードインテグレーションのドキュメント][5]を参照してください。
- リポジトリのメタデータは、[GitHub インテグレーション][6]、または `datadog-ci git-metadata upload` コマンドによって Datadog に同期されます。

Deployment Tracking によって特定されたデプロイについては、変更リードタイムが最初のコミットが作成された時点から、そのコミットが新しいバージョンで最初に確認される時点までで計算されます。`dora.deploy_time` メトリクスは利用できません。 

変更リードタイムメトリクスの詳細については、[収集データ][7]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_catalog/add_metadata
[2]: /ja/tracing/services/deployment_tracking
[3]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[4]: https://app.datadoghq.com/source-code/setup/apm
[5]: /ja/integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information
[6]: /ja/integrations/github/
[7]: /ja/dora_metrics/data_collected/#change-lead-time-metrics