---
description: iOS および Android でプッシュ通知を設定し、On-Call アラート、インシデント、ワークフローの更新に関する重要なアラート設定を行います。
further_reading:
- link: /incident_response/on-call/
  tag: ドキュメント
  text: On-Call に関するドキュメント
- link: /incident_response/incident_management/notification/
  tag: ドキュメント
  text: インシデント通知ルールに関するドキュメント
- link: /getting_started/workflow_automation/
  tag: ドキュメント
  text: Workflow Automation に関するドキュメント
title: モバイルアプリでのプッシュ通知の設定
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、Incident Management のプッシュ通知のみがサポートされています。</div>
{{< /site-region >}}
[On-Call アラート](#circumvent-mute-and-Do-Not-Disturb-mode-for-On-Call)、[インシデント](#incident-notifications)、[Workflow Automation の更新](#workflow-automation-notifications)に関するモバイルプッシュ通知を受信すると、Datadog モバイルアプリからリアルタイムで最新情報を得ることができます。

## プッシュ通知を設定する {#set-up-push-notifications}

デフォルトでは、モバイルアプリから通知を送信することは許可されていません。プッシュ通知を受信するには、以下の手順に従います。

{{< tabs >}}
{{% tab "iOS" %}}

1. Datadog モバイルアプリで、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} に移動します。

   {{< img src="mobile/push_notification/ios_settings_may_2025.png" alt="Datadog モバイルアプリの iOS 版で通知設定を探します。" style="width:40%; background:none; border:none; box-shadow:none;" >}}

2. {{< ui >}}Allow Notifications{{< /ui >}} のトグルをオンにします。初めて通知を有効にする場合、権限を求めるプロンプトが表示されます。権限を許可してから、もう一度 {{< ui >}}Enable Notifications{{< /ui >}} をタップして、iOS のシステム設定に移動します。

   {{< img src="mobile/push_notification/ios_notification_may_2025.png" alt="iOS デバイスのシステム通知設定を構成します。" style="width:100%; background:none; border:none; box-shadow:none;" >}}

3. iOS のシステム設定内で、{{< ui >}}Allow Notifications{{< /ui >}} のトグルがオンになっていることを確認してください。Datadog は、{{< ui >}}Sound{{< /ui >}} および {{< ui >}}Badges{{< /ui >}} トグルもオンにすることを推奨しています。

モバイルアプリに必要な権限を付与していることを確認してください。

### カスタムサウンド {#custom-sounds}

Datadog モバイルアプリにプリロードされているカスタムサウンドを使用して、デフォルトのシステム通知音を上書きできます。

通知音をカスタマイズするには、以下の手順に従います。

1. Datadog モバイルアプリで、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Notification categories{{< /ui >}} に移動します。
2. カスタマイズする通知カテゴリーを選択します。
3. 利用可能なオプションからサウンドを選択します。

{{% /tab %}}

{{% tab "Android" %}}
1. Datadog モバイルアプリで、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} に移動します。

   {{< img src="mobile/push_notification/android_settings_may_2025.png" alt="Datadog モバイルアプリの Android バージョンで通知設定を見つけます。" style="width:40%; background:none; border:none; box-shadow:none;" >}}

2. {{< ui >}}Allow notifications{{< /ui >}} のトグルをオンにします。Datadog は、{{< ui >}}Sound and vibration{{< /ui >}} と {{< ui >}}Show content on Lock screen{{< /ui >}} もオンにすることを強く推奨しています。

   {{< img src="mobile/push_notification/android_notification_may_2025.png" alt="Android デバイスのシステム通知設定を構成します。" style="width:100%; background:none; border:none; box-shadow:none;" >}}

### カスタムサウンド {#custom-sounds-1}

Datadog モバイルアプリにプリロードされているカスタムサウンドを使用して、デフォルトのシステム通知音を上書きできます。

通知音をカスタマイズするには、以下の手順に従います。

1. {{< ui >}}Device Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Advanced Settings{{< /ui >}} に移動します。
2. {{< ui >}}Manage notification categories for each app{{< /ui >}} を選択し、Datadog が選択されていることを確認します。
3. Datadog モバイルアプリで、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Notification categories{{< /ui >}} に移動します。
4. カスタマイズする通知カテゴリーを選択します。
5. 利用可能なオプションからサウンドを選択します。

**注**: プッシュ通知の音量は、デバイスのシステム音量設定によって決まります。

{{% /tab %}}
{{< /tabs >}}

