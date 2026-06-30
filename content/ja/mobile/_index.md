---
algolia:
  tags:
  - Datadog mobile app
  - mobile device
aliases:
- /ja/service_management/mobile/
description: iOS および Android 向けの Datadog モバイルアプリを使えば、外出先でもインフラストラクチャーを監視できます。ダッシュボード、アラート、インシデント、オンコール管理機能を備えています。
further_reading:
- link: /mobile/shortcut_configurations/
  tag: ドキュメント
  text: ショートカット設定
- link: /monitors/
  tag: ドキュメント
  text: モニターとアラート設定について
- link: /dashboards/
  tag: ドキュメント
  text: ダッシュボードについて
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: ブログ
  text: Datadog モバイルダッシュボードウィジェットで、オンコールエクスペリエンスを改善
- link: https://www.datadoghq.com/blog/mobile-app-getting-started/
  tag: ブログ
  text: Datadog モバイルアプリの使い方
- link: https://www.datadoghq.com/blog/mobile-app-reduce-mttr/
  tag: ブログ
  text: Datadog モバイルアプリで平均修復時間を短縮
- link: https://www.datadoghq.com/blog/designing-on-call-sounds
  tag: ブログ
  text: オンコールエンジニアのために共感できるアラート音を設計した方法
title: Datadog モバイルアプリ
---
Datadog モバイルアプリを使用すると、モバイルデバイスで Datadog のアラートを確認できます。On-Call、Slack、またはメールを通じてアラートを受信した際は、モバイルデバイスでモニターグラフやダッシュボードを開いて問題を調査できます。

## インストール {#installing}

iOS デバイスの場合は [Apple App Store][1] から、Android デバイスの場合は [Google Play ストア][2]からアプリをダウンロードします。

### ログイン {#logging-in}

US と EU のどちらのリージョンでも、標準認証、Google 認証、または [SAML][3] を使用してログインできます。

#### SAML の有効化 {#enabling-saml}

SAML ログインでは、iOS/Android のデフォルトのブラウザを使用して、Datadog で SAML プロバイダーをセットアップおよび認証する必要があります。SAML IdP 始動のログインについては、このセクションの最後を参照してください。SAML 認証の手順は次のとおりです。

1. モバイルアプリの右上隅でデータセンターのリージョン (例: US1) を選択します。
2. ログインボタンを押します。
3. "Using Single Sign-On (SAML)?"リンクをクリックします。
4. 勤務先メールアドレスを入力し、メールを送信します。
5. モバイルデバイスでメールを開き、デフォルトのブラウザから記載されているリンクをクリックします。
6. 組織の SAML 資格情報を入力します。Datadog モバイルアプリの認証済みセッションに再接続されます。

QR コードを使用または手動エントリで認証することも可能です。詳しくは下記を参照してください。

##### QR コード {#qr-code}

1. ブラウザで、[Datadog アカウントの Personal Settings Organizations][4] ページに移動し、現在ログインしている組織の [**Log in to Mobile App**] (モバイルアプリにログイン) をクリックします。これにより、QR コードがポップアップ表示されます。
2. デフォルトのスマホカメラアプリを使用して QR コードをスキャンし、提案されたリンクをタップして Datadog アプリを開きます。自動的にログインされます。

**注**: 現在ログインしていない組織の **Log in to Mobile App** ボタンをクリックすると、ログイン画面に組織の UUID が自動的に挿入されます。ただし、標準的な方法で認証を行う必要があります。

##### 手動入力 {#manual-entry}

1. SAML ID を手動で入力するには、Datadog モバイルアプリを開いて [Using Single Sign-On (SAML)?] (シングルサインオン (SAML) を使用しますか?)ボタンを押します。
2. [Use another method to login] (ログインに他の方法を使用) ボタンを押し、手動で SAML ID を入力します。

ログイン時に [**Authorize**] (認可) をクリックすると、このモバイルデバイスがアカウントにリンクされます。セキュリティ上の理由から、このフローを月に 1 回実行する必要があります。

##### SAML IdP 始動のログイン {#saml-idp-initiated-login}

SAML でログインしようとしてエラーが発生し続ける場合、アイデンティティプロバイダーが IdP 始動のログインを強制している可能性があります。IdP 始動の SAML の有効化に関する詳細については、[IdP 始動の SAML のページ][5]を参照してください。

##### サブドメインログイン {#subdomain-login}

1. サブドメインをタップし、カスタムの[サブドメイン][29]を入力します。
2. プロンプトに従ってログイン手順を進めます。

### 組織の切り替え {#switch-organizations}

組織を切り替えるには、モバイルアプリの [**Settings**] (設定) ページに移動し、[**Organization**] (組織) をクリックします。

