---
aliases:
- /ja/continuous_integration/dora_metrics
description: DORA メトリクスを使用してソフトウェア開発の測定と改善を行う方法を学びます。
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: Pipeline Visibility について
- link: /continuous_delivery/deployments
  tag: ドキュメント
  text: Deployment Visibility について
- link: /continuous_integration/tests
  tag: ドキュメント
  text: Test Visibility について
- link: /code_analysis
  tag: ドキュメント
  text: Code Analysis について
is_beta: true
kind: ドキュメント
title: Azure
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 DORA メトリクスは利用できません。</div>
{{< /site-region >}}

{{< callout url="https://forms.gle/Eqq6uXfGjYxmqpjDA" header="false" >}}
DORA メトリクスの非公開ベータ版は終了しました。キャンセル待ちリストに参加するには、以下のフォームにご記入ください。
{{< /callout >}}

## 概要

DevOps Research and Assessment (DORA) メトリクスは、ソフトウェア開発の速度と安定性を示すために使用される [4 つのキーメトリクス][1]です。

Deployment Frequency
: 組織が本番環境へのリリースを成功させる頻度。

Lead Time for Changes
: コミットが本番稼動するまでの時間。

Change Failure Rate
: デプロイメントによって本番環境で障害が発生した割合。

Time to Restore Service
: 本番稼動中の障害から組織が回復するのにかかる時間。

DORA メトリクスを定義し追跡することで、チームや組織のソフトウェアデリバリのスピードと品質の改善点を特定することができます。

## DORA メトリクスのセットアップ

4 つの DORA メトリクスは、以下の 2 種類のイベントに基づいて計算されます。
- **デプロイメントイベント**: 特定の環境でサービスに新しいデプロイメントが発生したことを示します。
  デプロイメントイベントは、デプロイメント頻度、変更リードタイム、および変更失敗率を計算するために使用されます。
- **インシデントイベント**: 特定の環境でサービスに新しい問題が発生したことを示します。
  インシデントイベントは、変更失敗率と平均復旧時間を計算するために使用されます。

{{< whatsnext desc="Datadog で DORA メトリクスをセットアップします。" >}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/deployments" >}}デプロイメントイベントの送信{{< /nextlink >}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/incidents" >}}インシデントイベントの送信{{< /nextlink >}}
{{< /whatsnext >}}

## DORA メトリクスを使用する

[DORA メトリクスページ][2]で DORA メトリクスにアクセスし、視覚化し、チーム、サービス、リポジトリ、環境、期間によってフィルタリングできます。

このページの情報を使用して、各メトリクスの改善点や後退点を特定し、変化を視覚化し、時間の経過とともに傾向を比較します。DORA メトリクスはダッシュボードまたはノートブックにエクスポートされ、[メトリクスモニター][3]を使用してアラートを設定できます。

メトリクスは、[時系列ポイントをクエリする][4]および[複数の製品にわたる時系列データをクエリする][5] API エンドポイントでもクエリ可能です。

DORA メトリクスが提供するメトリクスは以下の通りです。

| エラー予算アラート | タイプ | 説明 |
| :--- | :--- | :--- |
| `dora.deployments.count` | count | デプロイ頻度に使用されます。
| `dora.change_lead_time` | ディストリビューション | デプロイメント時の git コミットの経過時間 (秒単位) を含みます。
| `dora.incidents_impact` | count | インシデントによって影響を受けたサービスまたはチームを追跡します。`dora.incidents_impact / dora.deployments.count` の計算式で変更失敗率に使用されます。デプロイメントと影響開始の時差を考慮するために、少なくとも 1 週間の大きな時間ロールアップが推奨されます。
| `dora.time_to_restore` | ディストリビューション | インシデントの `started_at` から `finished_at` までの時間 (秒単位) を含みます。

すべてのメトリクスは、利用可能な場合は以下のタグを含みます。
- `service`
- `team`
- `env`
- `repository_id`

**注**: `severity` タグは、API 経由で提供された場合にのみ、`dora.incidents_impact` および `dora.time_to_restore` メトリクスで利用可能です。

### デプロイメントとインシデントイベント

DORA メトリクスはまた、`source:software_delivery_insights` で [Event Management][6] の個々の `deployment`、`incident`、`incident_finished` イベントを提供します。

イベントは、[イベントエクスプローラー][7]でクエリし、視覚化することができます。

### 制限

- デプロイメントとインシデントイベントは、できるだけ早く送信する必要があります。`finished_at` タイムスタンプが現在時刻よりも 1 時間以上古いイベントは受け入れられません。
- 同じサービスのデプロイやインシデントが同時に発生することはありません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance
[2]: https://app.datadoghq.com/ci/dora
[3]: https://docs.datadoghq.com/ja/monitors/types/metric/?tab=threshold
[4]: https://docs.datadoghq.com/ja/api/latest/metrics/#query-timeseries-points
[5]: https://docs.datadoghq.com/ja/api/latest/metrics/#query-timeseries-data-across-multiple-products
[6]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights
[7]: https://docs.datadoghq.com/ja/service_management/events/explorer/