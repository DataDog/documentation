---
aliases:
- /ja/cloud_cost_management/tag_pipelines/
- /ja/cloud_cost_management/tags/tag_pipelines/
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
- link: /getting_started/tagging/
  tag: ドキュメント
  text: タグの使用を開始する
- link: /integrations/guide/reference-tables
  tag: ドキュメント
  text: Reference Tableについて学びます。
- link: https://www.datadoghq.com/blog/cloud-cost-management-ai-costs/
  tag: ブログ
  text: Datadog Cloud Cost Managementを使用して、プロバイダー間でAIコストを割り当てます。
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: ブログ
  text: Datadog Cloud Cost Management を使用して OCI コストを管理および最適化する
title: タグパイプライン
---
## 概要 {#overview}

タグは、すべての Cloud Cost Management の分析と割り当ての基盤となります。タグを使用すると、サービス、チーム、プロジェクト、環境、またはビジネスに関連するあらゆるディメンションごとに支出を分類できます。Tag Pipelinesは、クラウド全体のリソースで標準化されたタグの使用を強制し、組織全体で一貫性のある正確なコスト割り当てを保証します。

[Tag Pipelines][1]を使用すると、クラウド請求書上の不足しているタグや誤ったタグに対処するためのタグルールを作成できます。また、特定のビジネスロジックに沿った新しい推論タグを作成して、コスト追跡の精度を高めることもできます。これらの標準化されたタグは、コンテナコストの割り当て、カスタム割り当てルール、コスト推奨事項など、すべてのコスト分析機能を強化します。

Tag Pipelines は、すべてのプロバイダーの Cloud Cost メトリクスに適用されます。作成したルールはすべてのコストデータとコスト推奨事項に影響し、ダッシュボード、モニター、割り当てレポート全体で一貫性が保たれます。

Tag Pipelines が変更されると、新しいルールが直近3か月分のデータに自動的に適用されます。ルールの追加または変更後、過去データの更新が完了するまでに最大24時間かかる場合があります。

すべての新規ユーザーには、[タグの正規化を有効にする][6]ための推奨ルールがデフォルトで有効になっています。

## ルールセットを作成してください {#create-a-ruleset}

[API][7]、[Terraform][8]、または以下の手順に従って Datadog で直接、Tag Pipelinesルールセットを管理できます。

