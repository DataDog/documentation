---
description: 重要なアラート、おやすみモードのバイパス、テレフォニー連絡先の設定を行い、信頼性の高い On-Call 通知を受信できるようにモバイルデバイスを構成します。
further_reading:
- link: https://docs.datadoghq.com/incident_response/on-call/
  tag: ドキュメント
  text: On-Call に関するドキュメント
- link: https://docs.datadoghq.com/mobile/
  tag: ドキュメント
  text: モバイルアプリに関するドキュメント
title: Datadog On-Call 用にモバイルデバイスをセットアップする
---
<div class="alert alert-info">
モバイルで On-Call にのみアクセスする必要があり、モバイルデバイス上の機密テレメトリデータへのアクセスを制限したい場合は、Datadog サポートにお問い合わせください。
</div>

On-Call の場合、インシデントに効果的に対応するため、信頼性が高くタイムリーな通知を受信できることが必要です。このガイドでは、[Datadog On-Call][5] で最適なパフォーマンスが得られるようにモバイルデバイスを構成する手順を説明します。

1. [Datadog モバイルアプリ][1] をインストールします。
2. [プッシュ通知を設定する](#set-up-push-notifications): Datadog モバイルアプリから通知を受信できるようにデバイスを設定します。
3. [ミュートとおやすみモードを回避する](#circumvent-mute-and-do-not-disturb-mode-for-on-call): デバイスがおやすみモードのときでも、プッシュ通知、音声通話、SMS を受信します。

## プッシュ通知を設定する{#set-up-push-notifications}
<div class="alert alert-info">
Datadog モバイルアプリに初めてログインすると、オンボーディングフローによって通知設定や権限が設定されます。
</div>

ただし、デフォルトでは、Datadog モバイルアプリから通知を送信することは許可されません。プッシュ通知を受信するには、以下の手順に従います。

{{< tabs >}}
{{% tab "iOS" %}}

1. Datadog モバイルアプリで、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} に移動します。

   {{< img src="mobile/push_notification/ios_settings_may_2025.png" alt="Datadog モバイルアプリの iOS 版で通知設定を探します。" style="width:35%;" >}}

2. {{< ui >}}Allow Notifications{{< /ui >}} のトグルをオンにします。初めて通知を有効にする場合、権限を求めるプロンプトが表示されます。権限を許可してから、もう一度 {{< ui >}}Enable Notifications{{< /ui >}} をタップして、iOS のシステム設定に移動します。

   {{< img src="mobile/push_notification/ios_notification_may_2025.png" alt="iOS デバイスのシステム通知設定を構成します。" style="width:100%;" >}}

3. iOS のシステム設定内で、{{< ui >}}Allow Notifications{{< /ui >}} のトグルがオンになっていることを確認してください。Datadog は、{{< ui >}}Sound{{< /ui >}} および {{< ui >}}Badges{{< /ui >}} トグルもオンにすることを強く推奨しています。

モバイルアプリに必要な権限を付与していることを確認してください。
{{% /tab %}}

{{% tab "Android" %}}
1. Datadog モバイルアプリで、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} に移動します。

   {{< img src="mobile/push_notification/android_settings_may_2025.png" alt="Datadog モバイルアプリの Android バージョンで通知設定を見つけます。" style="width:35%;" >}}

2. {{< ui >}}Allow notifications{{< /ui >}} のトグルをオンにします。Datadog は、{{< ui >}}Sound and vibration{{< /ui >}} と {{< ui >}}Show content on Lock screen{{< /ui >}} もオンにすることを強く推奨しています。

   {{< img src="mobile/push_notification/android_notification_may_2025.png" alt="Android デバイスのシステム通知設定を構成します。" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

### カスタムサウンド {#custom-sounds}
iOS と Android の両方で、デフォルトのシステム通知音を上書きするオプションがあります。Datadog モバイルアプリには、あらかじめ選ばれたカスタムサウンドがプリロードされています。 

## On-Call 用にミュートおよびおやすみモードを回避する {#circumvent-mute-and-do-not-disturb-mode-for-on-call}
プッシュ通知 (Datadog モバイルアプリからのもの) と電話通知 (音声通話や SMS など) の両方について、デバイスのシステム音量とおやすみモードを無効にできます。

### 重要なプッシュ通知 {#critical-push-notifications}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/push_notification/ios_critical_may_2025.png" alt="iOS デバイスのシステム音量と「おやすみモード」を上書きします。" style="width:100%;" >}}

1. Datadog モバイルアプリで、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}} に移動します。

2. {{< ui >}}Critical Alerts{{< /ui >}} のトグルをオンにします。重要なアラートは、ミュートスイッチと「おやすみモード」を無視します。重要なアラートをオンにすると、デバイスのミュート設定や「おやすみモード」の設定に関係なく、システムは重要なアラート音を再生します。

