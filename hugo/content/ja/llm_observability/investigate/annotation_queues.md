---
aliases:
- /ja/llm_observability/evaluations/annotation_queues/
description: LLM トレースの体系的な人間によるレビューを有効にして、失敗モードの特定、自動評価の検証、ゴールデンデータセットの構築を行います。
further_reading:
- link: /llm_observability/investigate/evaluations/
  tag: ドキュメント
  text: 評価タイプについて学習する
- link: /llm_observability/configure/automation_rules
  tag: ドキュメント
  text: 自動化ルールを使用してトレースをキューに自動的にルーティングする
- link: /llm_observability/improve/experiments
  tag: ドキュメント
  text: 実験を実行して改善をテストします。
- link: https://www.datadoghq.com/blog/automations-annotation-queues
  tag: ブログ
  text: Datadog LLM Observability を使用してトレースにアノテーションを付け、LLM の品質を向上させます。
- link: /api/latest/agent-observability/
  tag: API
  text: Agent Observability API リファレンス
title: アノテーションキュー
---
## 概要 {#overview}

アノテーションキューは、LLM トレースの人間によるレビューのための構造化されたワークフローを提供します。アノテーションキューを使用して、以下のことを行います。
- スパン、メタデータ、ツール呼び出し、入力、出力、評価結果を含む完全なコンテキストでトレースをレビューする
- トレースに構造化ラベルと自由形式の観察結果を適用する
- 失敗パターンを特定して分類する
- LLM-as-a-Judge 評価の精度を検証する
- テストおよび検証用に、人間が検証したラベル付きのゴールデンデータセットを構築する


## アノテーションキューの作成 {#creating-an-annotation-queue}

### ステップ 1: キュー設定の構成 {#step-1-configure-queue-settings}

1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2] に移動し、プロジェクトを選択します。
2. {{< ui >}}Create Queue{{< /ui >}} をクリックします。
3. {{< ui >}}About{{< /ui >}} タブで、以下を構成します。
   - {{< ui >}}Name{{< /ui >}}: キューの目的を反映した説明的な名前 (例: 「Failed Evaluations Review - Q1 2026」)
   - {{< ui >}}Project{{< /ui >}}: このキューが属する Agent Observability プロジェクト
   - {{< ui >}}Description{{< /ui >}} (オプション): キューの目的やアノテーター向けの特別な指示を説明します

4. その後、{{< ui >}}Next{{< /ui >}} をクリックします。
5. {{< ui >}}Schema{{< /ui >}} タブで、新しいキューのラベルスキーマを定義します。ラベルを設定するときは、[Preview] ペインを使用して、アノテーターにラベルがどのように表示されるかを確認します。各ラベルを必須に設定でき、オプションで次の項目を追加できます。
   - {{< ui >}}Assessment criteria{{< /ui >}}: アノテーターがそのラベル値の合格/不合格を示せるようにします
   - {{< ui >}}Reasoning{{< /ui >}}: アノテーターが簡単な説明を追加できるようにします
6. キューの設定を確認し、{{< ui >}}Create{{< /ui >}} をクリックしてキューを作成します。

   {{< img src="llm_observability/evaluations/annotation_queues/schema_edit.png" alt="左側にラベル設定、右側に [Preview] ペインを表示した [Edit Queue] モーダルの [Schema ]タブ左側のパネルには、failure_type という名前のカテゴリカルラベルを設定するためのフィールドが表示され、3 つのカテゴリとして hallucination、formatting_error、refusal が設定されています。チェックボックスで [Assessment Criteria] と [Reasoning] オプションを有効にできます。右側の [Preview] ペインには、各カテゴリのチェックボックス、[Pass/Fail] の評価ボタン、[Reasoning] テキストフィールドを備えたラベルがアノテーターにどのように表示されるかが示されます。" style="width:100%;" >}}

### ステップ 2: アアノテーション対象のトレースを選択 {#step-2-select-traces-for-annotation}

Trace Explorer から手動でトレースをキューに追加するか、Automation Rules を使用してキューにトレースを自動的に追加できます。

{{< tabs >}}

