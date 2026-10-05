---
aliases:
- /ja/service_management/status_pages/
description: 共有可能なステータスページを通じて、顧客や社内のステークホルダーに対して、サービスの可用性、インシデント、および計画されたメンテナンスを伝えることができます。
further_reading:
- link: https://www.datadoghq.com/blog/status-pages
  tag: ブログ
  text: Datadog Status Pages で利害関係者に情報を共有する
- link: /incident_response/incident_management/
  tag: ドキュメント
  text: Incident Management について
- link: /incident_response/on-call/
  tag: ドキュメント
  text: On-Call スケジューリングについて詳しく知る
- link: /incident_response/incident_management/integrations/status_pages
  tag: ドキュメント
  text: Datadog Status Pages を Incident Management と統合する
title: Status Pages
---
## 概要 {#overview}

{{< img src="incident_response/status_pages/shopist_status_page3.png" alt="サービスコンポーネントの現在のステータスとインシデントの最新情報を示すステータスページの例" style="width:100%;" >}}

Status Pages は、On-Call および Incident Management とともに、Datadog の Incident Response スイートの一部です。共有可能なウェブページを通じて、チームは顧客や社内のステークホルダーに対して、**サービスの可用性**、**インシデント**、および**計画されたメンテナンス**をプロアクティブに伝えることができます。

Status Pages でできること

* 重要なシステムおよび機能の可用性を共有する
* インシデント中にサービスの障害を明確に伝える
* 予定されたメンテナンスおよび計画的なダウンタイムを事前に通知する
* プロアクティブなメール通知および Slack 通知でインバウンドサポートの問い合わせ件数を削減する

## 権限を設定する {#configure-permissions}

Status Pages を作成、更新、または公開するには、適切な RBAC 権限が必要です。詳しくは、「[Access Control][1]」をご覧ください。

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap;">名前</th>
      <th>説明</th>
      <th>デフォルトロール</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;">Status Pages 設定の読み取り<br><code style="white-space: nowrap;">status_pages_settings_read</code></td>
      <td>Status Pages のリスト、各 Status Pages の設定、通知、および起動された Internal Status Pages を表示します。</td>
      <td>Datadog Read Only ロール</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages 設定の書き込み<br><code style="white-space: nowrap;">status_pages_settings_write</code></td>
      <td>新しい Status Pages を作成し、Status Pages の設定を構成します。</td>
      <td>Datadog Admin ロール</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages 通知の書き込み<br><code style="white-space: nowrap;">status_pages_incident_write</code></td>
      <td>インシデントを公開および更新します。</td>
      <td>Datadog Admin ロール</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages 公開ページ公開<br><code style="white-space: nowrap;">status_pages_public_page_publish</code></td>
      <td>公開 Status Pages を公開および非公開にします。</td>
      <td>なし</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages の Internal Page 公開<br><code style="white-space: nowrap;">status_pages_internal_page_publish</code></td>
      <td>Internal Status Pages を公開および非公開にします。</td>
      <td>なし</td>
    </tr>
  </tbody>
</table>

## ステータスページを作成する {#create-a-status-page}

