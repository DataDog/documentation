---
aliases:
- /ja/continuous_integration/dora_metrics/setup/
further_reading:
- link: /dora_metrics/
  tag: ドキュメント
  text: DORA Metrics について
title: DORA メトリクスのセットアップ
---

{{< site-region region="gov" >}}
DORA Metrics は、選択されたサイト ({{< region-param key="dd_site_name" >}}) では現在利用できません。{{< /site-region >}} DORA Metrics は公開ベータ版です。

## 概要

4 つの DORA メトリクスは、以下の 2 種類のイベントに基づいて計算されます。

- [**デプロイメントイベント**][8]: 特定の環境でサービスに新しいデプロイメントが発生したことを示します。
- [**インシデントイベント**][9]: 特定の環境でサービスに新しい障害が発生したことを示します。

各イベントタイプは異なるデータソースに対応しています。

## データソースの構成

### デプロイメント
{{< whatsnext desc="デプロイメントイベントは、デプロイメントの頻度、変更リードタイム、変更失敗率を計算するために使用されます。デプロイイベントのデータソースをセットアップするには、それぞれのドキュメントを参照してください。" >}}
  {{< nextlink href="/dora_metrics/deployments/apm" >}}APM Deployment Tracking{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/deployments/deployment_api" >}}Deployment Event API または datadog-ci CLI{{< /nextlink >}}
{{< /whatsnext >}}

### 障害
{{< whatsnext desc="障害イベントは、インシデントイベントを通して解釈され、変更失敗率や平均復旧時間の計算に使用されます。障害イベントのデータソースをセットアップするには、該当するドキュメントをご覧ください。">}}
  {{< nextlink href="/dora_metrics/failures/pagerduty" >}}PagerDuty{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/failures/incident_api" >}}Incident Event API{{< /nextlink >}}
{{< /whatsnext >}}

## 制限
- 最初にデータソースオプション (APM Deployment Tracking や PagerDuty など) を選択すると、DORA Metrics はその時点からデータを反映し始めます。ソース A からソース B に切り替え、その後ソース A に戻した場合、ソース A の履歴データは最初に選択された時点からのみ使用可能です。
- 同じサービスに対するデプロイやインシデントは、同じ秒には発生しません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[3]: /ja/dora_metrics/
[4]: /ja/service_management/events/explorer/
[5]: /ja/api/latest/metrics/#query-timeseries-points
[6]: /ja/api/latest/metrics/#query-timeseries-data-across-multiple-products
[7]: /ja/dora_metrics/data_collected/
[8]: /ja/dora_metrics/deployments/
[9]: /ja/dora_metrics/failures/
