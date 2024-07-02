---
title: Datadog Audit Trail
aliases:
    - /account_management/audit_logs/
further_reading:
- link: /account_management/audit_trail/events/
  tag: Documentation
  text: Learn about Audit Trail events
- link: /account_management/org_settings/
  tag: Documentation
  text: Learn about organization settings
- link: /data_security/pci_compliance/
  tag: Documentation
  text: Set up a PCI-compliant Datadog organization
- link: "https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/"
  tag: Blog
  text: Build compliance, governance, and transparency across your teams with Datadog Audit Trail
- link: "https://www.datadoghq.com/blog/audit-trail-best-practices/"
  tag: Blog
  text: Monitor critical Datadog assets and configurations with Audit Trail
---

## 概要

管理者またはセキュリティチームのメンバーは、[Datadog 監査証跡][1]を使用して組織内で Datadog を使用しているユーザーとそのコンテキストを確認できます。個人として、自身のアクションをストリームで確認することも可能です。

監査証跡内で発生するイベントには、Datadog API に要求されたすべてのリクエストを顧客リクエストに変換する**リクエストイベント**と、**製品特化イベント**の 2 種類があります。

たとえば、**リクエストイベント**を追跡すると、そのイベントに到達する API 呼び出しを確認できます。または、組織または請求担当の管理者の場合は、監査証跡イベントを使用してインフラストラクチャーの状態を変更したユーザーイベントを追跡できます。

この環境では、以下のような製品特有のイベントについて確認する場合に監査証跡が便利です。

  -  ログのボリュームが変化し、毎月の請求額が変化したためインデックスの保持期間が変更されたとき。

  - ダッシュボードまたはモニターが壊れていて修復が必要な場合に、プロセッサまたはパイプラインを変更したユーザーおよびその変更日時を確認する。

  - インデックス化のボリュームが増減し、ログが見つからないまたは請求額が増加したため、除外フィルターを変更したユーザーを確認する。

セキュリティ管理者またはInfoSecチームには、監査証跡イベントはコンプライアンスチェックや Datadog リソースにおける監査証跡（だれがいつ何をしたか）の管理に便利です。たとえば、以下のような監査証跡を管理できます。

- 重要なダッシュボード、モニター、その他の Datadog リソースの更新または削除があった場合の日時と実行者。

- 組織内のユーザーログイン、アカウント、ロール変更。

**注**: PCI 準拠の Datadog 組織をセットアップするための情報は、[PCI DSS 準拠][2]をご覧ください。

## セットアップ

To enable Datadog Audit Trail, navigate to your [Organization Settings][3] and select *Audit Trail Settings* under *COMPLIANCE*. Click the **Enable** button.

{{< img src="account_management/audit_logs/audit_trail_settings.png" alt="監査証跡の設定ページで無効になっている様子" style="width:85%;">}}

監査証跡を有効にした人を確認するには
1. Navigate to [Events Explorer][4].
2. 検索バーに `Datadog Audit Trail was enabled by` と入力します。イベントをキャプチャするために、より広い時間範囲を選択する必要がある場合があります。
3. "A user enabled Datadog Audit Trail" というタイトルの最新イベントには、最後に監査証跡を有効にしたのが誰であるかが表示されます。

## 構成


### 権限
Only users with `Audit Trail Write` permission can enable or disable Audit Trail. Additionally, users need `Audit Trail Read` permission to view audit events using Audit Explorer. 

### アーカイブ

アーカイブは、監査証跡のオプション機能です。Amazon S3、Google Cloud Storage、Azure Storage への書き込みと、これらの場所から SIEM システムによりイベントを読み取るためにアーカイブを使用できます。アーカイブ構成を作成または更新してから次にアーカイブのアップロードが試行されるまで、数分かかることがあります。イベントは 15 分ごとにアーカイブにアップロードされるので、**15 分待ってストレージバケットをチェックし**、Datadog アカウントからアーカイブが正常にアップロードされたことを確認してください。

