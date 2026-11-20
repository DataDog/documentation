---
aliases:
- /ja/account_management/audit_logs/
description: コンプライアンス、セキュリティ、ガバナンスのための包括的な監査ログを使用して、Datadog のユーザーアクティビティ、API リクエスト、リソースの変更を監視します。
further_reading:
- link: /account_management/audit_trail/events/
  tag: ドキュメント
  text: Audit Trail イベントについて
- link: /account_management/org_settings/
  tag: ドキュメント
  text: 組織設定について
- link: /data_security/pci_compliance/
  tag: ドキュメント
  text: PCI DSS Compliance
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: ブログ
  text: Datadog Audit Trail で、チーム全体のコンプライアンス、ガバナンス、透明性を構築する
- link: https://www.datadoghq.com/blog/audit-trail-best-practices/
  tag: ブログ
  text: Audit Trail で重要な Datadog のアセットと構成を監視する
- link: /account_management/delete_data/
  tag: ドキュメント
  text: Datadog からデータを削除する
title: Datadog Audit Trail
---
## 概要 {#overview}

管理者またはセキュリティチームのメンバーは、[Datadog Audit Trail][1] を使用して組織内で Datadog を使用しているユーザーとそのコンテキストを確認できます。個人として、自身のアクションをストリームで確認することも可能です。

監査証跡内で発生するイベントには、Datadog API に要求されたすべてのリクエストを顧客リクエストに変換する**リクエストイベント**と、**製品特化イベント**の 2 種類があります。

たとえば、**リクエストイベント**を追跡すると、そのイベントに到達する API 呼び出しを確認できます。または、組織や請求担当の管理者の場合は、Audit Trail イベントを使用してインフラストラクチャーの状態を変更するユーザーイベントを追跡します。

この環境では、以下のような製品特有のイベントについて確認する場合に監査証跡が便利です。

  -  ログのボリュームが変化し、毎月の請求額が変化したためインデックスの保持期間が変更されたとき。

  - ダッシュボードまたはモニターが壊れていて修復が必要な場合に、プロセッサーまたはパイプラインを変更したユーザーおよびその変更日時を確認する。

  - インデックス化のボリュームが増減し、ログが見つからないまたは請求額が増加したため、除外フィルターを変更したユーザーを確認する。

セキュリティ管理者または InfoSec チームには、監査証跡イベントはコンプライアンスチェックや Datadog リソースにおける監査証跡 (誰がいつ何をしたか) の管理に便利です。たとえば、以下のような監査証跡を管理できます。

- 重要なダッシュボード、モニター、その他の Datadog リソースの更新または削除があった場合の日時と実行者。

- 組織内のユーザーログイン、アカウント、ロール変更。

また、[Cloud SIEM][15] で Audit Trail イベントを分析して脅威を検出し、セキュリティシグナルを生成することもできます。詳しくは、[Cloud SIEM の概要][16]を参照してください。

**注**: Datadog のツールとポリシーは PCI v4.0 に準拠しています。詳細については、[PCI DSS 準拠][2]を参照してください。

## セットアップ {#setup}

Datadog Audit Trail を有効にするには、[組織設定][3]に移動し、{{< ui >}}COMPLIANCE{{< /ui >}} の下にある {{< ui >}}Audit Trail Settings{{< /ui >}} を選択します。{{< ui >}}Enable{{< /ui >}} ボタンをクリックします。

{{< img src="account_management/audit_logs/audit_trail_settings.png" alt="無効になっている状態を示す Audit Trail 設定ページ" style="width:85%;">}}

Audit Trail を有効にしたユーザーを確認するには、以下の手順を実行します。
1. [イベントエクスプローラー][4]に移動します。
2. 検索バーに `Datadog Audit Trail was enabled by` と入力します。イベントをキャプチャするために、より広いタイムレンジを選択する必要がある場合があります。
3. "A user enabled Datadog Audit Trail" というタイトルの最新イベントには、最後に Audit Trail を有効にしたのが誰であるかが表示されます。

## 構成 {#configuration}


### 権限 {#permissions}
Audit Trail を有効または無効にできるのは、`Audit Trail Write` 権限を持つユーザーのみです。さらに、Audit Explorer で監査イベントを表示するには、`Audit Trail Read` 権限が必要です。

