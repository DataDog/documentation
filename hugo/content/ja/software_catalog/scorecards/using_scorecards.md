---
aliases:
- /ja/tracing/software_catalog/scorecards/using_scorecards
- /ja/tracing/service_catalog/scorecards/using_scorecards
- /ja/service_catalog/scorecards/using_scorecards
further_reading:
- link: /tracing/software_catalog/
  tag: ドキュメント
  text: Software Catalog
- link: /api/latest/service-scorecards/
  tag: ドキュメント
  text: Scorecards API
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: ブログ
  text: Scorecards を使ってサービスの可観測性におけるベストプラクティスを優先し、推進する
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: ブログ
  text: カスタム Scorecards でベストプラクティスを形式化する
- link: /continuous_integration/dora_metrics/
  tag: ドキュメント
  text: Datadog を使用して DORA メトリクスを追跡する
title: Scorecards の使用
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Scorecards はプレビュー版です。
{{< /callout >}}

Scorecards を設定すると、サービス単位のスコアを確認したり、スコアの推移を追跡したり、Scorecard レポートを生成してチームへ Scorecard 情報を自動共有したりできます。

## サービス レベルの詳細とスコアを確認する

Scorecard のサマリーは Software Catalog の [**Explore** ページ][1] で確認できます。**Ownership** タブの **Scorecards** 列に表示され、各 Scorecard について、対象のサービス (またはサービスの絞り込み結果) がどの程度達成できているか、さらに各 Scorecard 内のルールの状況も把握できます。

Scorecard から **View Details** をクリックするか、サービス詳細のサイド パネルを開くと **Scorecards** タブが表示されます。このタブには、すべての Scorecards と各ルール、そしてそのサービスにおける各ルールの合否 (pass-fail) が一覧表示されます。

## スコアの推移を追跡する

Scorecards UI では、履歴の時系列データを使って、チームが変更を加えたり既知の問題を修正したりする中で、スコアが時間とともにどう改善していくかを可視化できます。これらの時系列は Dashboards や Notebooks にエクスポートすることもでき、`team`、`rule`、`scorecard`、`application`、`tier`、`lifecycle` などのタグでフィルタリングできます。

{{< img src="/tracing/software_catalog/scorecard-historical-metrics.png" alt="Scorecard UI でスコアの推移を示す時系列" style="width:90%;" >}}

## Scorecard レポートを生成する

Scorecard レポートを生成すると、Scorecard 情報の概要がスケジュール配信され、チームの Slack チャンネルに送られます。これにより、サービスやチームが期待される基準をどの程度満たしているかを全員が把握しやすくなります。レポートを作成すると、[Datadog Workflow Automation][2] を使用した Workflow が生成され、指定したスケジュールで実行されます。

<div class="alert alert-warning">この Workflow の実行は課金に影響する場合があります。詳細は <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">pricing page</a> を参照してください。</div>

レポートを作成するには:

1. Scorecards ページで **Create Report** をクリックします。
2. 組織内で定義されているすべてのサービスを対象にするか、特定チームのサービスに限定するかを選択します。
3. レポートを受け取りたい日付、時刻、頻度を設定します。
4. 送信先の Slack workspace とチャンネルを設定します。選択したチャンネルは公開チャンネルであり、Datadog Slack アプリがインストールされている必要があります。
5. **Enable this Workflow** をクリックします。

この設定に基づき、Datadog はスコアが最も高い / 低いルール、サービス、チームに関するレポートを送信します。

{{< img src="/tracing/software_catalog/scorecard-reports.png" alt="全サービス向けレポートの作成方法を示す Scorecard レポート作成モーダル" style="width:90%;" >}}


### Scorecard レポートを管理する
Workflow を編集または削除するには、Scorecards ページで **Manage Reports** をクリックして対象の Workflow を選択します。Settings メニューから Workflow を編集するか、削除してください。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ja/service_management/workflows/