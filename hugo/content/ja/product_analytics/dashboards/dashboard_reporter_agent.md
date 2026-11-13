---
algolia:
  tags:
  - dashboard reporter
  - agentic reporting
  - scheduled report
  - product analytics agent
description: Slack、Microsoft Teams、メールで、Product Analytics ダッシュボードに関する AI が生成したスケジュール済みレポートを入手します。
disable_toc: false
further_reading:
- link: /product_analytics/dashboards/
  tag: ドキュメント
  text: Product Analytics ダッシュボード
- link: /actions/agents/
  tag: ドキュメント
  text: Bits Agent Builder
- link: /account_management/billing/ai_credits/
  tag: ドキュメント
  text: AI クレジット
- link: /bits_ai/bits_chat/usage/#slack
  tag: ドキュメント
  text: Slack で Bits Chat を使用する
- link: /monitors/
  tag: ドキュメント
  text: モニター
title: Dashboard Reporter Agent
---
{{< callout url="https://www.datadoghq.com/product-preview/product-analytics-dashboard-reporter-agent/" btn_hidden="false" header="プレビューに参加しましょう。">}}
Dashboard Reporter Agent はプレビュー版です。フォームに入力してアクセスをリクエストします。
{{< /callout >}}

## 概要 {#overview}

Dashboard Reporter Agent は、選択した Product Analytics ダッシュボードを監視し、スケジュール済みレポートを Slack、Microsoft Teams、またはメールでチームに送信します。各レポートでは、変更点、注意が必要な点、次にやるべき点が要約されているため、各ダッシュボードを開いてチェックする必要はありません。機能のリリースが増えても、1 つの Agent で、注目度が低下した過去のローンチのダッシュボードを含む多くのダッシュボードを監視できます。

Dashboard Reporter Agent は [Bits Agent Builder][1] 上に構築されています。

<div class="alert alert-info">Dashboard Reporter Agent は、<a href="/account_management/billing/ai_credits/">AI クレジット</a>を消費します。</div>

レポートは、スケジュールに従って配信されるテキストの要約です。メトリクスがしきい値を超えたときに通知を受け取るには、[モニター][2]を使用します。

## ユースケース {#use-cases}

Dashboard Reporter Agent を使用して、以下のことができます。

- **多くの機能を一括監視する**: 1 つの Agent で多くのダッシュボードを網羅できます。
- **ローンチを継続的に視覚化する**: ローンチのダッシュボードを登録することで、ローンチ後に注目が薄れても継続的に確認できます。
- **週単位の健全性アップデートを共有する**: 週単位のレポートをチームチャンネルに投稿し、全員が同じシグナルを確認できるようにします。
- **経営陣に報告する**: スライドを作成せずに、主要なメトリクスと製品全般の健全性を送信します。
- **回帰を早期に発見する**: 日単位のレポートにより、数値の低下やエラーの急増を発生後すぐに把握します。

## Agent のレポート作成方法 {#how-the-agent-builds-a-report}

- **完全なカバレッジ**: Agent は、ページ上部のチャートだけでなく、登録されたダッシュボード上のすべてのチャートを確認します。
- **期間比較**: 各レポートは、現在の期間と前の期間とを比較します。日単位のレポートは過去 24 時間、週単位のレポートは過去 7 日間、月単位のレポートは過去 1 か月間を対象とします。
- **主要メトリクス優先**: 主要メトリクスはすべてのレポートの先頭に表示されるため、チームは期間ごとの進捗状況を追跡できます。
- **重大度順**: Agent は問題を重大度が高い順に一覧表示するため、最も重要な項目に集中できます。
- **重要な変更のみ**: 重要な変更がない場合、レポートにはその旨が記され、軽微な変更は一覧表示されません。
- **リンクされたソース**: レポート内の各メトリクスと問題は、その基となるチャートにリンクされています。

Agent は、その Agent を作成したユーザーの権限を使用してダッシュボードデータを読み取ります。そのユーザーがダッシュボードへのアクセス権を失うと、そのダッシュボードはレポートに含まれなくなります。

## 前提条件 {#prerequisites}

- Product Analytics および監視するダッシュボードのアクセス権。
- Slack にレポートを配信するには、組織に [Datadog Slack インテグレーション][3]がインストールされている必要があります。
- Microsoft Teams にレポートを配信するには、組織に [Microsoft Teams インテグレーション][4]がインストールされている必要があります。

## Dashboard Reporter Agent の作成 {#create-a-dashboard-reporter-agent}

ダッシュボードから、または Product Analytics の Agents ページから開始できます。

{{< tabs >}}
{{% tab "ダッシュボードから" %}}

1. 監視する Product Analytics ダッシュボードを開きます。
2. [{{< ui >}}Set Up Report{{< /ui >}}] をクリックします。ダッシュボードが他の Agent のレポートにすでに含まれている場合は、ここに一覧表示されます。

   {{< img src="product_analytics/dashboards/dashboard_reporter_agent/from-dashboard.png" alt="Set Up Report ボタンが強調表示された Product Analytics ダッシュボードのヘッダー。" style="width:100%;" >}}

**注**: 複数の Agent が同じダッシュボードを監視する場合、各 Agent が独立してレポートを作成するため、レポートの内容が異なる場合があります。