To enable archiving for Audit Trail, navigate to your [Organization Settings][3] and select *Audit Trail Settings* under *Compliance*. Scroll down to Archiving and click the Store Events toggle to enable.

### 保持

イベントの保持は、監査証跡のオプション機能です。*Retention* までスクロールし、*Retain Audit Trail Events* のトグルをクリックすると、有効になります。

デフォルトの監査証跡イベント保持期間は 7 日間です。保持期間は 3～90 日間の間で設定できます。

{{< img src="account_management/audit_logs/retention_period.png" alt="Datadog の監査証跡保持期間の設定" style="width:80%;">}}

## 監査イベントの確認

To explore an audit event, navigate to the [Audit Trail][1] section, also accessible from your [Organization Settings][3] in Datadog.

{{< img src="account_management/audit_logs/audit_side_nav.png" alt="組織設定メニューの監査証跡設定" style="width:30%;">}}

Audit Trail events have the same functionality as logs within the [Log Explorer][5]:

- フィルターを使用して、イベント名 (ダッシュボード、モニター、認証など)、認証属性 (アクター、API キー ID、ユーザーのメールアドレスなど)、`Status` (`Error`、`Warn`、`Info`)、メソッド (`POST`、`GET`、`DELETE`) およびその他のファセット別に監査証跡イベントを確認します。

- イベントを選択してイベント属性タブに移動し、関連する監査証跡イベントを確認します。絞り込みまたは検索から除外する特定の属性を選択します (`http.method`、`usr.email`、`client.ip` など)。

{{< img src="account_management/audit_logs/attributes.png" alt="組織設定メニューの監査証跡" style="width:50%;">}}


### 保存ビュー

効率的なトラブルシューティングには、探索を可能にする適切なスコープにデータがあり、意味のある情報を表示する視覚化オプションにアクセスでき、分析を可能にする関連ファセットがリストされていることが必要です。トラブルシューティングはコンテキストに依存するため、保存ビューを使用すると、あなたとチームメイトが異なるトラブルシューティングコンテキスト間で簡単に切り替えられるようになります。保存ビューは、監査証跡エクスプローラーの左上隅からアクセスできます。

デフォルトのビュー以外のすべての保存ビューは、組織全体で共有されます。

* **インテグレーション保存ビュー**は、監査証跡と同時に提供されます。これらのビューは読み取り専用で、Datadog のロゴが表示されます。
* **Custom saved views** are created by users. They are editable by any user in your organization (except [read only users][6]), and identified with the avatar of the user who created them Click the **Save** button to create a new custom saved view from the current content of your explorer.

Views パネルの保存ビューエントリからは、いつでも以下のアクションが可能です。

* 保存ビューを**ロード**または**リロード** 
* 現在のビューのコンフィギュレーションで保存ビューを**更新**。
* 保存ビューの**名前を変更**または**削除**。
* ショートリンクを使用して保存ビューを**共有**。
* 保存ビューに**スター**を付けて、保存ビューリストの先頭に表示。ナビゲーションメニューから直接アクセス可能になります。

**Note:** Update, rename, and delete actions are disabled for integration saved views and [read only users][6].


### デフォルトのビュー

{{< img src="logs/explorer/saved_views/default.png" alt="デフォルトビュー" style="width:50%;" >}}

デフォルトビュー機能では、監査証跡エクスプローラーを最初に開いたときに常に表示されるクエリやフィルターのデフォルトセットを設定することができます。デフォルトビューに戻るには、Views パネルを開き、リロードボタンをクリックします。

既存の監査証跡エクスプローラーのビューは、デフォルトの保存ビューです。この構成は、自身のみがアクセスおよび閲覧可能であり、この構成を更新しても、組織には何の影響も与えません。UI で何らかのアクションを実行するか、別の構成を埋め込んだ監査証跡エクスプローラーのリンクを開くことで、デフォルトの保存ビューを**一時的**にオーバーライドすることができます。

