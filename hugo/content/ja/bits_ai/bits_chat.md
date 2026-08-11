---
aliases:
- /ja/bits_ai/getting_started/
- /ja/bits_ai/chat_with_bits_ai
- /ja/bits_ai/bits_assistant/
- /ja/tracing/guide/latency_investigator/
description: Datadog の Bits Chat を使用して、自然言語を使って監視可能性データを探索し、行動を起こします。
further_reading:
- link: bits_ai/
  tag: ドキュメント
  text: Bits AI 概要
- link: /incident_response/incident_management/investigate/incident_ai
  tag: ドキュメント
  text: インシデント AI を使用してインシデントを調整する
- link: /cloud_cost_management/cloud_cost_skill/
  tag: ドキュメント
  text: Bits Chat の Cloud Cost スキル
- link: /account_management/billing/ai_credits/
  tag: ドキュメント
  text: AI クレジット
title: Bits Chat
---
## 概要 {#overview}
Bits Chat は、自然言語を使用して Datadog 全体で検索し、行動を起こすのに役立ちます。Bits Chat は、ウェブアプリケーション、モバイルアプリ、および Slack で利用可能です。

Bits Chat で以下のカテゴリーに関して質問します。

### 問題を調査し、修正する {#investigate-issues-and-remediate}
- `Summarize high severity incidents that have occurred in the last day`
- `What's causing 400 errors on the checkout endpoint in the last hour?`
- `Why is the error rate spiking on the web-store service?`
- `What is the root cause of this error? How did it propagate and what is the impact on users?`
- `What could cause 500 errors on this API endpoint?`

### テレメトリを探索し、分析する {#explore-and-analyze-telemetry}
- `Which services have the most errors right now?`
- `Summarize the key findings from the Kubernetes overview dashboard`
- `What's the success rate for my top API endpoints over the past week?`
- `Show me error rates for the checkout service over the last 24 hours`
- `Are there any incidents related to Kafka lag?`

### Datadog のコンセプトと使い方を学ぶ {#learn-datadog-concepts-and-how-to}
- `How do I configure log collection for the Datadog Agent?`
- `What is the difference between a metric monitor and an anomaly monitor?`
- `What permission do I need to create a new connection?`
- `Can I set the timepicker on a notebook to read-only?`

### 監視可能性を設定し、最適化する {#set-up-and-optimize-observability}
- `Do we already have monitors for high latency on the payments service?`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `How can I put a team tag on this monitor?`
- `Add a timeseries widget for request count over time to this notebook`

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="提案されたタスクを含むフルページの Bits Chat インターフェイス" style="width:100%;">}}

### 権限 {#permissions}

#### Bits Chat へのアクセス {#access-to-bits-chat}

Bits Chat を使用するには、**Bits Chat へのアクセス**権限を持つロールが必要です。この権限は、Datadog Admin、Datadog Standard、Datadog Read Only という 3 つの標準 Datadog ロールに対してデフォルトで有効になっています。

カスタムロールのこの権限を管理するには、**組織設定** > **ロール**に移動し、ロールを選択し、**一般許可**で **Bits Chat へのアクセス**を切り替えます。

#### Bits Chat を通じたデータアクセス　{#data-access-through-bits-chat}

Bits Chat は、Datadog ロールを使用してデータを取得するため、表示または変更権限を持つリソースにのみアクセスできます。例えば、ロールが特定のログインデックスのセットへのアクセスを制限している場合、Bits Chat はそのインデックスからのみログをクエリできます。同様に、ダッシュボードを編集する権限がない場合、Bits Chat が代わりにそのダッシュボードを編集することはできません。

### スキル {#skills}
Bits Chat は、Datadog 全体のタスクに特化したさまざまなスキルを持っています。最も一般的に使用されるスキルは以下に説明されています。

#### ダッシュボード {#dashboards}
自然言語の説明から[ダッシュボード][5]やウィジェットを作成します。

例のプロンプト:
- `Show me a dashboard of high-impact alerts from the past week and which services they affected`
- `Add a widget about CPU usage in the payments service`

#### ノートブック {#notebooks}
調査用の[ノートブック][6]を作成し、要約や分析で既存のものを強化します。

例のプロンプト:
- `Create an investigation for the recent spike of errors in the checkout service`
- `Add an executive summary for this cost spike report`

#### APM {#apm}