**注**: 組織を切り替える際に再認証が必要な場合があります。

### ログアウト {#log-out}
ログアウトするには、モバイルアプリの [**Settings**] ページに移動し、[**Log Out**] (ログアウト) をクリックします。[**Yes**] (はい) を選択して操作を確定します。

## On-Call (オンコール){#on-call}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/on_call_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="シフト、スケジュール、エスカレーションオプションが表示された iOS の [On-Call] ページ">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_On_Call.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="シフト、スケジュール、エスカレーションオプションが表示された Android の [On-Call] ページ">}}

{{% /tab %}}
{{< /tabs >}}

[On-Call] ページは、オンコールのシフト、スケジュール、ページ、エスカレーションポリシーの包括的なビューを提供します。ユーザー、チーム、緊急度、ステータス、または日付で情報をフィルタリングして、関連する詳細を迅速に見つけることができます。[**Escalate**] (エスカレーション) をタップすると、次のポリシーレベルへのエスカレーションを確認するように求められます。[**Declare Incident**] (インシデントの宣言) をタップすると、タイトルを入力し、関連するインシデント属性を提供するように求められます。

個人またはチームに対するページを開始することができ、オーバーライドしたいシフトをタップすることで既存のシフトをオーバーライドすることもできます。Bits Investigation によるモニターの調査を表示して、初期の所見と結論を確認できます。詳細については、[Datadog On-Call][20] を参照してください。

モバイルデバイスで On-Call 通知を構成するには、[Datadog On-Call のためのモバイルデバイスのセットアップ][21]ガイドを参照してください。

<div class="alert alert-info">
モバイルで On-Call にのみアクセスする必要があり、モバイルデバイス上の機密テレメトリーデータへのアクセスを制限したい場合は、Datadog サポートにお問い合わせください。
</div>

## Incidents (インシデント) {#incidents}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/incident_may_2025.png" alt="Datadog On-Call モバイルアプリの [Incidents] ページ" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Incident.png" alt="Datadog On-Call モバイルアプリの [Incidents] ページ" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

[Incidents] ページでは、Datadog アカウントでアクセスできるすべてのインシデントを表示、検索、フィルタリングして、どこからでも対応と解決を確認することができます。また、インシデントの宣言と編集、Slack や Zoom などとのインテグレーションによるチームとのシームレスなコミュニケーションも可能です。インシデントの詳細については、[Datadog Incident Management][12] を参照してください。

### インシデントを作成する {#create-an-incident}

1. 下部のバーにある [Incidents] (インシデント) タブをタップして、インシデントリストに移動します。
2. 右上の **+** ボタンをタップします。
3. インシデントにタイトル、重大度、およびコマンダーを付けます。

## 通知センター {#notification-center}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_notification_center.png" alt="iOS の Datadog モバイルアプリの通知センター" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_notification_center.png" alt="Android の Datadog モバイルアプリの通知センター" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

通知センターには、通知のコンテキストが失われないように、受信したすべてのプッシュ通知が一覧表示されます。通知タイプでフィルタリングできます。

## Dashboards (ダッシュボード) {#dashboards}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/dashboard_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="ダッシュボードのリストと検索やフィルターのオプションが表示された iOS の [Dashboards] ページ">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Dashboards.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="ダッシュボードのリストと検索やフィルターのオプションが表示された Android の [Dashboards] ページ">}}

{{% /tab %}}
{{< /tabs >}}

[Dashboards] ページでは、Datadog 組織でアクセスできるすべてのダッシュボードを表示、検索し、Datadog Web アプリで設定したものと同じテンプレート変数を使用してそれらをフィルタリングできます。テンプレート変数の保存済みビューを使用して、ダッシュボードをすばやくフィルタリングします。テンプレート変数の保存済みビューの詳細については、[ダッシュボードの保存済みビュー][9]を参照してください。個々のダッシュボードをクリックして表示します。右下のタイムフレームをクリックしてダッシュボードの範囲をカスタマイズします。

**注**:
- ダッシュボードの設定や編集を行うには、[Datadog ブラウザアプリにログイン][10]する必要があります。詳細については、[ダッシュボード][11]を参照してください。
- UTC で構成されたダッシュボードリンクは、モバイルアプリで UTC で開きます。詳細については、[ダッシュボードの構成][24]を参照してください。
- すべての種類のウィジェットを利用できるわけではなく、モバイルアプリではデータが表示されないウィジェットもあります。これには、トポロジ―マップ、リストウィジェット (すべてのデータソース)、従来のツリーマップウィジェット、SLO サマリーウィジェットが含まれます。

