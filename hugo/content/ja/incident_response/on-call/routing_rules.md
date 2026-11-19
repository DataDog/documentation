---
aliases:
- /ja/service_management/on-call/processing_rules/
- /ja/service_management/on-call/routing_rules/
further_reading:
- link: /incident_response/on-call/
  tag: ドキュメント
  text: Datadog On-Call
title: ルーティングルール
---
## 概要{#overview}

ルーティングルールは、チーム内でアラートをどのように転送するかを決定します。すべてのアラートを単一のエスカレーションポリシー経由で送信する代わりに、優先度、タグ、モニターのステータス、時刻などのメタデータに基づいてアラートをルーティングするルールを作成できます。

## ルーティングルールを作成する{#create-a-routing-rule}

ルールは上から順に評価されます。最後のルールは、一致しなかったすべてのアラートをエスカレーションポリシーにルーティングするフォールバックである必要があります。

ルーティングルールを作成するには、以下の手順に従います。

1. [[**On-Call**] > [**Teams**]][1] に移動し、チームを選択します。
1. [**Page Routing**] セクションを見つけて、[**Edit**] をクリックします。[**Configure Page Routing**] ウィンドウが開きます。
 
   {{< img src="incident_response/on-call/routing_rules/configure-page-routing2.png" alt="Datadog On-Call の [Configure Page Routing] ウィンドウ。ルーティング条件フィールドとターゲット構成オプションが表示されています。" style="width:100%;" >}}