{{% tab "Trace Explorer から手動で追加" %}}
Trace Explorer から手動でキューにトレースを追加します。
1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][1] に移動します。
2. 利用可能なファセット (評価結果、エラー状態、アプリケーション、時間範囲) を使用してトレースをフィルタリングします。
3. 個別のトレースを選択するか、複数のトレースを一括選択します。
4. {{< ui >}}Flag for Annotation{{< /ui >}} をクリックします。
5. {{< ui >}}Create New Queue{{< /ui >}} を選択するか、既存のキューを選択します。

[1]: https://app.datadoghq.com/llm/traces
{{% /tab %}}

{{% tab "Automation Rules の使用" %}}
トレースを手動で選択する代わりに、Automation Rules を使用して、フィルターとサンプリング基準に基づいてトレースをアノテーションキューに自動的にルーティングします。これにより、手動でトレースを選択することなく、継続的にキューにデータを自動追加できます。サポートされているフィルターフィールドや制限事項など、機能の詳細については [Automation Rules][5] を参照してください。

<div class="alert alert-info">自動化は以降適用されます。ルールに一致する新しいトレースは、到着するとキューにルーティングされます。フィルターに一致する既存のトレースは、遡って追加されません。</div>

自動化ルールにアノテーションキューのアクションを追加するには、
1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][1] に移動します。
2. フィルターを適用して、ルーティングするトレース (評価の失敗、レイテンシーのしきい値、特定のアプリケーションなど) を特定します。使用可能なフィールドについては、[Automation Rules > Supported filter fields][6] を参照してください。
3. {{< ui >}}Automate Query{{< /ui >}} をクリックします。
4. サンプリングレートを設定します (アノテーションキューの場合は最大 5%。例: 一致するトレースの 2%)。
5. {{< ui >}}Actions{{< /ui >}} で、{{< ui >}}Add to Annotation Queue{{< /ui >}} を選択します。
6. 対象のキューを選択します。
7. ルールを保存します。

ルールのフィルターに一致するトレースは、到着するとキューに追加されます。アノテーションキューには最大 1,000 件のレコードを保持でき、キューが上限に達すると自動化が一時停止します。

[1]: https://app.datadoghq.com/llm/traces
[5]: /ja/llm_observability/configure/automation_rules/
[6]: /ja/llm_observability/configure/automation_rules/#supported-filter-fields
{{% /tab %}}
{{< /tabs >}}


## トレースのアノテーション{#annotating-traces}

### キューへのアクセス{#accessing-your-queues}