## Monitors (モニター) {#monitors}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/monitor_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="モニターのリストと検索やフィルターのオプションが表示された iOS の [Monitors] ページ">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Monitors.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="モニターのリストと検索やフィルターのオプションが表示された Android の [Monitors] ページ">}}

{{% /tab %}}
{{< /tabs >}}

[Monitors] ページでは、Datadog 組織でアクセスできるすべてのモニターを表示、検索できます。フィールド名を指定し、タグ付け戦略に基づいて特定の検索クエリを構築できます。検索の詳細については、[モニターの管理の検索セクション][6]を参照してください。

たとえば、アラートが発生している SRE チームに関連するメトリクスモニターでフィルタリングするには、クエリ `"status:Alert type:Metric team:sre"` を使用します。個々のアラートをクリックして詳細を表示します。これは、タイプとアラート時間でフィルタリングできます。また、アラートをミュートにすることもできます。最新の 10 件の検索が保存されるため、以前のクエリにすばやくアクセスできます。さらに、検索バーをアクティブにすると表示される保存済みビューを使用してモニターリストをフィルタリングできます。Synthetic モニターを表示しているときに、Synthetic テストを表示して実行することもできます。

**注**: モニター、通知、または保存済みビューの設定や編集を行うには、[Datadog ウェブアプリ][7]を使用する必要があります。ウェブアプリで設定されたすべてのモニターがモバイルアプリで表示されます。詳細については、[モニターの作成][8]を参照してください。

## Notebooks (ノートブック) {#notebooks}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/notebook_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="ノートブックのリストと検索やフィルターのオプションが表示された iOS の [Notebooks] ページ">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Notebooks.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="ノートブックのリストと検索やフィルターのオプションが表示された Android の [Notebooks] ページ">}}

{{% /tab %}}
{{< /tabs >}}

[Notebooks] ページでは、Datadog 組織でアクセスできるすべてのノートブックを表示、検索し、タグでフィルタリングできます。ノートブックのタグを使用すると、お気に入り、チーム、タイプでフィルタリングできます。詳細については、[ノートブックのタグ][19]を参照してください。

**注**: ノートブックの設定や編集を行うには、[Datadog ブラウザアプリにログイン][10]する必要があります。詳細については、[ノートブック][18]を参照してください。

## Traces (トレース) {#traces}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/trace_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースのリストと検索やフィルターのオプションが表示された iOS の [Traces] ページ">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Traces.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースのリストと検索やフィルターのオプションが表示された Android の [Traces] ページ">}}

{{% /tab %}}
{{< /tabs >}}

[Traces] ページでは、Datadog 組織でアクセスできるすべてのトレースを表示、検索できます。保存済みビューを通じてリストを絞り込むか、タグ付け戦略に基づいて特定の検索クエリを構築できます。検索の詳細については、[トレースエクスプローラーの検索構文][16]を参照してください。

たとえば、タグ `#env:prod` またはタグ `#test` でトレースをフィルタリングするには、クエリ `"env:prod" OR test` を使用します。個々のサービスをクリックして関連するスパンを展開し、スパンを選択して情報、エラー、関連ログを表示します。トレースはサービスやログから開くこともできます。

**iOS でのみ利用可能**: Watchdog Insights では、レイテンシー外れ値とエラー外れ値が示されます。詳細については、[Watchdog Insights][26] を参照してください。


## Logs (ログ) {#logs}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/iOS_logs_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="ログのリストと検索やフィルターのオプションが表示された iOS の [Logs] ページ">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Logs.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="ログのリストと検索やフィルターのオプションが表示された Android の [Logs] ページ">}}

{{% /tab %}}
{{< /tabs >}}

[Logs] ページでは、Datadog 組織でアクセスできるすべてのログまたはフレックスログを表示、検索できます。保存済みビューやクエリフィルターを通じてリストを絞り込むことができます。検索の詳細については、[ログ検索構文][23]を参照してください。

ログパターンでグループ化し、結果をクラスター化またはグループ化するためのさまざまなログ属性を選択することもできます。ログパターンの詳細については、[ログをパターンにグループ化する][22]を参照してください。

**注**: フレックスログをオンにするには、ログリストに移動し、右上をタップして Enable Flex Logs を選択します。

**iOS でのみ利用可能**: Watchdog Insights では、ログの異常値や外れ値が示されます。詳しくは、[ログ用 Watchdog Insights][25] を参照してください。


## Services (サービス) {#services}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/service_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="サービスのリストと検索やフィルターのオプションが表示された iOS の [Services] ページ">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Services.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="サービスのリストと検索やフィルターのオプションが表示された Android の [Services] ページ">}}

{{% /tab %}}
{{< /tabs >}}

