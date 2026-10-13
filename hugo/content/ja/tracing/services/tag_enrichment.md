---
description: コードを再デプロイすることなく、Catalog サービス定義のチームタグやシステムタグを使用して、テレメトリを自動的にエンリッチします。
further_reading:
- link: /tracing/services/service_remapping_rules
  tag: ドキュメント
  text: サービスリマッピングルール
- link: /internal_developer_portal/catalog/
  tag: ドキュメント
  text: カタログ
title: タグエンリッチメント
---
{{< callout url="https://www.datadoghq.com/product-preview/tag-enrichment/" >}}
タグエンリッチメントはプレビュー版です。アクセスをリクエストするには、このフォームに記入してください。
{{< /callout >}}

## 概要 {#overview}

タグエンリッチメントルールを使用して、コードの変更や再デプロイを行うことなく、ログ、APM スパン、トレースメトリクスにタグを追加します。Catalog で既に定義済みのサービスメタデータの値、別のタグの値、または固定値を使用できます。

## 前提条件{#prerequisites}

タグエンリッチメントルールを作成するには、Datadog Admin ロールが必要です。詳細については、[ロールベースのアクセス制御][2]を参照してください。

## タグエンリッチメントルールを作成する {#create-a-tag-enrichment-rule}

### デフォルトのタグエンリッチメントルール {#default-tag-enrichment-rules}

デフォルトルールを有効にするには、{{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1] に移動し、ページ下部にある `team` または `system` のデフォルトルールをオンに切り替えます。

{{< img src="tracing/services/tag_enrichment/tag-enrichment-landing.png" alt="「Suggested rules（推奨ルール）」パネルが表示されているタグエンリッチメントページ。すべてのサービスのシステムタグおよびチームタグのエンリッチメントルールを作成するオプションがあります。" >}}

デフォルトルールを有効にすると、IDP で定義されたエンティティメタデータに基づいて、すべてのサービスのテレメトリに `team` または `system` が適用されます。エンティティメタデータが入力されているサービスのみがエンリッチされます。タグは、そのサービスのテレメトリに該当するタグの値がまだ存在しない場合にのみ追加されます。

### カスタムタグエンリッチメントルール {#custom-tag-enrichment-rules}

カスタムルールを使用すると、特定のサービス群を対象にし、各タグの値がどのように取得され、適用されるかを正確に構成できます。

1. Datadog で、{{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1] に移動し、{{< ui >}}\+ Add Rule{{< /ui >}} をクリックします。
1. エンリッチするエンティティを選択します。エンティティを選択すると、バックグラウンドでクエリが構築されます。クエリを編集するには、[{{< ui >}}Build Advanced Query{{< /ui >}}] (高度なクエリを構築) を選択します。
   {{< img src="tracing/services/tag_enrichment/tag-enrichment-adv-query.png" alt="「Build Advanced Query（高度なクエリの構築）」タブが選択された「Add IDP tag enrichment rule（IDP タグエンリッチメントルールの追加）」モーダル。タグキー、演算子、値のフィールドと、「Add Condition（条件の追加）」オプションが表示されています。" >}}
   - {{< ui >}}Add Condition{{< /ui >}}を選択して、クエリに`AND`条件を追加します。
   - {{< ui >}}Value{{< /ui >}}フィールドに複数の値を追加して、`OR`条件を作成します。
1. タグとエンリッチメント方法を選択します：
   - `team`タグ、`system`タグ、`custom`タグ、または複数を選択します。
   - 各タグについて、タグ値の取得元がエンティティメタデータ、別のタグの値、または固定値のいずれであるかを選択します。
   - 値がまだ存在しない場合にのみ適用するか、そのタグの現在の値リストに追加するかを選択します。
1. デフォルトでは、タグは特定のテレメトリ項目に値が存在しない場合にのみ追加されます。
1. 必要に応じて、ルールにわかりやすい名前を入力します。
1. ルールを確認して保存します。ルールを保存してから、エンリッチメントが受信テレメトリに完全に適用されるまで最大1時間かかる場合があります。

### サービスページからタグエンリッチメントルールを追加する {#add-a-tag-enrichment-rule-from-a-service-page}

サービスページで、`team`または`system`タグがない場合、{{< ui >}}Service Config{{< /ui >}}をクリックして構成サイドパネルを開きます。パネル上部のバナーに、不足しているタグが表示されます。

{{< img src="tracing/services/tag_enrichment/service-config-side-panel.png" alt="サービス用のサービス構成サイドパネル。チームタグとシステムタグがテレメトリから不足していることを示すバナーと、[タグの追加]ボタンが表示されています。" >}}

{{< ui >}}Add Tags{{< /ui >}}をクリックして、そのサービスが事前に入力済みのタグエンリッチメントルールモーダルを開きます。

{{< img src="tracing/services/tag_enrichment/add-idp-tag-enrichment-rule.png" alt="[IDPタグエンリッチメントルールの追加]モーダル。エンリッチするエンティティ、追加するタグ、タグソースメソッドを選択するためのフィールドが表示されています。" >}}

## タグエンリッチメントの動作 {#tag-enrichment-behavior}

- **影響を受けるテレメトリ**: タグエンリッチメントは、ログ、APMスパン、およびトレースメトリクスにのみ適用されます。[Data Observability: Jobs Monitoring][3]はジョブテレメトリをAPMスパンとして送信するため、そのテレメトリもエンリッチされますが、Jobs Monitoringのメトリクスはエンリッチされません。タグエンリッチメントは、カスタムメトリクスやインフラストラクチャーメトリクス、Database Monitoring、Profiling、Kubernetes、Universal Service Monitoring、イベントなど、他のテレメトリタイプではサポートされていません。
- **履歴データ**：タグエンリッチメントルールは、ルールが有効な間に取り込まれたテレメトリにのみ適用されます。過去のデータは遡及的に更新されません。ルールを削除または変更すると、新しいテレメトリへの適用は停止されますが、以前に取り込まれたデータは更新されません。
- **メタデータの更新**：エンリッチメントルール（デフォルトルールを含む）が有効な状態でサービスにエンティティメタデータを更新または追加すると、それらのタグは自動的に更新されます。
- **ルールの処理順序**：タグエンリッチメントルールは、作成された順序で適用されます。リストの上位にあるルールは、下位にあるルールよりも優先されます。
- **リマッピングルールとの相互作用**：タグエンリッチメントルールは、サービスリマッピングルールの後に適用されます。サービスリマッピングルールが`service`タグを変更した場合、エンリッチメントはIDPメタデータを検索する際に更新されたサービス名を使用します。
- **プライマリタグ** タグエンリッチメントはプライマリタグの解決後に適用されるため、エンリッチされたタグをプライマリタグとして使用することはできません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/software/settings/tag-enrichment
[2]: /ja/account_management/rbac/
[3]: /ja/data_observability/jobs_monitoring/