### アーカイブ {#archiving}

アーカイブは、Audit Trail のオプション機能です。アーカイブを使用して、Amazon S3、Google Cloud Storage、または Azure Storage への書き込みと、SIEM システムからのイベントの読み取りを実行できます。アーカイブ構成を作成または更新してから次にアーカイブのアップロードが試行されるまでに数分かかることがあります。イベントは 15 分ごとにアーカイブにアップロードされるので、15 分後にストレージバケットをチェックし、Datadog アカウントからアーカイブが正常にアップロードされていることを確認してください。

Audit Trail のアーカイブを有効にするには、[組織設定][3]に移動し、{{< ui >}}Compliance{{< /ui >}} の下にある {{< ui >}}Audit Trail Settings{{< /ui >}} を選択します。[アーカイブ] まで下にスクロールし、{{< ui >}}Store Events{{< /ui >}} トグルをクリックして有効にします。

### 保持 {#retention}

イベントの保持は、Audit Trail のオプション機能です。{{< ui >}}Retention Period{{< /ui >}} セクションで、{{< ui >}}Change retention period{{< /ui >}} をクリックして、ユースケースに適した保持期間を選択します。

Audit Trail が有効になっている場合、監査証跡イベントのデフォルトの保持期間は 90 日間です。保持期間は、3 日間、7 日間、15 日間、30 日間、または 90 日間に設定できます。

Audit Trail が無効になっている場合、保持期間はデフォルトの 7 日間にリセットされます。

{{< img src="account_management/audit_logs/retention_period.png" alt="Datadog における Audit Trail の保持設定" style="width:80%;">}}

## 監査イベントを確認する {#explore-audit-events}

監査イベントを詳しく確認するには、[Audit Trail][1] セクションに移動します。このセクションは Datadog の[組織設定][3]からもアクセス可能です。

{{< img src="account_management/audit_logs/audit_side_nav.png" alt="組織設定メニューの Audit Trail 設定" style="width:30%;">}}

Audit Trail イベントは、[ログエクスプローラー][5]内のログと同様の機能を備えています。

- フィルターを使用して、イベント名 (ダッシュボード、モニター、認証など)、認証属性 (アクター、API キー ID、ユーザーのメールアドレスなど)、`Status` (`Error`、`Warn`、`Info`)、メソッド (`POST`、`GET`、`DELETE`) およびその他のファセット別に監査証跡イベントを確認します。

- イベントを選択してイベント属性タブに移動し、関連する監査証跡イベントを確認します。`http.method`、`usr.email`、`client.ip` など、絞り込みまたは検索から除外する特定の属性を選択します。

{{< img src="account_management/audit_logs/attributes.png" alt="組織設定メニューの Audit Trail" style="width:50%;">}}


### 自然言語クエリ {#natural-language-queries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">
この機能は、選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) ではサポートされていません。
</div>
{{< /site-region >}}

自然言語クエリ (NLQ) を使用すると、探している内容を平易な英語で記述できます。Datadog はリクエストを自動的に構造化された監査証跡クエリに変換するため、複雑な構文を記述することなく監査イベントを簡単に探索できます。

システムは自然言語の入力を Datadog クエリに変換し、ユーザー、アクション、リソース、タイムレンジなどのコンテキストを理解します。また、関連フィールドを自動的に検出します。例: "Who modified the payment dashboard last week" や"Show all role changes in the past 24 hours"。

{{< img src="account_management/audit_logs/audit_trail_nlq_light.mp4" alt="平易な英語のフレーズを使用して監査イベントを検索する方法を示す Audit Trail の自然言語クエリ" video=true >}}

### 保存ビュー {#saved-views}

効率的にトラブルシューティングするには、原因などを探索できるようデータが適切なスコープにあること、有意義な情報を表面化できるようデータに表示オプションへのアクセスがあること、そして分析に利用できる関連ファセットがリストアップされていることが必要です。トラブルシューティングには、コンテキストが重要です。保存ビューを使用すると、チームにとってさまざまなトラブルシューティングのコンテキストの切り替えが簡単になります。保存ビューには、Audit Trail エクスプローラーの左上からアクセスできます。

デフォルトのビュー以外のすべての保存ビューは、組織全体で共有されます。