1. Datadog で、[**Status Pages**][2] に移動します。
1. [**Create Status Page**] をクリックし、オンボーディングフローに従ってください。

   | フィールド             | 説明 |
   | ----------------- | ----------- |
   | **Status Page Type**    | ページにアクセスできる人を選択します。<br>- **Public** – リンクを持っている誰でも表示できます <br>- **Internal** – Datadog 組織内の認証済みユーザーのみが表示できます |
   | **Page name**     | ページヘッダーとして表示されます (ロゴがアップロードされていない場合)。<br>*例: Acme Cloud Platform* |
   | **Domain Prefix** | ステータスページのサブドメインのプレフィックスとして使用されます。カスタムドメインに関する詳細は、[カスタムドメインの設定](#set-a-custom-domain)セクションを参照してください。<br>*例: shopist → shopist.statuspage.datadoghq.com* <br>- **グローバルに一意である必要があります** <br>- 小文字、英数字、ハイフンのみ使用可能です <br>- 後で変更するとリンクに影響を与える可能性があります |
   | **Subscriptions** *(オプション)* | ユーザーが[メール](#email-subscriptions)または [Slack](#slack-subscriptions) でステータスページの更新に関する通知を受け取れるようにします。サブスクリプションが有効な場合、訪問者は公開ページからサインアップして、新しい通知や更新に関する通知を受け取ることができます。メールおよび Slack のサブスクリプションは、ステータスページごとに個別にオンまたはオフにできます。**注**: [メールサブスクリプション](#email-subscriptions)はダブルオプトインであり、メールアドレスの確認が必要です。|
   | **会社ロゴ、ファビコン、メールヘッダー画像、または Slack アプリアイコン** *(オプション)* | 画像をアップロードして、ステータスページと通知をパーソナライズします。Slack アプリアイコンは、Slack 通知の送信者アバターとして、ページ名と一緒に表示されます。|
1. (オプション) [Add components](#add-components) を使用して、個々のサービスのステータスを表示します。
1. [**Save Settings**] をクリックします。
   <div class="alert alert-info">ステータスページは、設定を保存しても <strong>Live にはなりません</strong>。ページを利用可能にするには、<a href="#publish-your-status-page">ステータスページを公開</a>します。</div>

## コンポーネントを追加する {#add-components}

{{< img src="/incident_response/status_pages/status_page_components.png" alt="Live preview パネル付きの Status Page コンポーネント設定" style="width:100%;" >}}

コンポーネントは、ステータスページを構成する要素です。それぞれは、ユーザーが関心を持つサービスや機能を表します。コンポーネントの例は次のとおりです。
- API Gateway
- Web Dashboard
- Database Cluster
- US Region Services

初期設定時またはステータスページの設定で、ステータスページにコンポーネントを追加できます。

1. ステータスページで、[**Settings**] をクリックし、[**Components**] タブを選択します。
1. 個々のコンポーネントまたは関連するコンポーネントグループを作成します。これらのコンポーネントに[通知](#add-a-notice)を関連付けて、ステータスページへの影響を反映できます。
1. 視視覚化タイプを選択します。
   1. Bars and Uptime Percentage
   1. Bars Only
   1. Component Name Only

### コンポーネント階層 {#component-hierarchy}

複数の通知が同じコンポーネントに影響する場合、最も影響の大きい通知が優先されます。
重大な障害 > 部分的な障害 > パフォーマンス低下 > メンテナンス > 稼働中

### コンポーネントのステータスとアップタイム {#component-status-and-uptime}

各コンポーネントのステータスは、アップタイムバーと稼働率にそれぞれ異なる影響を与えます。

| ステータス | アップタイムバー | 稼働率 |
|--------|-------------|-------------------|
| Major Outage | 表示 | ダウンタイムとしてカウント |
| Partial Outage | 表示 | ダウンタイムとしてカウント |
| Degraded Performance | 表示 | 影響なし |
| Maintenance | 表示 | 影響なし |
| Operational | 正常と表示 | 影響なし |

**注記**: Partial Outage と Major Outage は同等に重み付けされます。いずれかのステータスにある期間全体が、稼働率の計算においてダウンタイムとしてカウントされます。

## ステータスページを公開する {#publish-your-status-page}

ステータスページの設定を保存した後、[**Launch Status Page**] をクリックして、その URL でページを利用可能にします。

選択内容に応じて、次のいずれかを行います。
- **Public**、ページはすぐにすべての訪問者がアクセスできます。
- **Internal**、アクセスは組織内の認証済み Datadog ユーザーに制限されます。

## 通知を追加する {#add-a-notice}

通知は、システムの状態を伝えるためにステータスページに公開されるメッセージです。Status Pages は、計画外のサービス影響のための**性能低下**と、計画されたダウンタイムのための**メンテナンスウィンドウ**の 2 種類の通知をサポートしています。

{{< img src="incident_response/status_pages/select_notice_type_status_page.png" alt="ステータスページの通知タイプセレクター (性能低下および予定されたメンテナンスのオプション付き)" style="width:60%;" >}}

### 性能低下を公開する {#publish-a-degradation}

{{< img src="incident_response/status_pages/shopist_status_page_degradations2.png" alt="サービスコンポーネントの性能低下を示すステータスページの例" style="width:100%;" >}}

性能低下通知は、インシデントやサービス中断などの**計画外のサービス影響**を伝えます。性能低下通知を使用して、問題の調査、軽減、解決の間、ユーザーに情報を提供します。

ステータスページで、[**Publish Notice**] をクリックし、[**Degradation**] を選択して、次を入力します。

| フィールド | 説明 |
| ---- | ---- |
| **通知タイトル** | 問題の短く明確な説明 <br>*例: 米国リージョンでのエラー率の増加* |
| **Status** | 問題の現在の状態: <br>- Investigating <br>- Identified <br>- Monitoring <br>- Resolved |
| **Message** | ユーザーへの追加詳細 <br>*例: 問題を認識しており、修正に向けて積極的に対応しています。* |
| **Components impacted** | 劣化の影響を受ける 1 つ以上のコンポーネント |
| **Impact** | コンポーネントごとの影響レベル: <br>- Operational <br>- Degraded Performance <br>- Partial Outage <br>- Major Outage |
| **Notify subscribers** | 購読者に更新を送信するトグル |

{{< img src="incident_response/status_pages/publish_status_page_degradation_1.png" alt="性能低下に関する通知公開モーダルの例" style="width:60%;" >}}

性能低下通知が確認され、公開された後、
- Active Notices の下の **Status Pages List** に表示されます。
- 影響を受けるコンポーネントの稼働率バーを更新します。**Partial Outage** または **Major Outage** に設定されたコンポーネントも、影響を受けている期間中は稼働率が低下します。
- 通知履歴のタイムラインに表示されます。

時間の経過とともに更新を公開し、問題が完全に軽減されたときに通知を **Resolved** としてマークできます。

**注**: 各ステータスページでは、一度に最大 100 件のアクティブな (未解決の) 性能低下をサポートします。

### 性能低下のバックフィル {#backfill-a-degradation}

バックフィルされた性能低下は、以前に発表されていなかったサービス中断を遡って記録できるようにします。各更新には元のタイムスタンプを割り当てることができるため、インシデントのタイムラインが稼働率履歴に正確に表示されます。

ステータスページで、**Publish Notice** の横にあるドロップダウンを選択し、[**Publish Backfilled Notice**] > [**Degradation**] を選択して、次の情報を入力します。

| フィールド | 説明 |
| ---- | ---- |
| **Notice title** | インシデントの短く明確な説明 <br>*例: 米国リージョンでのエラー率の増加* |
| **Updates** | 性能低下の開始と終了を表す、タイムスタンプ付きの更新を 2 件作成します。各更新には、開始時刻のタイムスタンプ、ステータス (Investigating または Resolved)、説明、および影響を受けるコンポーネントが必要です。|

{{< img src="incident_response/status_pages/publish_status_page_backfill_degradation.png" alt="性能低下に関するバックフィル通知公開モーダルの例" style="width:60%;" >}}

### 性能低下の更新の編集する {#edit-a-degradation-update}

性能低下の更新を公開した後、誤字の修正、不正確なステータス選択の修正、または説明の明確化を行うために、そのステータスやメッセージを編集できます。更新を編集するには、ステータスページで低下通知を開き、変更する更新にカーソルを合わせて、表示される編集アイコンをクリックします。[**Edit Update**] モーダルで変更を行います。

{{< img src="incident_response/status_pages/edit_degradation_update.png" alt="Notice Status のオプションと Message フィールドが表示されている Edit Update モーダル" style="width:60%;" >}}

編集できるのは、[**Notice Status**] および [**Message**] フィールドのみです。通知を解決したり、影響を受けるコンポーネントを更新したりするには、代わりに新しい更新を追加してください。[**Save Changes**] をクリックして、編集内容を適用します。

### 性能低下の更新を削除する {#delete-a-degradation-update}

誤って投稿した更新を削除するには、ステータスページで該当する機能低下の通知を開き、削除する更新にカーソルを合わせて、表示される削除アイコンをクリックします。[**Delete Update**] モーダルで確認します。

{{< img src="incident_response/status_pages/delete_degradation_update.png" alt="Delete Update の確認モーダル" style="width:60%;" >}}

更新を削除すると、タイムライン上のその更新は、ページ管理者によって削除されたことを示す注記に置き換えられますこの操作は取り消せません。

### メンテナンスウィンドウをスケジュールする {#schedule-a-maintenance-window}

{{< img src="incident_response/status_pages/shopist_maintenance_example.png" alt="メンテナンス中のサービスコンポーネントを示すステータスページの例" style="width:100%;" >}}

メンテナンスウィンドウは、計画されたダウンタイムやサービス影響を事前にプロアクティブに通知できるようにします。計画外のインシデントに使用される性能低下とは異なり、メンテナンスウィンドウは、インフラストラクチャーのアップグレード、システムメンテナンス、データベース移行、その他の計画された作業のために事前にスケジュールされます。これにより、顧客に情報を提供し、サポート対応量を削減できます。

ステータスページで、[**Schedule Maintenance**] をクリックするか、[**Publish Notice**] をクリックして [**Scheduled Maintenance**] を選択します。次に、以下の情報を入力します。

| フィールド | 説明 |
| ---- | ---- |
| **Notice title** | メンテナンス活動の明確な説明 <br>*例: データベースインフラストラクチャーのアップグレード* |
| **Maintenance window** | メンテナンスの開始および終了時刻 |
| **Messages** | メンテナンスの進行に伴い自動的に公開されるメッセージ |
| **Components impacted** | メンテナンスウィンドウ中に影響を受けるコンポーネント |
| **Notify subscribers** | 購読者に事前通知を送信するトグル |

{{< img src="incident_response/status_pages/publish_status_page_maintenance.png" alt="メンテナンスウィンドウにおける Publish Notice モーダルの例" style="width:60%;" >}}

レビューおよびスケジュールの後、メンテナンスウィンドウは、
- ステータスページの **Upcoming Maintenance** に表示されます。
- ウィンドウ開始時に、コンポーネントのステータスが **Maintenance** に自動的に更新されます。
- ウィンドウ終了時に、コンポーネントは **Operational** に戻ります (手動で上書きされない限り)。

計画が変更された場合は、更新を投稿したり、必要に応じてメンテナンスウィンドウを再スケジュールしたりできます。

**注**: 各ステータスページでは、一度に最大 100 件の予定されている、または進行中のメンテナンスウィンドウをサポートしています。

### メンテナンスウィンドウをキャンセルする{#cancel-a-maintenance-window}

予定されているメンテナンスウィンドウを開始前にキャンセルするには、メンテナンス通知を開き、3 点アイコンをクリックして [**Cancel Maintenance**] を選択します。表示されるダイアログでキャンセルを確認します。

{{< img src="incident_response/status_pages/cancel-maintenance-window.png" alt="予定されているメンテナンスウィンドウの Cancel Maintenance 確認ダイアログ" style="width:60%;" >}}

メンテナンスウィンドウをキャンセルすると、ステータスページの **Upcoming Maintenance** から削除されます。この操作は取り消せません。

**注**: 進行中のメンテナンスウィンドウはキャンセルできません。

### メンテナンスウィンドウをバックフィルする {#backfill-a-maintenance-window}

バックフィルされたメンテナンスウィンドウは、以前に発表されていなかった計画されたダウンタイムを遡って記録できるようにします。各更新には元のタイムスタンプを割り当てることができるため、メンテナンスのタイムラインが稼働率履歴に正確に表示されます。

ステータスページで、**Publish Notice** の横にあるドロップダウンを選択し、[**Publish Backfilled Notice**] > [**Scheduled Maintenance**] を選択して、次の情報を入力します。

| フィールド | 説明 |
| ---- | ---- |
| **Notice title** | メンテナンス活動の明確な説明 <br>*例: データベースインフラストラクチャーのアップグレード* |
| **Updates** | メンテナンスウィンドウの開始と終了を表す、タイムスタンプ付きの更新を 2 件作成します。各更新には、開始時刻のタイムスタンプ、ステータス (In Progress または Completed)、説明、および影響を受けるコンポーネントが必要です。|

{{< img src="incident_response/status_pages/publish_status_page_backfill_maintenance.png" alt="メンテナンスウィンドウにおけるバックフィル通知公開モーダルの例" style="width:60%;" >}}

### メンテナンス更新情報を編集する{#edit-a-maintenance-update}

メンテナンス更新情報を公開した後でも、メッセージを編集して誤字を修正したり、説明を明確にしたりできます。過去の更新情報を編集するには、ステータスページで該当するメンテナンス通知を開き、タイムライン上で変更する更新にカーソルを合わせて、表示される編集アイコンをクリックします。[**Edit Update**] モーダルで変更を行います。

{{< img src="incident_response/status_pages/edit_maintenance_update.png" alt="過去のメンテナンス更新情報の Message フィールドを表示する Edit Update モーダル" style="width:60%;" >}}

[**Message**] フィールドのみ編集可能です。[**Save Changes**] をクリックして、編集内容を適用します。

## 通知テンプレートを使用する{#use-notice-templates}

テンプレート機能を使用すると、定期的なメンテナンスや特定の種類のサービス障害など、繰り返し公開する性能低下やメンテナンスに関する通知の文面をあらかじめ保存しておくことができます。通知を公開する際、テンプレートを選択すると、通知のタイトル、ステータスごとのメッセージ、影響を受けるコンポーネントといった情報を、毎回手入力することなく自動的に入力できます。

### テンプレートを作成する{#create-a-template}

1. ステータスページで、[**Settings**] をクリックし、[**Templates**] タブを選択します。
1. [**Degradation Templates**] または [**Maintenance Templates**] セクションで、[**Add Template**] をクリックします。
1. 次の詳細を入力します。

   | フィールド | 説明 |
   | ---- | ---- |
   | **Template name** | テンプレートを選択する際に使用する内部名。公開されたステータスページには表示されません。|
   | **Notice Title** | テンプレート使用時に事前入力されるデフォルトのタイトル。|
   | **Messages** | 各通知ステータスのメッセージ。性能低下テンプレートは、**Investigating**、**Identified**、**Monitoring**、および**Resolved** をサポートしています。メンテナンステンプレートは、**Scheduled**、**In Progress**、および **Completed** をサポートしています。|
   | **Components** | テンプレート使用時に事前選択されるコンポーネント。性能低下テンプレートの場合、各コンポーネントの初期ステータスも設定できます。|

1. [**Save**] をクリックします。

{{< img src="incident_response/status_pages/create_degradation_template.png" alt="タイトル、テンプレート変数を使用したステータスごとのメッセージ、および影響を受けるコンポーネントを含む、性能低下テンプレートを作成する" style="width:100%;" >}}

### テンプレート変数を挿入する {#insert-template-variables}

テンプレートメッセージに変数を挿入すると、そのテンプレートが通知に適用される際に Datadog がその変数を解決します。変数の種類に応じて、Datadog は値を自動的に入力するか、あるいは発行者に値の入力を求めます。メッセージフィールドの横にある [**Message Variables**] パネルに、使用可能な変数が一覧表示されます。

| 変数 | 説明 |
| ---- | ---- |
| `{{date}}` | Prompts the publisher to select a date and time when the template is applied. |
| `{{components_impacted}}` | 通知上で選択されたコンポーネントのリストを自動的に入力します。|

変数を挿入するには、メッセージフィールドに `{{` と入力してリストから変数を選択するか、[**Message Variables**] パネルで変数をクリックしてカーソル位置に挿入します。

### 通知にテンプレートを適用する{#apply-a-template-to-a-notice}

**Publish Notice** モーダルで、[**Template**] ドロップダウンからテンプレートを選択すると、タイトル、メッセージ、コンポーネントがテンプレートの内容で自動的に入力されます。

テンプレートを適用すると通知の各フィールドが自動入力されますが、入力後も内容は編集可能です。編集内容を破棄して元のテンプレートコンテンツを編集内容を破棄してテンプレートの元の状態に戻すには、[**Reset Values**] をクリックします。

{{< img src="incident_response/status_pages/apply_template_to_notice.png" alt="テンプレートが適用された公開通知モーダル。通知タイトル、メッセージ、影響を受けるコンポーネントが事前入力される" style="width:60%;" >}}

## メールサブスクリプション {#email-subscriptions}

ステータスページ上のメールサブスクリプションは、**double opt-in** です。メールアドレスを入力してサブスクリプションを登録した後、ユーザーは確認メールを受け取り、サブスクリプションを有効化するために確認リンクをクリックする必要があります。このプロセス中、ユーザーはステータスページ全体の通知を受け取るか、監視したい特定のコンポーネントを選択できます。通知内のタイムスタンプのフォーマットに使用する優先タイムゾーンを設定できます。ユーザーは、通知メールに含まれるサブスクリプション管理リンクから、いつでも設定を管理し、サブスクリプションを更新できます。

**内部**ステータスページの場合、サブスクリプションのプロセスは同じですが、ユーザーはサブスクリプションを確認し、通知を受け取るために同じ Datadog 組織にログインする必要があります。

{{< img src="/incident_response/status_pages/status_pages_subscription_1.png" alt="入力済みフィールドを含む Status Page サブスクリプションモーダルのスクリーンショット" style="width:70%;" >}}


## カスタムメール送信元ドメインを設定する{#configure-a-custom-email-sender-domain}

デフォルトでは、ステータスページのサブスクリプションメールは Datadog のメールアドレスから送信されます。独自のドメインから通知を送信するには、[Organization Settings] でカスタム SMTP サーバーを設定してください。

<div class="alert alert-danger">Organization Settings で SMTP サーバーを追加するには <code>org_management</code> 権限が必要です。ステータスページでメール送信元ドメインを選択するには <code>status_pages_settings_write</code> 権限が必要です。</div>

1. ステータスページで、[**Settings**] > [**Subscriptions**] に移動します。
2. [**Email Sender Domain**] で、[**Organization Settings**] をクリックします。
3. Organization Settings で、[SMTP サーバーを追加して検証します][3]。
4. [**Settings**] > [**Subscriptions**] に戻り、SMTP サーバーをメール送信元ドメインとして選択します。

## Slack サブスクリプション{#slack-subscriptions}

訪問者は、**Datadog Status Pages** Slack アプリを通じて、ステータスページの更新情報を Slack で受け取るようサブスクリプション登録できます。[**Notify subscribers**] を有効にして通知または予定されたメンテナンスが公開されると、このアプリはフォローしているコンポーネントについて、登録された各チャンネルに更新を投稿します。その際、ページ名と Slack アプリのアイコンを送信者として使用します。Slack サブスクリプションは、[メールサブスクリプション](#email-subscriptions)とは独立して構成されます。

### Slack サブスクリプションを有効にする{#enable-slack-subscriptions}

1. ステータスページで、[**Settings**] をクリックします。
2. [**Enable Slack subscriptions**] をオンにします。
3. (オプション) [**Slack App Icon**] で、Slack 通知の送信者アバターとして使用する画像をアップロードします。

{{< img src="incident_response/status_pages/status_pages_enable_slack.png" alt="[Enable Slack subscriptions] の切り替えスイッチと [Slack App Icon] のアップロードが表示されているステータスページ設定" style="width:80%;" >}}

公開ページで [**Subscribe**] をクリックすると、有効な各サブスクリプションタイプのタブがあるモーダルが開きます。

### Slack のサブスクリプションを登録する{#subscribe-in-slack}

Slack サブスクリプションが有効になっている公開ページから:

1. [**Subscribe**] をクリックして、[**Slack**] タブを開きます。
1. (オプション) [**Subscribe to specific services**] を選択して個々のコンポーネントを選択するか、チェックを外したままにしてページ全体をフォローします。
1. [**Subscribe via Slack**] をクリックします。
   {{< img src="incident_response/status_pages/status_pages_slack_subscription_modal.png" alt="[Slack] タブが選択され、[Subscribe via Slack] ボタンが表示された [Subscribe to Updates]" style="width:70%;" >}}
1. **Datadog Status Pages** アプリをワークスペースに対して承認し、更新を受け取るチャンネルを選択します。
   {{< img src="incident_response/status_pages/status_pages_slack_oauth.png" alt="Datadog Status Pages アプリにワークスペースとチャンネルへのアクセス権を付与する Slack 承認画面" style="width:70%;" >}}

サブスクリプションを登録した後、対象のチャンネルにサブスクリプション完了を知らせるウェルカムメッセージが送信されます。

**プライベートチャンネル**: サブスクリプションの登録後、ユーザーは Slack アプリの [**メッセージ**] タブで、**Datadog Status Pages** ボットをチャンネルに招待するように促すメッセージを受け取ります。ボットが更新を投稿するには、事前に招待されている必要があります。ダイレクトメッセージ (DM) チャンネルはサポートされていません。**内部**ステータスページでは、ユーザーは同じ Datadog 組織にログインしていないと登録できません。

### サブスクリプションを管理する {#manage-subscriptions}

購読者は、Slack 通知内の **Manage Preferences** リンクから、いつでもフォローするコンポーネントを変更したり、サブスクリプションを解除したりできます。

ステータスページの所有者は、ステータスページ設定で購読者を確認できます。ここでは、サブスクリプション登録されている Slack ワークスペースとチャンネルが一覧表示する形で示されます。ワークスペースを削除すると、そのワークスペース内のすべてのチャンネルのサブスクリプションが解除されます。

<div class="alert alert-info">
選択した SMTP サーバーで障害が発生した場合、通知は <strong>Datadog デフォルト</strong> を通じて登録者に送信されます<code>no-reply@dtdg.co</code>)。
</div>

## カスタムドメインを設定する {#set-a-custom-domain}

ブランドに合わせて、ステータスページの URL を `status.acme.com` のようなカスタムドメインにマッピングするオプションがあります。これは、サブスクリプションメールの差出人アドレスを制御する [カスタムメール送信元ドメインの設定](#configure-a-custom-email-sender-domain)とは別のものです。

1. ステータスページで、[**Settings**] をクリックします。
1. [**Custom Domain**] を選択します。
1. ドメインを入力し、DNS レコードを追加する手順に従ってください。
1. Datadog は DNS 設定を自動的に検出し、SSL 証明書をプロビジョニングします。

<div class="alert alert-warning">カスタムドメインには、CNAME または A レコードを追加するために DNS プロバイダーへのアクセスが必要です。</div>

**注**:

- DNS の伝播には数分かかる場合があります。
- いつでもデフォルトの Datadog ドメインに戻すことができます。
- DNS の変更は、ドメインレジストラにアクセスできる担当者が行う必要があります。

## Terraform でステータスページを管理する {#manage-status-pages-with-terraform}
Terraform を使用して、ステータスページを作成または管理できます。利用可能なリソースの詳細については、Datadog の [Terraform registry][4] を参照してください。 


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/
[2]: https://app.datadoghq.com/status-pages
[3]: /ja/account_management/org_settings/smtp_configuration
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/status_page