##### トレース分析 {#trace-analysis}
個々の[トレース][3]を調査して、何が、どこで、なぜ失敗したのかを診断します。

例のプロンプト:
- `Why did this request fail?`
- `Summarize this trace and identify the root cause of the error`

##### レイテンシー調査 {#latency-investigations}
サービスのレイテンシーを調査して、ボトルネックリソースと遅いトレースで変更された内容を特定します。

例のプロンプト:
- `What caused the latency spike for this service?`
- `What's the latency bottleneck for this service?`

#### Cloud Cost Management {#cloud-cost-management}
[クラウドコスト][4]の変更を調査し、チームやリソースの責任を特定します。[Bits Chat の Cloud Cost スキル][9]を参照してください。

例のプロンプト:
- `Investigate why EC2 costs changed between January and February`
- `Which teams are responsible for the highest S3 storage costs this month?`

#### DDSQL {#ddsql}
自然言語を使用して、Datadog [テレメトリデータ][8]に対して [DDSQL][7] クエリを生成して実行します。

例のプロンプト:
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Query average request latency for the payments service broken down by status code`
- `Show me a DDSQL query for the number of RUM sessions by country over the past day`

### レポート {#reports}

Bits Chat Reports ページは、組織が Bits Chat をどのように使用しているかを可視化します。[**Bits AI** > **Chat** > **レポート**][10]に移動して、次を表示します。

- **トップユーザー**: 会話数でランク付けされた、Bits Chat を最も多く使用しているチームメンバーを確認します。
- **使用量の傾向**: 時間の経過に伴う会話量を追跡し、採用状況を把握し、使用パターンを特定します。
- **会話インテント分布**: 問題の調査、テレメトリの探索、Datadog のコンセプトの学習、監視可能性の構成など、意図カテゴリーごとに会話がどのように分かれているかを確認します。

これらのインサイトを使用して、採用パターンを把握し、ベストプラクティスを共有するためのパワーユーザーを特定し、組織にとって最も価値を提供するユースケースを評価します。

### ウェブアプリケーション {#web-application}
Datadog ウェブアプリケーションで Bits Chat を開く方法はいくつかあります。
- ナビゲーションバーの右上で、{{< ui >}}Ask Bits{{< /ui >}} をクリック
- Bits Chat と統合された Datadog 製品で、{{< ui >}}Ask Bits{{< /ui >}} をクリックする、または {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (きらきら星アイコン)
- <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd> を押す
- 左側のナビゲーションパネルで、{{< ui >}}Bits AI{{< /ui >}} をクリック

{{< img src="bits_ai/getting_started/bits_assistant_side_panel.png" alt="ダッシュボードリストの横に Bits Chat パネルが開く" style="width:40%;">}}

### モバイルアプリケーション {#mobile-application}

Bits にシステムやアクティブなインシデントについて質問してください。Bits は、Datadog の公開ドキュメント、テレメトリ、および所有権に関するコンテキストを持っています。

1. [モバイルアプリをダウンロードしてログイン][2]します。
2. ホーム画面で、{{< ui >}}Bits Assistant{{< /ui >}} をタップします。
3. 音声またはテキストで Bits Chat とのチャットを開始します。
{{< img src="bits_ai/getting_started/bits_ai_mobile_app_2026.png" alt="Bits AI を使用したモバイルアプリホームダッシュボードのビュー" style="width:40%;" >}}

### Slack {#slack}
1. [Datadog アカウントを Slack ワークスペースに接続][1]します。
1. Slack で `/dd connect` コマンドを使用して、接続するアカウントのリストを表示します。
1. ドロップダウンで、Datadog アカウントの名前を選択します。
1. Bits AI に必要な追加の権限を承認します。

セットアップが完了したら、自然言語で `@Datadog` にクエリを送信できます。`@Datadog Are there any issues with example-service's dependencies?`

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Slack におけるサービス依存関係クエリの例の出力" style="width:60%;">}}

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/slack/?tab=applicationforslack
[2]: /ja/mobile/#installing
[3]: /ja/tracing/trace_explorer/
[4]: /ja/cloud_cost_management/
[5]: /ja/dashboards/
[6]: /ja/notebooks/
[7]: /ja/ddsql_editor/
[8]: /ja/ddsql_reference/data_directory/
[9]: /ja/cloud_cost_management/cloud_cost_skill/
[10]: https://app.datadoghq.com/ask/usage