{{% /tab %}}
{{% tab "Agents ページから" %}}

1. Datadog で、[**Product Analytics > Agents**][1] に移動します。
2. [{{< ui >}}\+ New Agent{{< /ui >}}] をクリックします。
3. {{< ui >}}Dashboard Reporter{{< /ui >}} ブループリントを選択します。

{{< img src="product_analytics/dashboards/dashboard_reporter_agent/from-agents.png" alt="Start from blueprint の下で Dashboard Reporter ブループリントが強調表示された新しい Agent ページ。" style="width:60%;" >}}

[1]: https://app.datadoghq.com/product-analytics/agents
{{% /tab %}}
{{< /tabs >}}

### Agent の構成 {#configure-the-agent}

1. 「Checkout Weekly Health」のように、レポートの内容が読者にわかる名前を入力します。この名前は、すべてのレポートのタイトルに表示されます。
2. 監視するダッシュボードを 1 つ以上選択します。ダッシュボードは後から追加できます。
3. Team Update や Leadership Update などの定義済みのレポート形式を選択するか、独自の形式を作成します。カスタム形式の場合は、実行するたびにレポートが回答すべき質問と、書式設定の要件を記述します。
4. レポートを受信する Slack チャンネル、Microsoft Teams チャンネル、またはメールアドレスを選択します。
5. Agent の実行頻度 (毎日、毎週、または毎月)、レポートの送信時刻、およびタイムゾーンを選択します。
6. [{{< ui >}}Create{{< /ui >}}] をクリックします。

## レポートを読む {#read-reports}

レポートは、構成した送信先に届きます。各実行の記録は Agent のページにも保存されるため、過去のレポートを確認できます。

### レポートに関する補足質問 {#ask-follow-up-questions-about-a-report}

Datadog でレポートを開き、Agent に補足質問をすることができます。たとえば、どのセグメントが変化の要因となったのか、ほかにどんな変化が同時に生じたのかを質問します。

1. レポートを開く:
   - **レポートメッセージから**: Slack、Microsoft Teams、またはメールメッセージで、[{{< ui >}}Chat with this report{{< /ui >}}] をクリックします。
   - **Datadog から**: Agent ページに移動し、Agent を選択します。
2. メッセージボックスに質問を入力し、<kbd>Enter</kbd> キーを押します。

### Slack で Bits AI に質問する {#ask-bits-ai-in-slack}

レポートが Slack に送信される設定になっており、Datadog Slack インテグレーションで Bits AI が有効になっている場合、Slack から離れることなく Bits Chat にレポートについて質問できます。たとえば、`@Datadog Why did checkout conversion drop this week?` のように、質問する際に `@Datadog` をメンションしてください。設定については、[Slack で Bits Chat を使用する][5] を参照してください。


## Dashboard Reporter Agent の管理 {#manage-dashboard-reporter-agents}

Agent を表示するには、[**Product Analytics > Agents**][6] に移動します。

### Agent の編集{#edit-an-agent}

Agent のダッシュボード、レポート形式、送信先、または実行頻度を変更できます。

1. Agents ページで、その Agent をクリックします。
2. 以下のいずれかの方法で変更を行います。
   - **Agent に質問する**: チャットで変更内容を説明します。例: `Add the Checkout Funnel dashboard and send reports on Mondays at 9:00 AM.`
   - **指示の編集**: ダッシュボード、レポート形式、または送信先を変更するには、{{< ui >}}Instructions{{< /ui >}} パネルをクリックし、Markdown で編集します。頻度を変更するには、{{< ui >}}Automation{{< /ui >}} パネルを展開します。

### Agent の一時停止または再開 {#pause-or-resume-an-agent}

閑散期やダッシュボードの再構築中など、レポートを一時的に停止するには、Agent を一時停止します。一時停止した Agent の構成は保持されます。

- **Agent を一時停止するには**: Agents ページで Agent にカーソルを合わせ、[{{< ui >}}Pause{{< /ui >}}] をクリックします。確認ウィンドウで、もう一度 [{{< ui >}}Pause{{< /ui >}}] をクリックします。
- **Agent を再開するには**: Agents ページで Agent にカーソルを合わせ、[{{< ui >}}Resume{{< /ui >}}] をクリックします。確認ウィンドウで、[{{< ui >}}Resume{{< /ui >}}] をクリックします。

### Agent の削除 {#delete-an-agent}

レポートを一時的に停止するには、代わりに [Agent を一時停止](#pause-or-resume-an-agent)します。

<div class="alert alert-warning">Agent を削除すると、元に戻すことはできません。Agent はレポートの送信を停止し、<a href="/actions/workflows/">Workflow Automation</a> 内の基盤となるワークフローも削除され、どちらも復元することはできません。</div>

agent を削除するには、Agents ページに移動し、agent にカーソルを合わせて [{{< ui >}}Delete{{< /ui >}}] をクリックします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/agents/
[2]: /ja/monitors/
[3]: /ja/integrations/slack/?tab=datadogforslack
[4]: /ja/integrations/microsoft_teams/
[5]: /ja/bits_ai/bits_chat/usage/#slack
[6]: https://app.datadoghq.com/product-analytics/agents