Views パネルのデフォルト保存ビューエントリからは、いつでも以下のアクションが可能です。

* エントリをクリックして、デフォルトビューを**リロード**。
* 現在のパラメーターでデフォルトビューを**更新**。
* デフォルトビューを Datadog のデフォルトに**リセット**して再起動。

### 注目イベント

注目イベントとは、監査イベントのサブセットで、Datadog が特定した、請求に影響を与える可能性のある、またはセキュリティに影響を与える可能性のある重要な構成変更を示すものです。これにより、組織管理者は、生成された多くのイベントの中から最も重要なイベントに絞り込むことができ、利用可能なすべてのイベントとそのプロパティについて学習する必要がありません。

{{< img src="account_management/audit_logs/notable_events.png" alt="監査イベントのファセットパネルで、チェックした注目イベントが表示される" style="width:30%;">}}

以下のクエリにマッチするイベントは、注目イベントとしてマークされます。

| 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ------------------------------------------------------------------- | --------------------------------------------------|
| ログベースメトリクスの変更 | `@evt.name:"Log Management" @asset.type:"custom_metrics"` |
| ログ管理インデックスの除外フィルターの変更 | `@evt.name:"Log Management" @asset.type:"exclusion_filter"` |
| ログ管理インデックスの変更 | `@evt.name:"Log Management" @asset.type:index` |
| APM 保持フィルターの変更 | `@evt.name:APM @asset.type:retention_filter` |
| APM カスタムメトリクスの変更 | `@evt.name:APM @asset.type:custom_metrics` |
| メトリクスタグの変更 | `@evt.name:Metrics @asset.type:metric @action:(created OR modified)` |
| RUM アプリケーションの作成と削除 | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| 機密データスキャナーのスキャングループの変更 | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| Synthetic テストの作成または削除 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |

### Inspect Changes (Diff)

監査イベントの詳細パネルにある Inspect Changes (Diff) タブは、行われた構成変更と以前に設定されたものを比較します。ダッシュボード、ノートブック、およびモニターの構成に加えられた変更が表示され、JSON オブジェクトとして表されます。

{{< img src="account_management/audit_logs/inspect_changes.png" alt="監査イベント側のパネルで、複合条件モニター構成の変更を表示。緑でハイライトされたテキストが変更されたもので、赤でハイライトされたテキストは削除されたものです。" style="width:70%;">}}

## Filter audit events based on Reference Tables

<div class="alert alert-warning">Reference Tables are in beta. Reference Tables containing over 40,000 rows cannot be used to filter events. See <a href="https://docs.datadoghq.com/integrations/guide/reference-tables/">Add Custom Metadata with Reference Tables</a> for more information on how to create and manage Reference Tables. </div>

Reference Tables allow you to combine metadata with audit events, providing more information to investigate Datadog user behavior. Add a query filter based on a Reference Table to perform lookup queries. For more information on activating and managing this feature, see the [Reference Tables][2] guide.

To apply a query filter with Reference Tables, click on the `+ Add` button next to the query editor and select **Join with Reference Table**. In the following example, the Reference Table query filter is used to search for dashboards modified by users who are accessing Datadog from non-authorized IP addresses:

{{< img src="account_management/audit_logs/reference_tables.png" alt="The Datadog Audit Trail explorer with reference table search options highlighted" border="true" popup="true" style="width:100%;" >}}

### API key auditing

<div class="alert alert-warning">API key auditing is in private beta.</div>

Log management users can audit API key usage with Audit Trail. For API key auditing, logs have a `datadog.api_key_uuid` tag that contains the UUID of the API key used for collecting those logs. Use this information to determine:
- How API keys are used across your organization and telemetry sources.
- API key rotation and management.

## モニターを作成

To create a monitor on a type of audit trail event or by specificTrail attributes, see the [Audit Trail Monitor documentation][7]. For example, set a monitor that triggers when a specific user logs in, or set a monitor for anytime a dashboard is deleted.

## ダッシュボードやグラフの作成

