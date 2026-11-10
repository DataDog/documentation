---
aliases:
- /ja/bits_ai/bits_ai_sre/investigate_alerts/
- /ja/bits_ai/bits_investigation/investigate_alerts/
- /ja/bits_ai/bits_ai_sre/investigate_issues/
description: Bits Investigation を使用してモニターアラートを自動的に調査し、根本原因分析を提供することで、インシデント解決を迅速化します。
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-sre-deeper-reasoning
  tag: ブログ
  text: '新しい Bits Investigation の登場: 推論能力の向上と 2 倍の高速化を実現'
title: 問題を調査
---
## Bits Investigation を開始{#start-a-bits-investigation}

Bits Investigation は、複数のエントリーポイントから開始できます。

- モニターアラート。以下の 2 つの方法で起動できます:
  - [**手動**](#manual-monitor-alerts): 個別のモニターアラートから開始します
  - [**自動**](#enable-automatic-investigations): アラート状態になったときに Bits Investigation を自動的に開始するようモニターを構成します
- [Synthetic テスト詳細ページ](#from-the-synthetic-test-details-page)
- [Real User Monitoring](#real-user-monitoring)
- [一般的なプロンプト](#general-prompt)

### モニターアラート {#manual-monitor-alerts}

複数のエントリーポイントから、個々のモニターアラートまたは警告イベントに対して Bits を呼び出すことができます。

#### オプション 1: Bits Investigation モニターリスト {#monitor-list}
1. [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}}] > [{{< ui >}}Supported{{< /ui >}}][5] に移動します。
1. [{{< ui >}}Investigate Recent Alerts{{< /ui >}}] をクリックし、アラートを選択します。

#### オプション 2: モニターステータスページ{#option-2-monitor-status-page}
[Bits Investigation 対応モニター](#supported-monitors) のモニターステータスページに移動し、右上隅の [{{< ui >}}Investigate with Bits Investigation{{< /ui >}}] をクリックします。

#### オプション 3: モニターイベントサイドパネル{#option-3-monitor-event-side-panel}
[Bits Investigation 対応モニター](#supported-monitors) のモニターイベントサイドパネルで、[{{< ui >}}Investigate with Bits Investigation{{< /ui >}}] をクリックします。

#### オプション 4: Slack{#option-4-slack}
Slack インテグレーションを使用するには、[Slack ワークスペースを Bits Investigation に接続][8]します。

Slack で、`@Datadog Investigate this alert` を使用してモニター通知に返信します。

### Synthetic テスト{#synthetic-tests}

Synthetic Browser または API テストのモニターがトリガーされた場合、Bits Investigation を開始して根本原因を特定できます。Bits は、トレース、ログ、メトリクスとともに Synthetic テストの結果と履歴を分析します。可能性の高い根本原因を提示し、障害が実際の回帰によるものか、誤構成によるものかを特定します。

#### Synthetic テスト詳細ページから{#from-the-synthetic-test-details-page}

1. [Synthetic Tests][18] ページで、調査したい Synthetic テストを開き、「{{< ui >}}Timeline{{< /ui >}}」セクションに移動します。
1. 失敗したテスト実行の {{< ui >}}Alert Triggered{{< /ui >}} イベントを選択します。
1. [{{< ui >}}Investigate with Bits{{< /ui >}}] をクリックします。

調査結果は新しいページで開きます。また、実行完了後はテスト詳細ページから確認することもできます。

#### Synthetic モニターから {#from-a-synthetic-monitor}

Synthetic モニターは、他のサポートされているモニタータイプと同じモニターベースのエントリーポイントに対応しています。利用可能なオプションについては「[モニターアラート](#manual-monitor-alerts)」を参照するか、Synthetic モニターで {{< ui >}}Auto-Investigate{{< /ui >}} を切り替えて自動的に調査を開始します。詳細については、「[自動調査を有効にする](#enable-automatic-investigations)」を参照してください。

### Real User Monitoring {#real-user-monitoring}

Real User Monitoring (RUM) の複数の場所から Bits Investigation を開始できます。

- RUM の**最適化**ページおよび Operations Monitoring にある推奨カード。詳細については、[Bits AI を使用したパフォーマンスの最適化][19]を参照してください。
- RUM バイタルチャート上の **Anomaly · Investigate** ボタン。詳細については、[Bits AI を使用した回帰とアラートの調査][19]を参照してください。
- RUM モニター。他のサポートされているモニタータイプと同様のモニターベースのエントリーポイント ([自動調査](#enable-automatic-investigations) を含む) に対応しています。詳細については、[Bits AI を使用した回帰とアラートの調査][20]を参照してください。

### 一般的なプロンプト{#general-prompt}

[New Investigation][16] をクリックし、トラブルシューティングする問題について記述します。可能な限り多くの関連コンテキストを含めます。
- 観察された症状 (例: エラー、レイテンシー)。これを示す Datadog テレメトリへのリンクも含めます
- 問題を切り分けるためのサービス、アプリケーション、環境などの関連タグ
- 時間枠 (デフォルトは過去 4 時間)

プロンプトが具体的であればあるほど、調査はより正確で有用なものになります。

良い例:
- 本番環境の search-service へのリクエストを調査。一部のリクエストで、空の結果を返すべきでないにもかかわらず空の結果が返されています。この問題は 10:00 UTC 頃に発生しました。
- これらのエラーの原因を調査: https://app.datadoghq.com/logs?query=service%3Asearch-service%20status%3Aerror 約 5 分前から発生し始めています。

悪い例:
- アプリが遅い。何が問題ですか?

Slack から調査を起動することもできます。 メッセージ内で Datadog にメンションします: `@Datadog Investigate high CPU in ai-gateway in prod over the last 30 minutes`Slack スレッド内で呼び出された場合、Bits Investigation はスレッド全体を自動的に調査コンテキストとして使用します。


### 自動調査を有効にする {#enable-automatic-investigations}

手動調査に加え、モニターがアラート状態に移行したときに Bits が自動的に実行されるよう構成できます。

#### Bits Investigation モニターリストから{#from-the-bits-investigation-monitors-list}
1. [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}}] > [{{< ui >}}Supported{{< /ui >}}][5] に移動します。
1. 単一のモニターに対して {{< ui >}}Auto-Investigate{{< /ui >}} をオンにするか、複数のモニターを選択してから {{< ui >}}Auto-Investigate All{{< /ui >}} をクリックし、一括編集します。

#### 単一のモニターの場合 {#for-a-single-monitor}
1. モニターのステータスページを開き、[{{< ui >}}Edit{{< /ui >}}] をクリックします。
1. {{< ui >}}Configure notifications & automations{{< /ui >}} までスクロールし、{{< ui >}}Investigate with Bits Investigation{{< /ui >}} を切り替えます。

<div class="alert alert-info"><ul><li>Datadog API または Terraform を使用した自動調査の有効化はサポートされていません。</li><li>調査は、モニターがアラート状態に移行したときに開始されます。</li><li>警告状態やデータなし状態への移行、<a href="/monitors/notify/#renotify">再通知</a>、テスト通知では、自動調査はトリガーされません。
</li></ul></div>

### サポートされているモニター {#supported-monitors}

Bits は、以下のモニタータイプで調査を実行できます。
  - Metric
  - Anomaly
  - Forecast
  - Integration
  - Outlier
  - Logs
  - APM (`APM Metrics` タイプのみ。`Trace Analytics` はサポート対象外)
  - Composites
  - SLO
  - Synthetics API および Browser テスト
  - RUM

## Bits による調査の仕組み{#how-bits-investigates}
Bits は問題を調査する際、観察、推論、アクションの継続的なループで動作します。まず潜在的な根本原因に関する仮説を立て、次に各種ツールを使用してテレメトリデータをクエリし、それらの仮説を検証または否定します。各ステップは、それまでの調査結果に基づいて進められます。新しい証拠が得られると、Bits は理解を更新し、推論を洗練させ、追加の調査ステップを連鎖させます。最も可能性の高い根本原因に絞り込まれるまで、状況に応じて適応し軌道修正を行います。

調査の最後に、Bits は明確で証拠に裏付けられた結論を提示するか、十分なデータが得られず確実な結論を出せない場合は、調査結果を「結論なし」としてマークします。

{{< img src="bits_ai/bits_ai_sre_investigation_hypotheses.png" alt="Bits が構築、検証した仮説を示すフローチャート" style="width:100%;" >}}

### サポートされているデータソース {#supported-data-sources}
Bits は調査中に以下のデータソースを使用します。

#### Datadog 製品 {#datadog-products}
- メトリクス
- APM トレース
- Logs
- ダッシュボード
- イベント
- [Change Tracking][4]
- [ソースコード][17] (GitHub のみ)
- Watchdog
- Real User Monitoring
- Network Path
- Database Monitoring
- Continuous Profiler

<div class="alert alert-tip"><b>サービススコープの追加:</b> サービスに関連付けられたモニターの場合、モニターにサービスタグを追加するか、モニタークエリをサービスでフィルターまたはグループ化します。これにより、Bits はデータをより正確に関連付けることができます。</div>

#### サードパーティインテグレーション {#third-party-integrations}
- Grafana
- Dynatrace
- Sentry
- Splunk
- ServiceNow
- Confluence

<div class="alert alert-info">
サードパーティインテグレーションは、すべてのお客様に対してプレビュー版で提供されています。</div>

調査の有効性を最大限に高めるためのベストプラクティスについては、[ナレッジソース][9]を参照してください。

### 調査の表示モード {#investigation-display-modes}
表示モードには、Investigation Steps と Hypothesis Tree の 2 種類があります。

調査の進行中、Bits は証拠の評価方法や意思決定のプロセスを含め、実行したすべてのステップを {{< ui >}}Investigation Steps{{< /ui >}} ビューに記録します。これにより、エージェントの推論プロセスの詳細な記録がリアルタイムで提供されます。

調査が完了したら、{{< ui >}}Hypothesis Tree{{< /ui >}} ビューに切り替えて、調査パスの構造化されたツリーベースの視覚化を確認できます。これにより、調査結果や結論を一目で把握しやすくなります。


## レポート {#reports}

{{< ui >}}Reports{{< /ui >}} タブでは、モニター、ユーザー、サービス、チームごとに、時間の経過とともに実行された調査の数を追跡できます。また、結論に至るまでの平均時間を追跡して、Bits Investigation がオンコール効率に与える影響を評価することもできます。

[3]: /ja/bits_ai/bits_investigation/configure/#configure-knowledge-base-integrations
[4]: /ja/change_tracking
[5]: https://app.datadoghq.com/bits-ai/monitors/supported
[6]: https://app.datadoghq.com/monitors/manage
[8]: /ja/bits_ai/bits_investigation/configure#slack
[9]: /ja/bits_ai/bits_investigation/knowledge_sources/
[10]: /ja/incident_response/on-call/pages/#page-from-notifications
[14]: /ja/incident_response/work_management/notifications_integrations/#third-party-tickets
[15]: /ja/account_management/rbac/permissions/#bits-ai
[16]: https://app.datadoghq.com/bits-ai/investigations/new
[17]: /ja/source_code/#tag-your-apm-telemetry-with-git-information
[18]: https://app.datadoghq.com/synthetics/tests
[19]: /ja/real_user_monitoring/bits_ai/optimize_performance/
[20]: /ja/real_user_monitoring/bits_ai/investigate_regressions/

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}