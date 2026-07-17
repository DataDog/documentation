---
description: タグと条件に基づいて事前定義された通知ルールを使用して、モニターアラートのルーティングを自動化し、チームの通知を効率化します。
further_reading:
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の構成
- link: /monitors/settings/
  tag: ドキュメント
  text: モニターの設定
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: ブログ
  text: Datadog モニター通知ルールでモニターアラートをルーティングする
title: 通知ルール
---
## 概要 {#overview}

モニター通知ルールは、タグとルールロジックに基づいてチームにアラートを自動的に送信するための事前定義された条件のセットです。各モニターの受信者を個別に構成する代わりに通知ルールを使用すると、一度定義するだけでルールのスコープに一致するすべてのモニター通知を自動的にルーティングできます。

<div class="alert alert-info">組織ごとにデフォルトで 1000 個のルール制限があります。</a>.</div>

## セットアップ {#setup}

<div class="alert alert-danger">ルールを作成するには、<a href="/account_management/rbac/permissions/#monitors"><code>monitor_config_policy_write</code> 権限</a>を持っている必要があります。</div>

Datadog でモニター通知ルールを作成するには、次を実行します。

1. [**通知ルール**][1]に移動します。
2. **新しいルール**をクリックします。
3. [スコープを構成する](#configure-the-scope): このルールにルーティングされるモニター通知に必要なタグを定義します。
4. [ルーティングと受信者を構成する](#configure-the-routing-and-recipients): 通知のルーティング方法を選択し、受信者を指定します。
5. 明確で識別可能なルール名を追加します。

### スコープを構成する {#configure-the-scope}

このルールにルーティングされるモニター通知に必要なタグを追加します。マッチングは通知タグセットを評価します。[マッチングの仕組み](#how-matching-works)についての詳細はこちら。

<div class="alert alert-info">通知ルールが保存された後に作成または更新されたモニターは、ルールのスコープに一致する場合、定義された受信者にルーティングされます。</div>

{{% collapse-content title="ルールスコープ構文" level="h4" expanded=false %}}

通知ルールスコープクエリは、Boolean ロジックをサポートし、他の多くのプラットフォーム製品でサポートされている[イベントベースの検索構文][3]に従います。

| 構文要素 | 説明 |
| -------------- | ----------- |
| **Boolean 演算子** | サポート対象: `AND`、`OR`、`NOT`<br>Implicit 演算子: `AND` |
| **Wildcard** |  は `key:*` のみサポートされています (例: `env:*`)。部分的なワイルドカードのような `env:prod-*` はサポートされていません。`key:*` は、キーが通知タグセットのどこにでも存在する場合に一致します。|
| **同じキーの複数の値** | `env:(prod OR staging)` または `env:prod OR env:staging` のいずれかを使用します。|
| **引用符** | スペースや特殊文字を含む値は引用符で囲みます。例: `team:"data platform"`。|
{{% /collapse-content %}}


{{% collapse-content title="スコープの例" level="h4" expanded=false %}}

| 通知ルールのスコープ | 説明 |
| ------------------- | ---------------------- |
| `service:web-store`       | `web-store` サービスに関する通知をすべてルーティングします。|
| `service:web-store AND env:prod`       | `prod` 環境で実行している `web-store` サービスに関する通知をすべてルーティングします。|
| `service:webstore AND  NOT env:staging`       | `staging` 環境で実行して**いない** `web-store` サービスに関する通知をすべてルーティングします。|
| `env:*`       | `env:<value>`タグを持つすべての通知をルーティングします (モニターのタグまたはグループからのもの)。|

{{% /collapse-content %}}

{{% collapse-content title="ルールスコープの制限" level="h4" expanded=false %}}

以下は**サポートされていません**。

* `prod AND service:(A or B)` や `prod` のようなキーなしのタグはサポートされていません。タグにはキーが必要で、この場合はたとえば `env:prod` です。
* 部分的ワイルドカード (`service:web-*`) および疑問符ワイルドカード `service:auth?` はサポートされていません。ワイルドカードは `service:*` のように単独で使用される場合のみ許可されます。
* スコープの長さは最大 3000 文字です。
{{% /collapse-content %}}


### ルーティングと受信者を構成する {#configure-the-routing-and-recipients}

モニターアラートがルールのスコープに一致する場合に通知をルーティングする方法を選択します。受信者を手動で指定するか、動的ルーティングを使用して、チームおよびサービスの構成から受信者を自動的に解決できます。

#### 手動ルーティング {#manual-routing}

モニター通知がルールのスコープに一致したときに通知する受信者を指定します。常にすべての受信者に通知することも、特定の条件が満たされたときのみ通知される条件付き受信者を設定することもできます (例えば、重要なアラートをオンコールの受信者にルーティングし、警告を Slack チャンネルに送信します)。
条件はモニターのステータスまたはタグに基づいて設定できます。
- **ステータスベースの条件**: モニターが特定のステータス (アラート、OK、警告、またはデータなし) に遷移したときに受信者に通知します。
- **タグベースの条件**: 特定のタグキーが指定された値を持つときに受信者に通知します (例: `env:prod`)。各条件は 1 つのタグキーのみをサポートします。

通知はメールまたは任意の統合チャネルに送信できます。ルールごとの通知受信者の上限は 50 です。詳細については、[Notifications][2]を参照してください。

#### 動的ルーティング {#dynamic-routing}

<div class="alert alert-danger">動的ルーティングはプレビュー中です。アクセスをリクエストするには、Datadog アカウントチームに連絡するか、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>にお問い合わせください。</div>

動的ルーティングは、既存の[チーム][4]および[カタログ][5]の構成に基づいて、モニターアラートを適切なチームに自動的にルーティングします。静的な受信者リストを維持する代わりに、動的ルーティングはアラートモニターの `service` または `team` タグを使用して、通知を送信する場所を決定します。

| 構成 | 説明 | 要件 |
| --- | --- | --- |
| **サービスベース** | モニターの `service` タグまたはグループタグをチェックし、そのサービスを管理しているチームを Catalog で調べて、そのチームの設定された通知チャネルにアラートを送信します。| サービスにはカタログでチームが割り当てられている必要があります。チームが割り当てられていない場合、アラートはフォールバック受信者に戻ります。|
| **チームベース** | モニターの `team` タグまたはグループタグを直接チェックし、そのチームの構成済み通知チャネルにアラートを送信します。| モニターには `team` タグが必要です。|
| **フォールバック** | ルーティングが解決できない場合 (例えば、サービスにチームが割り当てられていない、または構成された通知チャネルがチームにない場合)、アラートはフォールバック受信者に送信されます。フォールバック受信者は、手動ルーティング受信者と同様に動作します。| すべての動的ルーティングルールに必要です。|

サービスベースとチームベースのルーティングは、Slack、メール、PagerDuty、Microsoft Teams をサポートしています。Teams は、[Teams 設定][4]で通知チャネルを構成できます。

## 通知ルールの管理 {#managing-notification-rules}

### モニター設定から {#from-monitor-settings}

{{< img src="/monitors/notifications/notification_rules/notification_rules_table.png" alt="モニター設定の通知ルールのリスト" style="width:100%;" >}}

[モニター通知ルール][1]ページには、次の列を持つすべての通知ルールのテーブルが表示されます。

- **名前**: 通知ルール名
- **スコープ**: このルールが適用される条件を定義するタグの組み合わせを示します　(例: `team:shopist service:web-store env:prod`)。
- **チーム**: この通知ルールに関連付けられているチームのリスト (スコープにチームタグが追加されている場合のみ利用可能)
- **カバレッジ**: このルールのスコープに一致するモニターの数を示します。これを使用してルールのカバレッジを確認し、調整が必要なルールを特定します。
- **通知**: このルールが一致したときにアラートを受信する通知チャネル (Slack やメールなど) をリストします。

さらに、通知ルールの縦 3 点メニューをクリックして、**編集**または**削除**できます。

### 個別のモニターから {#from-an-individual-monitor}
モニター構成では、通知ルールにマッチングすることによってモニターに適用される受信者が**受信者の概要**に表示されます。**モニター**の編集ページでは、新しいグループが報告する際に一致する_可能性のある_ルール (マルチアラートモニター) も表示されることがあります。**モニター**のステータスページには一致するルールが表示されます。

{{< img src="/monitors/notifications/notification_rules/monitor_matching_notification_rule.png" alt="通知ルールによって適用された通知受信者を示す受信者概要フィールド" style="width:100%;" >}}

## マッチングの仕組み {#how-matching-works}

- 通知タグセットは、モニタータグとファイアリンググループのタグの和集合です (マルチアラートモニター用)。キーがモニター / グループ全体で複数の値を持つ場合、すべての値が考慮されます。
- 現在の一致: ルールは、少なくとも 1 つの報告グループがモニタータグと組み合わさってスコープを満たす場合、またはモニタータグのみで満たす場合に一致します。NOT は候補タグセットごとに評価されるため、拒否された値を持つグループは一致しません。
- 新しいグループが報告する際に一致する可能性があります (マルチアラートモニター、モニター編集ページ): 各グループのキーを、モニタークエリの許可 / 拒否フィルターによって制約された任意の値を持つものとして扱います。
- 複数のルールが単一の通知に一致する場合、すべてのマッチングルールの受信者が統合され、重複が排除されます。

{{< img src="/monitors/notifications/notification_rules/diagram_notification-rules.png" alt="モニター通知ルールがタグに一致し、モニターとルールから受信者を結合し、アラートを送信する前に重複を削除する方法を示すフローチャート" style="width:100%;" >}}

{{% collapse-content title="例: 通知ルールのマッチング" level="h4" expanded=false %}}

以下の表は、異なるタグの組み合わせを持つモニターが通知ルールとその結果の通知にどのように一致するかを示しています。このテーブルは次の方法を示しています。
1. 複数の通知ルールがタグに基づいて単一のモニター通知に一致することがあります。
2. AND ロジックは、ルール内の複数のタグに対して機能します。
3. すべてのマッチング通知ルールは、最終的な通知リストに受信者を追加します。
4. 受信者は最終的な通知リストで重複が排除されます。

<table>
    <thead>
        <tr>
            <th></th>
            <th colspan="5" style="text-align: center; border-bottom: 1px solid #ddd; background-color:rgb(98, 92, 92);">通知ルール</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th style="background-color:#E8E8E8;"></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>team:shopist,<br>service:web-store</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>team:shopist</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store<br>env:prod</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store<br>env:dev</code></th>
            <th style="background-color:#E8E8E8;"></th>
        </tr>
        <tr>
            <td style="background-color:#E8E8E8;"><strong>モニターアラートタグと通知</strong></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@slack-channel1</i><br><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@user@datadoghq.com</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8;"><strong>通知されたハンドル</strong></td>
        </tr>
        <tr>
            <td><code>team:shopist, service:web-store</code><br><i>@user@datadoghq.com</i></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@slack-channel1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
        <tr>
            <td><code>team:shopist</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>service:web-store</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>service:web-store, env:prod</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
        <tr>
            <td><code>service:web-store, env:dev</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>team:shopist and service:web-store, env:prod</code><br><i>@slack-service1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td><i>@slack-channel1</i><br><i>@slack-service1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
    </tbody>
</table>

{{% /collapse-content %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/settings/notifications
[2]: /ja/monitors/notify/#notifications
[3]: /ja/getting_started/search/#event-based-queries
[4]: /ja/account_management/teams/
[5]: /ja/internal_developer_portal/catalog/