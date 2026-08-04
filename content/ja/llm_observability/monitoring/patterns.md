---
aliases:
- /ja/llm_observability/cluster_map
- /ja/llm_observability/monitoring/cluster_map
description: 自動化されたトピッククラスタリングを使用して、Agent 内の本番環境トラフィックパターンを発見、分析します。
further_reading:
- link: /llm_observability/
  tag: ドキュメント
  text: Agent Observability について
- link: /llm_observability/terms/
  tag: ドキュメント
  text: Agent Observability の主要な用語と概念について
- link: /llm_observability/experiments/datasets
  tag: ドキュメント
  text: データセットについて
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: ラーニングセンター
  text: LLM Observability で調査します。
- link: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
  tag: ラーニングセンター
  text: LLM アプリケーションのトレース
title: Patterns
---
## 概要 {#overview}

Patterns は、LLM アプリケーションの本番環境トラフィックを意味のあるトピックに自動的にクラスタリングし、ユーザーが何を求めているかの理解、カバレッジギャップの特定、障害モードの診断を支援します。

それぞれ異なるアプリケーション、スパンタイプ、またはユースケースを対象とした、名前付きの Patterns を複数作成できます。

## 仕組み {#how-it-works}

Patterns は、[接続された LLM プロバイダーアカウント][1] への呼び出しとテキスト埋め込みを組み合わせて使用し、手動でタグ付けすることなく、本番環境の動作を解釈可能な形で把握できるようにします。

Pattern を実行すると、以下の処理が行われます。

1. フィルターおよびサンプリング設定に基づいて、本番環境トラフィックから LLM インタラクションを取得します
2. AI 生成テキストを使用して各インタラクションを要約します
3. セルフホスト型のオープンソースモデルを使用して、これらの要約のテキスト埋め込みを計算します
4. 機械学習 (UMAP および HDBSCAN) を使用してクラスターを形成します
5. 各クラスターをレビューし、AI 生成テキストを使用して意味のあるトピックを生成します
6. 各インタラクションを単一のトピックに割り当てます
7. AI を使用して類似のトピックをグループ化し、階層を構築します

各トピックには、インタラクションのボリュームと全トラフィックに占める割合が表示されます。どのクラスターにも適合しないインタラクションは、外れ値グループに収集されます。

## Pattern を設定する {#set-up-a-pattern}

1. Datadog で、**AI Observability** > **Agent Observability** > [**Patterns**][4] に移動します。
1. **+ New Pattern** をクリックします。
1. **Name** を入力します。
1. **Select a model** をクリックします。モデル構成ウィンドウが開き、Agent Observability がトピック名、要約、トピック階層を生成し、各インタラクションをトピックに割り当てるために使用する詳細を追加できます。
   - **LLM Provider**: サポートされているプロバイダーは、OpenAI、Amazon Bedrock、および Azure OpenAI です
   - **アカウント**
   - **モデル**
1. **Confirm** をクリックして変更を保存し、ウィンドウを閉じます。
1. **Runs on**:
   1. **Application** マルチセレクターを使用して、スパンを含める 1 つ以上の LLM アプリケーションを選択します。アプリケーションを選択すると、基盤となるスパンフィルタークエリが自動的に更新され、クエリを編集すると選択したアプリケーションが更新されます。より詳細なスコープ設定を行うには、セレクターの横にあるフィルターアイコンをクリックして **Advanced** ポップオーバーを開きます。ここには以下が表示されます。
      - **どのスパンをクラスター化しますか:** 環境、スパンタイプ、またはその他のタグでスコープを設定するための未加工のスパンフィルタークエリ。
      - **時間枠:** 分析対象となるインタラクションのルックバック期間。
   1. **Sampling Rate を設定します**: 含める一致するインタラクションの割合。Patterns は実行ごとに最大 10,000 件のレコードを処理します。フィルターがそれを超える数のレコードに一致する場合、Agent Observability はその数に達するまでレコードをランダムにサンプリングします。
1. **What should we detect Patterns on?** の下で、分析のためにモデルに送信される内容を定義するテンプレートを入力します。`{{variable}}` syntax to reference any span field; for example, `{{meta.input.value}}` to analyze patterns by user input, or `{{meta.span.kind}}` を使用してスパンの種類ごとに分析します。{{< ui >}}Template Examples{{< /ui >}} をクリックして、一般的な構成を確認します。入力すると、右側のパネルで一致するスパンがプレビューされ、参照した変数の値を持つインタラクションの割合が表示されます。
1. **How often should we run Patterns?** の下で、Pattern の実行方法を選択します。スケジュールされた時間は、Datadog のタイムゾーン設定を使用します。スケジュールされた実行は手動実行と同じパイプラインを使用するため、結果は同じ場所に表示され、[Patterns] ページには常に最新の実行結果が表示されます。
   - **On demand** (デフォルト): Pattern を手動で実行します。
   - **Daily**、**Weekdays**、または **Weekly**: 選択した時間 (Weekly の場合は曜日も) に自動的に実行します。
   - **Custom**: 1〜7 日ごとに自動的に実行します。
1. **Create and Run Pattern** をクリックするか、**Create Pattern** をクリックして、実行せずに作成します。

## Patterns を確認する {#explore-your-patterns}

ヘッダーのドロップダウンを使用して、名前付き Patterns を切り替えます。各 Pattern には、最新の実行結果が表示されます。

### サマリーメトリクスを確認する {#read-the-summary-metrics}

