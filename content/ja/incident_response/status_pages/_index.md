---
aliases:
- /ja/service_management/status_pages/
further_reading:
- link: https://www.datadoghq.com/blog/status-pages
  tag: ブログ
  text: Datadog ステータスページで利害関係者に情報を共有する
- link: /incident_response/incident_management/
  tag: ドキュメント
  text: インシデント管理について
- link: /incident_response/on-call/
  tag: ドキュメント
  text: オンコールスケジューリングについて詳しく知る
- link: /incident_response/incident_management/integrations/status_pages
  tag: ドキュメント
  text: Datadog ステータスページを Incident Management と統合する
title: ステータスページ
---
## 概要 {#overview}

{{< img src="service_management/status_pages/shopist_status_page2.png" alt="サービスコンポーネントの現在のステータスとインシデントの最新情報を表示するステータスページの例" style="width:100%;" >}}

ステータスページは、オンコールおよび Incident Management とともに、Datadog の Incident Response スイートの一部です。共有可能なウェブページを通じて、チームは顧客や社内のステークホルダーに対して、**サービスの可用性**、**インシデント**、および**計画されたメンテナンス**をプロアクティブに伝えることができます。

ステータスページでできること

* 重要なシステムおよび機能の可用性を共有する
* インシデント中にサービスの障害を明確に伝える
* 予定されたメンテナンスおよび計画的なダウンタイムを事前に通知する
* プロアクティブなメール通知でインバウンドサポートの問い合わせ件数を削減する

## 権限を設定する {#configure-permissions}

ステータスページに関連する RBAC 権限は 3 つあります。Datadog Admin ロールを持つユーザーは、必要なすべての権限を持っています。

ステータスページを作成、更新、または公開するには、`status_pages_settings_read`、`status_pages_settings_write`、および `status_pages_incident_write` RBAC 権限が必要です。詳しくは、[アクセス制御][1]をご覧ください。

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
      <td style="white-space: nowrap;">ステータスページ設定の読み取り<br><code style="white-space: nowrap;">status_pages_settings_read</code></td>
      <td>ステータスページのリスト、各ステータスページの設定、通知、および起動された Internal Status Pages を表示します。</td>
      <td>Datadog Read Only ロール</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">ステータスページ設定の書き込み<br><code style="white-space: nowrap;">status_pages_settings_write</code></td>
      <td>新しい Status Pages を作成して起動し、Status Pages の設定を構成します。</td>
      <td>Datadog Admin ロール</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">ステータスページ通知の書き込み<br><code style="white-space: nowrap;">status_pages_incident_write</code></td>
      <td>インシデントを公開および更新します。</td>
      <td>Datadog Admin ロール</td>
    </tr>
  </tbody>
</table>

## ステータスページを作成する {#create-a-status-page}

