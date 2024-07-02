---
title: Datadog Mobile App
kind: documentation
aliases:
- /mobile/
further_reading:
- link: /monitors/
  tag: Documentation
  text: Learn about Monitors and Alerting
- link: /dashboards/
  tag: Documentation
  text: ダッシュボードについて
- link: "https://www.datadoghq.com/blog/datadog-mobile-widgets/"
  tag: Blog
  text: Improve your on-call experience with Datadog mobile dashboard widgets
- link: "https://www.datadoghq.com/blog/mobile-app-getting-started/"
  tag: ブログ
  text: Getting started with the Datadog mobile app
---

Datadog Mobile アプリを使用すると、Datadog からのアラートをモバイルデバイスで表示できます。Slack、メール、Pagerduty、またはその他のページャーアプリを介してアラートを受け取った場合、モバイルデバイスでモニターグラフとダッシュボードを開いて問題を調査できます。

## インストール

iOS デバイスの場合は [Apple App Store][1] から、Android デバイスの場合は [Google Play ストア][2]からアプリをダウンロードします。

### ログイン

US と EU のどちらのリージョンでも、標準認証、Google 認証、または [SAML][3] を使用してログインできます。

#### SAML の有効化

SAML ログインでは、Datadog を使用して SAML プロバイダーをセットアップおよび認証する必要があります。SAML IdP 始動のログインについては、このセクションの最後を参照してください。SAML を認証するには、

1. "Using Single Sign-On (SAML)?" ボタンを押します。
2. 勤務先メールアドレスを入力し、メールを送信します。
3. モバイルデバイスでメールを開き、記載されているリンクをクリックします。
4. 会社の SAML 資格情報を入力します。認証されると、Datadog モバイルアプリの認証済みセッションに再接続されます。

QR コードを使用または手動入力で認証することも可能です。詳しくは下記を参照してください。

##### QR コード

1. In a browser, navigate to your [Datadog account Personal Settings Organizations][4] page and click **Log in to Mobile App** for the organization you are currently logged into. This pops up a QR code.
2. Use your default phone camera app to scan the QR code and then tap the suggested link to open the Datadog App. You will be automatically logged in.

**Note**: If you click the **Log in to Mobile App** button of an organization you are not currently logged into, the org UUID is automatically inserted into the login screen. You still have to provide authentication using your standard method.

##### 手動入力

1. SAML ID を手動で入力するには、Datadog モバイルアプリを開いて "Using Single Sign-On (SAML)?" ボタンを押します。
2. "Use another method to login" ボタンを押し、手動で SAML ID を入力します。

ログイン時に **Authorize** をクリックすると、このモバイルデバイスがアカウントにリンクされます。セキュリティ上の理由から、このフローを月に 1 回実行する必要があります。

##### SAML IdP 始動のログイン

SAML でログインしようとしているときにエラーが発生し続ける場合は、ID プロバイダーが IdP 始動のログインを強制する可能性があります。IdP 始動の SAML の有効化の詳細については、IdP 始動の SAML のページ [IdP 始動の SAML のページ][5]を参照してください。

## モニター