1. [**Add Conditions**] をクリックして、ルーティングルールを追加します。
1. [ルーティングルール構文](#routing-rule-syntax)を使用して、一致クエリを定義します。
1. 必要に応じて、[サポート時間](#support-hours)を構成します:

   1. [**Use support hours**] をオンに切り替えます。
   1. [**Add**] をクリックして、時間間隔を追加します。各間隔について、タイムゾーンと曜日を選択し、開始時刻と終了時刻を設定します。
   1. 必要に応じて、[**Outside support hours, hold escalation policy notifications until the next window**] トグルをオンにします。

   {{< img src="incident_response/on-call/routing_rules/page-routing-support-hours.png" alt="ルーティング条件のサポート時間構成パネル。時間間隔フィールドと、サポート時間外にエスカレーションポリシーの通知を保留するオプションが表示されています。" style="width:60%;" >}}

1. [**Set targets**] で、[**Add**] をクリックし、ターゲットタイプを選択します。ターゲットタイプによって、ルールに一致したときの動作が決まります。
   - **Page escalation policy**: [エスカレーションポリシー][3]を選択し、緊急度を`DYNAMIC` (アラートのステータスに基づく)、`HIGH`、または `LOW` に設定します。
   - **Send Slack message** (プレビュー): Slack ワークスペースとチャンネルを選択します。
   - **Send Microsoft Teams message** (プレビュー): Teams テナント、チーム、およびチャンネルを選択します。
   - **Run Workflow** (プレビュー): 既存の[ワークフロー][4]を選択します。
   - **Sync with a ServiceNow Incident** (プレビュー): ServiceNow コネクションを選択します。Datadog は呼び出しごとに ServiceNow インシデントを作成し、同期を維持します。「[ServiceNow と Datadog On-Call を統合する][5]」を参照してください。

1. [**Page escalation policy**] を選択した場合は、必要に応じて[確認応答のタイムアウト](#acknowledgment-timeout)を構成します。
   1. [**Acknowledgment timeout**] をオンにします。
   1. タイムアウト期間を設定します。

1. 必要に応じてルールを追加し、[**Save**] をクリックします。

### ルーティングルール構文{#routing-rule-syntax}

ルーティングルールは [Datadog クエリ構文][2]を使用し、複数の `if/else` 条件をサポートしています。

<div class="alert alert-info">ルーティングルール構文では大文字小文字が区別されます。たとえば、<code>tags.env:Prod</code> は <code>tags.env:prod</code>と一致しません。</div>

**サポートされている属性:**

| 属性      | 説明                                                                 | 例                               |
|----------------|-----------------------------------------------------------------------------|---------------------------------------|
| `tags`         | 受信アラートのタグ                                                  | `tags.env:prod`                       |
| `groups`       | モニターグループ名                                                         | `groups.service:checkout-service`     |
| `priority`     | モニターの優先度 (1～5)                                                      | `priority:(1 OR 2)`                   |
| `alert_status` | モニターステータス (`error`、`warn`、`success`)                                 | `alert_status:(error OR warn)`        |

### サポート時間{#support-hours}

サポート時間は、エスカレーションポリシーをいつ対応者に通知できるかを定義します。

ルーティングルールにサポート時間が含まれている場合、Datadog は現在時刻と構成された時間枠を比較し、次のように処理します。
- **サポート時間内**: Datadog はエスカレーションポリシーを直ちに実行し、対応者に通知します。
- **サポート時間外**:
  - [**Outside support hours, hold escalation policy notifications until the next window**] がオンの場合、Datadog は呼び出しを直ちに作成しますが、次のサポート時間帯が始まるまでエスカレーションポリシーの通知を延期します。Datadog は、遅延を記録するためにタイムラインエントリーを追加します。
  - このオプションがオフの場合、Datadog はそのルーティングルールをスキップし、呼び出しを作成しません。その後、次に一致するルールを評価します。

#### サポート時間の構成例{#example-support-hour-configurations}

**注**: 以下の例では、[**Outside support hours, hold escalation policy notifications until the next window**] トグルがオンになっているものとします。

{{% collapse-content title="標準営業時間" level="h5" %}}

1 つの時間枠を追加します。月曜日から金曜日を選択し、時間範囲を午前 9 時から午後 5 時に設定し、`America/New_York` タイムゾーンを選択します。この時間枠外の呼び出しは、翌月曜日の午前 9 時まで延期されます。

{{< img src="incident_response/on-call/routing_rules/support-hours-biz.png" alt="月曜日から金曜日、午前 9 時から午後 5 時までの時間枠が定義されたサポート時間のポップアップモーダル" style="width:60%;" >}}

{{% /collapse-content %}}

{{% collapse-content title="分割されたサポートシフト (午前と午後)" level="h5" %}}

2 つの時間枠を追加します。1 つは午前 9 時から正午まで、もう 1 つは午後 2 時から午後 6 時までで、両方とも月曜日から金曜日を選択します。正午から午後 2 時の間に到着した呼び出しは、午後の時間枠の開始まで延期されます。

{{% /collapse-content %}}

### 確認応答のタイムアウト{#acknowledgment-timeout}

エスカレーションポリシーをターゲットとして追加すると、[**Acknowledgment timeout**] を有効にできます。有効にすると、呼び出しに確認応答があったものの設定された時間内に解決されなかった場合、Datadog はその呼び出しをトリガー状態に戻し、現在のオンコール対応者に再度通知します。

確認応答のタイムアウトを構成するには、以下の手順に従います。

1. [**Set targets**] で、ターゲットタイプとして [**Page escalation policy**] を選択します。
1. [**Acknowledgment timeout**] をオンにします。
1. タイムアウト期間を設定します。

### Slack と Microsoft Teams の呼び出し{#pages-in-slack-and-microsoft-teams}

{{< img src="incident_response/on-call/routing_rules/page_in_slack_or_ms_teams.png" alt="受信したすべての呼び出しを Slack と Microsoft Teams にルーティングするルーティングルールのサンプル" style="width:100%;" >}}

呼び出しを Slack または Microsoft Teams にルーティングすると、Datadog は構成されたチャンネルに通知を送信し、呼び出しを作成します。チームメンバーはボタンを使用して、呼び出しの確認、エスカレーション、解決を行うことができます。

{{< img src="incident_response/on-call/routing_rules/page_representation_in_slack.png" alt="[Acknowledge]、[Escalate]、[Resolve] ボタンが表示された Slack での呼び出し通知" style="width:70%;" >}}

Slack または Teams で呼び出しが確認または解決されると、Datadog は追加のメッセージを送信することなく、元の通知をその場で更新します。これにより、通知の量が最小限に抑えられ、現在の呼び出しステータスが元のスレッドで常に確認できます。

## ルーティングルールの例{#routing-rule-examples}

- **優先度別にアラートをルーティングする:**
  - **優先度 1** のアラートは、プライマリのエスカレーションポリシーに送信します。
  - **優先度 2～4** のアラートは、Slack または Microsoft Teams に送信します。

- **時間帯別にアラートをルーティングする:**
  - 営業時間中は、アラートをエスカレーションポリシーにルーティングします。
  - 営業時間外は、重大なアラートをエスカレーションポリシーに、重大でないアラートを Slack または Teams のチャンネルにルーティングします。

- **サポート時間外のエスカレーションを遅らせる:**
  - ルーティング条件で[サポート時間](#support-hours)を定義し、次のアクティブな時間枠までエスカレーションポリシーの通知を保留します。

- **`DYNAMIC` 緊急度を使用して、モニターアラートのステータスに基づいて緊急度を設定する:** 
  - モニターアラートのステータスが `warn` の場合は、緊急度を `LOW` に設定します。
  - モニターアラートのステータスが `error` の場合は、緊急度を `HIGH` に設定します。

  緊急度は、担当者の通知設定に基づいて、どのように通知されるかを決定します。

## ベストプラクティス{#best-practices}

- **可視性と緊急度のバランスを取る:**
  - 即時の対応が必要な重要なアラートには、呼び出しとエスカレーションポリシーを使用します。
  - 状況の把握は必要でもオンコール対応までは不要な、重要度の低い問題には Slack または Teams を使用します。

- **サポート時間を使用して、勤務時間外の通知が担当者に届かないようにする:**
  - 重要度の低いアラートについては、チームの勤務時間に合わせてサポート時間を構成します。Datadog は直ちに呼び出しを作成しますが、担当者への通知はサポート時間にならないと行われません。
  - 時間に関係なく即時の対応が必要な重要なアラートについては、ルーティングルールにサポート時間を構成しないでください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/teams
[2]: /ja/tracing/trace_explorer/query_syntax/
[3]: /ja/incident_response/on-call/escalation_policies/
[4]: /ja/actions/workflows/
[5]: /ja/incident_response/on-call/integrations/servicenow/