[{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2] に移動して、利用可能なすべてのアノテーションキューを表示します。キューをクリックしてトレースリストを表示し、{{< ui >}}Review{{< /ui >}} をクリックしてアノテーションを開始します。

**注**: アノテーションタスクが新しく割り当てられると、Datadog はキュー名、割り当てたユーザー、および割り当てられたインタラクションを開くための直接リンクを含むメールを送信します。オプトアウトするには、[個人設定のメール購読][15]で Agent Observability のアノテーション割り当てメールを無効にします。

レビューモードには以下が表示されます。
- {{< ui >}}Full trace context{{< /ui >}} (右パネル):
  - 入力、出力、メタデータを含む完全なスパンツリー
  - ツール呼び出しと中間推論ステップ
  - トレースおよび個々のスパンに関する評価結果

- {{< ui >}}Annotation controls{{< /ui >}} (左パネル):
  - このキュー用に設定されたラベル
  - キュー内の位置を示す進捗インジケーター
  - ナビゲーションコントロール (前へ、次へ)
  
   {{< img src="llm_observability/evaluations/annotation_queues/review.png" alt="左側にアノテーションパネル、右側にトレース詳細を表示するアノテーションレビューインターフェイス。左パネルには、hallucination、formatting_error、refusal のチェックボックスを含むラベルコントロールが表示され、さらに [Pass] および [Fail] ボタンを備えた requires_escalation 評価と、下部に [Save] ボタンがあります。右パネルには、citizen_agent のトレース詳細が表示されており、スパンツリー、評価結果、および天気情報クエリに関する JSON 形式のデータを表示する Input と Output の展開可能なセクションが含まれています。" style="width:100%;" >}}

### ラベルの適用 {#applying-labels}

各トレースについて:
1. **完全なトレースコンテキストを確認する**: 必要に応じてスパンを展開し、入力、出力、ツール呼び出し、および評価結果を確認します。
2. **ラベルを適用する**: 評価に基づいて、設定されたラベルを入力します。
3. アノテーションは自動保存されます。
    
### アノテーションのベストプラクティス {#best-practices-for-annotation}

**一貫性を保つ**:
- 開始前に、キューの説明とラベルの定義を確認します。
- 複数のアノテーターが同じキューで作業する場合は、基準について共通認識を確立します。
- 判断が難しいケースについては、メモに理由を記録します。

**理由を提示する**:
- 特定のラベルを適用した理由を記録するために、自由形式のメモを使用します。
- 複数のトレースにわたって観察されるパターンをメモします。
- 理由を記録することで、評価基準を改善し、失敗モードを理解するのに役立ちます。

## キューの管理 {#managing-queues}

### キューの進捗状況の追跡 {#tracking-queue-progress}

[Annotations] リストページには、各キューの進捗バーが表示され、レビュー済みインタラクションと全インタラクションの比率が示されます。これを使用して、キュー全体のアノテーション完了状況を一目で確認できます。

### キューアクセスの管理 {#managing-queue-access}

キューの所有者は、キューの詳細からレビュー担当者リスト、アクセス設定、割り当てを管理します。キューの所有者のみが、レビュー担当者リスト、アクセス設定、または割り当てを変更できます。

アクセス制限は個別に適用されるため、いずれか一方または両方の制限を有効にできます。
- レビュー担当者の制限により、未割り当てのインタラクションを指定されたレビュー担当者に限定します。
- 割り当て担当者の制限により、割り当て済みのインタラクションを割り当てられた担当者に限定します。
- 両方の制限が有効な場合、レビュー担当者は未割り当てのインタラクションにアノテーションを付け、割り当て担当者は自身に割り当てられたインタラクションにアノテーションを付けます。

キューの所有者はアクセス権を保持し、すべてのインタラクションにアノテーションを付けることができます。

### アノテーションラベルによるトレースのフィルタリング {#filtering-traces-by-annotation-labels}

{{< ui >}}Annotation Labels{{< /ui >}} ファセットを使用して、アノテーションキューで適用されたラベルに基づいてトレースをフィルタリングします。これにより、次のことが可能になります。
- 特定の失敗モード (例: `failure_type: hallucination`) でタグ付けされたすべてのトレースを検索します。
- 下流のレビュー、データセットの作成、またはデータ分析用の CSV エクスポートに使用する、対象を絞ったサンプルを作成します。
  
### キューのスキーマの編集 {#editing-queue-schema}

作成後にキューのラベルスキーマを変更できます。
1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2] に移動します。
2. キューを開きます。
3. [Details] パネルが非表示の場合は、{{< ui >}}View Details{{< /ui >}} をクリックします。
4. {{< ui >}}Edit{{< /ui >}} をクリックします。
5. ラベルの追加、削除、または変更を行います。
6. {{< ui >}}Save Changes{{< /ui >}} をクリックします。

<div class="alert alert-info">スキーマを変更しても、すでに適用されているラベルには影響しませんが、アノテーターには今後、更新されたスキーマが表示されます。</div>

### アノテーション付きデータのエクスポート {#exporting-annotated-data}

分析やほかのワークフローで使用するために、アノテーション付きトレースをエクスポートします。

1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2] に移動します。
2. キューを開きます。
3. トレースを選択します (またはすべて選択します)。
4. {{< ui >}}Export{{< /ui >}} をクリックします。

ファイルは `annotations_<queue-id>.csv` としてダウンロードされます。[エクスポート API][5] を使用して、プログラムからスパンデータを取得することもできます。

{{% collapse-content title="CSV 形式" level="h4" expanded=false id="csv-format" %}}

各行は 1 つのアノテーション付きインタラクションを表します。ファイルは次の固定列で始まります。

