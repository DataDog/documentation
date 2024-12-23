---
aliases:
- /ja/continuous_integration/dora_metrics/setup/incidents
- /ja/dora_metrics/setup/incidents
description: DORA Metrics のインシデントイベントの送信方法をご紹介します。
further_reading:
- link: /continuous_integration/dora_metrics/setup/deployments
  tag: ドキュメント
  text: DORA メトリクスにおけるデプロイメントデータの設定方法について
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
title: DORA メトリクスのインシデントデータの設定方法
---

{{< site-region region="gov" >}}
DORA Metrics は、選択されたサイト ({{&lt; region-param key="dd_site_name" &gt;}}) では現在利用できません。{{&lt; /site-region &gt;}} DORA Metrics は公開ベータ版です。
{{< /site-region >}}

## 概要

失敗したデプロイメントイベントは、現在インシデントイベントとして解釈され、[変更失敗率](#calculating-change-failure-rate)と[平均復旧時間 (MTTR)](#calculating-mean-time-to-restore) の算出に使用されます。

## インシデントデータソースの選択

{{< whatsnext desc="DORA メトリクスでは、デプロイメントイベントのデータソースとして以下をサポートしています。デプロイメントイベントのデータソースを設定する方法については、各ドキュメントを参照してください。" >}}
{{< nextlink href="/dora_metrics/failures/pagerduty" >}}PagerDuty{{< /nextlink >}}
{{< nextlink href="/dora_metrics/failures/incident_api" >}}Incident Event API{{< /nextlink >}}
{{< /whatsnext >}}

## 変更失敗率の計算
変更失敗率を計算するには、[デプロイメントデータ][7]と[インシデントデータ](#configuring-failure-data-sources)の両方が必要です。

変更失敗率は、全デプロイメント数に対するインシデントイベントの割合として計算されます。Datadog は、失敗イベントとデプロイメントイベントの両方に関連付けられた同一のサービスまたはチームを対象に、`dora.incidents.count` を `dora.deployments.count` で割って算出します。

## 復旧時間の計算
復旧時間は、*解決済みインシデント*イベントの継続時間の分布として計算されます。

DORA メトリクスでは、各インシデントイベントの開始時刻と終了時刻を記録して `dora.time_to_restore` メトリクスを生成します。その後、選択された期間内でこれらの `dora.time_to_restore` の平均を算出し、平均復旧時間 (MTTR) として示します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /ja/tracing/service_catalog
[4]: /ja/tracing/service_catalog/setup
[5]: /ja/tracing/service_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
[7]: /ja/dora_metrics/deployments