1. Datadogで、[**ステータスページ**][2]に移動します。
1. **Create Status Page** をクリックし、オンボーディングフローに従ってください。

   | フィールド             | 説明 |
   | ----------------- | ----------- |
   | **Status Page Type**    | ページにアクセスできる人を選択します。<br>- **Public** - リンクを持っている誰でも表示できます <br>- **Internal** - Datadog 組織内の認証済みユーザーのみが表示できます |
   | **Page name**     | ページヘッダーとして表示されます (ロゴがアップロードされていない場合)。<br>*例: Acme Cloud Platform* |
   | **Domain Prefix** | ステータスページのサブドメインのプレフィックスとして使用されます。カスタムドメインに関する詳細は、[カスタムドメインの設定](#set-a-custom-domain)セクションを参照してください。<br>*例: shopist → shopist.statuspage.datadoghq.com* <br>- **グローバルに一意である必要があります** <br>- 小文字、英数字、ハイフンのみ使用可能です <br>- 後で変更するとリンクに影響を与える可能性があります |
   | **Subscriptions** *(オプション)* | ステータスページの更新に関するメール通知をユーザーが受け取れるようにします。サブスクリプションが有効な場合、ユーザーは新しい通知や更新の通知を受け取るためにサインアップできます。各ステータスページのサブスクリプションをオンまたはオフにできます。**注**: [メールサブスクリプション](#email-subscriptions)はダブルオプトインであり、メールの確認が必要です。|
   | **Company logo, Favicon, or Email Header Image** *(オプション)* | ステータスページおよびメール通知の外観をカスタマイズするために、ロゴ、ファビコン、または画像をアップロードします。|
1. (オプション) [Add components](#add-components) を使用して、個々のサービスのステータスを表示します。
1. **Save Settings** をクリックします。
   <div class="alert alert-info">ステータスページは、設定を保存しても <strong>Live にはなりません</strong>。ページを利用可能にするには、<a href="#publish-your-status-page">ステータスページを公開</a>します。</div>

## コンポーネントを追加する {#add-components}

{{< img src="/service_management/status_pages/status_page_components.png" alt="Live preview パネル付きの Status Page コンポーネント設定" style="width:100%;" >}}

コンポーネントは、ステータスページを構成する要素です。それぞれは、ユーザーが関心を持つサービスや機能を表します。コンポーネントの例は次のとおりです。
- API Gateway
- Web Dashboard
- Database Cluster
- US Region Services

初期設定時またはステータスページの設定で、ステータスページにコンポーネントを追加できます。

1. ステータスページで、**Settings** をクリックし、**Components** タブを選択します。
1. 個々のコンポーネントまたは関連するコンポーネントグループを作成します。これらのコンポーネントに[通知](#add-a-notice)を関連付けて、ステータスページへの影響を反映できます。
1. 視視覚化タイプを選択します。
   1. Bars and Uptime Percentage
   1. Bars Only
   1. Component Name Only

### コンポーネント階層 {#component-hierarchy}

複数の通知が同じコンポーネントに影響する場合、最も影響の大きい通知が優先されます。
重大な障害 > 部分的な障害 > パフォーマンス低下 > メンテナンス > 稼働中

## ステータスページを公開する {#publish-your-status-page}

ステータスページの設定を保存した後、**Launch Status Page** をクリックして、その URL でページを利用可能にします。

選択した場合。
- **Public**、ページはすぐにすべての訪問者がアクセスできます。
- **Internal**、アクセスは組織内の認証済み Datadog ユーザーに制限されます。

## 通知を追加する {#add-a-notice}

通知は、システムの状態を伝えるためにステータスページに公開されるメッセージです。ステータスページは、計画外のサービス影響のための**性能低下**と、計画されたダウンタイムのための**メンテナンスウィンドウ**の 2 種類の通知をサポートしています。

{{< img src="service_management/status_pages/select_notice_type_status_page.png" alt="ステータスページの通知タイプセレクター (性能低下および予定されたメンテナンスのオプション付き)" style="width:60%;" >}}

### 性能低下を公開する {#publish-a-degradation}

{{< img src="service_management/status_pages/shopist_status_page_degradations.png" alt="サービスコンポーネントの性能低下を示すステータスページの例" style="width:100%;" >}}

性能低下通知は、インシデントやサービス中断などの**計画外のサービス影響**を伝えます。性能低下通知を使用して、問題の調査、軽減、解決の間、ユーザーに情報を提供します。

ステータスページで、**Publish Notice** をクリックし、**Degradation** を選択して、次を入力します。

| フィールド | 説明 |
| ---- | ---- |
| **通知タイトル** | 問題の短く明確な説明 <br>*例: 米国リージョンでのエラー率の増加* |
| **Status** | 問題の現在の状態: <br>- Investigating <br>- Identified <br>- Monitoring <br>- Resolved |
| **Message** | ユーザーへの追加詳細 <br>*例: 問題を認識しており、修正に向けて積極的に対応しています。* |
| **Components impacted** | 劣化の影響を受ける 1 つ以上のコンポーネント |
| **Impact** | コンポーネントごとの影響レベル: <br>- Operational <br>- Degraded Performance <br>- Partial Outage <br>- Major Outage |
| **Notify subscribers** | 購読者に更新を送信するトグル |

{{< img src="service_management/status_pages/publish_status_page_degradation.png" alt="性能低下に関する通知公開モーダルの例" style="width:60%;" >}}

性能低下通知が確認され、公開された後、
- Active Notices の下に **Status Pages List** に表示されます。
- 影響を受けるコンポーネントの稼働率バーを更新します。
- 通知履歴のタイムラインに表示されます。

時間の経過とともに更新を公開し、問題が完全に軽減されたときに通知を **Resolved** としてマークできます。

### 性能低下のバックフィル {#backfill-a-degradation}

バックフィルされた性能低下は、以前に発表されていなかったサービス中断を遡って記録できるようにします。各更新には元のタイムスタンプを割り当てることができるため、インシデントのタイムラインが稼働率履歴に正確に表示されます。

ステータスページで、**Publish Notice** の横にあるドロップダウンを選択し、**Publish Backfilled Notice** > **Degradation** を選択して、次の情報を入力します。

| フィールド | 説明 |
| ---- | ---- |
| **Notice title** | インシデントの短く明確な説明 <br>*例: 米国リージョンでのエラー率の増加* |
| **Updates** | 性能低下の開始と終了を表す、タイムスタンプ付きの更新を 2 件作成します。各更新には、開始時刻のタイムスタンプ、ステータス (Investigating または Resolved)、説明、および影響を受けるコンポーネントが必要です。|

{{< img src="service_management/status_pages/publish_status_page_backfill_degradation.png" alt="性能低下に関するバックフィル通知公開モーダルの例" style="width:60%;" >}}

### メンテナンスウィンドウをスケジュールする {#schedule-a-maintenance-window}

{{< img src="service_management/status_pages/shopist_maintenance_example.png" alt="メンテナンス中のサービスコンポーネントを示すステータスページの例" style="width:100%;" >}}

メンテナンスウィンドウは、計画されたダウンタイムやサービス影響を事前にプロアクティブに通知できるようにします。計画外のインシデントに使用される性能低下とは異なり、メンテナンスウィンドウは、インフラストラクチャーのアップグレード、システムメンテナンス、データベース移行、その他の計画された作業のために事前にスケジュールされます。これにより、顧客に情報を提供し、サポート対応量を削減できます。

ステータスページで、**Schedule Maintenance** をクリックするか、**Publish Notice** をクリックして **Scheduled Maintenance** を選択します。次に、以下の情報を入力します。

| フィールド | 説明 |
| ---- | ---- |
| **Notice title** | メンテナンス活動の明確な説明 <br>*例: データベースインフラストラクチャーのアップグレード* |
| **Maintenance window** | メンテナンスの開始および終了時刻 |
| **Messages** | メンテナンスの進行に伴い自動的に公開されるメッセージ |
| **Components impacted** | メンテナンスウィンドウ中に影響を受けるコンポーネント |
| **Notify subscribers** | 購読者に事前通知を送信するトグル |

{{< img src="service_management/status_pages/publish_status_page_maintenance.png" alt="メンテナンスウィンドウにおける Publish Notice モーダルの例" style="width:60%;" >}}

レビューおよびスケジュールの後、メンテナンスウィンドウは、
- ステータスページの **Upcoming Maintenance** に表示されます。
- ウィンドウ開始時に、コンポーネントのステータスが **Maintenance** に自動的に更新されます。
- ウィンドウ終了時に、コンポーネントは **Operational** に戻ります (手動で上書きされない限り)。

計画が変更された場合は、更新を投稿したり、必要に応じてメンテナンスウィンドウを再スケジュールしたりできます。

### メンテナンスウィンドウをバックフィルする {#backfill-a-maintenance-window}

バックフィルされたメンテナンスウィンドウは、以前に発表されていなかった計画されたダウンタイムを遡って記録できるようにします。各更新には元のタイムスタンプを割り当てることができるため、メンテナンスのタイムラインが稼働率履歴に正確に表示されます。

ステータスページで、**Publish Notice** の横にあるドロップダウンを選択し、**Publish Backfilled Notice** > **Scheduled Maintenance** を選択して、次の情報を入力します。

| フィールド | 説明 |
| ---- | ---- |
| **Notice title** | メンテナンス活動の明確な説明 <br>*例: データベースインフラストラクチャーのアップグレード* |
| **Updates** | メンテナンスウィンドウの開始と終了を表す、タイムスタンプ付きの更新を 2 件作成します。各更新には、開始時刻のタイムスタンプ、ステータス (In Progress または Completed)、説明、および影響を受けるコンポーネントが必要です。|

{{< img src="service_management/status_pages/publish_status_page_backfill_maintenance.png" alt="メンテナンスウィンドウにおけるバックフィル通知公開モーダルの例" style="width:60%;" >}}

## メールサブスクリプション {#email-subscriptions}

ステータスページ上のメールサブスクリプションは、**double opt-in** です。メールアドレスを入力してサブスクリプションを登録した後、ユーザーは確認メールを受け取り、サブスクリプションを有効化するために確認リンクをクリックする必要があります。このプロセス中、ユーザーはステータスページ全体の通知を受け取るか、監視したい特定のコンポーネントを選択できます。通知内のタイムスタンプのフォーマットに使用する優先タイムゾーンを設定できます。ユーザーは、通知メールに含まれるサブスクリプション管理リンクから、いつでも設定を管理し、サブスクリプションを更新できます。

**internal** ステータスページの場合、サブスクリプションのプロセスは同じですが、ユーザーはサブスクリプションを確認し、通知を受け取るために同じ Datadog 組織にログインする必要があります。

{{< img src="/service_management/status_pages/status_pages_subscription_1.png" alt="入力済みフィールドを含む Status Page サブスクリプションモーダルのスクリーンショット" style="width:70%;" >}}

## カスタムドメインを設定する {#set-a-custom-domain}

ブランドに合わせて、ステータスページをカスタムドメイン (`status.acme.com` など) にマッピングするオプションがあります。

1. ステータスページで、**Settings** をクリックします。
1. **Custom Domain** を選択します。
1. ドメインを入力し、DNS レコードを追加する手順に従ってください。
1. Datadog は DNS 設定を自動的に検出し、SSL 証明書をプロビジョニングします。

<div class="alert alert-warning">カスタムドメインには、CNAME または A レコードを追加するために DNS プロバイダーへのアクセスが必要です。</div>

**注**:

- DNS の伝播には数分かかる場合があります。
- いつでもデフォルトの Datadog ドメインに戻すことができます。
- DNS の変更は、ドメインレジストラにアクセスできる担当者が行うようにしてください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/
[2]: https://app.datadoghq.com/status-pages