ダッシュボードを使用すると、監査証跡イベントに視覚的なコンテキストを追加できます。監査ダッシュボードを作成するには:

1. Create a [New Dashboard][8] in Datadog.
2. Select your visualization. You can visualize Audit events as [top lists][9], [timeseries][10], and [lists][11].
3. [Graph your data][12]: Under edit, select *Audit Events* as the data source, and create a query. Audit events are filtered by count and can be grouped by different facets. Select a facet and limit.
{{< img src="account_management/audit_logs/audit_graphing.png" alt="監査証跡をデータソースとして設定しデータからグラフを作成" style="width:100%;">}}
4. 表示設定を完了してグラフにタイトルを付けます。*Save* ボタンをクリックしてダッシュボードを作成します。

## スケジュールレポートの作成

Datadog 監査証跡では、監査分析ビューを定期的にスケジュールされたメールとして送信することができます。これらのレポートは、Datadog プラットフォームの使用状況を定期的に監視するのに便利です。例えば、国別のユニークな Datadog ユーザーログイン数の週次レポートを取得するように選択できます。このクエリにより、異常なログインアクティビティを監視したり、使用状況に関する自動化された洞察を受け取ったりすることができます。

監査分析クエリをレポートとしてエクスポートするには、時系列、トップリスト、またはテーブルクエリを作成し、**More...** > **Export as scheduled report** をクリックして、クエリをスケジュールレポートとしてエクスポートを開始します。

{{< img src="account_management/audit_logs/scheduled_report_export.png" alt="More… ドロップダウンメニューの Export as scheduled report 機能" style="width:90%;" >}}

1. クエリウィジェットで作成されるダッシュボードの名称を入力します。新しいダッシュボードは、スケジュールされたレポートごとに作成されます。このダッシュボードは、レポートの内容やスケジュールを変更する必要がある場合に、後で参照・変更することができます。
2. レポートの頻度や時間帯をカスタマイズして、メールレポートのスケジュールを設定します。
3. メールを送信したい受信者を追加します。
4. メールレポートの一部として必要なカスタマイズされたメッセージを追加します。
5. **Create Dashboard and Schedule Report** をクリックします。

{{< img src="account_management/audit_logs/export_workflow.png" alt="監査分析ビューをスケジュールメールにエクスポートする" style="width:80%;" >}}

## 監査イベントを CSV 形式でダウンロード

Datadog Audit Trail allows you to download up to 100K audit events as a CSV file locally. These events can then be analyzed locally, uploaded to a different tool for further analytics, or shared with appropriate team members as part of a security and compliance exercise.

To export audit events as CSV:
1. Run the appropriate search query that captures the events you are interested in
2. CSV の一部として取り入れたいイベントフィールドをビューの列として追加します
3. Download as CSV をクリックします
4. エクスポートするイベント数を選択し、CSV 形式でエクスポートします

## すぐに使えるダッシュボード

Datadog Audit Trail comes with an [out-of-the-box dashboard][13] that shows various audit events, such as index retention changes, log pipeline changes, dashboard changes, and more. Clone this dashboard to customize queries and visualizations for your auditing needs.

{{< img src="account_management/audit_logs/audit_dashboard.png" alt="監査証跡ダッシュボード" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /data_security/pci_compliance/
[3]: https://app.datadoghq.com/organization-settings/
[4]: https://app.datadoghq.com/event/explorer
[5]: /logs/explorer/
[6]: https://docs.datadoghq.com/account_management/rbac/permissions/?tab=ui#general-permissions
[7]: /monitors/types/audit_trail/
[8]: /dashboards/
[9]: /dashboards/widgets/top_list/
[10]: /dashboards/widgets/timeseries/
[11]: /dashboards/widgets/list/
[12]: /dashboards/querying/#define-the-metric/
[13]: https://app.datadoghq.com/dash/integration/30691/datadog-audit-trail-overview?from_ts=1652452436351&to_ts=1655130836351&live=true
