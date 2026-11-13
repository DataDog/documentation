---
description: テレメトリルールを使用して、メトリクス、ログ、スパンのタグ、インデックス作成、その他の特性を管理します。
further_reading:
- link: /api/latest/tag-rules/
  tag: ドキュメント
  text: タグの可視性と強制ルール API
- link: /account_management/governance_console/
  tag: ドキュメント
  text: ガバナンスコンソール
- link: /account_management/governance_console/controls
  tag: ドキュメント
  text: Governance Console のコントロール
- link: /metrics/guide/tag-indexing-rules/
  tag: ドキュメント
  text: タグインデックスルール
- link: /metrics/guide/agent-filtering-for-custom-metrics
  tag: ドキュメント
  text: Custom Metrics の Agent 側フィルタリング
is_beta: true
private: true
title: テレメトリルール
---
{{< beta-callout url="#" btn_hidden="true" header="false" >}}
テレメトリルールはプレビュー版です。問題が発生した場合や新機能を提案したい場合は、製品 UI の [Give Feedback] ボタンを使用してください。
{{< /beta-callout >}}

## 概要 {#overview}

テレメトリルールは、管理者が Governance Console からメトリクス、ログ、スパンの特性を管理し、不要なテレメトリのコストを削減するのに役立ちます。テレメトリルールは、タグ付けの標準化、インジェストおよびインデックス作成されたボリュームの管理、未使用または冗長なテレメトリの最小化に役立ちます。

## 前提条件 {#prerequisites}

テレメトリルールを表示するには、`governance_console_read` 権限が必要です。ルールを作成、編集、削除するには、`telemetry_rules_write` 権限または Datadog Admin ロールが必要です。ルールでフィルタリングを有効にするには、`telemetry_rules_enforcement_write` 権限が必要です。

<div class="alert alert-info">一部のルールタイプでは、追加の権限や Agent のバージョンが必要になる場合があります。詳細については、各ルールタイプのページを参照してください。</div>

## テレメトリルールタイプ {#telemetry-rule-types}

| ルールタイプ | テレメトリタイプ | 適用場所 | 説明 |
|---|---|---|---|
| タグの可視性と強制 | メトリクス、ログ、スパン | インジェスト | テレメトリのタグと値が準拠しているかどうかを判断し、必要に応じて準拠していないテレメトリをインジェスト時に破棄します。|
| タグのインデックス作成 | メトリクス | インジェスト | 特定のメトリクスに対してインデックスを作成するカスタムメトリクスタグを決定します。|
| メトリクス名のフィルタリング | メトリクス | Agent | 特定の名前のカスタムメトリクスを、インジェストの前に Datadog Agent で直接破棄します。|

## タグの可視性と強制ルール {#tag-visibility-and-enforcement-rules}

### タグの可視性ルールを作成する {#create-a-tag-visibility-rule}

