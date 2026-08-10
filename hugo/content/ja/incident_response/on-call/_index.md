---
aliases:
- /ja/service_management/on-call/
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/designing-on-call-sounds
  tag: ブログ
  text: オンコールエンジニアのために共感できるアラート音を設計した方法
- link: https://www.datadoghq.com/blog/datadog-on-call/
  tag: ブログ
  text: Datadog On-Call を使用して、オンコール体験をより豊かなものにする
- link: https://www.datadoghq.com/blog/on-call-paging/
  tag: ブログ
  text: 効果的なページング戦略を策定する方法
- link: https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/
  tag: ブログ
  text: Datadog Incident Response で修復と通信を統一する
title: On-Call
---
Datadog On-Call は、モニタリング、ページング、インシデント対応を 1 つのプラットフォームに統合しています。

{{< img src="service_management/oncall/oncall_overview.png" alt="ページのルーティングの概要。モニター、インシデント、セキュリティシグナル、または API 呼び出しからページがチーム (例: 「payments-team」) に送信され、その後、(たとえば優先度に基づく) ルーティングルールに送られ、エスカレーションポリシーに従って処理されます。そこからスケジュールに送られるか、または直接ユーザーに送信されます。" style="width:100%;" >}}

## コンセプト {#concepts}

- **ページ**とは、モニター、インシデント、セキュリティシグナルなど、アラートを受ける対象のことを指します。ページのステータスには `Triggered`、`Acknowledged`、`Resolved` があります。
- **チーム**は、専門知識や業務の役割に基づき、特定の種類のページを処理するために Datadog 内で構成されたグループです。
- **ルーティングルール**により、チームは特定の種類の受信イベントに対する対応を細かく調整できます。これらのルールでは、イベントのメタデータに基づき、ページの緊急度を設定し、異なるエスカレーションポリシーにページをルーティングすることができます。[サポート時間][7] を設定すると、定義されたタイムウィンドウにエスカレーション通知を遅延させることができます。
- **エスカレーションポリシー**は、チーム内またはチーム間でページがどのようにエスカレーションされるかを決定します。
- **スケジュール**は、特定のチームメンバーがオンコールでページに対応するための時間帯を設定します。

## 仕組み {#how-it-works}

**チーム**は、Datadog On-Call の中心的な組織単位です。Datadog で通知がトリガーされると、**ページ** が指定された On-Call Team に送信されます。

{{< img src="service_management/oncall/notification_page.png" alt="On-Call Team に言及する通知。" style="width:80%;" >}}

各チームは**エスカレーションポリシー**と**スケジュール**を所有しています。エスカレーションポリシーは、ページがさまざまなスケジュールに送信される方法を定義します (例: 以下のスクリーンショットの _Checkout Operations - Interrupt Handler_、_Primary_、_Secondary_)。また、各チームはページを異なるエスカレーションポリシーにルーティングするための**ルーティングルール**も構成できます。

{{< img src="service_management/oncall/escalation_policy.png" alt="エスカレーションポリシーのサンプル。" style="width:80%;" >}}

スケジュールは、チームメンバーがページに対応するために割り当てられた特定の時間を定義します。スケジュールは、異なるタイムゾーンやシフトにまたがるチームメンバーの対応可能時間を整理し、管理します。

{{< img src="service_management/oncall/schedule.png" alt="複数のレイヤー (JP、EU、US の営業時間) で構成されたサンプルスケジュール。" style="width:80%;" >}}

## きめ細かなアクセス制御 {#granular-access-control}

[きめ細かなアクセス制御][3] を使用して、オンコールリソースにアクセスできる [ロール][4]、チーム、またはユーザーを制限します。デフォルトでは、オンコールスケジュール、エスカレーションポリシー、およびチームルーティングルールへのアクセスは制限されていません。

きめ細かなアクセス制御は以下のオンコールリソースに対して利用可能です。
- **スケジュール**: 誰がスケジュールを表示、編集、上書きできるかを制御する
- **エスカレーションポリシー**: 誰がエスカレーションポリシーを表示および編集できるかを制御する
- **チームルーティングルール**: 誰がチームルーティングルールを表示および編集できるかを制御する

