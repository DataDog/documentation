---
aliases:
- /ja/llm_observability/cluster_map
- /ja/llm_observability/monitoring/cluster_map
description: 自動化されたトピックのクラスター化を使用して、エージェントの本番トラフィックのパターンを発見および分析します。
further_reading:
- link: /llm_observability/
  tag: ドキュメント
  text: Agent Observability について学ぶ
- link: /llm_observability/terms/
  tag: ドキュメント
  text: Agent Observability の主要な用語と概念について学ぶ
- link: /llm_observability/experiments/datasets
  tag: ドキュメント
  text: データセットについて学ぶ
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: ラーニングセンター
  text: LLM Observability で調査する
- link: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
  tag: ラーニングセンター
  text: LLM アプリケーションのトレーシング
- link: https://www.datadoghq.com/blog/patterns-agent-observability/
  tag: ブログ
  text: Agent Observability の Patterns を使用して本番環境での LLM の動作を把握する
title: Patterns
---
## 概要 {#overview}

Patterns は、LLM アプリケーションの本番トラフィックを、意味のあるトピックに自動的にクラスター化します。これは、ユーザーが何を求めているのかを把握したり、カバレッジのギャップを特定したり、障害モードを診断したりするのに役立ちます。

名前付きの Patterns を複数作成して、それぞれ異なるアプリケーション、スパンタイプ、またはユースケースにスコープを設定できます。

## 仕組み {#how-it-works}

Patterns は、[接続された LLM プロバイダーアカウント][1]への呼び出しとテキスト埋め込みを組み合わせて、本番環境での動作を解釈可能な形式で表示します。手動でタグ付けする必要はありません。

Patterns を実行すると、以下の処理が行われます。

1. フィルターおよびサンプリング設定に基づいて、本番トラフィックから LLM インタラクションを抽出します。
2. AI が生成したテキストを使用して、各インタラクションを要約します。
3. セルフホスト型のオープンソースモデルを使用して、それらの要約のテキスト埋め込みを計算します。
4. 機械学習 (UMAP および HDBSCAN) を使用してクラスターを形成します。
5. 各クラスターをレビューし、AI 生成テキストを使用して意味のあるトピックを生成します。
6. 各インタラクションを単一のトピックに割り当てます。
7. AI を使用して、類似したトピックをグループ化することで階層を構築します。

各トピックには、そのインタラクション数と、全トラフィックに占める割合が表示されます。どのクラスターにも適合しないインタラクションは、外れ値グループに収集されます。

## Patterns を設定する{#set-up-a-pattern}

1. Datadog で、[**AI Observability**] > [**Agent Observability**] > [[**Patterns**]][4] に移動します。
1. [**+ New Pattern**] (+ 新規 Patterns) をクリックします。
1. [**Name**] (名前) に名前を入力します。
1. [**Select a model**] (モデルを選択) をクリックします。モデル設定ウィンドウが開きます。ここでは、Agent Observability がトピック名、要約、トピック階層を生成したり、各インタラクションをトピックに割り当てたりするために使用する詳細を追加できます。
   - **LLM Provider** (LLM プロバイダー): サポートされているプロバイダーは、OpenAI、Anthropic、Amazon Bedrock、Azure OpenAI、および Vertex AI です。
   - **Account** (アカウント)
   - **Model** (モデル)
1. [**Confirm**] (確認) をクリックして変更を保存し、ウィンドウを閉じます。
1. [**Runs on**] (実行環境) で以下の操作を行います。
   1. [**Application**] (アプリケーション) マルチセレクターを使用して、スパンを含める LLM アプリケーションを 1 つ以上選択します。アプリケーションを選択すると、基盤となるスパンフィルタークエリが自動的に更新されます。また、クエリを編集すると、選択されたアプリケーションが更新されます。より詳細なスコープ設定を行うには、セレクターの横にあるフィルターアイコンをクリックして [**Advanced**] (詳細) ポップオーバーを開きます。以下が表示されます。
      - **Which spans do you want to cluster?** (どのスパンをクラスター化しますか?): 環境、スパンタイプ、またはその他のタグでスコープを絞り込むための、未加工のスパンフィルタークエリです。
      - **Time window** (時間枠): 分析対象のインタラクションのルックバック期間です。
   1. [**Sampling Rate**] (サンプリングレート) を設定します。これは、含める一致インタラクションの割合です。Patterns は、実行ごとに最大 10,000 件のレコードを処理します。フィルターがそれ以上のレコードに一致する場合、Agent Observability は、その数に達するまでレコードをランダムにサンプリングします。
