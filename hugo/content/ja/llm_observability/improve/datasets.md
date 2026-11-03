---
aliases:
- /ja/llm_observability/experiments/datasets/
description: Agent Observability Experiments におけるデータセットの使用方法 (データセットの作成、取得、管理方法、およびバージョニングに関する情報など)。
further_reading:
- link: /llm_observability/configure/automation_rules
  tag: ドキュメント
  text: 自動化ルールを使用してトレースをデータセットに自動的にルーティングする
title: データセット
---
Agent Observability Experiments において、_データセット_とは、エージェントのテストに使用するシナリオを表す_入力_、_期待される出力_、および_メタデータ_の集合のことを言います。各データセットは_プロジェクト_に関連付けられています。 

データセット内の各レコードには以下が含まれます。
- **入力** (必須): エージェントがタスク内でアクセスできるすべての情報を表します。
- **期待される出力** (任意): _グラウンドトゥルース_とも呼ばれ、エージェントが出力すべき理想的な回答を表します。_期待される出力_を使用して、アプリの実際の出力や、評価する中間結果を保存できます。
- **メタデータ** (任意): レコードを分類し、詳細分析に使用するための有用な情報が含まれます。例: トピック、タグ、説明、メモ。
- **ID** (任意): ユーザー定義のレコードの識別子。128 文字以下である必要があり、文字、数字、`_`、`-`、または `.` のみを含めることができます。指定されない場合は、SDK によって自動的に生成されます。

データセットを使用することで、実験全体で一貫した評価シナリオが提供され、体系的なテストと回帰検出が可能になります。

### データセットを作成する {#creating-a-dataset}

データセットは、本番データや CSV ファイルから作成することも、プログラムによって手動で作成することもできます。

{{< tabs >}}

{{% tab "CSV ファイルから" %}}

CSV ファイルからデータセットを作成する場合は、`LLMObs.create_dataset_from_csv()` を使用します。

```python
# Create dataset from CSV
dataset = LLMObs.create_dataset_from_csv(
    csv_path="questions.csv",
    dataset_name="capitals-of-the-world",
    project_name="capitals-project",              # Optional: defaults to the project name from LLMObs.enable
    description="Geography quiz dataset",         # Optional: Dataset description
    input_data_columns=["question", "category"],  # Columns to use as input
    expected_output_columns=["answer"],           # Optional: Columns to use as expected output
    metadata_columns=["difficulty"],              # Optional: Additional columns as metadata
    id_column="record_id",                        # Optional: Column to use as record IDs
    csv_delimiter=","                             # Optional: Defaults to comma
)

# Example "questions.csv":
# record_id,question,category,answer,difficulty
# japan-capital,What is the capital of Japan?,geography,Tokyo,medium
# brazil-capital,What is the capital of Brazil?,geography,Brasília,medium

```

**注**:
- CSV ファイルにはヘッダー行が含まれている必要があります。
- 最大フィールドサイズは 10MB です。
- `input_data_columns`、`expected_output_columns`、または `id_column` で指定されていないすべての列は、自動的にメタデータとして扱われます。
- データセットは、作成後に自動的に Datadog にプッシュされます。

{{% /tab %}}

{{% tab "手動作成" %}}

データセットを手動で作成する場合は、`LLMObs.create_dataset()` を使用します。

```python
from ddtrace.llmobs import LLMObs

dataset = LLMObs.create_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project", # optional, defaults to project_name used in LLMObs.enable
    description="Questions about world capitals",
    records=[
        {
            "id": "china-capital",                                             # optional, user-defined record ID
            "input_data": {"question": "What is the capital of China?"},       # required, JSON or string
            "expected_output": "Beijing",                                      # optional, JSON or string
            "metadata": {"difficulty": "easy"}                                 # optional, JSON
        },
        {
            "input_data": {"question": "Which city serves as the capital of South Africa?"},
            "expected_output": "Pretoria",
            "metadata": {"difficulty": "medium"}
        }
    ]
)
# View dataset in Datadog UI
print(f"View dataset: {dataset.url}")
```
{{% /tab %}}

{{% tab "本番トレースから" %}}
UI を使用して手動で、または自動化を使用して自動的に、本番トレースをデータセットに追加します。