{{< img src="service_management/mobile/monitors_doc2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="モニターページ">}}

モニターページでは、Datadog 組織でアクセスできるすべてのモニターを表示、検索できます。タグ付け戦略に基づいて、フィールド名とビルド固有の検索クエリで指定できます。検索の詳細については、[モニター検索の管理セクション][6]を参照してください。

たとえば、アラートが発生している SRE チームに関連するメトリクスモニターでフィルタリングするには、クエリ `"status:Alert type:Metric team:sre"` を使用します。個々のアラートをクリックして詳細を表示します。これは、タイプとアラート時間でフィルタリングできます。また、アラートをミュートにすることもできます。最新の 10 件の検索が保存されるため、以前のクエリにすばやくアクセスできます。さらに、検索バーをアクティブにすると表示される保存済みのビューを使用して、モニターリストをフィルター処理できます。 最後に、Synthetic モニターを表示するときに、Synthetic テストを表示して実行します。

**注:** モニター、通知、または保存済みビューの設定または編集は、[Datadog ウェブアプリ][7]で行う必要があります。ウェブアプリで設定されたすべてのモニターがモバイルアプリで表示されます。詳細については、[モニターの作成][8]を参照してください。

## ダッシュボード  

{{< img src="service_management/mobile/dashboards_doc.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="ダッシュボードページ">}}

ダッシュボードページでは、Datadog 組織でアクセスできるすべてのダッシュボードを表示、検索し、Datadog Web アプリで設定したものと同じテンプレート変数を使用してそれらをフィルタリングできます。個々のダッシュボードをクリックして表示します。テンプレート変数の保存済みビューを使用して、ダッシュボードをすばやくフィルタリングします。テンプレート変数の保存済みビューの詳細については、[ダッシュボードの保存済みビュー][9]を参照してください。個々のダッシュボードをクリックして表示します。

**注:** ダッシュボードを設定または編集するには、[Datadog ブラウザアプリにログイン][10]する必要があります。詳細については、[ダッシュボード][11]を参照してください。

## インシデント

{{< img src="service_management/mobile/incidents.png" alt="インシデントページ" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

インシデントページでは、Datadog モバイルアプリから Datadog アカウントでアクセスできるすべてのインシデントを表示、検索、およびフィルタリングして、どこからでも迅速な対応と解決を保証できます。また、Slack、Zoom などとの統合を通じて、インシデントを宣言および編集し、チームとシームレスに通信することもできます。インシデントの詳細については、[Datadog インシデント管理ドキュメント][12]を参照してください。

### インシデントを作成する

1. 下部のバーにある Incidents タブをクリックして、インシデントリストに移動します。
2. 右上の "+" ボタンをクリックします。
3. インシデントにタイトル、重大度、およびコマンダーを付けます。

### インシデントをプッシュ通知で受け取る

1. **Account** に移動します。
2. **Notifications** をクリックします。
3. **Enable Notifications** のトグルを選択します。(**注**: Android の場合、最新バージョンの Datadog モバイルアプリをインストールすると、自動的に通知が有効になります。)
4. 次に、Datadog の Web アプリで、[Incident Notification Rules][13] に移動します。
5. 通知ルールを作成または編集し、**Notify** の下に、名前を入力します。2 つのオプションが表示され、メール通知とモバイルデバイスのどちらかを選択できるようになります。
6. モバイルデバイスを選択し、** Save** をクリックします。

インシデント通知ルールの構成の詳細については、[インシデント設定ドキュメント][14]を参照してください。

## ウィジェット

### オープンインシデントウィジェット

{{< img src="service_management/mobile/incident_widget.png" alt="Android および iOS デバイスに表示された Datadog インシデントモバイルウィジェット" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Datadog ウィジェットで、[オープンインシデント][12]をモバイルのホームスクリーンで確認。

問題をより詳細に確認するには、ウィジェットに表示されているオープンインシデントをタップして開き、Datadog モバイルアプリで詳細を確認します。

オープンインシデントウィジェットは、以下のフィルターを使用してカスタマイズすることも可能です。

- Organization
- 重大度レベル
- 影響のあった顧客
- 順序

#### オープンインシデントウィジェットを作成する

{{< tabs >}}
{{% tab "iOS" %}}

1. 画面左上の **+** ボタンをタップします。
2. "Datadog" ウィジェットを検索します。
3. 希望するサイズ（小、中、大）を選択します。
4. ウィジェットを画面上の希望の場所にドラッグします。


{{% /tab %}}
{{% tab "Android" %}}

1. ホーム画面を長押しします。
2. ホーム画面エディタの **Widgets** ボタンをタップします。アプリのショートカットがある場合は、バブルの右上にアイコンとして表示されることがあります。
3. ウィジェットを画面上の希望のホーム画面にドラッグします。
4. お好みによりウィジェットのサイズを調整します。


{{% /tab %}}
{{< /tabs >}}

#### オープンインシデントウィジェットを編集する

{{< tabs >}}
{{% tab "iOS" %}}

1. ウィジェットを長押しして構成します。
2. **Edit Widget** をタップします。
2. **Organzation** ラベルの横にある **Choose** をタップし、選択したオーガニゼーションからオープンインシデントを取得します。
3. 重大度ラベルの横にある **SEV-1 and SEV-2** をタップし、重大度フィルターを指定します。
4. **Customer Impacted** ラベルの横にある **Both** をタップし、影響のあった顧客のオープンインシデントを絞り込みます。
5. さらに絞り込みを指定するには、**Type additional filters** のテキストボックスに入力します。
6. **Ordering** をタップして、リストアップされるインシデントの順番を指定します。
7. ウィジェットの外側をタップして選択を保存し、コンフィギュレーション画面を終了します。


{{% /tab %}}
{{% tab "Android" %}}

1. ウィジェットのタイトルをタップして構成します。
2. **Organzation** をタップし、選択したオーガニゼーションからオープンインシデントを取得します。
3. **Severities** をタップして重大度フィルターを指定します。
4. **Customer Impacted** をタップして、影響のあった顧客のオープンインシデントを絞り込みます。
5. **Query** をタップしてさらに絞り込みを指定します。
6. **Sorted by** をタップして、リストアップされるインシデントの順番を指定します。
7. **Save** または **Apply** をタップして選択を保存し、コンフィギュレーション画面を終了します。
8. ウィジェットを長押ししてサイズを変更し、好みに合わせます。


{{% /tab %}}
{{< /tabs >}}

#### 複数のオーガニゼーションのオープンインシデントを表示する

複数のオーガニゼーションのオープンインシデントをモバイルホーム画面に表示できます。

{{< tabs >}}
{{% tab "iOS" %}}
- Organzation ラベルの横にある **Choose** をタップし、選択したオーガニゼーションからオープンインシデントを取得します。



{{% /tab %}}
{{% tab "Android" %}}

1. ウィジェットのタイトルをタップして構成します。
2. コンフィギュレーション画面で **Organization** をタップします。
3. 新しいオーガニゼーションを選択します (サインインが必要な場合があります)。
4. 好みに合わせてウィジェットのサイズを変更します。
5. **Save** または **Apply** をタップします。


{{% /tab %}}
{{< /tabs >}}

#### オープンインシデントウィジェットを削除する

{{< tabs >}}
{{% tab "iOS" %}}

ホーム画面を編集するときにウィジェットの左上にある **-** ボタンをタップするか、ウィジェットを長押ししてから **Remove Widget** を選択することにより、ウィジェットを削除します。


{{% /tab %}}
{{% tab "Android" %}}

ウィジェットを長押しし、ドラッグして、**Remove** ボタンにドロップしてウィジェットを削除します。


{{% /tab %}}
{{< /tabs >}}

### SLO ウィジェット

{{< img src="service_management/mobile/slo_widget.png" alt="Android および iOS デバイスに表示されたアプリケーションアップタイム SLO ウィジェット" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Datadog ウィジェットを使用してモバイルホーム画面から [SLO][15] を表示します。オーガニゼーションの SLO を、タイムフレームとともにウィジェットとして追加できます。

タイムフレームオプションは次のとおりです。
- 7 日
- 30 日
- 90 日
- 前週
- 前月
- WTD
- MTD

SLO ウィジェットをタップするとデフォルトで開くダッシュボードを指定して、メトリクスの詳細をすばやく調査することもできます。

**注**: デフォルトで開くダッシュボードを指定しない場合、SLO ウィジェットをタップすると Datadog アプリが開きます。

#### SLO ウィジェットを作成する

{{< tabs >}}
{{% tab "iOS" %}}

- ホーム画面を長押しします。
- 画面左上の "+" ボタンをタップします。
- "Datadog" ウィジェットを検索します。
- Select your preferred size (small shows one SLO and medium shows one SLO along with a visualized timeframe of its health).
- ウィジェットを画面上の希望の場所にドラッグします。


{{% /tab %}}
{{% tab "Android" %}}

- ホーム画面を長押しします。
- ホーム画面エディタの "Widgets" ボタンをタップします。アプリのショートカットがある場合は、バブルの右上隅にアイコンとして表示されることがあります。
- ウィジェットを画面上の希望のホーム画面にドラッグします。
- 好みに合わせてウィジェットのサイズを変更します。常に 1 つの SLO が表示されます。モバイルホーム画面の幅に合わせてウィジェットのサイズを変更すると、選択した SLO が、その健全性のタイムフレームとともに表示されます。


{{% /tab %}}
{{< /tabs >}}

#### SLO ウィジェットを編集する

{{< tabs >}}
{{% tab "iOS" %}}

- ウィジェットを長押しして構成します。
- "Edit Widget" をタップします。
- SLO ラベルの横にある "Choose" をタップして、追跡する SLO を選択します。
- 選択した SLO によっては、"Timeframe" ラベルが表示される場合があります。"Timeframe" ラベルの横にある "Choose" をタップして、SLO のタイムフレームを選択します。
- "Dashboard to open" ラベルの横にある "Choose" をタップして、SLO ウィジェットをタップしたときに開くダッシュボードを選択します。
- ウィジェットをタップして選択を検証し、コンフィギュレーション画面を終了します。


{{% /tab %}}
{{% tab "Android" %}}

- ウィジェットのタイトルをタップして構成します。
- "Selected SLO" をタップして、追跡する SLO を選択します。
- "Selected Time Window" をタップして、SLO のタイムフレームを選択します。
- "Dashboard to open" をタップして、SLO ウィジェットをタップしたときに開くダッシュボードを選択します。
- "Save" または "Apply" をタップして選択を検証し、コンフィギュレーション画面を終了します。
- ウィジェットを長押ししてサイズを変更し、好みに合わせます。


{{% /tab %}}
{{< /tabs >}}

#### 複数のオーガニゼーションの SLO を表示する

複数のオーガニゼーションの SLO をモバイルホーム画面に表示できます。

{{< tabs >}}
{{% tab "iOS" %}}

ログインしたすべてのオーガニゼーションがコンフィギュレーション画面に表示されます。オーガニゼーションが表示されない場合は、再度サインインします。


{{% /tab %}}
{{% tab "Android" %}}

- ウィジェットのタイトルをタップして構成します。
- コンフィギュレーション画面で "Organization" をタップします。
- 新しいオーガニゼーションを選択します (サインインが必要な場合があります)。
- 好みに合わせてウィジェットのサイズを変更します。
- "Save" または "Apply" をタップします。


{{% /tab %}}
{{< /tabs >}}

#### SLO ウィジェットを削除する

{{< tabs >}}
{{% tab "iOS" %}}

ホーム画面を編集するときにウィジェットの左上にある "-" ボタンをタップするか、ウィジェットを長押ししてから "Remove Widget" を選択することにより、ウィジェットを削除します。


{{% /tab %}}
{{% tab "Android" %}}

ウィジェットを長押しし、ドラッグして、"Remove" ボタンにドロップしてウィジェットを削除します。


{{% /tab %}}
{{< /tabs >}}

### モニターウィジェット

{{< img src="service_management/mobile/monitor_widget.png" alt="Android および iOS 画面に表示された構成済みモニターウィジェット" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Datadog ウィジェットを使用して、ホーム画面から[モニター][16]を表示します。セルをタップして、モニターがすでに入力された状態で、アプリで **Monitor Search** 画面を開きます。

**注**: モニターに保存されたビューがない場合、ウィジェットにはデフォルトですべてのモニターが表示されます。

#### モニターウィジェットを作成する

{{< tabs >}}
{{% tab "iOS" %}}

- ホーム画面を長押しします。
- 画面左上の "+" ボタンをタップします。
- "Datadog" ウィジェットを検索します。
- Select your preferred size (small shows two monitor saved views, medium allows up to three monitor saved views, and large up to six monitor saved views).
- ウィジェットを画面上の希望の場所にドラッグします。


{{% /tab %}}
{{% tab "Android" %}}

- ホーム画面を長押しします。
- ホーム画面エディタの "Widgets" をタップします。アプリのショートカットがある場合は、バブルの右上隅にアイコンとして表示されることがあります。
- ウィジェットを画面上の希望のホーム画面にドラッグします。
- 好みに合わせてウィジェットのサイズを変更します。保存されたビューをさらに表示するには、モバイルホーム画面のウィジェットの長さを増やします。


{{% /tab %}}
{{< /tabs >}}

#### モニターウィジェットを編集する

{{< tabs >}}
{{% tab "iOS" %}}

- ウィジェットを長押しして構成します。
- "Edit Widget" をタップします。
- 個々の保存されたビューのセルをタップして、選択および選択解除します。
- 各セルをドラッグアンドドロップして、ビューを並べ替えます。
- ウィジェットをタップして選択を検証し、コンフィギュレーション画面を終了します。


{{% /tab %}}
{{% tab "Android" %}}

- ウィジェットのタイトルをタップして構成します。
- "Saved Views" をタップします。
- 個々の保存されたビューのセルをタップして、選択および選択解除します。
- 各セルをドラッグアンドドロップして、ビューを並べ替えます。
- "Save" または "Apply" をタップして選択を検証し、コンフィギュレーション画面を終了します。
- ウィジェット内をスクロールして、保存されたビューをさらに表示します。ウィジェットを長押ししてサイズを変更し、好みに合わせます。


{{% /tab %}}
{{< /tabs >}}

#### 複数のオーガニゼーションのモニターを表示する

同じウィジェット内に複数のオーガニゼーションからのモニターを表示できます。

{{< tabs >}}
{{% tab "iOS" %}}

ログインしたすべてのオーガニゼーションがコンフィギュレーション画面に表示されます。オーガニゼーションが表示されない場合は、再度サインインする必要がある場合があります。


{{% /tab %}}
{{% tab "Android" %}}

- ウィジェットのタイトルをタップして構成します。
- コンフィギュレーション画面で "Organization" をタップします。
- 新しいオーガニゼーションを選択します (サインインが必要な場合があります)。
- 好みに合わせてウィジェットを編集します。
- "Save" または "Apply" をタップします。


{{% /tab %}}
{{< /tabs >}}

#### モニターウィジェットを削除する

{{< tabs >}}
{{% tab "iOS" %}}

ホーム画面を編集するときにウィジェットの左上にある "-" ボタンを押すか、ウィジェットを長押ししてから "Remove Widget" を選択することにより、ウィジェットを削除します。


{{% /tab %}}
{{% tab "Android" %}}

ウィジェットを長押しし、ドラッグして、"Remove" ボタンにドロップしてウィジェットを削除します。


{{% /tab %}}
{{< /tabs >}}

## クイックアクション

{{< img src="service_management/mobile/shortcut_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="クイックアクション">}}


アプリアイコンを長押しすると、iOS 用の上位 5 つの [Frequently Viewed By Me][17] ダッシュボード (表示数と最新性で測定) または Android 用モバイルで最も開いている 5 つのダッシュボードのクイックアクションシートが表示されます。結果をタップして、アプリ内ダッシュボードを開きます。

## ホーム画面から検索

{{< img src="service_management/mobile/iphone_search_doc.png" alt="ホーム画面の検索" style="width:40%;">}}

**iOS のみ**: iPhone Search 内で、必要なダッシュボードの名前をフィルタリングして検索します。結果を押してモバイルアプリで直接ダッシュボードビューを開くか、"Search in App" ボタンを押してアプリ内ダッシュボードリストページで検索クエリを開きます。

## ショートカットと Siri の提案

**Android**: Create shortcut icons for your dashboards by touching and holding the Datadog app icon, then lift your finger. If the app has shortcuts, it displays a list. Touch and hold the desired shortcut, then drag and drop it to another location on your screen to create a unique shortcut icon.

**iOS**: ショートカットアプリを使用して、Datadog ダッシュボードとモニターの Siri ショートカットを作成します。ショートカットを作成できるようにするには、アプリで目的のアクションを少なくとも 1 回実行する必要があります。たとえば、「AWS 概要ダッシュボードを開く」ショートカットを作成するには、モバイルアプリで AWS 概要ダッシュボードを少なくとも 1 回開きます。

ショートカットを使用すると、次の 3 つの主要なアクションを通じてダッシュボードとモニターにアクセスできます。

- ショートカットをホーム画面のアイコンとして固定します。これを行うには、ショートカットアプリにアクセスし、ダッシュボードショートカットの編集メニューを開きます。
- Siri 音声: 「AWS の概要を開く」などのショートカット名を言うと、Siri はアプリ内でダッシュボードを開きます。
- Siri の提案: Siri はあなたのルーチンを学習し、ホームまたはロック画面のバナー、iPhone 検索、または iOS 14 の Siri の提案ウィジェットを介して、最も必要なときにダッシュボードのショートカットを提案します。

{{< img src="service_management/mobile/siri_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="ショートカット">}}

Siri のショートカットと提案の詳細については、[Apple Siri のドキュメント][18]をお読みください。

## Handoff

**iOS のみ**: Apple Handoff を使用して、Apple デバイス間でタスクを継続します。使用中、Datadog モバイルアプリのアイコンが Mac の Dock の左端に表示されます。アイコンをクリックして、Mac で現在のダッシュボードまたはモニターを開きます。

Handoff が機能するには、各デバイスが次の条件を満たしている必要があります。

- 同じ Apple ID で iCloud にサインインしている
- Bluetooth が有効になっている
- Wi-Fi が有効になっている
- Handoff が有効になっている

Handoff の詳細については、[Apple Handoff のドキュメント][19]をお読みください。

## アカウント

組織を切り替えるか、アカウントページからログアウトします。

## トラブルシューティング

トラブルシューティングのヘルプについては、[Datadog のサポートチームにお問い合わせください][20]。また、[Datadog 公開 Slack][21] [#mobile-app][22] チャンネルでメッセージをお送りいただくことも可能です。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/personal-settings/organizations
[5]: /account_management/saml/mobile-idp-login/
[6]: /monitors/manage/#search
[7]: https://app.datadoghq.com/monitors
[8]: /monitors/types
[9]: /dashboards/template_variables/#saved-views
[10]: https://app.datadoghq.com/dashboard/lists
[11]: /dashboards/
[12]: /monitors/incident_management
[13]: https://app.datadoghq.com/incidents/settings#Rules
[14]: /service_management/incident_management/incident_settings/#rules
[15]: /dashboards/widgets/slo/#setup
[16]: /logs/explorer/saved_views/
[17]: https://app.datadoghq.com/dashboard/lists/preset/5
[18]: https://support.apple.com/en-us/HT209055
[19]: https://support.apple.com/en-us/HT209455
[20]: /help/
[21]: https://chat.datadoghq.com/
[22]: https://datadoghq.slack.com/archives/C0114D5EHNG
