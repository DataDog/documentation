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
  text: リファレンステーブルについて
- link: https://www.datadoghq.com/blog/cloud-cost-management-ai-costs/
  tag: ブログ
  text: Datadog Cloud Cost Management を使用してプロバイダー間で AI コストを配分する
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: ブログ
  text: Datadog Cloud Cost Management を使用して OCI コストを管理および最適化する
title: タグパイプライン
---
## 概要 {#overview}

タグは、Cloud Cost Management のすべての分析と割り当ての基盤となります。タグを使用すると、サービス、チーム、プロジェクト、環境のほか、ビジネスに関連するあらゆるディメンション別に支出を分類できます。タグパイプラインは、すべてのクラウドリソースに対して標準化されたタグの使用を強制し、組織全体で一貫した正確なコスト配分を保証するのに役立ちます。

[タグパイプライン][1]を使用すると、クラウドの請求で欠落したタグや誤ったタグに対処するためのタグルールを作成できます。また、特定のビジネスロジックに沿った新しい推論タグを作成して、コスト追跡の精度を高めることもできます。これらの標準化されたタグは、コンテナコスト割り当て、カスタム割り当てルール、コスト推奨事項など、すべてのコスト分析機能を強化します。

タグパイプラインは、すべてのプロバイダーの Cloud Cost メトリクスに適用されます。作成したルールはすべてのコストデータとコスト推奨事項に反映され、ダッシュボード、モニター、割り当てレポート全体で一貫性が確保されます。

タグパイプラインが変更されると、新しいルールが直近 3 か月分のデータに自動的に適用されます。ルールが追加または変更された後、過去のデータの更新が完了するまでに最大 24 時間かかる場合があります。

すべての新規ユーザーに対して、[タグの正規化を有効にする][6]ための推奨ルールがデフォルトで有効になります。

## ルールセットを作成する {#create-a-ruleset}

タグパイプラインのルールセットは、[API][7] または [Terraform][8] を使用するか、次の手順に従って Datadog で直接管理できます。

