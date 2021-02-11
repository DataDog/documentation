---
title: Datadog モバイルアプリ
kind: ドキュメント
further_reading:
  - link: /monitors/
    tag: ドキュメント
    text: アラート設定
  - link: /dashboards/
    tag: ドキュメント
    text: ダッシュボード
---
Datadog Mobile アプリを使用すると、Datadog からのアラートをモバイルデバイスで表示できます。Slack、メール、Pagerduty、またはその他のページャーアプリを介してアラートを受け取った場合、モバイルデバイスでモニターグラフとダッシュボードを開いて問題を調査できます。

## インストール

iOS デバイスの場合は [Apple App Store][1] から、Android デバイスの場合は [Google Play ストア][2]からアプリをダウンロードします。

### ログイン

US と EU のどちらのリージョンでも、標準認証、Google 認証、または [SAML][3] を使用してログインできます。

#### SAML の有効化

SAML ログインでは、Datadog を使用して SAML プロバイダーをセットアップおよび認証する必要があります。SAML IdP 始動のログインについては、このセクションの最後を参照してください。SAML を認証するには、

1. “Using Single Sign-On (SAML)?” ボタンを押してます。
2. 勤務先メールアドレスを入力し、メールを送信します。
3. モバイルデバイスでメールを開き、記載されているリンクをクリックします。
4. 会社の SAML 資格情報を入力します。認証されると、Datadog モバイルアプリの認証済みセッションに再接続されます。

QR コードを使用または手動入力で認証することも可能です。詳しくは下記を参照してください。

##### QR コード

1. まず、ブラウザで [Datadog アカウントプロファイルページ][4]にログインし、ログインする組織の **Link mobile device** ボタンをクリックします。QR コードがポップアップします。
    {{< img src="mobile/link-device.png" alt="アカウントプロファイル - モバイルデバイスをリンクする">}}
2. デフォルトのスマホカメラアプリを使用して QR コードをスキャンし、提案されたリンクをタップして Datadog アプリを開きます。組織 UDID がログイン画面に自動的に挿入されます。

##### 手動入力

1. SAML ID を手動で入力するには、Datadog モバイルアプリを開いて “Using Single Sign-On (SAML)?” ボタンを押します。
2. “Use another method to login” ボタンを押し、手動で SAML ID を入力します。

ログイン時に **Authorize** をクリックすると、このモバイルデバイスがアカウントにリンクされます。セキュリティ上の理由から、このフローを月に 1 回実行する必要があります。

**注**: モバイルアプリの SAML IdP 始動ログインは、現在ベータ版です。 SAML IdP 始動のベータアクセスをリクエストする、または SAML 認証に問題がある場合は、[Datadog サポート][5]までお問い合わせください。

## モニター