1. [Governance Console > Telemetry](https://app.datadoghq.com/governance/telemetry) に移動し、**+ Create New Rule** をクリックします。
2. シグナルタイプ (**メトリクス**、**APM**、または **ログ**) と **タグの可視性と強制**ルールタイプを選択します。
3. スコープを選択します。選択したタイプのすべてのテレメトリにルールを適用するには、**すべての[スパン/メトリクス/ログ]**を選択します。ルールをサブセットにスコープするには、**選択した[スパン/メトリクス/ログ]**を選択し、タグクエリを入力します (例: `service:web-store` や `env:prod AND team:payments`)。Datadog モニターやダッシュボードで使用されるものと同じクエリ構文が、ここでも適用されます。
4. タグキーを定義します。強制するタグキーを入力します (例: `env` や `team`)。**タグキーが必須**を選択すると、そのキーがないテレメトリを非準拠としてフラグを立てます。

   <div class="alert alert-info"><strong>タグキーが必須</strong>が選択されていない場合、ルールは指定されたタグキーをすでに持っているテレメトリのみを評価します。キーを持たないテレメトリは評価されず、準拠しているとみなされます。</div>
5. タグ値を指定します。**許可されたタグ値**を選択して許可リストを定義するか、**許可されないタグ値**を選択して拒否リストを定義します。値をカンマ区切りのリストとして入力します。ワイルドカードがサポートされています (例: `us*` は `us-east-1` や `us-west-2` に一致します)。
6. ルールに名前を付けます。ルールで何を強制するかを説明する説明を入力します (例: *すべてのリソースにチームタグを必須にする*)。

   <div class="alert alert-info">ルールを作成するまで、<strong>Filter data at ingest</strong> を切り替えることはできません。</div>
7. **Create Rule** をクリックします。

{{< img src="account_management/governance_console/telemetry_rules/creating_telemetry_rule.mp4" alt="Governance Console でタグの可視性ルールを作成する" video="true" style="width:100%;" >}}

### タグの可視性ルールのコンプライアンスを確認する {#review-tag-visibility-rule-compliance}

タグの可視性ルールを作成すると、Datadog は一致するすべてのテレメトリについてコンプライアンスの追跡を開始します。ルールを開いて以下を確認します。

- **コンプライアンススコア**: 選択した期間にわたって計算された、対象範囲内のスパン、メトリクス、またはログイベントのうち、ルールを満たしているものの割合。コンプライアンススコアが 100% の場合、一致するすべてのテレメトリがルールに準拠していることを意味します。コンプライアンススコアが 0% の場合、一致するテレメトリのいずれもルールに準拠していないことを意味します。
- **経時的なスコア**: コンプライアンスの推移を示すチャート。時間セレクターを使用して、希望する期間の傾向を表示します。このチャートはメトリクスでは利用できず、メトリクスの履歴は過去 8 時間に制限されています。
- **非準拠のテレメトリ**: ルールに違反している個々のスパン、メトリクス、またはログイベントを表示するテーブル。サービス名、リソース、およびシグナル固有の詳細情報が含まれます。行をクリックすると、該当するテレメトリの詳細が表示されます。**View in Trace** をクリックすると、非準拠のスパンをトレースエクスプローラーで直接開くことができます。

### フィルタリングによるタグコンプライアンスの強制 {#enforce-tag-compliance-through-filtering}

タグの可視性ルールを作成して確認した後、インジェスト時に非準拠のテレメトリをフィルタリングすることで、ルールを強制できます。

<div class="alert alert-warning">フィルタリングルールは、設定を誤るとデータが完全に失われる可能性があります。タグの可視性ルールを作成してからフィルタリングを有効にするまで、5 分間の待機時間が必要です。</div>

フィルタリングを有効にするには、

1. 該当するタグの可視性ルールに移動して、開きます。
2. ルールの説明、コンプライアンススコア、および非準拠のテレメトリを注意深く確認します。
3. **ルールアクション**の下にある **Filter data at ingest** を切り替えて、ルールを強制します。
4. 必要なテキストを入力して送信し、フィルタリングの適用を確認します。

ルールは、インジェスト時に非準拠のテレメトリを直ちにフィルタリングし始めます。非準拠のテレメトリのサンプルは、[Audit Trail](/account_management/audit_trail/) に記録されます。これらのサンプルを表示するには、ルールに移動し、テーブルをスクロールするか、**View in Audit Trail** をクリックします。

{{< img src="account_management/governance_console/telemetry_rules/enforcing_telemetry_rule.mp4" alt="タグの可視性ルールの適用とフィルタリングされたテレメトリの表示" video="true" style="width:100%;" >}}

## ルールの編集または削除 {#edit-or-delete-a-rule}

任意のルール行の **⋮** メニューをクリックして、編集または削除します。編集内容は直ちに反映されます。ルールがアクティブにテレメトリをフィルタリングまたはドロップしている場合でも同様であり、以前のルールコンプライアンスデータは保持されません。

## その他のルール {#other-rules}

Governance Console から、メトリクスに関する特定のルールを作成および管理できます。または、Metrics Settings からこれらのルールを管理することもできます。ルール固有の詳細については、以下のリファレンスドキュメントを参照してください。

- [タグのインデックス作成](/metrics/guide/tag-indexing-rules/)
- [メトリクス名のフィルタリング](/metrics/guide/agent-filtering-for-custom-metrics)

## 制限事項 {#limitations}

- シグナルタイプごとに最大 10 個のルールを作成できます (スパン、メトリクス、ログにはそれぞれ 10 個の制限があります)。
- タグの可視性と適用ルールでは、最大 30 個のタグ値を指定できます。
- テレメトリルールは、メトリクス、ログ、スパン以外のテレメトリタイプでは使用できません。

タグ付け戦略でより多くのルールやタグ値が必要な場合は、Datadog アカウントチームに連絡して上限の引き上げをリクエストしてください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}