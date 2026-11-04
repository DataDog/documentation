---
description: 1 つのジャーニーの健全性、KPI、定義、および他のジャーニーとの関係を確認します。
further_reading:
- link: /journey_monitoring/
  tag: ドキュメント
  text: Journey Monitoring について
- link: /journey_monitoring/map/
  tag: ドキュメント
  text: Journey Monitoring マップについて
- link: /journey_monitoring/status/
  tag: ドキュメント
  text: ジャーニーステータスについて
title: ジャーニーの概要ページ
---
## ジャーニーを探索する {#explore-a-journey}

[マップ][6]または[カタログ](#journey-catalog)でジャーニーをクリックすると、ジャーニーの概要にその[ステータス][2]、[主要業績評価指標 (KPI)][4]、[開始イベントと終了イベント][5]、およびアップストリームとダウンストリームのジャーニーが表示されます。

対象ジャーニーのタイルをクリックすると、その[詳細レポート][1]が開きます。アップストリームまたはダウンストリームのジャーニーのタイルをクリックすると、そのジャーニーのレポートが開きます。

{{< img src="journey_monitoring/journey-monitoring-overview.png" alt="主要業績評価指標、ステータス、定義、アップストリームおよびダウンストリームのジャーニーを表示する単一ジャーニーの概要。" style="width:100%;" >}}

## アップストリームおよびダウンストリームのジャーニー {#upstream-and-downstream-journeys}

Datadog は、共有された開始イベントと終了イベントに基づいて関連するジャーニーを特定します。

- **アップストリームジャーニー**は、対象ジャーニーの開始イベントのいずれかで終了します。
- **ダウンストリームジャーニー**は、対象ジャーニーの終了イベントのいずれかで開始します。

これらの関係を使用して、アップストリームジャーニーが対象ジャーニーに影響を与えているか、または対象ジャーニーがダウンストリームジャーニーに影響を与えているかを調査します。

## ジャーニーカタログ {#journey-catalog}

ジャーニーカタログには、作成済みのジャーニーと[提案されたジャーニー][3]が一覧表示されます。作成済みの各ジャーニーには、KPI と **Healthy**、**Degraded**、または **Missing coverage** のステータスが表示されます。提案されたジャーニーには **Suggested** というラベルが付けられます。

カタログを使用して、以下を行います。

- ジャーニーを検索する
- ジャーニーをフィルタリングおよびソートする
- チームオーナーシップでジャーニーをフィルタリングする
- 低下したジャーニーを特定する
- 提案されたジャーニーを表示する

カタログ内のジャーニーをクリックすると、概要に表示されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/journey_monitoring/details_report/
[2]: /ja/journey_monitoring/status/
[3]: /ja/journey_monitoring/suggested_journeys/
[4]: /ja/journey_monitoring/details_report/#traffic-and-conversion-trends
[5]: /ja/journey_monitoring/configuring_journeys/#define-start-and-end-conditions