| 列 | 説明 |
|--------|-------------|
| `Content ID` | アノテーション付きコンテンツの ID (トレース ID やセッション ID など)|
| `Type` | インタラクションタイプ: `trace`、`experiment_trace`、または `session` |
| `Input` | 入力の概要 (セッションインタラクションの場合は空)|
| `Output` | 出力の概要 (セッションインタラクションの場合は空)|
| `Expected Output` | {{< ui >}}Include Expected Output{{< /ui >}} が有効な場合にのみ存在し、実験トレースに対してのみ入力されます。|

固定列の後には、レビュアーごと、ラベルごとに 1 セットの列が続きます。レビュアーは表示名のアルファベット順に並べ替えられます (スペースはアンダースコアに置き換えられます)。ラベルは、キューのスキーマで定義された順序に従います。

| 列 | 説明 |
|--------|-------------|
| `{reviewer}_{label}` | ラベル値 (文字列、数値、Boolean、または JSON 配列)|
| `{reviewer}_{label}_assessment` | `pass` または `fail` (そのラベルに対して評価基準が有効な場合)|
| `{reviewer}_{label}_reasoning` | 自由記述の理由 (そのラベルに対して理由の記述が有効な場合)|

レビュアーが特定の行にアノテーションを付けていない場合、それらのセルは空になります。

**例**: レビュアーが Alice Johnson と Bob Smith、ラベルが `quality` (スコア) と `failure_type` (カテゴリ) であるキューでは、次のような列ヘッダーが生成されます。

```
Content ID,Type,Input,Output,Alice_Johnson_quality,Alice_Johnson_quality_assessment,Alice_Johnson_quality_reasoning,Alice_Johnson_failure_type,Alice_Johnson_failure_type_assessment,Alice_Johnson_failure_type_reasoning,Bob_Smith_quality,...
```

{{% /collapse-content %}}

#### トレース ID またはセッション ID でスパンを取得する {#retrieve-spans-by-trace-id-or-session-id}

アノテーションデータをエクスポートした後、[エクスポート API][5] を使用して CSV 内のトレースまたはセッションの完全なスパンデータを取得し、アノテーションラベルと結合します。

**トレース ID 別**:

