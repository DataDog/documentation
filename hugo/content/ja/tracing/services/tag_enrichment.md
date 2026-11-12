---
description: コードを再デプロイすることなく、Catalog サービスの定義からチームタグやシステムタグを使用してテレメトリを自動的にエンリッチします。
further_reading:
- link: /tracing/services/service_remapping_rules
  tag: ドキュメント
  text: サービスリマッピングルール
- link: /internal_developer_portal/catalog/
  tag: ドキュメント
  text: カタログ
title: タグエンリッチメント
---
## 概要 {#overview}

タグエンリッチメントルールを使用して、コードの変更や再デプロイなしでテレメトリにタグを追加します。Catalog で既に定義済みのサービスメタデータの値、別のタグの値、または固定値を使用できます。

## 前提条件 {#prerequisites}

タグエンリッチメントルールを作成するには、Datadog Admin ロールが必要です。詳細については、[ロールベースのアクセス制御][2] を参照してください。

## タグエンリッチメントルールを作成する {#create-a-tag-enrichment-rule}

### デフォルトのタグエンリッチメントルール {#default-tag-enrichment-rules}

デフォルトルールを有効にするには、{{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1] に移動し、ページ下部にある `team` または `system` のデフォルトルールをオンに切り替えます。

{{< img src="tracing/services/tag_enrichment/tag-enrichment-landing.png" alt="すべてのサービスのシステムタグおよびチームタグのエンリッチメントルールを作成するオプションが表示された、Suggested rules パネルを示す Tag Enrichment ページ。" >}}

デフォルトルールを有効にすると、IDP で定義された Entity Metadata に基づいて、サービスのすべてのテレメトリに `team` または `system` が適用されます。Entity Metadata が入力されているサービスのみがエンリッチされます。タグは、サービスのテレメトリにそのタグの値がまだ存在しない場合にのみ追加されます。

### カスタムタグエンリッチメントルール {#custom-tag-enrichment-rules}

カスタムルールを使用すると、特定のサービス群を対象に、各タグの値をどのように収集して適用するかを正確に設定できます。

1. Datadog で、{{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1] に移動し、{{< ui >}}\+ Add Rule{{< /ui >}} をクリックします。
1. エンリッチするエンティティを選択します。エンティティを選択すると、バックグラウンドでクエリが構築されます。クエリを編集するには、{{< ui >}}Build Advanced Query{{< /ui >}} を選択します。
   {{< img src="tracing/services/tag_enrichment/tag-enrichment-adv-query.png" alt="Build Advanced Query タブが選択された Add IDP tag enrichment rule モーダル。タグキー、演算子、値のフィールドと、Add Condition オプションが表示されています。" >}}
   - {{< ui >}}Add Condition{{< /ui >}} を選択して、クエリに `AND` 条件を追加します。
   - {{< ui >}}Value{{< /ui >}} フィールドに複数の値を追加して、`OR` 条件を作成します。
1. タグとエンリッチメント方法を選択します：
   - `team` タグ、`system` タグ、`custom` タグのいずれか、または複数のタグを選択します。
   - 各タグについて、タグの値を Entity Metadata、別のタグの値、固定値のいずれから収集するかを選択します。
   - 値がまだ存在しない場合にのみ適用するか、そのタグの現在の値リストに追加するかを選択します。
1. エンリッチするテレメトリタイプを選択します。
1. ルールを確認して保存します。ルールを保存した後、エンリッチメントが受信テレメトリに完全に適用されるまで最大 1 時間かかる場合があります。

### サービスページからタグエンリッチメントルールを追加する {#add-a-tag-enrichment-rule-from-a-service-page}

`team` または `system` タグがないサービスページで、{{< ui >}}Service Config{{< /ui >}} をクリックして設定サイドパネルを開きます。パネル上部のバナーに、不足しているタグが表示されます。

{{< img src="tracing/services/tag_enrichment/service-config-side-panel.png" alt="サービスの Service Config サイドパネル。テレメトリにチームタグとシステムタグが付いていないことを示すバナーと、Add Tags ボタンが表示されています。" >}}

{{< ui >}}Add Tags{{< /ui >}} をクリックして、そのサービスが事前入力されたタグエンリッチメントルールモーダルを開きます。

{{< img src="tracing/services/tag_enrichment/add-idp-tag-enrichment-rule.png" alt="Add IDP tag enrichment rule モーダル。エンリッチするエンティティ、追加するタグ、タグのソースを指定する方法を選択するためのフィールドが表示されています。" >}}

## タグエンリッチメントの動作 {#tag-enrichment-behavior}

- **影響を受けるテレメトリ**：タグエンリッチメントは、DSM、Events、Orchestration を除くすべてのテレメトリに適用されます。
- **履歴データ**：タグエンリッチメントルールは、ルールがアクティブな間に取り込まれたテレメトリにのみ適用されます。過去のデータは遡及的に更新されません。ルールを削除または変更すると、新しいテレメトリへの適用は停止されますが、以前に取り込まれたデータは更新されません。
- **メタデータの更新**：デフォルトルールを含むエンリッチメントルールが有効な状態で、サービスの Entity Metadata を更新または追加すると、それらのタグが自動的に更新されます。
- **ルールの処理順序**：タグエンリッチメントルールは、作成された順序で適用されます。リストの上位にあるルールは、その下にあるルールよりも優先されます。
- **リマッピングルールとの相互作用**：タグエンリッチメントルールは、サービスリマッピングルールの後に適用されます。サービスリマッピングルールが `service` タグを変更する場合、エンリッチメントは IDP メタデータを検索する際に更新されたサービス名を使用します。
- **プライマリタグ** タグエンリッチメントはプライマリタグの解決後に適用されるため、エンリッチされたタグをプライマリタグとして使用することはできません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/software/settings/tag-enrichment
[2]: /ja/account_management/rbac/
[3]: /ja/data_observability/jobs_monitoring/