* {{< ui >}}Integration saved views{{< /ui >}} は Audit Trail と同時に提供されます。これらのビューは読み取り専用で、Datadog ロゴで識別されます。
* {{< ui >}}Custom saved views{{< /ui >}}はユーザーによって作成されます。組織内のユーザーなら誰でも編集可能で ([読み取り専用ユーザー][6]を除く)、作成者のアバターによって識別されます。エクスプローラーの現在のコンテンツから新しいカスタム保存ビューを作成するには、{{< ui >}}Save{{< /ui >}} ボタンをクリックします。

Views パネルの保存ビューエントリーからは、いつでも以下のアクションが可能です。

* 保存ビューを {{< ui >}}Load{{< /ui >}} または {{< ui >}}reload{{< /ui >}}。
* {{< ui >}}Update{{< /ui >}}: 現在のビューのコンフィギュレーションでの保存ビューを更新。
* 保存ビューを {{< ui >}}Rename{{< /ui >}}または {{< ui >}}delete{{< /ui >}}。
* {{< ui >}}Share{{< /ui >}}: ショートリンクを使用した保存ビューを共有。
* {{< ui >}}Star{{< /ui >}}: 保存ビューにスターを付ける。保存ビューリストの先頭に表示します。ナビゲーションメニューから直接アクセス可能になります。

**注:** インテグレーションの保存ビューおよび[読み取り専用ユーザー][6]に対しては、更新、名前変更、および削除のアクションは無効になっています。


### デフォルトビュー {#default-view}

{{< img src="logs/explorer/saved_views/default.png" alt="デフォルトビュー" style="width:50%;" >}}

デフォルトビュー機能を使用すると、Audit Trail エクスプローラーを最初に開いたときに常に表示されるクエリやフィルターのデフォルトセットを設定できます。Views パネルを開いてリロードボタンをクリックすると、デフォルトビューに戻ることができます。

既存の Audit Trail エクスプローラービューがデフォルトの保存済みビューになります。この構成はユーザー本人のみがアクセスおよび表示可能です。この構成を更新しても組織には何の影響もありません。デフォルトの保存ビューは、UI でアクションを完了するか、別の構成が埋め込まれた Audit Trail エクスプローラーへのリンクを開くことで、**一時的に**上書きすることが可能です。

Views パネルのデフォルト保存ビューエントリーからは、いつでも以下のアクションが可能です。

* エントリーをクリックして、デフォルトビューを {{< ui >}}Reload{{< /ui >}}。
* {{< ui >}}Update{{< /ui >}}: 現在のパラメーターでデフォルトビューを更新。
* {{< ui >}}Reset{{< /ui >}}デフォルトビューを Datadog のデフォルトにリセットして再起動。

### 注目イベント {#notable-events}

注目イベントとは、監査イベントのサブセットで Datadog が特定した、請求に影響を与える可能性のある、またはセキュリティに影響を与える可能性のある重要な構成変更を示すものです。これにより、組織管理者は生成された多くのイベントの中から最も重要なイベントに絞り込むことができ、利用可能なすべてのイベントとそのプロパティについて学習する必要がありません。

{{< img src="account_management/audit_logs/notable_events.png" alt="注目イベントがチェックされた監査イベントファセットパネル" style="width:30%;">}}

以下のクエリにマッチするイベントは、注目イベントとしてマークされます。クエリ `is_notable_event:true` を使用して、すべての注目イベントを取得することもできます。

| 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ------------------------------------------------------------------- | --------------------------------------------------|
| ログベースメトリクスの変更 | `@evt.name:"Log Management" @asset.type:"custom_metrics"` |
| Log Management インデックスの除外フィルターの変更 | `@evt.name:"Log Management" @asset.type:"exclusion_filter"` |
| Log Management インデックスの変更 | `@evt.name:"Log Management" @asset.type:index` |
| APM 保持フィルターの変更 | `@evt.name:APM @asset.type:retention_filter` |
| APM カスタムメトリクスの変更 | `@evt.name:APM @asset.type:custom_metrics` |
| メトリクスタグの変更 | `@evt.name:Metrics @asset.type:metric @action:(created OR modified)` |
| RUM アプリケーションの作成と削除 | `@evt.name:"Real User Monitoring" @asset.type:rum_application @action:(created OR deleted)` |
| Sensitive Data Scanner のスキャングループの変更 | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| Synthetic テストの作成または削除 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| アプリケーションの Product Analytics の有効化、無効化、および変更 | `@evt.name:"Product Analytics" @asset.type:product_analytics @action:(enabled OR disabled OR modified)` |