{{< img src="mobile/monitors_doc2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="モニターページ">}}

モニターページでは、Datadog 組織でアクセスできるすべてのモニターを表示、検索できます。タグ付け戦略に基づいて、フィールド名とビルド固有の検索クエリで指定できます。検索の詳細については、[モニター検索の管理セクション][6]を参照してください。

たとえば、アラートが発生している SRE チームに関連するメトリクスモニターでフィルタリングするには、クエリ `"status:Alert type:Metric team:sre"` を使用します。個々のアラートをクリックして詳細を表示します。これは、タイプとアラート時間でフィルタリングできます。また、アラートをミュートにすることもできます。最新の 10 件の検索が保存されるため、以前のクエリにすばやくアクセスできます。さらに、検索バーをアクティブにすると表示される保存済みのビューを使用して、モニターリストをフィルター処理できます。 最後に、Synthetic モニターを表示するときに、Synthetic テストを表示して実行します。

**注:** モニター、通知、または保存済みビューの設定または編集は、[Datadog ウェブアプリ][7]で行う必要があります。ウェブアプリで設定されたすべてのモニターがモバイルアプリで表示されます。詳細については、[モニターの作成][8]を参照してください。

## ダッシュボード

{{< img src="mobile/dashboards_doc.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="ダッシュボードページ">}}

ダッシュボードページでは、Datadog 組織でアクセスできるすべてのダッシュボードを表示、検索し、Datadog Web アプリで設定したものと同じテンプレート変数を使用してそれらをフィルタリングできます。個々のダッシュボードをクリックして表示します。テンプレート変数の保存済みビューを使用して、ダッシュボードをすばやくフィルタリングします。テンプレート変数の保存済みビューの詳細については、[ダッシュボードの保存済みビュー][9]を参照してください。個々のダッシュボードをクリックして表示します。

**注:** ダッシュボードを設定または編集するには、[Datadog ブラウザアプリにログイン][10]する必要があります。詳細については、[ダッシュボード][11]を参照してください。

## クイックアクション

{{< img src="mobile/shortcut_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="クイックアクション">}}


アプリアイコンを長押しすると、iOS 用の上位 5 つの [Frequently Viewed By Me][12] ダッシュボード (表示数と最新性で測定) と Android 用モバイルで最も開いている 5 つのダッシュボードのクイックアクションシートが表示されます。結果を押して、アプリ内ダッシュボードを開きます。

## ホーム画面から検索

{{< img src="mobile/iphone_search_doc.png" alt="ホーム画面の検索" style="width:40%;">}}

**iOS のみ**: iPhone Search 内で、必要なダッシュボードの名前をフィルタリングして検索します。結果を押してモバイルアプリで直接ダッシュボードビューを開くか、“Search in App” ボタンを押してアプリ内ダッシュボードリストページで検索クエリを開きます。

## ショートカットと Siri の提案

**Android**: Datadog アプリアイコンを長押ししてダッシュボードのショートカットアイコンを作成し、指を離します。アプリにショートカットがある場合は、リストが表示されます。目的のショートカットを長押ししてから、画面上の別の場所にドラッグアンドドロップして、一意のショートカットアイコンを作成します。

**iOS**: ショートカットアプリを使用して、Datadog ダッシュボードとモニターの Siri ショートカットを作成します。ショートカットを作成できるようにするには、アプリで目的のアクションを少なくとも 1 回実行する必要があります。たとえば、「AWS 概要ダッシュボードを開く」ショートカットを作成するには、モバイルアプリで AWS 概要ダッシュボードを少なくとも 1 回開きます。

ショートカットを使用すると、次の 3 つの主要なアクションを通じてダッシュボードとモニターにアクセスできます。

- ショートカットをホーム画面のアイコンとして固定します。これを行うには、ショートカットアプリにアクセスし、ダッシュボードショートカットの編集メニューを開きます。
- Siri 音声: 「AWS の概要を開く」などのショートカット名を言うと、Siri はアプリ内でダッシュボードを開きます。
- Siri の提案: Siri はあなたのルーチンを学習し、ホームまたはロック画面のバナー、iPhone 検索、または iOS 14 の Siri の提案ウィジェットを介して、最も必要なときにダッシュボードのショートカットを提案します。

{{< img src="mobile/siri_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="ショートカット">}}

Siri のショートカットと提案の詳細については、[Apple Siri のドキュメント][13]を参照してください。

## Handoff

**iOS のみ**: Apple Handoff を使用して、Apple デバイス間でタスクを継続します。使用中、Datadog モバイルアプリのアイコンが Mac の Dock の左端に表示されます。アイコンをクリックして、Mac で現在のダッシュボードまたはモニターを開きます。

Handoff が機能するには、各デバイスが次の条件を満たしている必要があります。

- 同じ Apple ID で iCloud にサインインしている
- Bluetooth が有効になっている
- Wi-Fi が有効になっている
- Handoff が有効になっている

Handoff の詳細については、[Apple Handoff のドキュメント][14]を参照してください。

## アカウント

組織を切り替えるか、アカウントページからログアウトします。

## トラブルシューティング

トラブルシューティングのヘルプについては、[Datadog のサポートチームにお問い合わせください][5]。また、[Datadog 公開 Slack][15] [#mobile-app][16] チャンネルでメッセージをお送りいただくことも可能です。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /ja/account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/account/profile
[5]: /ja/help/
[6]: /ja/monitors/manage_monitor/#search
[7]: https://app.datadoghq.com/monitors
[8]: /ja/monitors/monitor_types/
[9]: /ja/dashboards/template_variables/#saved-views
[10]: https://app.datadoghq.com/dashboard/lists
[11]: /ja/dashboards/
[12]: https://app.datadoghq.com/dashboard/lists/preset/5
[13]: https://support.apple.com/en-us/HT209055
[14]: https://support.apple.com/en-us/HT209455
[15]: https://chat.datadoghq.com/
[16]: https://datadoghq.slack.com/archives/C0114D5EHNG