1. [**What should we detect Patterns on?**] (Patterns を何に対して検出しますか?) の下に、分析のためにモデルに送信される内容を定義するテンプレートを入力します。`{{variable}}` syntax to reference any span field; for example, `{{meta.input.value}}` to analyze patterns by user input, or `スパンの種類ごとに分析する場合は {{meta.span.kind}}`。一般的な構成を確認するには [{{< ui >}}Template Examples{{< /ui >}}] (テンプレートの例) をクリックします。入力すると、右側のパネルに一致するスパンがプレビュー表示され、参照した変数の値を持つインタラクションの割合が表示されます。
1. [**How often should we run Patterns?**] (Patterns をどのくらいの頻度で実行しますか?) の下で、パターンの実行方法を選択します。スケジュールされた時刻には、Datadog のタイムゾーン設定が使用されます。スケジュールされた実行は手動実行と同じパイプラインを使用するため、結果は同じ場所に表示され、Patterns ページには常に最新の実行結果が表示されます。
   - **On demand** (オンデマンド) (デフォルト): パターンを手動で実行します。
   - **Daily** (毎日)、**Weekdays** (平日)、**Weekly** (毎週): 選択した時刻 (および毎週の場合は曜日) に自動的に実行します。
   - **Custom** (カスタム): 1〜7 日ごとに自動的に実行します。
1. (オプション) [**Dataset coverage**] (データセットカバレッジ) の下で、本番トラフィックのカバレッジを測定するためのオフライン評価データセットを 1 つ以上選択します。カバレッジのギャップを自動的に埋めるには、[**Automatic dataset curation**] (自動データセットキュレーション) トグルを有効にします。有効にすると、Datadog は管理対象プロジェクト (`Patterns-coverage`) とパターンごとのデータセット (`{pattern-name}-pattern-curated`) を作成して、実行のたびに推奨されるインタラクションを受け取ります。このトグルは、新しい Patterns に対してデフォルトで**オン**になります。
1. [**Create and Run Pattern**] (Patterns を作成して実行) をクリックするか、実行せずに作成するには [**Create Pattern**] (Patterns を作成) をクリックします。

## Patterns を探索する {#explore-your-patterns}

ヘッダーのドロップダウンを使用して、名前付きの Patterns を切り替えます。各 Patterns には、最新の実行結果が表示されます。

### サマリーメトリクスを確認する{#read-the-summary-metrics}

Patterns ページの上部には、最新の実行結果から 3 つのメトリクスが表示されます。
- {{< ui >}}Total interactions{{< /ui >}} (インタラクションの合計): 分析されたインタラクションの数
- {{< ui >}}Identified topics{{< /ui >}} (識別されたトピック): 親トピックと子トピックを含む、検出された個別のトピックの合計数
- {{< ui >}}Classified{{< /ui >}} (分類済み): 名前付きトピックに割り当てられた分析済みインタラクションの割合 — 外れ値に含まれるインタラクションは未分類としてカウントされます

### ディメンション別に Patterns を可視化する{#visualize-patterns-by-dimension}

トピックテーブルの上部にある散布図で、各 Patterns を比較できます。各バブルは 1 つのトピックを表しており、Y 軸はインタラクション数、X 軸は [Dimension] (ディメンション) ドロップダウンで選択したメトリクス (例: 合計エラー数) を示します。このチャートを使用して、ボリュームに対してエラー率やレイテンシが異常に高いトピック (外れ値) を見つけます。

{{< img src="llm_observability/patterns_landing_page.png" alt="トピックごとに 1 つのバブルを表示するバブルチャートが表示された Patterns ページ。Y 軸はインタラクション数、X 軸は選択したメトリクスディメンションを示します。" style="width:100%;" >}}

### トピックを一覧表示する{#navigate-the-topic-list}

トピックテーブルには、検出されたすべてのトピックが階層構造で表示されます。各トピックには以下が表示されます。

- {{< ui >}}Pattern{{< /ui >}} — クラスター内のインタラクションに基づいて自動生成された名前と説明
- {{< ui >}}Interactions{{< /ui >}} (インタラクション) — 合計トラフィックの件数と割合
- {{< ui >}}Cost{{< /ui >}} (コスト) — このトピックのインタラクションの推定 LLM コスト
- {{< ui >}}Tokens{{< /ui >}} (トークン) — このトピックのインタラクションのトークン使用量
- {{< ui >}}Errors{{< /ui >}} (エラー) — エラー数とエラー率
- {{< ui >}}Latency{{< /ui >}} (レイテンシ) — このトピックのインタラクションの中央値レイテンシ
- {{< ui >}}Online Evals{{< /ui >}} (オンライン評価) — オンライン評価が構成されている場合の評価結果
 