3. iOS のシステム設定内で、{{< ui >}}Critical Alerts{{< /ui >}} のトグルがオンになっていることを確認してください。モバイルアプリに必要な権限を付与していることを確認してください。

4. 通知設定セクションで、{{< ui >}}High Urgency Notifications{{< /ui >}} および/または {{< ui >}}Low Urgency Notifications{{< /ui >}} のデバイスを選択します。

5. {{< ui >}}Test push notifications{{< /ui >}} をタップして、重要なプッシュ通知の設定をテストします。

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/push_notification/android_critical_may_2025.png" alt="Android デバイスのシステム音量と「通知をミュート」を上書きします。" style="width:100%;" >}}

1. Datadog モバイルアプリで、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}} に移動します。

{{< img src="mobile/push_notification/android_allow_notification_may_2025.png" alt="Android デバイスのシステム音量と「通知をミュート」を上書きします。" style="width:100%;" >}}

2. 通知の権限がない場合は、システム設定で {{< ui >}}Bypass Do Not Disturb{{< /ui >}} をタップし、{{< ui >}}Allow notifications{{< /ui >}} をオンにしてください。

{{< img src="mobile/push_notification/android_override_system_may_2025.png" alt="Android デバイスのシステム音量と「通知をミュート」を上書きします。" style="width:100%;" >}}

3. 次に{{< ui >}}Bypass Do Not Disturb{{< /ui >}}をタップし、高緊急度 On-Call のシステム設定で {{< ui >}}Override Do Not Disturb{{< /ui >}} をオンにしてください。

   **Samsung デバイスの場合**: {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}} > {{< ui >}}App notifications{{< /ui >}} の順に移動します。Datadog を選択し、「通知をミュート」をバイパスすることを許可します。

{{< img src="mobile/push_notification/android_override_system_volume_may_2025.png" alt="Android デバイスのシステム音量と「通知をミュート」を上書きします。" style="width:100%;" >}}

4. システム音量を上書きするには、{{< ui >}}Override system volume{{< /ui >}} をタップし、システム設定で {{< ui >}}Mode access{{< /ui >}} を許可して {{< ui >}}Override system volume{{< /ui >}} をオンにします。

5. Web 上で、{{< ui >}}High Urgency Notifications{{< /ui >}} および/または {{< ui >}}Low Urgency Notifications{{< /ui >}} の通知設定を構成します。

6. {{< ui >}}Test push notifications{{< /ui >}} をタップして、重要なプッシュ通知の設定をテストします。

<div class="alert alert-warning">
Android を仕事用プロファイルで使用している場合、Datadog モバイルアプリはシステム音量や「マナーモード」の設定をバイパスできません。Datadog は、組織のポリシー次第ですが、個人用プロファイルに Datadog モバイルアプリをインストールすることを推奨しています。
</div>

{{% /tab %}}
{{< /tabs >}}
### 重要なプッシュ通知のカスタムサウンドと音量 {#custom-sounds-and-volume-for-critical-push}
緊急度の高い通知について、システムサウンドと音量設定をカスタマイズすることを Datadog は強く推奨します。これにより、アラートがより明確で認識しやすくなるだけでなく、注意を引く効果も高まります。通知設定をテストして、期待どおりに動作することを確認してください。

### テレフォニーチャンネル (音声通話および SMS){#telephony-channels-voice-calls-and-sms}

信頼性を確保するため、Datadog はローテーションされる電話番号セットを使用して連絡します。Datadog On-Call からの通話やメッセージをスマートフォンが識別できるように、デジタル連絡先カードを作成できます。このカードは、Datadog の最新の電話番号で自動的に更新されます。システム設定でこの連絡先に特別な権限を割り当てることで、おやすみモードの回避など、機能を強化できます。

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="incident_response/on-call/guides/configure-mobile-device-for-on-call/ios_sync_card_may_2025.png" alt="iOS デバイスの SMS および音声通話の「おやすみモード」を上書きします。" style="width:100%;" >}}

1. Datadog モバイルアプリで、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}} に移動します。

2. {{< ui >}}Automatic Contact Card Sync{{< /ui >}} をオンに切り替えます。これにより「Datadog On-Call」という名前の連絡先が作成され、Datadog の最新の電話番号で定期的に更新されます。

3. この連絡先が作成されたら、iOS のシステム設定を開き、{{< ui >}}Focus{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}} に移動します。

4. {{< ui >}}People{{< /ui >}} で、Datadog On-Call の連絡先からの通知を許可します。Datadog プッシュアプリケーションの重要な通知を有効にしている場合、Datadog モバイルアプリも **Apps** (アプリ) の下に表示されます。