### エージェントが委任したアクションを含む、ユーザーの完全なアクティビティを表示する {#view-a-users-full-activity-including-agent-delegated-actions}

Datadog AI エージェントがユーザーの代理としてアクションを実行する場合、そのイベントの `@usr.*` にはエージェントの情報が入力され、代わりに `@delegator.*` には元のユーザーの情報が入力されます。`@usr.id:<USER_ID>` のみを検索すると、ユーザーが直接実行したアクションが返され、Datadog AI エージェントがユーザーの代理として実行したアクションは含まれません。

| 監査イベントの説明                                                                        | 監査エクスプローラーのクエリ                                     |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| ユーザーが直接実行したアクション                                                                    | `@usr.id:<USER_ID>`                                           |
| Datadog AI エージェントがユーザーの代理として実行したアクションを含む、ユーザーに起因するすべてのアクション | `(@usr.id:<USER_ID> OR @delegator.id:<USER_ID>)`               |

エージェント主導の監査イベントのフィルタリングと表示の詳細については、[組織内でのエージェントの使用状況を追跡する][18]を参照してください。

### Inspect Changes (Diff) {#inspect-changes-diff}

監査イベント詳細パネルにある Inspect Changes (Diff) タブでは、行われた構成変更と以前の設定が比較されます。ダッシュボード、ノートブック、およびモニターの構成に加えられた変更が表示され、JSON オブジェクトとして表されます。

{{< img src="account_management/audit_logs/inspect_changes.png" alt="複合条件モニター構成の変更が表示されている監査イベント側のパネル。緑でハイライトされたテキストが変更されたもので、赤でハイライトされたテキストは削除されたものです。" style="width:70%;">}}

## Reference Table に基づく監査イベントのフィルター {#filter-audit-events-based-on-reference-tables}

<div class="alert alert-danger">1,000,000 行を超える Reference Table は、イベントのフィルタリングには使用できません。Reference Table の作成および管理方法の詳細については、<a href="https://docs.datadoghq.com/integrations/guide/reference-tables/">Reference Table でカスタムメタデータを追加する</a>を参照してください。</div>

Reference Table を使用すると、メタデータと監査イベントを組み合わせて、Datadog ユーザーの行動を調査するための詳細な情報を得ることができます。Reference Table に基づくクエリフィルターを追加して、検索クエリを実行します。この機能の有効化および管理の詳細については、[Reference Table][2]ガイドを参照してください。

Reference Table を使用したクエリフィルターを適用するには、クエリエディタの横にある {{< ui >}}\+ Add{{< /ui >}} ボタンをクリックし、{{< ui >}}Join with Reference Table{{< /ui >}} を選択します。次の例では、認可されていない IP アドレスから Datadog にアクセスしているユーザーによって変更されたダッシュボードを検索するために、Reference Table のクエリフィルターを使用しています。

{{< img src="account_management/audit_logs/reference_tables.png" alt="Reference Table の検索オプションがハイライトされた Datadog Audit Trail エクスプローラー" border="true" popup="true" style="width:100%;" >}}

### API キー監査 {#api-key-auditing}

ログ管理ユーザーは、Audit Trail を使用して API キーの使用状況を監査できます。API キー監査の場合、ログには `datadog.api_key_uuid` タグが付与されており、そのタグにはログ収集に使用された API キーの UUID が含まれています。この情報を使用して、以下を判断します。
- 組織やテレメトリソース全体での API キーの使用状況。
- API キーのローテーションと管理。

## モニターを作成する {#create-a-monitor}

監査証跡イベントの特定のタイプや Audit Trail 属性に基づいてモニターを作成する方法には、[Audit Trail Monitor に関するドキュメント][7]を参照してください。たとば、特定のユーザーログが発生したときにトリガーされるモニターを設定したり、ダッシュボードが削除された場合のモニターを設定したりできます。

## ダッシュボードまたはグラフを作成する {#create-a-dashboard-or-a-graph}

ダッシュボードを使用して、監査証跡イベントに視覚的なコンテキストを追加します。監査ダッシュボードを作成するには、以下の手順を実行します。