ルールセットを作成するには、[{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Tag Pipelines{{< /ui >}}][1] に移動します。

<div class="alert alert-info"> 最大100個のルールを作成できます。 </div>

個別のルールを作成する前に、{{< ui >}}\+ New Ruleset{{< /ui >}} をクリックしてルールセット（ルールのフォルダー）を作成してください。

各ルールセット内で {{< ui >}}\+ Add New Rule{{< /ui >}} をクリックし、ルールタイプとして {{< ui >}}Add tag{{< /ui >}}、{{< ui >}}Alias tag keys{{< /ui >}}、または {{< ui >}}Map multiple tags{{< /ui >}} を選択してください。これらのルールは、上から下へ順番に決定論的な順序で実行されます。

{{< img src="cloud_cost/pipelines-create-ruleset-1.png" alt="チーム、アカウント、サービス、部門、ビジネスユニットなど、さまざまなカテゴリを一覧表示するTag Pipelinesページのタグルール一覧表示。" style="width:60%;" >}}

ルールとルールセットを整理することで、実行順序がビジネスロジックと一致するように調整できます。

### タグを追加してください{#add-tag}

クラウドコストデータ上の既存のタグの存在に基づいて、新しいタグ (キー + 値) を追加してください。

例えば、リソースが所属するサービスに基づいて、すべてのリソースにビジネスユニットのタグを付けるルールを作成できます。

{{< img src="cloud_cost/pipelines-add-tag-2.png" alt="service:process-agentまたはservice:process-billingを持つリソースに、新しいビジネスユニットタグを追加してください。" style="width:60%;" >}}

{{< ui >}}Additional options{{< /ui >}}セクションの下には、以下のオプションがあります。

- {{< ui >}}Action when tag `{tag}` exists{{< /ui >}} - 指定されたタグ（上記の例では`business-unit`）が既に存在する場合の動作を選択してください。
  - {{< ui >}}Don't apply the rule{{< /ui >}} - タグが既に存在する場合はルールをスキップし、元の値を保持してください。
  - {{< ui >}}Append the tag{{< /ui >}} - 元の値を削除せずに、既存のタグに新しい値を追加してください。
  - {{< ui >}}Replace the tag{{< /ui >}} - 既存のタグ値を新しい値で置き換えてください。<div class="alert alert-warning">タグを置き換えると、既存のデータが上書きされる可能性があります。このオプションは慎重に使用してください。</div>
- {{< ui >}}Apply case-insensitive matching to resource tags{{< /ui >}}- `To resources with tag(s)`フィールドで定義されたタグとコストデータからのタグを大文字と小文字を区別せずに扱えるようにします。例えば、UIからのリソースタグが`foo:bar`で、コストデータからのタグが`Foo:bar`である場合、両者を一致させることができます。

### エイリアス設定 タグキー{#alias-tag-keys}

既存のタグ値をより標準化されたタグにマッピングします。

例えば、組織で標準の`application`タグキーを使用したいが、複数のチームがそのタグのバリエーション（`app`、`webapp`、または`apps`など）を使用している場合、`apps`を`application`にエイリアス設定できます。各エイリアスタグルールでは、最大25個のタグキーを新しいタグにエイリアス設定できます。

{{< img src="cloud_cost/pipelines-alias-tag-4.png" alt="app、webapp、またはappsタグを持つリソースにアプリケーションタグを追加します。" style="width:60%;" >}}

`app`、`webapp`、または`apps`タグを持つリソースにアプリケーションタグを追加します。ルールは、最初の一致が見つかった時点で、各リソースに対する実行を停止します。例えば、リソースに既に `app` タグがある場合、そのルールは `webapp` または `apps` タグを特定しようとしなくなります。

{{< ui >}}Additional options{{< /ui >}} セクションには、以下のオプションがあります。

- {{< ui >}}Action when tag `{tag}` exists{{< /ui >}} - 指定されたタグ（上記の例では `application`）が既に存在する場合の動作を選択します。
  - {{< ui >}}Don't apply the rule{{< /ui >}} - タグが既に存在する場合はルールをスキップし、元の値を保持します。
  - {{< ui >}}Append the tag{{< /ui >}} - 元の値を削除せずに、新しい値を既存のタグに追加します。
  - {{< ui >}}Replace the tag{{< /ui >}} - 既存のタグ値を新しい値で置き換えます。<div class="alert alert-warning">タグを置き換えると、既存のデータが上書きされる可能性があります。このオプションは慎重に使用してください。</div>
- {{< ui >}}Apply case-insensitive matching to resource tags{{< /ui >}}- エイリアスタグキーで定義されたタグとコストデータからのタグを大文字と小文字を区別しないようにします。例えば、UIからのリソースタグが `app:bar` で、コストデータからのタグが `App:bar` である場合、両者を一致させることができます。

### 複数のタグのマッピング {#map-multiple-tags}

[Reference Table][2]を使用して、複数のルールを作成することなく、コストデータに複数のタグを追加してください。これにより、Reference Tableの主キー列の値がコストタグの値にマッピングされます。見つかった場合、パイプラインは選択されたReference Tableの列をタグとしてコストデータに追加します。

例えば、さまざまなAWSおよびAzureアカウントがどのVP、組織、ビジネスユニットに該当するかに関する情報を追加したい場合、テーブルを作成してタグをマッピングできます。

{{< img src="cloud_cost/pipelines-map-multiple-tags-2.png" alt="Tag PipelinesのReference Tableを使用して、customer_nameのようなアカウントメタデータを追加してください。" style="width:60%;" >}}

[エイリアスタグキー](#alias-tag-keys)と同様に、このルールは最初のマッチが見つかった後、リソースごとに実行を停止します。例えば、`application` が見つかった場合、そのルールは `subscription_id` を探そうとしなくなります。

{{< ui >}}Additional options{{< /ui >}} セクションには、以下のオプションがあります。

- {{< ui >}}Action when column exists{{< /ui >}} - 指定された列が既に存在する場合の動作を選択してください。
  - {{< ui >}}Don't apply the rule{{< /ui >}} - 列が既に存在する場合はルールをスキップし、元の値を保持してください。
  - {{< ui >}}Append the column{{< /ui >}} - 元の値を削除せずに、既存の列に新しい値を追加してください。
  - {{< ui >}}Replace the column{{< /ui >}} - 既存の列の値を新しい値で置き換えてください。<div class="alert alert-warning">列を置き換えると、既存のデータが上書きされる可能性があります。このオプションは慎重に使用してください。</div>
- {{< ui >}}Apply case-insensitive matching for primary key values{{< /ui >}}- Reference Tableの主キー値と、タグキーが主キーと一致するコストデータのタグ値との間で、大文字と小文字を区別しない照合を有効にします。例えば、UIからの主キー値ペアが`foo:Bar`で、コストデータからのタグが`foo:bar`である場合、両者を照合できます。

#### APIベースのReference Table {#api-based-reference-tables}

Tag PipelinesでAPIベースのReference Tableを使用することもできます。一部の古いテーブルでは、ルールで使用する前に、Cloud Cost Managementと同期するためのデータ更新が必要になる場合があります。

##### 同期エラーのトラブルシューティング {#troubleshooting-synchronization-errors}

ルールを保存する際に、参照テーブルがCloud Cost Managementと同期されていないことを示すエラーが表示された場合：

1. **伝播を待つ:** テーブルを最近作成または更新した場合は、変更が伝播されるまで数分待ってから、ルールを再度保存してください。
2. **同期をトリガーする:** エラーが解決しない場合は、テーブルのデータファイルを再アップロードするか、行を更新してCloud Cost Managementとの同期をトリガーしてください。

## 予約済みタグ {#reserved-tags}

`env`や`host`などの特定のタグは[予約済みタグ][4]であり、[Unified Service Tagging][3]の一部です。`host`タグは、Tag Pipelinesに追加できません。

タグを使用すると、メトリクス、トレース、プロセス、ログの関連付けに役立ちます。`host`のような予約済みタグは、インフラストラクチャー全体にわたる可視性と効果的な監視を提供します。最適な関連付けと実用的なインサイトを得るために、Datadogでのタグ付け戦略の一環としてこれらの予約済みタグを使用してください。

## タグを削除 {#delete-tags}
Tag Pipelinesを使用して作成されたタグを削除するには、そのタグを作成したルールを削除してください。24時間以内に、直近3か月分のデータからタグが自動的に削除されます。それより古いデータからタグを削除するには、[Datadog support][5]までお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/tag-pipelines
[2]: /ja/integrations/guide/reference-tables/?tab=manualupload
[3]: /ja/getting_started/tagging/unified_service_tagging/
[4]: /ja/getting_started/tagging/
[5]: /ja/help/
[6]: /ja/cloud_cost_management/tags#how-tags-are-normalized
[7]: /ja/api/latest/cloud-cost-management/#create-tag-pipeline-ruleset
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/tag_pipeline_ruleset