{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
  --data-urlencode "filter[trace_id]=<TRACE_ID>"
{{< /code-block >}}

**セッション ID 別**:

{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
  --data-urlencode "filter[query]=@session_id:<SESSION_ID>"
{{< /code-block >}}

### データセットへの追加 {#adding-to-datasets}

アノテーション付きトレースを実験評価用のデータセットに転送します。

1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2] に移動します。
2. キューを開きます。
3. 転送するトレースを選択します。
4. {{< ui >}}Add to Dataset{{< /ui >}} をクリックします。
5. データセットの {{< ui >}}expected output{{< /ui >}} を設定します。
   - {{< ui >}}From interaction{{< /ui >}}: 各トレースの実際の出力を使用します。実験トレースの場合、{{< ui >}}Expected output{{< /ui >}} を選択して、実験のソースデータセットから元の期待出力を使用することもできます。
   - {{< ui >}}From annotation label{{< /ui >}}: アノテーターが適用した値を使用します。1 つ以上のラベルを選択します。レコードの `expected_output` は、選択内容に基づいて構築されます。
6. 既存のデータセットを選択するか、データセットを作成します。

**期待出力** がアノテーションラベルから構築される場合、エクスポートされる値はラベル名をキーとする JSON オブジェクトになります (例: `{ "is_harmful": false, "tone": ["neutral"], "topics": ["safety", "policy"] }`)。ラベルを1つ選択した場合でも、複数選択した場合でも、同じ形式が適用されます。カテゴリラベルは、シングルセレクトかマルチセレクトかに関わらず、常に選択されたオプションの配列としてエクスポートされます。

{{% collapse-content title="アノテーター間でアノテーション値を集計する方法" level="h4" expanded=false id="annotation-aggregation" %}}

複数のアノテーターが同じトレースにアノテーションを付けた場合、各ラベルの値はコンセンサスによって集計されます。

| ラベルタイプ   | 集計                                                                |
| ------------ | -------------------------------------------------------------------------- |
| Boolean      | 多数決 (同数の場合は `true` を優先)                              |
| カテゴリカル | 積集合: すべてのアノテーターが選択したオプションのソート済みセット |
| スコア        | 平均                                                                    |
| テキスト         | 回答リスト                                                          |

カテゴリカルラベル (単一選択または複数選択) の場合、集計値は*すべて*のアノテーターが選択したオプションのソート済み配列となります。アノテーターの選択が 1 つでも異なる場合、値は空の配列となります。アノテーターが 1 名のみの場合でも、結果は常に配列となります。

**例: カテゴリカル (コンセンサス)。**3 名のアノテーターが`tone`を評価し、全員が一致する場合、

- アノテーター A: `polite`
- アノテーター B: `polite`
- アノテーター C: `polite`

集計結果: `["polite"]`。

**例: カテゴリカル (不一致)。**3 名のアノテーターが `tone` を評価し、1 名が異なる場合、

- アノテーター A: `polite`
- アノテーター B: `rude`
- アノテーター C: `polite`

集計結果: `[]`。`rude` はすべてのアノテーターのセットに含まれていないため、積集合は空になります。

**例: カテゴリカル (複数選択)。**3 名のアノテーターが`topics`にタグ付けします (それぞれ複数のオプションを選択できます)。

- アノテーター A: `["safety", "policy"]`
- アノテーター B: `["safety", "billing"]`
- アノテーター C: `["safety", "policy"]`

集計結果: `["safety"]`。`safety` のみがすべてのアノテーターのセットに含まれます。`policy` は B の選択に含まれず、`billing` は A と C の選択に含まれません。

**例: テキスト。**2 名のアノテーターがメモを残します。

- アノテーター A: `"Confusing phrasing"`
- アノテーター B: `"Tone too casual"`

集計結果: `["Confusing phrasing", "Tone too casual"]`。すべてのアノテーターの値が保持されます。

アノテーターごとの生の値は、アノテーターの識別情報とともに各レコードのメタデータに保持されます。デフォルトのコンセンサスがワークフローに合わない場合は、別の戦略 (中央値、加重投票、レビュアーによる選択など) を使用して再計算できます。

{{% /collapse-content %}}

期待出力として選択されなかったラベルも、メタデータとして各トレースに含まれます。

実験でのデータセットの使用に関する詳細については、[データセット][3]を参照してください。

### キューの削除 {#deleting-queues}

キューを削除するには、
1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2] に移動します。
2. キューを開きます。
3. [Details] パネルの {{< ui >}}Delete{{< /ui >}} をクリックします。

<div class="alert alert-info">キューを削除すると、キューとラベルの関連付けは削除されますが、Agent Observability の基盤となるトレースは削除されません。トレースは引き続き Trace Explorer でアクセスできます。</div>

## API の使用 {#using-the-api}

アノテーションキューはプログラムで管理できます。以下のエンドポイントは [Agent Observability API リファレンス][4]で利用できます。

| エンドポイント | 説明 |
|----------|-------------|
| [アノテーションキューの一覧表示][6] | 組織内のすべてのアノテーションキューを一覧表示します。|
| [アノテーションキューの作成][7] | アノテーションキューを作成します。`name` および `project_id` は必須です。作成時にラベルを定義するためのオプションの `annotation_schema` を含めます。|
| [アノテーションキューの更新][8] | キューの `name`、`description`、または `annotation_schema` を部分的に更新します。|
| [アノテーションキューの削除][9] | ID を指定してアノテーションキューを削除します。|
| [キューにインタラクションを追加][10] | レビューのために、1 つ以上のトレースをアノテーションキューに追加します。|
| [キューからインタラクションを削除][11] | インタラクション ID を指定して、キューから特定のインタラクションを削除します。|
| [アノテーション付きインタラクションを取得][12] | キューのすべてのインタラクションと、それらに適用されたアノテーションラベルを取得します。|
| [ラベルスキーマを取得][13] | キュー用に構成されたラベルスキーマを取得します。|
| [ラベルスキーマの更新][14] | キューのラベルスキーマを作成または置換します。|

## データ保持 {#data-retention}


| データ              | 保持期間                                    |
| ----------------- | ----------------------------------------------------|
| キュー内のトレース  | 組織のトレース保持期間によって制限されます|
| アノテーションラベル | 無期限                                          |


## サンプルワークフロー {#example-workflows}