[Services] ページでは、Datadog モバイルアプリから Datadog アカウントでアクセスできるすべてのサービスを表示、検索、フィルタリングして、どこからでもサービスの健全性を確認することができます。そのサービスに関連する最近のデプロイメント、リソース、SLO、モニターも確認できます。サービスの調査ツールの詳細については、[カタログの管理][17]を参照してください。

## Bits AI {#bits-ai}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_bits_chat.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS の Bits AI チャットボットインターフェイスでユーザーがサービスについて質問">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_bits_chat.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Android の Bits AI チャットボットインターフェイスでユーザーがサービスについて質問">}}

{{% /tab %}}
{{< /tabs >}}

Bits AI のホームページで、組織のシステムの健全性について質問できます。Bits AI は、ログや APM トレースに対する自然言語クエリをサポートしています。詳細については、[Bits Chat][27] を参照してください。

### Bits Investigation {#bits-investigation}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="On-Call ページに表示された Bits Investigation の結果">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="On-Call ページに表示された Bits Investigation の結果">}}

{{% /tab %}}
{{< /tabs >}}

Bits Investigation を有効にすると、On-Call ページ上で直接調査が始まります。これらの調査により、担当者が潜在的な根本原因と次のステップを特定するのに役立つ初期の所見と結論が提示されます。詳細については、[Bits Investigation][28] を参照してください。

## よくある質問 {#frequently-asked-question}
### Datadog モバイルアプリにログインしたままにするにはどうすればよいですか?{#how-do-i-remain-logged-into-the-mobile-app}
Datadog モバイルアプリへの認証が成功すると、90 日間ログインしたままになります。 

**注**: 通知が有効になっている場合、トークンの有効期限の 10 日前に事前の通知が送信されます。

### 自動的にサインアウトされた場合でも通知は届きますか?{#will-i-still-receive-notifications-if-i-am-automatically-signed-out}
90 日間のトークン期間中であれば、自動的にログアウトされた場合でも通知を受け取ることができ、再度ログインするように促されます。

**注**: アプリから手動でログアウトした場合は通知の受信が停止します。

### 通知が届かないのはなぜですか?{#why-am-i-not-receiving-notifications}
デバイスのアプリ設定で Datadog モバイルアプリの通知が有効になっていることを確認してください。おやすみモードでも通知を受け取る場合は、重大な通知がオンになっていることを確認してください。

### サインインしているすべての組織の通知が届きますか?{#will-i-receive-notifications-for-all-organizations-that-i-am-signed-into}
はい、組織を切り替えても、サインインしているすべての組織の通知が届きます。これには重要なプッシュ通知が含まれます。

### ユーザーが無効にされた場合はどうなりますか?{#what-happens-if-a-user-is-disabled}
モバイルアプリのトークンが無効になり、ユーザーは強制的にログアウトされます。

## トラブルシューティング {#troubleshooting}

トラブルシューティングのヘルプについては、[Datadog サポートにお問い合わせ][13]ください。また、[Datadog 公開 Slack][14] [#mobile-app][15] チャンネルでメッセージをお送りいただくことも可能です。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /ja/account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/personal-settings/organizations
[5]: /ja/account_management/saml/mobile-idp-login/
[6]: /ja/monitors/manage/#search
[7]: https://app.datadoghq.com/monitors
[8]: /ja/monitors/types
[9]: /ja/dashboards/template_variables/#saved-views
[10]: https://app.datadoghq.com/dashboard/lists
[11]: /ja/dashboards/
[12]: /ja/monitors/incident_management
[13]: /ja/help/
[14]: https://chat.datadoghq.com/
[15]: https://datadoghq.slack.com/archives/C0114D5EHNG
[16]: /ja/tracing/trace_explorer/query_syntax/
[17]: https://docs.datadoghq.com/ja/internal_developer_portal/catalog/set_up/
[18]: https://docs.datadoghq.com/ja/notebooks/
[19]: https://docs.datadoghq.com/ja/notebooks/#notebook-tags
[20]: https://docs.datadoghq.com/ja/incident_response/on-call/
[21]: /ja/incident_response/on-call/guides/configure-mobile-device-for-on-call/?tab=ios
[22]: https://docs.datadoghq.com/ja/logs/explorer/analytics/patterns/
[23]: https://docs.datadoghq.com/ja/logs/explorer/search_syntax/
[24]: /ja/dashboards/configure/#configuration-actions
[25]: /ja/logs/explorer/watchdog_insights/
[26]: /ja/watchdog/insights/?tab=logmanagement
[27]: /ja/bits_ai/bits_assistant/
[28]: /ja/bits_ai/bits_ai_sre/
[29]: /ja/account_management/multi_organization/#custom-sub-domains