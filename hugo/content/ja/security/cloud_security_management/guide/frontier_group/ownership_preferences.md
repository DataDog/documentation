---
further_reading:
- link: /security/cloud_security_management/guide/frontier_group/
  tag: ドキュメント
  text: Cloud Security フロンティアグループ
- link: /integrations/guide/reference-tables/
  tag: ドキュメント
  text: リファレンステーブル
title: 所有権設定のセットアップ
---
## 概要 {#overview}

所有権エージェントは、セキュリティ上の所見があるクラウドリソースのサブセットを選択し、それぞれの所有者を推測します。デフォルトでは、クラウドリソースのタグ、サービスカタログデータ、およびその他のデータソースを使用して、所有権を推測します。

**所有権設定**により、このプロセスを独自のルールでカスタマイズできます。それらは Datadog の[リファレンステーブル][1]に保存され、所有権エージェントが自動的に読み取って結果を向上させます。

## 所有権設定ファイルを作成する{#create-an-ownership-preference-file}

1. 以下に記載された形式に従って CSV ファイルを作成してください。オプションで、[所有権エージェント AI スキル][5]を AI コーディングアシスタント共に使用して、CSV を対話的に生成できます。
2. [それを `k9_ownership_preferences` という名前のリファレンステーブルとしてアップロード](#upload-your-ownership-preferences)します。設定は 24 時間以内に有効になります。

### 設定タイプ{#preference-types}

リファレンステーブルの各行は 1 つの設定です。`preference_type` 列は、その行が何をするかを決定します。

| タイプ          | 何をするか                                                   |
|---------------|----------------------------------------------------------------|
| `tag_mapping` | リソースに一致するタグがある場合、指定された所有者を割り当てます|
| `exclusion`   | 特定のハンドルが所有者として割り当てられないようにします    |
| `prompt_text` | AI 推論エンジンにカスタムガイダンスを提供します             |

### タグマッピング {#tag-mappings}

タグマッピングは「_リソースにタグ `X:Y` がある場合、それはこの所有者に属します。_」と言います。

所有権エージェントは、クラウドリソースのタグをあなたのマッピングと照合します。一致するものが見つかると、指定された所有者を候補として追加します。複数のマッピングが同じリソースに一致することがあり、所有権エージェントは他のデータソースと並べて複数の候補をランク付けします。

タグマッピングは、既存の所有権データソースを補完します。リソースにすでに存在する直接の所有権タグ (例えば、`dd-team`) が上書きされることはありません。

#### 列 {#columns}

| 列                 | 説明                                                                |
|------------------------|----------------------------------------------------------------------------|
| `preference_type`      | `tag_mapping`                                                      | であることが必要です。
| `tag_key`              | 一致させるタグキー (例: `cost-center`、`project`)                    |
| `tag_value` (オプション) | 一致させるタグ値。そのキーに対して任意の値と一致させる場合は空白のままにしてください (ワイルドカード)|
| `owner`                | 割り当てる所有者 (例: `team-platform`、`alice@example.com`)         |
| `owner_type`           | 所有者のタイプ: `team`、`user`、または `service`                                |
| `confidence`           | このマッピングが所有権を示す強さ: `high`、`medium`、または `low`  |

#### 所有者タイプ {#owner-type}

`owner_type` フィールドは、所有者がどのようなエンティティであるかを所有権エージェントに伝えます。これは、AI エンジンが候補のランク付けを行う際により良い判断を下す助けになります。

| 値 | 使用するタイミング |
| --- | --- |
| `team` | 所有者はチームハンドルです (例: `team-platform`、`sre-team`) |
| `user` | 所有者は個人です (例: `alice@example.com`) |
| `service` | 所有者はサービスまたは自動化アカウントです (例えば、`payment-svc`)|

#### 照合動作 {#matching-behavior}

- タグのキーと値の照合で**大文字小文字は区別されません**。`Cost-Center`は`cost-center`に一致します。
- 空の`tag_value`は、そのタグキーの**任意の値**に一致します (ワイルドカード)。
- 複数のマッピングが一致する場合、すべてが候補を生成します。所有権エージェントは、それらを信頼度でランク付けします。

#### 信頼度レベル {#confidence-levels}

| レベル | 使用するタイミング |
| --- | --- |
| `high` | タグは所有者を確実に特定します。例: `cost-center`チームに1:1でマッピングされるタグ|
| `medium` | タグは良い指標ですが、常に正しいとは限りません。例: `project`チーム間で共有される|タグ
| `low` | タグはヒントを提供しますが、裏付けが必要です。例: `env`チームと緩やかに相関するタグ|

#### 例: コストセンターをチームにマッピングする{#example-map-cost-centers-to-teams}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,cost-center,CC-100,team-platform,team,high,,,,,
2,tag_mapping,cost-center,CC-200,team-data-eng,team,high,,,,,
3,tag_mapping,cost-center,CC-300,team-security,team,high,,,,,
```

#### 例: プロジェクトを所有者にマッピングする {#example-map-projects-to-owners}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,project,atlas,team-atlas,team,medium,,,,,
2,tag_mapping,project,hermes,alice@example.com,user,medium,,,,,
3,tag_mapping,project,payments,team-fintech,team,high,,,,,
```

#### 例: ワイルドカードは `managed-by` タグを持つ任意のリソースに一致する {#example-wildcard-match-any-resource-with-a-managed-by-tag}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,managed-by,,team-infra,team,low,,,,,
```

これは `managed-by` タグの任意の値に一致し、低い信頼度でそれを `team-infra` に割り当てます。信頼度が低いため、より強力なデータソースが優先されます。

### 除外 {#exclusions}

除外は所有権エージェントに「このハンドルをリソースオーナーとして割り当てないでください」と伝えます。

ボットアカウント、CI ランナー、および共有サービスアカウントは、クラウドリソースのメタデータにしばしば現れます (例えば、作成者や最終修正者として)。除外は、これらを所有権の結果から除外するので、実際の所有者のみが結果に表示されます。

#### 列 {#columns-1}

| 列                               | 説明                                                                                                                  |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `preference_type`                    | 次の値であることが必要 `exclusion`                                                                                                          |
| `handle`                             | 除外するオーナーハンドル (例: `deploy-bot`、`ci-runner`)                                                              |
| `exclusion_type`(オプション)          | 除外を特定の所有者タイプ `team`、`user`、または `service` に限定します。空白のままにすると、すべての除外タイプに適用されます       |
| `exclusion_resource_type` (オプション)| 除外を特定のリソースタイプ (例: `aws_ec2_instance`) に限定します。空白のままにすると、すべてのリソースタイプに適用されます |

#### 照合動作 {#matching-behavior-1}

- `handle` の照合は、**大文字小文字を区別せず**に行います。
- オプションのフィルターは、**AND** ロジックを使用します。除外を適用するには、すべての非空フィールドが一致している必要があります。
- `exclusion_type`と`exclusion_resource_type`を空白のままにすると、すべての結果からハンドルが除外されます (最も一般的です)。

#### 例: 共通ボットアカウントをすべての結果から除外する {#example-exclude-common-bot-accounts-from-all-results}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,deploy-bot,,,,
2,exclusion,,,,,,ci-runner,,,,
3,exclusion,,,,,,github-actions,,,,
4,exclusion,,,,,,terraform-automation,,,,
```

#### 例: 特定のリソースタイプに対してのみサービスアカウントを除外する {#example-exclude-a-service-account-only-for-specific-resource-types}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,k8s-node-controller,service,aws_ec2_instance,,
2,exclusion,,,,,,autoscaler-svc,service,aws_ec2_instance,,
```

これらの除外は EC2 インスタンスにのみ適用されます。同じハンドルは、他のリソースタイプでは所有者として認められます。

#### 例: 特定のリソースタイプに対してチームハンドルを除外する {#example-exclude-a-team-handle-for-a-specific-resource-type}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,legacy-ops,team,aws_ec2_instance,,
```

これにより、EC2 インスタンスのチーム候補として現れる場合にのみ、`legacy-ops` は除外されます。S3 バケットや他のリソースタイプでは、引き続き考慮されます。

### カスタムプロンプトテキスト{#custom-prompt-text}

カスタムプロンプトテキストは、AI 推論エンジンに自由な形式でガイダンスを提供します。AI がより良い所有権の決定に役立つ組織のコンテキスト (命名規則、チーム構造、優先すべきデータソースなど) を共有するために使用します。

最大で **3 つ**のプロンプトテキストエントリを提供できます。各優先度レベル (`high`、`medium`、`low`) に 1 つずつです。同じ優先度のエントリは連結されます。優先度を使って、AI エンジンがどのガイダンスを最初に考慮するかを制御します。

#### 列 {#columns-2}

| 列                | 説明                                                                                       |
|-----------------------|---------------------------------------------------------------------------------------------------|
| `preference_type`     | 次の値であることが必要 `prompt_text`                                                                             |
| `prompt_text`         | ガイダンステキスト (エントリ当たり最大 4,096 バイト)                                                  |
| `priority`(オプション) | 順序を制御します。`high` エントリが最初に考慮され、その後 `medium`、次に `low` が考慮されます。デフォルト: `low` |

#### 効果的なガイダンスを書くためのヒント{#tips-for-writing-effective-guidance}

- 具体的で実行可能であること。「タグを使用してください」よりも「`cost-center` タグは私たちの最も信頼できる所有権シグナルです」の方が良いです。
- あなたの組織の規則、チームの命名パターン、特定のタグの解釈方法などを説明します。
- 所有者であるはずのないアカウントを特定します (また、これらを実行のための除外行として追加します)。
- 優先レベルごとに 1 つのエントリを使用し、ガイダンスを重要度別に整理します。

#### 例: 優先度別に分割された組織固有のコンテキスト {#example-organization-specific-context-split-by-priority}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,prompt_text,,,,,,,,Our organization assigns ownership by cost center. The cost-center tag is the primary ownership signal for all cloud resources. Team identifiers always use the team- prefix followed by the team name (e.g. team-platform team-data-eng).,high
2,prompt_text,,,,,,,,Shared infrastructure accounts (deploy-bot ci-runner github-actions terraform-automation) are automation accounts and should never be assigned as resource owners. Look for the human or team that configured the automation instead.,medium
3,prompt_text,,,,,,,,For container images the repository owner in our GitHub organization is a reliable secondary signal when cost-center tags are missing.,low
```

### リファレンステーブル形式{#reference-table-format}

#### 列スキーマ{#column-schema}

リファレンステーブルは、名前が `k9_ownership_preferences` で、以下の 12 列を含む必要があります。

| 列                    | タイプ   | 説明                                                                         |
|---------------------------|--------|-------------------------------------------------------------------------------------|
| `id`                      | 文字列 | **すべての行に必須です。**行のユニーク識別子。主キーとして使用されます   |
| `preference_type`         | 文字列 | **すべての行に必須です。**行のタイプ。`tag_mapping`、`exclusion`、または `prompt_text`   | です
| `tag_key`                 | 文字列 | 一致させるタグキー (タグマッピングのみ)                                                 |
| `tag_value`               | 文字列 | 一致させるタグ値。ワイルドカードとして空白のままにします (タグマッピングのみ)                    |
| `owner`                   | 文字列 | 割り当てるオーナーハンドル (タグマッピングのみ)                                           |
| `owner_type`              | 文字列 | オーナータイプ。`team`、`user`、または `service` です (タグマッピングのみ)                         |
| `confidence`              | 文字列 | 信頼度レベル。`high`、`medium`、または `low` です (タグマッピングのみ)                     |
| `handle`                  | 文字列 | 除外するオーナーハンドル (除外のみ)                                            |
| `exclusion_type`          | 文字列 | 除外のためのオーナータイプフィルター。すべてのタイプを除外するには空白のままにします (除外のみ) |
| `exclusion_resource_type` | 文字列 | 除外のためのリソースタイプフィルター。すべてを除外するには空白のままにします (除外のみ)    |
| `prompt_text`             | 文字列 | ガイダンステキスト (プロンプトテキストのみ)|
| `priority`                | 文字列 | 並び順の優先度: `high`、`medium`、または `low` です (プロンプトテキストのみ)|

各行は `preference_type` に応じて列のサブセットを使用します。未使用の列は空のままにしてください。

#### 設定タイプによる列の使用{#column-usage-by-preference-type}

| 列 | `tag_mapping` | `exclusion` | `prompt_text` |
| --- | --- | --- | --- |
| `id` | 必須 | 必須 | 必須 |
| `preference_type` | `"tag_mapping"` | `"exclusion"` | `"prompt_text"` |
| `tag_key` | 必須 | — | — |
| `tag_value` | オプション (空はワイルドカードを意味します) | — | — |
| `owner` | 必須 | — | — |
| `owner_type` | 必須 | — | — |
| `confidence` | 必須 | — | — |
| `handle` | — | 必須 | — |
| `exclusion_type` | — | オプション | — |
| `exclusion_resource_type` | — | オプション | — |
| `prompt_text` | — | — | 必須 |
| `priority` | — | — | オプション |

### 完全な例 {#complete-example}

3 種類の設定タイプすべてを含む、すぐに使える CSV です。

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,cost-center,CC-100,team-platform,team,high,,,,,
2,tag_mapping,cost-center,CC-200,team-data-eng,team,high,,,,,
3,tag_mapping,cost-center,CC-300,team-security,team,high,,,,,
4,tag_mapping,project,atlas,team-atlas,team,medium,,,,,
5,tag_mapping,project,hermes,alice@example.com,user,medium,,,,,
6,tag_mapping,env,production,sre-team,team,low,,,,,
7,tag_mapping,managed-by,,team-infra,team,low,,,,,
8,exclusion,,,,,,deploy-bot,,,,
9,exclusion,,,,,,ci-runner,service,,,
10,exclusion,,,,,,github-actions,service,,,
11,exclusion,,,,,,legacy-ops,team,aws_ec2_instance,,
12,prompt_text,,,,,,,,Our organization assigns ownership by cost center. The cost-center tag is the primary ownership signal for all cloud resources. Team identifiers always use the team- prefix followed by the team name (e.g. team-platform team-data-eng).,high
13,prompt_text,,,,,,,,Shared infrastructure accounts (deploy-bot ci-runner github-actions) are automation accounts and should never be assigned as resource owners. Look for the human or team that configured the automation instead.,medium
14,prompt_text,,,,,,,,For container images the repository owner in GitHub is a reliable secondary signal when cost-center tags are missing.,low
```

## 検証ルール {#validation-rules}

すべての設定データは、所有権エージェントがリファレンステーブルを読み取る際に検証されます。**検証は 100% 合格か不合格かのどちらかです。**いずれかの行が検証に失敗すると、所有権エージェントはその同期サイクルにおける設定セット**全体**を拒否します。このような場合、有効なセットがアップロードされるまで設定は空のままになります。

この厳格なアプローチは、一貫性があり、完全に有効な設定セットで作業していることを確実にするのに役立ちます。

### 許可される文字 {#allowed-characters}

異なるフィールドは異なる文字セットを受け入れます。

| フィールドタイプ | 許可される文字 | 適用対象 |
| --- | --- | --- |
| 構造化フィールド | 英字、数字、`-` `_` `.` `:` `/` `@` | `tag_key`、`owner`、`handle`、`exclusion_type`、`exclusion_resource_type`、`owner_type`、`confidence`、`priority` |
| タグ値 | 構造化フィールドと同じ、さらにスペースも可 | `tag_value` |
| プロンプトテキスト | 英字、数字、`-` `_` `.` `:` `/` `@` `#` `,` `;` `!` `?` `(` `)` `'` `"` `` ` `` スペース、タブ、改行文字 | `prompt_text` |

#### 注目すべき制限 {#notable-restrictions}

- **山括弧** (`<`、`>`) は、プロンプトテキストを含むいかなるフィールドでも**許可されていません**。
- **波括弧** (`{`、`}`) は**いかなるフィールドでも**許可されていません。
- **パイプ文字** (`|`) は**いかなるフィールドでも**許可されていません。

これらの制限は書式設定の不具合を防ぎ、AI エンジンによる適切な処理を確実にするのに役立ちます。

### サイズ制限 {#size-limits}

| 制限                               | 値                                                                              |
|-------------------------------------|------------------------------------------------------------------------------------|
| 最大タグマッピング                | 50 行                                                                            |
| 最大除外                  | 20 行                                                                            |
| 最大プロンプトテキストエントリ         | 3 行 (優先度レベルごとに 1 つ)                                                |
| フィールドごとの最大バイト数             | 1,024 バイト (タグキー、タグ値、所有者、ハンドル、および類似のフィールドに適用されます) |
| プロンプトテキストエントリごとの最大バイト数 | 4,096 バイト |

### 重複検出 {#duplicate-detection}

以下に示すように、所有権エージェントは、矛盾または重複するエントリが含まれている場合、設定セット全体を拒否します。

- **タグマッピング**: 2 つの行で `tag_key` と `tag_value` が同じだが `owner` 値が異なる場合、これは矛盾です。2 つの行で `tag_key`、`tag_value`、および `owner` が同じでも `confidence` レベルが異なるも矛盾です。完全な重複 (すべてのフィールドが同一) は許可されます。
- **除外**: `handle`、`exclusion_type`、および `exclusion_resource_type` が同じである 2 つの行は重複です。比較は大文字小文字を区別しません。

所有権エージェントが矛盾または重複を検出すると、設定セット全体が拒否されます。

### プロンプトテキストのコンテンツガイドライン {#content-guidelines-for-prompt-text}

AI エンジンは、プロンプトテキストを組織のコンテキストとして処理します。あなたのガイダンスが効果的であることを確保するのに役立つのは以下の点です。

- **平易で断定的な文を使用する**: あなたの組織に関する事実を説明します。
- **特別な書式設定を避ける**: Markdown の見出し、HTML タグ、および XML のようなタグは処理中に削除されます。
- **所有権データソースに焦点を当てる**: 所有権を示すタグ、命名規則、またはチーム構造について説明します。

#### 例 {#examples}

- "コストセンタータグは、すべてのクラウドリソースに対する最も信頼できる所有権信号です。"
- "チーム識別子には常に team- プレフィックス (例: team-platform、team-data-eng) を使用します。"
- "us-east-1/prod アカウントのリソースは team-sre によって管理されます。"

## 所有権設定のアップロード{#upload-your-ownership-preferences}

Datadog はあなたの設定を[リファレンステーブル][1]として保存します。このテーブルは、名前が `k9_ownership_preferences` で、12 個の列ヘッダーすべてを含む必要があります。一部の行で空であっても構いません。

このテーブルを作成および更新する方法はいくつかあります。

### オプション 1: 手動 CSV アップロード (Datadog UI) {#option-1-manual-csv-upload-datadog-ui}

このアプローチは、新しく始める場合や時折の更新を行うのに最適です。

1. CSV ファイルを準備します ([完全な例](#complete-example)を参照してください)。
2. Datadog で、**Integrations** (インテグレーション) > [[**Reference Tables**][6]] (リファレンステーブル) に移動します。
3. [**New Reference Table**] (新しいリファレンス テーブル) をクリックします。
4. CSV ファイルをアップロードします。
5. テーブル名を `k9_ownership_preferences` に設定します。
6. プライマリキーとして `id` を選択します。
7. [**Save**] (保存) をクリックします。

リファレンステーブルを更新するには、新しい CSV を同じテーブルにアップロードして、その内容を完全に置き換えます。

手動アップロードは、最大 4MB のファイルをサポートします。

### オプション 2: クラウドストレージ同期 (S3、Azure Blob、GCS){#option-2-cloud-storage-sync-s3-azure-blob-gcs}

このアプローチは、自動化された定期的な更新に最適です。CSV をクラウドストレージバケットに保存し、Datadog が定期的にインポートできるようにします。

1. CSVを **Amazon S3 バケット**、**Azure Blob Storage コンテナ**、または **Google Cloud Storage バケット**にアップロードします。
2. Datadog で、**Integrations** (インテグレーション) > [[**Reference Tables**][6]] (リファレンステーブル) に移動します。
3. [**New Reference Table**] をクリックし、ソースとして [**Cloud Storage**] (クラウドストレージ) を選択します。
4. ストレージパスと認証情報を入力します (S3 の場合は IAM ロール、Azure の場合はコネクション文字列、GCS の場合はサービスアカウント)。
5. テーブル名を `k9_ownership_preferences` に設定します。
6. プライマリキーとして `id` を選択します。
7. [**Save**] (保存) をクリックします。

Datadog は定期的にファイルを再インポートするので、バケット内の CSV の更新は自動的に取得されます。

クラウドストレージのアップロードは、最大 200MB までのファイルをサポートします。

各クラウドプロバイダーの詳細なセットアップ手順については、[リファレンステーブルのドキュメント][1]を参照してください。

### オプション 3: Terraform{#option-3-terraform}

このアプローチは、他のDatadogリソースと併せて設定を Infrastructure as Code として管理するのに最適です。

[Datadog Terraformプロバイダー][2]はリファレンステーブルをサポートします。宣言的にテーブルを作成および更新するために使用します。

詳細については、Datadog Terraform プロバイダーのドキュメントにある[datadog_reference_table (リソース)][7] を参照してください。

### API{#api}

[リファレンステーブル API][3] を使用して、プログラムでリファレンステーブルを管理することもできます。利用可能なエンドポイントについては、API ドキュメントを参照してください。

該当する場合は、`api.datadoghq.com` をあなたの[Datadog サイト URL][4] に置き換えてください (例えば、`api.datadoghq.eu` や `api.us3.datadoghq.com`)。

## 設定が有効になるタイミング{#when-preferences-take-effect}

1. リファレンステーブルをアップロードまたは更新する。
2. 所有権エージェントが定期的に (組織ごとに約1日1回) テーブルを読み取る。
3. 所有権エージェントがテーブル内の設定を検証する。検証に合格すると、新しい設定が以前のセットを置き換えます。
4. 各リソースの次回の所有権推論実行時:
   - **タグマッピング**は、タグルールに基づいて所有権候補を追加します。
   - **除外**は、結果から不要なハンドルを削除します。
   - **カスタムプロンプトテキスト**は、AI 推論エンジンをガイドします。
5. 更新された結果は、Cloud Security ポスチャ管理 UI に表示されます。

リファレンステーブルへの変更は、**24 時間**以内に反映されます。

<div class="alert alert-info">テーブルからすべての行を削除する (空にする) と、所有権エージェントは以前の設定を積極的にクリアします。テーブルを完全に削除することも同じ効果があります―キャッシュされた設定は期限切れとなり、空のままになります。</div>

## トラブルシューティング{#troubleshooting}

検証は 100% 合格か不合格かのどちらかです。いずれかの行に問題がある場合、所有権エージェントは全体の設定を拒否し、有効な設定セットをアップロードするまですべての設定を空にします。

| 問題                                  | 考えられる原因                      | 修正                                                                                                                                                                                                                     |
|------------------------------------------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 24 時間後に有効でない設定 | テーブル名が間違っています               | 正確に `k9_ownership_preferences`                                                                                                                                                                              | でなければなりません。
| 24 時間後に有効でない設定 | 列ヘッダーが欠けています            | 12 列すべてが CSV ヘッダーとして存在しなければなりません。行で列が空になる場合でもです。                                                                                                                                                 |
| 24時間後に有効でない設定 | 機能があなたの組織に対して有効になっていません  | [Datadogサポート][8]に連絡して、所有権設定を有効にしてください。                                                                                                                                                            |
| すべての設定が拒否されました                 | いずれかのフィールドに無効な文字があります   | [許可される文字](#allowed-characters)を参照してください。山括弧、波括弧、およびパイプ文字は許可されません。                                                                                                      |
| すべての設定が拒否されました                 | いずれかの行で必須フィールドが欠けています | タグマッピングの場合 `tag_key`、`owner`、`owner_type`、および`confidence`、除外の場合 `handle`、プロンプトテキストエントリの場合 `prompt_text` が入力されていることを確認してください。                                                            |
| すべての設定が拒否されました                 | 重複または矛盾する行があります     | `tag_key`+`tag_value` が同じで、`owner` または `confidence`の値が異なる 2 つのタグマッピングは、拒否の原因となります。除外の正確な重複も拒否を引き起こします。[重複検出](#duplicate-detection) |を参照してください。
| すべての設定が拒否されました                 | 無効な`confidence`値        | 正確に `high`、`medium`、または `low`                                                                                                                                                                              | でなければなりません。
| すべての設定が拒否されました                 | 無効な`owner_type`値        | `team`、`user`、または `service` でなければなりません (大文字小文字は区別されません)                                                                                                                                                                 |
| すべての設定が拒否されました                 | サイズ制限を超えました               | 行数 (タグマッピング 50 行、除外 20 行、プロンプトテキストエントリ 3 行) およびフィールドの長さ (各フィールドは 1,024 バイト、各プロンプトエントリは 4,096 バイト) を確認してください                                                                          |
| すべての設定が拒否されました                 | プロンプトテキストの書式設定            | Markdown の見出しと HTML/XML タグは処理中に削除されます。プレーンテキストのみを使用してください                                                                                                                                 |
| リソースに一致しないタグマッピング      | スペルの不一致                 | 大文字小文字は区別されませんが、リソース上の正確なタグキーと値を確認してください                                                                                                                                   |
| 除外が適用されていません                    | スコーピングフィルターが狭すぎます        | 空でないフィールドはすべて一致しなければなりません (AND ロジック)。`exclusion_type` と `exclusion_resource_type` を空にして広範な除外を行ってください                                                                                            |
| 設定が予期せずクリアされました         | テーブルが空になったか削除されました      | 空のテーブルと削除されたテーブルの両方が、キャッシュされた設定の期限切れを引き起こします。有効な CSV をアップロードして設定を復元してください                                                                                                   |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/guide/reference-tables/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: /ja/api/latest/reference-tables/
[4]: /ja/getting_started/site/
[5]: https://github.com/datadog-labs/agent-skills/tree/main/dd-security/csm/ownership-agent
[6]: https://app.datadoghq.com/reference-tables
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/reference_table
[8]: /ja/help