5. サイレントモードをバイパスするには、Datadog On-Call の連絡先に移動し、{{< ui >}}Ringtone{{< /ui >}} をタップして、{{< ui >}}Emergency Bypass{{< /ui >}} を有効にします。
{{% /tab %}}

{{% tab "Android" %}}

{{< img src="incident_response/on-call/guides/configure-mobile-device-for-on-call/android_sync_card_may_2025.png" alt="Android デバイスの SMS および音声通話の「おやすみモード」を上書きします。" style="width:100%;" >}}

1. Datadog モバイルアプリで、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}} に移動します。

2. {{< ui >}}Phone & SMS{{< /ui >}} で、{{< ui >}}Automatic Contact Card Sync{{< /ui >}} をオンにします。これにより「Datadog On-Call」という名前の連絡先が作成され、Datadog の最新の電話番号で定期的に更新されます。

3. この連絡先が作成されたら、お気に入りとしてマークします。

4. Android のシステム設定を開き、{{< ui >}}Sound & vibration{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}} に移動します。Datadog On-Call の連絡先に対して例外を作成します。

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">
<a href="https://datadog-on-call.s3.amazonaws.com/datadog-on-call.vcf">Datadog On-Call の連絡先カードの最新バージョンをダウンロードします</a>。<strong>注</strong>: 連絡先カードは予告なく変更される場合があります。
</div>

## On-Call モバイルウィジェット{#on-call-mobile-widgets}
On-Call のホーム画面およびロック画面ウィジェットを追加して、ページやシフトにアクセスします。

### On-Call ホーム画面ウィジェット{#on-call-home-screen-widget}

Datadog ウィジェットを使用して、モバイルホーム画面で On-Call シフトと On-Call ページを表示します。

On-Call シフトウィジェットは、以下でフィルタリングしてカスタマイズできます。

- 組織
- 期間

On-Call ページウィジェットは、以下でフィルタリングしてカスタマイズできます。

- 組織
- チーム
- 順序

**注**: On-Call ページウィジェットに、追加のフィルターを設定できます。

#### On-Call シフトウィジェットを編集 {#edit-an-on-call-shift-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_shifts_widget_may_2025.png" alt="iOS 画面に On-Call シフトウィジェットが表示されている、構成済みのホーム画面" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットを長押しして構成します。
2. {{< ui >}}Edit Widget{{< /ui >}} をタップして構成画面を表示します。
3. On-Call シフトを表示する {{< ui >}}Organization{{< /ui >}} と {{< ui >}}Period{{< /ui >}} を選択します。
4. ウィジェットの外側をタップして、選択内容を検証し、構成画面を終了します。


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_shifts_widget_may_2025.png" alt="Android 画面に On-Call シフトウィジェットが表示されている、構成済みのホーム画面" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットをタップして構成します。
2. On-Call シフトを表示する {{< ui >}}Organization{{< /ui >}} と {{< ui >}}Time Period{{< /ui >}} を選択します。
3. {{< ui >}}✓{{< /ui >}} をタップして構成を保存します。
4. ウィジェットを長押しして、好みに合わせてサイズを変更します。

{{% /tab %}}
{{< /tabs >}}

### On-Call ロック画面ウィジェット {#on-call-lock-screen-widget}

On-Call ロック画面ウィジェットには、On-Call ステータスが表示されます。ロック画面ウィジェットが利用できるのは iOS のみです。

1. ロック画面を長押しします。
2. {{< ui >}}Customize{{< /ui >}} をタップし、次に {{< ui >}}Lock Screen{{< /ui >}} をタップします。
3. ロック画面のウィジェットスペースをタップして、{{< ui >}}Add Widgets{{< /ui >}} カードを表示します。
4. スクロールして {{< ui >}}Datadog{{< /ui >}} アプリをタップします。
4. On-Call ロック画面ウィジェットをタップします。
5. ロック画面のウィジェットをタップして、構成パネルを表示します。
6. On-Call ステータスを表示する組織を選択します。

**注**: 新しいウィジェットを追加するには、ロック画面に空きスペースが必要です。ロック画面のウィジェットを削除するには、削除したいウィジェットの左上にある {{< ui >}}\-{{< /ui >}} ボタンをタップします。

## トラブルシューティング{#troubleshooting}
トラブルシューティングのヘルプについては、[Datadog サポートにお問い合わせ][2] ください。また、[Datadog 公開 Slack][3] [#mobile-app][4] チャンネルでメッセージをお送りいただくことも可能です。

[1]: /ja/mobile/?tab=ios
[2]: /ja/help/
[3]: https://chat.datadoghq.com/
[4]: https://datadoghq.slack.com/archives/C0114D5EHNG
[5]: /ja/incident_response/on-call/