{{% collapse-content title="エラー分析と障害モードの発見" level="h3" expanded=true id="example-error-analysis-and-failure-mode-discovery" %}}
失敗したトレースをレビューして繰り返し発生するパターンを特定し、アプリケーションが本番環境でどのように失敗するかを分類します。

1. Trace Explorer で失敗した評価や特定のエラーパターンのトレースをフィルタリングする
2. トレースを手動で選択し、アノテーションキューに追加する
3. アノテーターがトレースをレビューし、フリーフォームのメモで障害タイプを記録する
4. 一般的なパターン (特定のコンテキストでのハルシネーション、フォーマットの問題、不適切な拒否など) を特定する
5. 特定された障害モードのカテゴリラベルを作成し、トレースを再コーディングする
6. 失敗モードの分布を使用して修正の優先順位を決定する

#### キュー設定 {#queue-configuration}

- **ラベル**: 自由形式のメモ、`failure_type`カテゴリラベル、合格/不合格の評価
- **アノテーター**: プロダクトマネージャー、エンジニア、ドメインエキスパート

{{% /collapse-content %}}

{{% collapse-content title="LLM-as-a-Judge 評価の検証" level="h3" expanded=true id="example-validating-llm-as-a-judge-evaluations" %}}

自動評価者が不確実または不正確である可能性のあるトレースを見つけ、人手で正解データを提供します。

1. 評価結果のサンプリング: すべての結果、または特定のスコア/しきい値
2. 選択したトレースをアノテーションキューに追加する
3. アノテーターがトレースをレビューし、同じ基準で人手によるスコアを提供する
4. 人手によるラベルと自動評価スコアを比較する
5. 体系的な不一致 (評価者が厳しすぎる、寛容すぎる、または基準を誤解しているなど) を特定する
6. 不一致に基づいて評価プロンプトを改善する

#### キュー設定 {#queue-configuration-1}

- **ラベル**: 評価基準 (0 - 10) に対応する数値スコア、カテゴリ `judge_accuracy` ラベル、推論メモ
- **アノテーター**: 評価基準を理解している対象分野の専門家

{{% /collapse-content %}}

{{% collapse-content title="ゴールデンデータセットの作成" level="h3" expanded=true id="example-golden-dataset-creation" %}}

回帰テストおよび継続的な検証のために、人手で検証したラベルを持つベンチマークデータセットを構築する。

1. Trace Explorer から多様な本番トレースをサンプリングする (良い例と悪い例の両方)
2. アノテーションキューにトレースを追加する
3. アノテーターが複数の品質側面にわたってトレースをレビューし、ラベル付けを行う
4. 信頼度が高く、適切にラベル付けされた例をゴールデンデータセットに追加する
5. データセットを使用して、プロンプトの変更に対する CI/CD 回帰テストを行う
6. 新しいエッジケースでデータセットを継続的に拡張する

#### キュー設定 {#queue-configuration-2}

- **ラベル**: 品質側面、数値スコア、合格/不合格評価、メモを網羅する複数のカテゴリラベル
- **アノテーター**: 一貫性を保つためのドメイン専門家チーム
{{% /collapse-content %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: https://app.datadoghq.com/llm/annotations/queues
[3]: /ja/llm_observability/improve/datasets
[4]: /ja/api/latest/agent-observability/
[5]: /ja/llm_observability/investigate/export_api/?tab=model#api-standards
[6]: /ja/api/latest/agent-observability/#list-agent-observability-annotation-queues
[7]: /ja/api/latest/agent-observability/#create-an-agent-observability-annotation-queue
[8]: /ja/api/latest/agent-observability/#update-an-agent-observability-annotation-queue
[9]: /ja/api/latest/agent-observability/#delete-an-agent-observability-annotation-queue
[10]: /ja/api/latest/agent-observability/#add-annotation-queue-interactions
[11]: /ja/api/latest/agent-observability/#delete-annotation-queue-interactions
[12]: /ja/api/latest/agent-observability/#get-annotated-queue-interactions
[13]: /ja/api/latest/agent-observability/#get-annotation-queue-label-schema
[14]: /ja/api/latest/agent-observability/#update-annotation-queue-label-schema
[15]: /ja/account_management/#email-subscriptions