---
description: RUM バイタルチャート上の異常から Bits Investigation を開始するか、Bits に RUM モニターのアラートを自動的に調査させます。
further_reading:
- link: /real_user_monitoring/bits_ai/
  tag: ドキュメント
  text: RUM における Bits
- link: /bits_ai/bits_investigation/investigate_issues/
  tag: ドキュメント
  text: Bits Investigation で問題を調査する
- link: /monitors/types/real_user_monitoring/
  tag: ドキュメント
  text: RUM モニター
title: Bits AI で回帰と Alerts を調査する
---
## 概要 {#overview}

パフォーマンスメトリクスが突然低下した場合、次の 2 つの方法で根本原因を特定できます。

- [RUM がバイタルチャートで検出した異常](#investigate-an-anomaly-on-a-vital-chart)を調査します。
- [RUM モニターで自動調査](#automatically-investigate-rum-monitor-alerts)を有効にします。これにより、モニターがアラートを送信するとすぐに Bits が調査を開始します。

## バイタルチャート上の異常を調査する {#investigate-an-anomaly-on-a-vital-chart}

RUM は、ブラウザアプリケーションの RUM 概要ページの Core Web Vitals チャートで異常検知を実行します。バイタルが予期せず低下すると、RUM はチャート上で異常が発生したタイムレンジを強調表示し、その下に **Anomaly · Investigate** ボタンを表示します。

{{< img src="real_user_monitoring/bits_ai/anomaly-investigate.png" alt="ピンク色で強調表示された異常期間と、チャートの下にある Anomaly · Investigate ボタンが表示された、First Contentful Paint チャート。" style="width:50%;" >}}

調査を開始するには、**Anomaly · Investigate** をクリックします。Bits Investigation が新しいタブで開き、バイタル、アクティブなクエリとビュー、チャートの期間、および異常の開始と終了が表示されます。Bits は異常な期間と前後の期間を比較して、何が変化したか、またどのリリース、ページ、またはユーザーセグメントが影響を受けたかを説明します。

**注**: Largest Contentful Paint や Cumulative Layout Shift の増加など、障害情報のみが強調表示されます。改善が異常としてフラグを立てられることはありません。

## RUM モニターアラートを自動的に調査する {#automatically-investigate-rum-monitor-alerts}

Bits Investigation は [RUM モニター][1]をサポートしています。RUM モニターで自動調査を有効にすると、モニターがアラート状態に遷移するたびに Bits が調査を開始するため、オンコールエンジニアがアラートを開いたときに根本原因とその証拠をすぐに確認できます。

RUM モニターで自動調査を有効にするには、以下の手順を実行します。

1. [RUM モニター][2]を作成または編集します。
2. **通知と自動化を構成する**で、**Bits で調査する**を**有効**に切り替えます。
3. モニターを保存します。

{{< img src="real_user_monitoring/bits_ai/monitor-auto-investigate.png" alt="モニターエディターの Bits で調査する設定を有効に切り替えると、モニターアラートが自動的に調査されます。" style="width:100%;" >}}

個別の RUM モニターアラートから手動で調査を開始することもできます。利用可能なすべてのエントリーポイントおよび自動調査をトリガーする条件については、[問題を調査する][3]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/real_user_monitoring/
[2]: https://app.datadoghq.com/monitors/create/rum
[3]: /ja/bits_ai/bits_investigation/investigate_issues/#enable-automatic-investigations