1. Datadog で[新しいダッシュボード][8]を作成します。
2. 視覚化を選択します。監査イベントを[トップリスト][9]、[時系列][10]、[リスト][11]で視覚化することができます。
3. [データのグラフを作成する][12]: 編集で、データソースとして *Audit Events* を選択し、クエリを作成します。監査イベントはカウント別に絞り込まれ、ファセット別にグループ化できます。ファセットと上限を選択します。
{{< img src="account_management/audit_logs/audit_graphing.png" alt="監査証跡をデータソースとして設定し、データからグラフを作成する" style="width:100%;">}}
4. 表示設定を行い、グラフにタイトルを付けます。*保存*ボタンをクリックして、ダッシュボードを作成します。

## スケジュールレポートを送信する {#send-out-a-scheduled-report}

Audit Trail クエリをダッシュボードとして保存し、スケジュールレポートを送信することができます。これらのレポートは、Datadog プラットフォームの使用状況を定期的に監視する上で役立ちます。たとば、国別のユニークな Datadog ユーザーログイン数を毎週メールで送信することができます。このクエリを使用すると、異常なログインアクティビティを監視したり、使用状況に関する自動化されたインサイトを受け取ったりすることができます。

スケジュールレポートを作成するには、以下を実行します。

1. [Audit Trail][1] に移動し、クエリを入力して監査イベントをフィルタリングします。
1. {{< ui >}}More{{< /ui >}} をクリックし、{{< ui >}}Save to dashboard{{< /ui >}} を選択します。
    - 既存のダッシュボードに保存するか、新しいダッシュボードを作成することができます。
1. ダッシュボード上で {{< ui >}}Share{{< /ui >}} をクリックし、{{< ui >}}Schedule report{{< /ui >}} を選択します。
1. [レポートをスケジュールする][17]の手順に従って、レポートを設定します。

## 監査イベントを CSV 形式でダウンロードする {#download-audit-events-as-csv}

Datadog Audit Trail では、最大 10 万件の監査イベントを CSV ファイルとしてローカルにダウンロードできます。これらのイベントは、ローカルで分析したり、別のツールにアップロードしてさらに分析を行ったり、セキュリティやコンプライアンス演習の一環として適切なチームメンバーと共有したりできます。

監査イベントを CSV 形式でエクスポートするには、以下の手順を実行します。
1. 興味のあるイベントをキャプチャする適切な検索クエリを実行する
2. CSV の一部として取り入れたいイベントフィールドをビューの列として追加する
3. {{< ui >}}Download as CSV{{< /ui >}} をクリックする
4. エクスポートするイベント数を選択し、CSV 形式でエクスポートする

## すぐに使えるダッシュボード {#out-of-the-box-dashboard}

Datadog Audit Trail には、インデックス保持の変更、ログパイプラインの変更、ダッシュボードの変更など、さまざまな監査イベントを表示する[すぐに使えるダッシュボード][13]が付属しています。このダッシュボードを複製して、監査ニーズに合わせてクエリや視覚化をカスタマイズすることができます。

{{< img src="account_management/audit_logs/audit_dashboard.png" alt="Audit Trail ダッシュボード" style="width:100%;">}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /ja/data_security/pci_compliance/
[3]: https://app.datadoghq.com/organization-settings/
[4]: https://app.datadoghq.com/event/explorer
[5]: /ja/logs/explorer/
[6]: https://docs.datadoghq.com/ja/account_management/rbac/permissions/?tab=ui#general-permissions
[7]: /ja/monitors/types/audit_trail/
[8]: /ja/dashboards/
[9]: /ja/dashboards/widgets/top_list/
[10]: /ja/dashboards/widgets/timeseries/
[11]: /ja/dashboards/widgets/list/
[12]: /ja/dashboards/querying/#define-the-metric/
[13]: https://app.datadoghq.com/dash/integration/30691/datadog-audit-trail-overview?from_ts=1652452436351&to_ts=1655130836351&live=true
[15]: /ja/security/cloud_siem/
[16]: /ja/getting_started/cloud_siem/
[17]: /ja/dashboards/sharing/scheduled_reports/#schedule-a-report
[18]: /ja/account_management/audit_trail/guides/track_agentic_usage_in_your_organization/