### サポートされているリソースとアクセス許可 {#supported-resources-and-permissions}

| オンコールリソース | ビューア | オーバーライダー | エディター |
|------------------|--------|-----------|--------|
| **スケジュール** | スケジュールの表示が可能 | スケジュールの表示とシフトの上書きが可能 | スケジュールの表示と編集、シフトの上書きが可能 |
| **エスカレーションポリシー** | エスカレーションポリシーの表示が可能 | - | エスカレーションポリシーの表示と編集が可能 |
| **チームルーティングルール** | チームルールの表示が可能 | - | チームルールの表示と編集が可能 |

### オンコールリソースへのアクセスを制限する {#restrict-access-to-on-call-resources}

オンコールリソースへのアクセスを制限するには:

1. 特定のオンコールリソース (スケジュール、エスカレーションポリシー、またはチームルーティングルール) に移動します。
1. [**Manage**] (管理) をクリックします。
1. ドロップダウンメニューから [**Permissions**] (アクセス許可) を選択します。
1. [**Restrict Access**] (アクセスの制限) をクリックします。
1. ドロップダウンメニューから 1 つ以上のロール、チーム、またはユーザーを選択します。
1. [**Add**] (追加) をクリックします。
1. 名前の横にあるドロップダウンメニューから関連付けたいアクセスレベルを選択します。
   - **ビューア**: リソースを表示するための読み取り専用アクセス
   - **オーバーライダー** (スケジュールのみ): スケジュールの上書きの表示および作成が可能
   - **エディター**: リソースの表示および変更に対するフルアクセス
1. [**Save**] (保存) をクリックします。

**注**: リソースの編集権限を保持するため、保存前に必ず自分が所属するロールを少なくとも 1 つ追加してください。

## Datadog On-Call の使用を開始する{#start-using-datadog-on-call}

<div class="alert alert-danger">インシデント履歴を保持するため、Datadog On-Call は、ページ、エスカレーションポリシー、またはスケジュールなどのリソースの削除をサポートしていません。本番環境に影響を与えずに On-Call をテストするには、サンドボックスとしてトライアル組織を作成します。</div>

On-Call を開始するには、[オンコールチームを編成][1] し、通知を受信できるようにすべてのチームメンバーが [オンコールプロファイル設定][2] を構成したことを確認してください。

{{< whatsnext desc="このセクションには下記のトピックが含まれています。">}}
  {{< nextlink href="/incident_response/on-call/teams">}}<u>チームをオンボーディングする</u>: 新しいオンコールチームを作成するか、既存の Datadog チームをオンコールに追加するか、PagerDuty からチームをインポートします。{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/pages">}}<u>ページ</u>: モニター、インシデント、セキュリティシグナル、その他のソースからページをトリガーします。ページを確認、再割り当て、または解決するか、インシデントに昇格させます。{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/escalation_policies">}}<u>エスカレーションポリシー</u>: 異なるスケジュールにページが送信される方法のステップを定義します。{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/schedules">}}<u>スケジュール</u>: チームメンバーのオンコールローテーションのタイムテーブルを定義します。{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/profile_settings">}}<u>プロファイル設定</u>: 連絡方法と通知の設定を構成して、タイムリーで効果的なページを受け取るようにします。{{< /nextlink >}}
{{< /whatsnext >}}

## 課金 {#billing}

オンコールはシートベースの SKU です。オンコールの請求方法や Datadog 内でのシート管理方法について詳しく知りたい方は、[料金ページ][5] や [Incident Response の請求に関するドキュメント][6] をご覧ください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/incident_response/on-call/teams
[2]: /ja/incident_response/on-call/profile_settings
[3]: /ja/account_management/rbac/granular_access/
[4]: /ja/account_management/rbac/#role-based-access-control
[5]: https://www.datadoghq.com/pricing/?product=incident-response#products
[6]: /ja/account_management/billing/incident_response/
[7]: /ja/incident_response/on-call/routing_rules#support-hours