## On-Call 用にミュートおよびおやすみモードを回避する {#circumvent-mute-and-do-not-disturb-mode-for-on-call}
プッシュ通知 (Datadog モバイルアプリからのもの) と電話通知 (音声通話や SMS など) の両方について、デバイスのシステム音量とおやすみモードを無効にできます。

詳細については、[On-Call 用のモバイルデバイス設定ガイド][4] を参照してください。

### 重要なプッシュ通知 {#critical-push-notifications}
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、On-Call はサポートされていません。</div>
{{< /site-region >}}
<div class="alert alert-info">
重要なプッシュ通知は、On-Call にのみ利用可能です。Datadog モバイルアプリで初めて On-Call を設定する場合、オンボーディングフローによって通知設定と権限が処理されます。
</div>
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/push_notification/ios_critical_may_2025.png" alt="iOS デバイスのシステム音量と「おやすみモード」を上書きします。" style="width:100%; background:none; border:none; box-shadow:none;" >}}

1. Datadog モバイルアプリで、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}} に移動します。

2. {{< ui >}}Critical Alerts{{< /ui >}} のトグルをオンにします。重要なアラートは、ミュートスイッチと「おやすみモード」を無視します。重要なアラートをオンにすると、デバイスのミュート設定や「おやすみモード」の設定に関係なく、システムは重要なアラート音を再生します。

3. iOS のシステム設定内で、{{< ui >}}Critical Alerts{{< /ui >}} のトグルがオンになっていることを確認してください。モバイルアプリに必要な権限を付与していることを確認してください。

4. 通知設定セクションで、{{< ui >}}High Urgency Notifications{{< /ui >}} および/または {{< ui >}}Low Urgency Notifications{{< /ui >}} のデバイスを選択します。

5. {{< ui >}}Test push notifications{{< /ui >}} をタップして、重要なプッシュ通知の設定をテストします。

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/push_notification/android_critical_may_2025.png" alt="Android デバイスのシステム音量と「マナーモード」を上書きします。" style="width:100%; background:none; border:none; box-shadow:none;" >}}

1. Datadog モバイルアプリで、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}} に移動します。

{{< img src="mobile/push_notification/android_allow_notification_may_2025.png" alt="Android デバイスのシステム音量と「マナーモード」を上書きします。" style="width:100%; background:none; border:none; box-shadow:none;" >}}

2. 通知の権限がない場合は、システム設定で {{< ui >}}Bypass Do Not Disturb{{< /ui >}} をタップし、{{< ui >}}Allow notifications{{< /ui >}} をオンにしてください。

{{< img src="mobile/push_notification/android_override_system_may_2025.png" alt="Android デバイスのシステム音量と「マナーモード」を上書きします。" style="width:100%; background:none; border:none; box-shadow:none;" >}}

3. 次に{{< ui >}}Bypass Do Not Disturb{{< /ui >}}をタップし、高緊急度 On-Call のシステム設定で {{< ui >}}Override Do Not Disturb{{< /ui >}} をオンにしてください。

   **Samsung デバイスの場合**: {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}} > {{< ui >}}App notifications{{< /ui >}} の順に移動します。Datadog を選択し、「通知をミュート」をバイパスすることを許可します。

{{< img src="mobile/push_notification/android_override_system_volume_may_2025.png" alt="Android デバイスのシステム音量と「通知をミュート」を上書きします。" style="width:100%; background:none; border:none; box-shadow:none;" >}}

4. システム音量を上書きするには、{{< ui >}}Override system volume{{< /ui >}} をタップし、システム設定で {{< ui >}}Mode access{{< /ui >}} を許可して {{< ui >}}Override system volume{{< /ui >}} をオンにします。

5. 通知設定セクションで、{{< ui >}}High Urgency Notifications{{< /ui >}} および/または {{< ui >}}Low Urgency Notifications{{< /ui >}} のデバイスを選択します。

6. {{< ui >}}Test push notifications{{< /ui >}} をタップして、重要なプッシュ通知の設定をテストします。

<div class="alert alert-warning">
Android を仕事用プロファイルで使用している場合、Datadog モバイルアプリはシステム音量や「マナーモード」の設定をバイパスできません。回避策として、個人用プロファイルに Datadog モバイルアプリをインストールしてください。
</div>

<div class="alert alert-info">
On-Call ページを承認し、対応するには、ログインしている必要があります。ただし、モバイルアプリからログアウトしている場合でも、On-Call のプッシュ通知は引き続き受信します。
</div>

{{% /tab %}}
{{< /tabs >}}