**手動選択 (UI)**:
1. [{{< ui >}}AI Observability{{< /ui >}}] > [{{< ui >}}Traces{{< /ui >}}]][2] に移動します。[[Settings] > [Automations]][3] から新しい自動化を追加することもできます。
2. データセットに含めるトレースを見つけます。
3. [{{< ui >}}Add to Dataset{{< /ui >}}](データセット) をクリックします。
4. 既存のデータセットを選択するか、データセットを作成します。
5. トレースの入力、出力、およびメタデータが自動的に抽出されます。

**自動ルーティング (自動化)**:

<div class="alert alert-info">自動化は、新しいトレースに適用されます。ルールに一致する新しいトレースは、受信時にデータセットにルーティングされます。フィルターに一致する既存のトレースが遡及的に追加されることはありません。</div>

自動化を使用すると、構成可能なルールに基づいて本番トレースをデータセットに継続的にルーティングできるため、手動の介入なしで、本番環境の動作に合わせてデータセットを最新の状態に保つことができます。

データセットの自動更新を設定するには:
1. [[{{< ui >}}AI Observability{{< /ui >}}] > [{{< ui >}}Traces{{< /ui >}}]][2] に移動します。
2. フィルターを適用して、ルーティングするトレースを特定します (評価で不合格になった、レイテンシーのしきい値、特定のアプリケーションなど)。使用できるフィルターについては、[「自動化ルール」>「サポートされているフィルターフィールド」][5]を参照してください。
3. [{{< ui >}}Automate Query{{< /ui >}}](クエリの自動化) をクリックします。
4. サンプリングレートを設定します (例: 一致するトレースの 10%)。
5. アクションとして [{{< ui >}}Add to Dataset{{< /ui >}}](データセットに追加) を選択します。
6. 既存のデータセットを選択するか、データセットを作成します。

自動化を作成したら、[[{{< ui >}}AI Observability{{< /ui >}}] > [{{< ui >}}Settings{{< /ui >}}] > [{{< ui >}}Automations{{< /ui >}}]][3] から自動化を管理します。
- [{{< ui >}}Enable/disable{{< /ui >}}](有効化/無効化): 新しいトレースをデータセットに追加するかどうかを制御します。
- [{{< ui >}}Edit{{< /ui >}}](編集): ニーズの変化に応じて、フィルター、サンプリングレート、またはターゲットデータセットを変更します。
- [{{< ui >}}Delete{{< /ui >}}](削除): 不要になった自動化を削除します。

**データセットの制限:**
- 自動化によって作成されるデータセット数の上限は 20,000 レコードです。
- これらのデータセットは、自動化されたデータの誤変更を防ぐために、読み取り専用になっています。
- レコードを変更する場合は、まずデータセットを複製します。

**自動化のユースケースの例:**
- 評価で不合格になったトレースの 10% をサンプリングして、不合格データセットを作成します。
- レイテンシーがしきい値を超えるエッジケースを収集します。
- ユーザーセグメント全体で層別サンプリングを行い、多様なデータセットを維持します。
- 本番環境で新しい障害パターンが発生した際に、自動的にキャプチャします。

[2]: https://app.datadoghq.com/llm/traces
[3]: https://app.datadoghq.com/llm/settings/automations
[5]: /ja/llm_observability/configure/automation_rules/#supported-filter-fields
{{% /tab %}}
{{< /tabs >}}

### データセットを取得する {#retrieving-a-dataset}

Datadog からプロジェクトの既存のデータセットを取得するには:

```python
dataset = LLMObs.pull_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project", # optional, defaults to the project name from LLMObs.enable
    version=1 # optional, defaults to the latest version
)

# Get dataset length
print(len(dataset))
```

#### データセットを pandas にエクスポートする {#exporting-a-dataset-to-pandas}

Dataset クラスには `as_dataframe()` メソッドも用意されており、これを使用してデータセットを [pandas DataFrame][1] に変換できます。

この操作には、<div class="alert alert-info"><a href="https://pandas.pydata.org/docs/index.html">Pandas</a> が必要です。pandas をインストールするには、<code>pip install pandas</code>を実行します。</div>