ルールセットを作成するには、[{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Tag Pipelines{{< /ui >}}][1] に移動します。

<div class="alert alert-danger"> ルールは最大で 100 個まで作成できます。API ベースのリファレンステーブルはサポートされていません。 </div>

個別のルールを作成する前に、{{< ui >}}+ New Ruleset{{< /ui >}} をクリックしてルールセット (ルール用のフォルダー) を作成します。

各ルールセット内で {{< ui >}}+ Add New Rule{{< /ui >}} をクリックし、ルールタイプ ({{< ui >}}Add tag{{< /ui >}}、{{< ui >}}Alias tag keys{{< /ui >}}、または {{< ui >}}Map multiple tags{{< /ui >}}) を選択します。これらのルールは、上から下の順に決定論的な順序で実行されます。

{{< img src="cloud_cost/pipelines-create-ruleset-1.png" alt="チーム、アカウント、サービス、部門、ビジネスユニットなど、さまざまなカテゴリを表示するタグパイプラインページのタグルールの一覧" style="width:60%;" >}}

ビジネスロジックに合わせて実行順序を確実に制御できるよう、ルールとルールセットを整理できます。

### Add tag {#add-tag}

Cloud Cost データに既存のタグがあるかどうかに基づいて、新しいタグ (キーと値) を追加します。

たとえば、リソースが属するサービスに基づいて、すべてのリソースにビジネスユニットのタグを付けるルールを作成できます。

{{< img src="cloud_cost/pipelines-add-tag-2.png" alt="service:process-agent または service:process-billing を持つリソースに businessunit タグを新たに追加" style="width:60%;" >}}

{{< ui >}}Additional options{{< /ui >}} セクションには、次のオプションがあります。

- {{< ui >}}Action when tag `{tag}` exists{{< /ui >}} - 指定したタグ (上記の例では `business-unit`) がすでに存在する場合の動作を選択します。
  - {{< ui >}}Don't apply the rule{{< /ui >}} - タグがすでに存在する場合はルールをスキップし、元の値を保持します。
  - {{< ui >}}Append the tag{{< /ui >}} - 元の値を削除せずに、新しい値を既存のタグに追加します。
  - {{< ui >}}Replace the tag{{< /ui >}} - 既存のタグの値を新しい値で置き換えます。<div class="alert alert-warning">タグを置き換えると、既存のデータが上書きされる可能性があります。このオプションは慎重に使用してください。</div>
- {{< ui >}}Apply case-insensitive matching to resource tags{{< /ui >}}- `To resources with tag(s)`フィールドで定義されたタグとコストデータのタグを、大文字と小文字を区別せずに扱えるようにします。たとええば、UI のリソースタグが `foo:bar` で、コストデータのタグが `Foo:bar` である場合に、両者を照合することができます。

### Alias tag keys {#alias-tag-keys}

既存のタグの値を、より標準化されたタグにマッピングします。

たとえば、組織で標準の `application` タグキーを使用したいが、複数のチームでそのタグのバリエーション (`app`、`webapp`、`apps` など) を使用している場合、`application` を `apps` のエイリアスに設定できます。各エイリアスタグルールで、最大 25 個のタグキーのエイリアスとして新しいタグを設定できます。

{{< img src="cloud_cost/pipelines-alias-tag-4.png" alt="app、webapp、または apps タグを持つリソースに application タグを追加" style="width:60%;" >}}

`app`、`webapp`、または `apps` タグを持つリソースに application タグを追加します。各リソースについて、最初の一致が見つかった時点でルールの実行は停止します。たとえば、リソースにすでに `app` タグがある場合、ルールで `webapp` タグや `apps` タグの特定は行われません。

{{< ui >}}Additional options{{< /ui >}} セクションには、次のオプションがあります。

- {{< ui >}}Action when tag `{tag}` exists{{< /ui >}} - 指定したタグ (上記の例では `application`) がすでに存在する場合の動作を選択します。
  - {{< ui >}}Don't apply the rule{{< /ui >}} - タグがすでに存在する場合はルールをスキップし、元の値を保持します。
  - {{< ui >}}Append the tag{{< /ui >}} - 元の値を削除せずに、新しい値を既存のタグに追加します。
  - {{< ui >}}Replace the tag{{< /ui >}} - 既存のタグの値を新しい値で置き換えます。<div class="alert alert-warning">タグを置き換えると、既存のデータが上書きされる可能性があります。このオプションは慎重に使用してください。</div>
- {{< ui >}}Apply case-insensitive matching to resource tags{{< /ui >}}- タグキーで定義されたタグとコストデータのタグを、大文字と小文字を区別せずに扱えるようにします。たとええば、UI のリソースタグが `app:bar` で、コストデータのタグが `App:bar` である場合に、両者を照合することができます。

### Map multiple tags {#map-multiple-tags}

複数のルールを作成する代わりに、[リファレンステーブル][2]を使用してコストデータに複数のタグを追加します。これにより、リファレンステーブルの主キー列の値がコストタグの値にマッピングされます。選択されたリファレンステーブルの列が見つかった場合、パイプラインはその列をコストデータにタグとして追加します。

たとえば、それぞれの AWS アカウントや Azure アカウントがどの VP、組織、ビジネスユニットに属しているかについての情報を追加する場合、テーブルを作成してタグをマッピングできます。

{{< img src="cloud_cost/pipelines-map-multiple-tags-2.png" alt="タグパイプラインのリファレンステーブルを使用して customer_name のようなアカウントメタデータを追加" style="width:60%;" >}}

[[Alias tag keys]](#alias-tag-keys) と同様に、各リソースについて、最初の一致が見つかった時点でルールの実行は停止します。たとえば、`application` が見つかった場合、そのルールは `subscription_id` を探そうとはしません。

{{< ui >}}Additional options{{< /ui >}} セクションには、次のオプションがあります。

- {{< ui >}}Action when column exists{{< /ui >}} - 指定した列がすでに存在する場合の動作を選択します。
  - {{< ui >}}Don't apply the rule{{< /ui >}} - 列がすでに存在する場合はルールをスキップし、元の値を保持します。
  - {{< ui >}}Append the column{{< /ui >}} - 元の値を削除せずに、新しい値を既存の列に追加します。
  - {{< ui >}}Replace the column{{< /ui >}} - 既存の列の値を新しい値で置き換えます。<div class="alert alert-warning">列を置き換えると、既存のデータが上書きされる可能性があります。このオプションは慎重に使用してください。</div>
- {{< ui >}}Apply case-insensitive matching for primary key values{{< /ui >}}- リファレンステーブルの主キーの値と、タグキーが主キーと一致するコストデータ内のタグの値との間で、大文字と小文字を区別しない照合を有効にします。たとえば、UI の主キーの値のペアが `foo:Bar` で、コストデータのタグが `foo:bar` である場合に、両者を照合することができます。

## 予約済みタグ {#reserved-tags}

`env` や `host` などの特定のタグは[予約済みタグ][4]であり、[統合サービスタグ付け][3]の一部です。`host` タグは、タグパイプラインでは追加できません。

タグを使用すると、メトリクス、トレース、プロセス、ログの関連付けに役立ちます。`host` のような予約済みタグは、インフラストラクチャー全体にわたる可視性と効果的な監視を提供します。最適な関連付けと実用的なインサイトを得るために、Datadog のタグ付け戦略の一環としてこれらの予約済みタグを使用してください。

## タグを削除{#delete-tags}
タグパイプラインを使用して作成されたタグを削除するには、そのタグを作成したルールを削除します。24 時間以内に、そのタグが直近 3 か月分のデータから自動的に削除されます。それよりも古いデータからタグを削除する場合は、[Datadog サポート][5]にお問い合わせください。

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