[Patterns] ページの上部には、最新の実行結果から 3 つのメトリクスが表示されます。
- {{< ui >}}Total interactions{{< /ui >}}: 分析されたインタラクションの数
- {{< ui >}}Identified topics{{< /ui >}}: 親トピックと子トピックを含む、検出された個別のトピックの総数
- {{< ui >}}Classified{{< /ui >}}: 名前付きトピックに割り当てられた分析済みインタラクションの割合 — 外れ値に含まれるインタラクションは未分類としてカウントされます

### ディメンションごとにパターンを可視化する{#visualize-patterns-by-dimension}

トピックテーブルの上部にある散布図で、Patterns 同士を比較します。各バブルは 1 つのトピックを表しており、Y 軸はインタラクションの数、X 軸は Dimension ドロップダウンで選択されたメトリクス (例: total errors) を示しています。このチャートを使用して、ボリュームに対して予期せず高いエラー率やレイテンシーを示すトピック (外れ値) を見つけます。

{{< img src="llm_observability/patterns_landing_page.png" alt="トピックごとに 1 つのバブルがあるバブルチャートを表示する [Patterns] ページ。Y 軸はインタラクション数を示し、X 軸は選択されたメトリクスディメンションを示します。" style="width:100%;" >}}

### トピックリストを確認する{#navigate-the-topic-list}

トピックテーブルは、検出されたすべてのトピックの階層ビューを提供します。各トピックには以下が表示されます。

- {{< ui >}}Pattern{{< /ui >}} — クラスター内のインタラクションに基づいて自動生成された名前と説明
- {{< ui >}}Interactions{{< /ui >}} — カウントと全トラフィックに占める割合
- {{< ui >}}Cost{{< /ui >}} — このトピックのインタラクションに対する推定 LLM コスト
- {{< ui >}}Tokens{{< /ui >}} — このトピックのインタラクションのトークン使用量
- {{< ui >}}Errors{{< /ui >}} — エラー数とエラー率
- {{< ui >}}Latency{{< /ui >}} — このトピックのインタラクションのレイテンシー中央値
- {{< ui >}}Online Evals{{< /ui >}} — オンライン評価が設定されている場合の評価結果
 

親トピックを展開してサブトピックを表示し、アプリケーションのトラフィック内の特定の領域を調査します。

### トピックを掘り下げる{#drill-into-a-topic}

任意のトピック名をクリックすると、詳細ビューが開きます。詳細ビューには、トピックが表す内容の概要、合計インタラクション数、および各インタラクションの子トピックラベル、入力テキスト、タイムスタンプを含むインタラクションテーブルが表示されます。キーワードでテーブルを検索して、特定の例を見つけます。


{{< img src="llm_observability/patterns_topic_details.png" alt="トピックの概要、合計インタラクション数、および子トピックラベル、入力テキスト、タイムスタンプを含むインタラクションテーブルを表示するトピック詳細ビュー。" style="width:100%;" >}}

### インタラクションをエクスポートして活用する {#export-and-act-on-interactions}
トピックの詳細ビュー内にあるインタラクションテーブルから、そのクラスター内のインタラクションに対してアクションを実行できます。

- **CSV としてダウンロード:** CSV ファイルとしてインタラクションをエクスポートします。
- **データセットに追加:** インタラクションを [データセット][2] に送信し、実際の本番環境トラフィックから評価テストケースを作成します。
- **キューに追加:** インタラクションを [Annotation Queue][3] に送信し、人によるレビューとラベル付けを行います。

## 新しい実行をトリガーする {#trigger-a-new-run}

本番環境のトラフィックを分析するには、Patterns ヘッダーの {{< ui >}}Run analysis{{< /ui >}} をクリックします。パイプラインはバックグラウンドで実行され、5〜10 分かかります。ページを閉じて後で戻ることもできます。実行が完了すると、ヘッダーに最後の実行日とルックバック期間が表示されます。

実行が失敗した場合は、モーダルウィンドウで原因と実行するアクションが説明されます。失敗した実行がヘッダーに表示されている間も、ページには直近で成功した実行結果が表示され続けます。

## トピックを使用してアプリケーションを改善する {#use-topics-to-improve-your-application}

### 本番環境のトラフィックを把握する {#understand-your-production-traffic}

トピックリストを使用して、ユーザーがアプリケーションで実際に何を行っているかを確認します。

トラフィックの割合を使用して、最も一般的なユースケースを特定します。親子階層により、高レベルのパターンからその下の特定のサブパターンへと詳細を確認できます。

### 評価カバレッジのギャップを見つける {#find-evaluation-coverage-gaps}

トピックの分布を、ゴールデンデータセットが実際にカバーしている範囲と比較します。本番環境でのボリュームは大きいものの、対応する評価ケースが存在しないトピックを確認します。これはテストカバレッジにギャップがある箇所であり、モデルのリグレッションがユーザーに到達する前に検出される可能性が最も低い箇所でもあります。

### 失敗パターンを診断する {#diagnose-failure-patterns}

Pattern のフィルターを、品質スコアが低いスパンまたは評価に失敗したスパンに絞り込み、その分析を実行します。結果として得られるトピック分類により、どのタイプのリクエストが最も失敗しているかが示されるため、トレースを 1 つずつデバッグするのではなく、構造化された方法で修正の優先順位を付けることができます。

### トラフィックの推移を追跡する {#track-how-traffic-evolves}

Pattern を定期的に再実行し、{{< ui >}}Compare to{{< /ui >}} ドロップダウンを使用して実行ごとのトピック分布を比較します。{{< ui >}}NEW{{< /ui >}} とマークされたトピックが上位に表示される場合は、ユーザーが新しいユースケースや新しい障害モードを発見したことを示しています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account/
[2]: /ja/llm_observability/experiments/datasets/
[3]: /ja/llm_observability/annotation_queues/
[4]: https://app.datadoghq.com/llm/patterns