```python
# Convert dataset to pandas DataFrame
df = dataset.as_dataframe()
print(df.head())

# DataFrame output with MultiIndex columns:
#                                   input_data     expected_output  metadata
#    question                       category       answer           difficulty
# 0  What is the capital of Japan?  geography      Tokyo            medium
# 1  What is the capital of Brazil? geography      Brasília         medium
```

DataFrame は、次の列を持つ複数インデックス構造になっています。
- `input_data`: `input_data_columns` からのすべての入力フィールドが含まれます。
- `expected_output`: `expected_output_columns` からのすべての出力フィールドが含まれます。
- `metadata`: `metadata_columns` からのすべての追加フィールドが含まれます。


### データセットのバージョニング {#dataset-versioning}

データセットは、時間の経過に伴う変更を追跡するために自動的にバージョニングされます。バージョニング情報により再現性が確保され、実験で特定のデータセットバージョンを参照できるようになります。

`Dataset` オブジェクトには、最新バージョンに対応する `current_version` フィールドがあります。以前のバージョンには、90 日間の保持期間が適用されます。

データセットのバージョンは `0` から始まり、新しいバージョンが作成されるたびに 1 ずつ増加します。

#### 新しいデータセットバージョンが作成される状況 {#when-new-dataset-versions-are-created}

新しいデータセットバージョンは、次の場合に作成されます。
- レコードの追加
- レコードの更新 (`input`、`expected_output`、または `metadata` フィールドの変更)
- レコードの削除

データセット名または説明を更新しても、データセットのバージョンは**作成されません**。

#### バージョンの保持 {#version-retention}

- データセットのアクティブなバージョンは 3 年間保持されます。
- 以前のバージョン (`current_version` に**含まれないもの**) は 90 日間保持されます。
- 90 日間の保持期間は、以前のバージョンが使用される (実験でバージョンが読み取られた場合など) とリセットされます。
- 90 日間連続して使用されなかった場合、以前のバージョンは完全削除の対象となり、アクセスできなくなる可能性があります。

**バージョン保持動作の例**

`12` が公開されると、`11` は 90 日間の保持期間が設定された以前のバージョンになります。25 日後にバージョン `11` を使用して実験を実行すると、90 日間の保持期間が**再度開始**されます。その後 90 日間、バージョン `11` を使用しなかった場合は、バージョン `11` は削除されます。

### データセットレコードにアクセスして管理する {#accessing-and-managing-dataset-records}

標準の Python インデックスを使用してデータセットレコードにアクセスできます。

```python
# Get a single record
record = dataset[0]

# Get multiple records
records = dataset[1:3]

# Iterate through records
for record in dataset:
    print(record["input_data"])
```
  
Dataset クラスには、レコードを管理するためのメソッド `append()`、`update()`、`delete()` が用意されています。Datadog に変更を保存するには、変更を `push()` する必要があります。

```python
# Add a new record
dataset.append({
    "id": "switzerland-capital",
    "input_data": {"question": "What is the capital of Switzerland?"},
    "expected_output": "Bern",
    "metadata": {"difficulty": "easy"}
})

# Update an existing record
dataset.update(0, {
    "input_data": {"question": "What is the capital of China?"},
    "expected_output": "Beijing",
    "metadata": {"difficulty": "medium"}
})

# Delete a record
dataset.delete(1)  # Deletes the second record

# Save changes to Datadog
dataset.push()
```

### データセットテーブルをカスタマイズする {#customizing-the-dataset-table}

データセットのレコードを表示する際、テーブルをカスタマイズすることで、各レコードを個別に展開することなく、すばやくスキャンして比較できます。

#### 列ピッカー {#column-picker}

列ピッカーを使用すると、列の表示/非表示を切り替えたり、ドラッグして並べ替えたりすることができます。

#### カスタム列 {#custom-columns}

データセットレコードから特定のフィールドを抽出し、専用のテーブル列として表示します。カスタム列を追加するには、テーブル上部にある [{{< ui >}}Add Column{{< /ui >}}](列の追加) 入力欄にフィールドパスを入力します。複数のカスタム列を追加し、ドラッグアンドドロップで並べ替えることができます。列の設定は、プロジェクトごとにブラウザのローカルストレージに保存されます。

[1]: https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html