### 重要なプッシュ通知のカスタムサウンドと音量 {#custom-sounds-and-volume-for-critical-push}

<div class="alert alert-info">音量とサウンドのコントロールは、On-Call 通知でのみ利用可能です。インシデント通知およびワークフロー通知には、デバイスのデフォルトのシステム設定が使用されます。</div>

緊急度の高い通知について、システムサウンドと音量設定をカスタマイズすることを Datadog は強く推奨します。これにより、アラートがより明確で認識しやすくなるだけでなく、注意を引く効果も高まります。重要なプッシュ通知の設定をテストして、期待どおりに動作することを確認してください。

## インシデント通知 {#incident-notifications}
[Web 上のインシデント用通知ルール][2] を設定して、アクティブなインシデントに関するステータス更新を受信します。

1. [Incidents] (インシデント) で、{{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Notification Rules{{< /ui >}}][1] に移動します。
2. 右上の {{< ui >}}+ New Rule{{< /ui >}} ボタンをクリックします。
3. {{< ui >}}When an incident is...{{< /ui >}} および {{< ui >}}And meets the following conditions...{{< /ui >}} の希望する条件フィールドに入力します。デフォルトでは、これらのフィルターは空であり、通知ルールはすべてのインシデントに対してトリガーされます。
4. {{< ui >}}Notify...{{< /ui >}} で通知の受信者を選択します。受信者のモバイルデバイスに通知する場合は、名前に {{< ui >}}(Mobile Push Notification){{< /ui >}} が含まれるオプションを選択してください。このオプションを表示するには、受信者が Datadog モバイルアプリで通知を有効にしている必要があります。
5. {{< ui >}}With Template:{{< /ui >}}通知ルールで使用したいメッセージテンプレートを選択します。
6. {{< ui >}}Renotify on updates to:{{< /ui >}}通知をトリガーするインシデントプロパティを選択します。選択したプロパティのいずれかが変更されるたびに、新しい通知が送信されます。
7. {{< ui >}}Save{{< /ui >}} をクリックします。

デフォルトでは、プッシュ通知が有効になっており、インシデントのコマンダーとして割り当てられている場合、そのインシデントのプッシュ通知を自動的に受け取ります。

## ワークフロー自動化通知 {#workflow-automation-notifications}
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">ワークフロー自動化は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

モバイルプッシュ通知を送信する [ワークフロー自動化][3] を作成します。

1. ワークフローキャンバスで、{{< ui >}}\+{{< /ui >}} アイコンをクリックします。
2. {{< ui >}}Send mobile push notification{{< /ui >}} を検索します。
3. {{< ui >}}To{{< /ui >}} で、通知の受信者を選択します。このオプションを表示するには、受信者が Datadog モバイルアプリで通知を有効にしている必要があります。
4. メッセージの {{< ui >}}Body{{< /ui >}} を入力します。

### 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]:https://app.datadoghq.com/incidents/settings?_gl=1*334tvl*_gcl_aw*R0NMLjE3NDUwMDYwODQuQ2p3S0NBand0ZGlfQmhBQ0Vpd0E5N3k4QkxnWmU4cTdmazJtUlJoQ3o1OTZXcTNmRWJIQTk1Rzg4dnAtUmZtUHBQUGx0OVNVSjRlSk9Sb0Nwek1RQXZEX0J3RQ..*_gcl_au*MTAxODMyNDk1My4xNzQwNDk1NzA3LjExNzUxOTU1MTUuMTc0NjQ5NTU3OS4xNzQ2NDk1NTc5*_ga*MjExMzI1MjUyOS4xNzQ1ODU2NjMx*_ga_KN80RDFSQK*czE3NDY0OTQzMzYkbzU4JGcxJHQxNzQ2NDk5MzA0JGowJGwwJGg5NTQ2NTk0Ng..*_fplc*Q2V5WVJmNnRSV2R0RmljTDZyWmg3ZEVZMFZPeDNlTFhLZkxnenFCOXBvTUslMkZTWWk0a3JzVEw1cDU5YlZzTW55TE5YazY5bjdhJTJGOXpySzJ0TFMxTEozZms0WTVlOWVibEN5ZFBNNm1XYmJJQll0R0d4YnlralJ2eU1CS1NoUSUzRCUzRA..#Rules
[2]: /ja/incident_response/incident_management/setup_and_configuration/notification_rules/
[3]: https://docs.datadoghq.com/ja/getting_started/workflow_automation/
[4]: /ja/incident_response/on-call/guides/configure-mobile-device-for-on-call