親トピックを展開してサブトピックを表示し、アプリケーションのトラフィックの特定の領域を調査します。

### トピックをドリルダウンする {#drill-into-a-topic}

トピック名をクリックすると、詳細ビューが開きます。詳細ビューには、トピックが表す内容の概要および合計インタラクション数と、各インタラクションの子トピックラベル、入力テキスト、タイムスタンプを含むインタラクションテーブルが表示されます。キーワードでテーブルを検索して、特定の例を見つけます。


{{< img src="llm_observability/patterns_topic_details.png" alt="トピックの概要および合計インタラクション数と、子トピックラベル、入力テキスト、タイムスタンプを含むインタラクションテーブルを表示するトピック詳細ビュー。" style="width:100%;" >}}

### インタラクションをエクスポートおよび操作する {#export-and-act-on-interactions}
トピックの詳細ビュー内にあるインタラクションテーブルから、そのクラスター内のインタラクションを操作できます。

- **Download as CSV** (CSV としてダウンロード): インタラクションを CSV ファイルとしてエクスポートします。
- **Add to Dataset** (データセットに追加): インタラクションを[データセット][2]に送信して、実際の本番トラフィックから評価テストケースを作成します。
- **Add to Queue** (キューに追加): インタラクションを [アノテーションキュー][3] に送信して、人間によるレビューとラベル付けを行います。

## 新しい実行をトリガーする {#trigger-a-new-run}

本番トラフィックを分析するには、Patterns ヘッダーの [{{< ui >}}Run analysis{{< /ui >}}] (分析を実行) をクリックします。パイプラインはバックグラウンドで実行され、5 〜 10 分かかります。ページを閉じて後で戻ることができます。実行が完了すると、ヘッダーに前回の実行日とルックバック期間が表示されます。

実行が失敗した場合、モーダルウィンドウでその原因と取るべきアクションが説明されます。失敗した実行はヘッダーに表示され、ページには直近の成功した実行の結果が引き続き表示されます。

## トピックを使用してアプリケーションを改善する{#use-topics-to-improve-your-application}

### 本番トラフィックを理解する{#understand-your-production-traffic}

トピックリストを使用して、ユーザーが実際にアプリケーションで何を行っているかを確認します。

トラフィックの割合を使用して、最も一般的なユースケースを特定します。親子階層により、高レベルのパターンからその下の具体的なサブパターンへと、順を追って確認できます。

### 評価カバレッジのギャップを見つける{#find-evaluation-coverage-gaps}

トピックの分布を、ゴールデンデータセットが実際にカバーしている内容と比較します。本番環境で高いトラフィック量を示しているにもかかわらず、対応する評価ケースが存在しないトピックを確認してください。ここにテストカバレッジのギャップがあり、モデルのリグレッションがユーザーに到達する前に検出される可能性が最も低い箇所となります。

### 評価データセットを自動的にキュレートする{#automatically-curate-evaluation-datasets}

自動データセットキュレーションが有効になっている場合、Patterns の実行ごとに、カバレッジが不足しているトピックの推奨インタラクションが管理対象のデータセット (`Patterns-coverage` プロジェクト内の `{pattern-name}-pattern-curated`) に直接追加されます。実行が完了したら、トピックの詳細ビューを開いて [**Access dataset**] (データセットにアクセス) をクリックし、キュレートされたレコードを確認して評価テストケースとして使用します。

### 失敗パターンを診断する{#diagnose-failure-patterns}

Patterns のフィルターのスコープを、品質スコアが低いスパンや評価が失敗したスパンに絞り込み、分析を実行します。結果として得られるトピックの分類により、どのタイプのリクエストが最も失敗しているかが示されるため、構造化された方法で修正の優先順位を付けることができ、トレースごとにデバッグする必要がなくなります。

### トラフィックの推移を追跡する{#track-how-traffic-evolves}

Patterns を定期的に再実行し、[{{< ui >}}Compare to{{< /ui >}}] (比較) ドロップダウンを使用して実行間でトピック分布を比較します。{{< ui >}}NEW{{< /ui >}} とマークされたトピックが上位に表示される場合は、ユーザーが新しいユースケースや新しい失敗モードを発見したことを示しています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account/
[2]: /ja/llm_observability/experiments/datasets/
[3]: /ja/llm_observability/evaluations/annotation_queues/
[4]: https://app.datadoghq.com/llm/patterns