---
title: ブラウザテスト
kind: ドキュメント
description: 特定の場所からユーザー操作をシミュレートして監視します。
aliases:
  - /ja/synthetics/browser_check
  - /ja/synthetics/browser_test
further_reading:
  - link: 'https://www.datadoghq.com/blog/browser-tests/'
    tag: ブログ
    text: ブラウザテストによるユーザーエクスペリエンスの監視
  - link: /getting_started/synthetics/browser_test
    tag: Documentation
    text: ブラウザテストの概要
  - link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
    tag: ブログ
    text: エンドツーエンドテスト作成のベストプラクティス
  - link: 'https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals'
    tag: ブログ
    text: Synthetic モニタリングでウェブに関する主な指標を監視
  - link: /synthetics/guide/
    tag: Documentation
    text: ガイド
---
## 概要

ブラウザテストは、Datadog が Web アプリケーション上で実行するシナリオです。世界中の複数の場所からさまざまなブラウザおよびデバイスを使用して実行され、テスト間隔は自由に設定できます。これらのテストは、アプリケーションが稼働してリクエストに応答していること、シナリオで定義された条件が満たされていることを確認します。

<div class="alert alert-info">MFA の背後にあるアプリケーションのテストに興味がありますか？<a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">専用ガイド</a>を読み、<a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">フィードバックを送信</a>して、チームにとって最も重要なシステムの構築をサポートしてください。</div>

## テストコンフィギュレーション

ブラウザテストの構成を定義します。

1. <mrk mid="23" mtype="seg"/><mrk mid="24" mtype="seg"/>
2. **Advanced Options** (オプション): ブラウザテストに特定のオプションを設定します。
    * Headers: ヘッダーを定義して、デフォルトのブラウザヘッダーに追加またはオーバーライドします。たとえば、ヘッダーに User Agent を設定して、[Datadog スクリプトを識別][1]します。
    * Authentication: HTTP Basic、Digest または NTLM を使用し、ユーザー名とパスワードで認証を行います。
    * Cookies: クッキーを定義してデフォルトのブラウザクッキーに追加します。複数のクッキーを設定するには、次の書式を使用します `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`。
    * Proxy URL: リクエストが通過する必要があるプロキシの URL (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`)。

3. <mrk mid="33" mtype="seg"/><mrk mid="34" mtype="seg"/>
4. **Select your tags**: タグはブラウザテストに紐付いています。`<KEY>:<VALUE>` フォーマットを使用して `<VALUE>` に Synthetic テストページ上の任意の `<KEY>` でフィルターを適用します。
5. **Browsers & Devices**: テストを実行するブラウザ (`Chrome`、`Firefox`) とデバイス (`Laptop Large`、`Tablet`、`Mobile Small`)。
6. **Locations**: Datadog 管理下のロケーションからテストを実行します。世界中どこからでも使用できる AWS ロケーションが各サイトに多数用意されています。Datadog for Government site には、West US (AWS GovCloud) ロケーションがサポートされています。また、[プライベートロケーション][2]をセットアップして、カスタムロケーションまたはプライベートネットワーク内からブラウザテストを実行することもできます。
7. **How often should Datadog run the test?**: 5 分間隔から週に一度までの間でインターバルを設定します。1 分の頻度は[リクエストに応じて][3]利用できます。

### グローバル変数を使用する

[**Settings** で定義したグローバル変数][4]は、**Starting URL** のほか、ブラウザテストの **Advanced Options** でも使用できます。変数の一覧を表示するには、フィールドに `{{` と入力します。

{{< img src="synthetics/browser_tests/using_variables_browser.mp4" alt="ブラウザテストで変数を使用する" video="true"  width="80%" >}}

### アラート条件を定義する

アラートの条件をカスタマイズして、通知アラートの送信をテストする状況を定義できます。

* `N` のうち `n` の数の場所で、`X` の時間（分）継続してアサーションが失敗した場合は、アラートがトリガーされます。このアラートルールにより、通知をトリガーする前にテストが失敗する必要がある時間と場所の数を指定できます。
* 場所が失敗としてマークされる前に、`X` 回再試行します。これにより、場所が失敗と見なされるために、連続していくつのテスト失敗が発生する必要があるかを定義できます。デフォルトでは、失敗したテストを再試行する前に 300 ミリ秒待機します。この間隔は、[API][5] を介して構成できます。

{{< img src="synthetics/browser_tests/alerting_rules.png" alt="ブラウザテストのアラートルール"  >}}

### チームへの通知

通知はアラート設定の条件に従って送信されます。通知を構成するには以下の手順に従ってください。

1. ブラウザテストの**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][6]のほか、以下の[条件付き変数][7]を使用できます。

    | 条件付き変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | モニターがアラートする場合に表示                                            |
    | `{{^is_alert}}`            | モニターがアラートしない場合に表示                                          |
    | `{{#is_recovery}}`         | モニターがいずれかの ALERT から回復する場合に表示   |
    | `{{^is_recovery}}`         | モニターがいずれかの ALERT から回復しない場合に表示 |

    通知メッセージには、このセクションで定義された**メッセージ**や、失敗した場所に関する情報が記載されます。

2. 通知先の[サービス][8]あるいはチームメンバーを選択します。
3. 再通知の頻度を指定します。テストの失敗を再通知しない場合は、`Never renotify if the monitor has not been resolved` オプションを使用してください。
4. **Save Details and Record Test** をクリックします。

## ステップを記録する

テストの記録を実行できるのは **[Google Chrome][9]** だけです。テストを記録するには、[Google Chrome 用の Datadog test recorder][10]をダウンロードする必要があります。

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="ブラウザでのテストの記録"  >}}

1. 必要に応じて、ページの右上にある **Open in a pop-up** を選択して、別のポップアップウィンドウでテスト記録を開きます。これは、アプリケーションが iframe で開くことをサポートしていない場合、または記録時のサイズの問題を回避したい場合に役立ちます。**シークレットモード**でポップを開いて、ログイン済みのセッションや既存のブラウザからの Cookie などを使用せずに、新しいブラウザからテストの記録を開始することもできます。
2. **Start recording** をクリックして、ブラウザテストの記録を開始します。
3. 監視したいユーザージャーニーを通過するアプリケーションをクリックすると、アクションが自動的に記録され、左側のブラウザテストシナリオ内で[ステップ][11]を作成するために使用されます。
4. 自動的に記録されたステップに加えて、左上隅にある[ステップ][11]を使用して、シナリオを強化することもできます。
    {{< img src="synthetics/browser_tests/manual_steps.png" alt="ブラウザテストのステップ"  style="width:80%;">}}

    **注**: ブラウザテストによって実行されたジャーニーが期待される状態になったことを確認するために、常に**ブラウザテストは、[アサーション][12]で終了する**必要があります。
5. シナリオが終了したら、**Save and Launch Test** をクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/identify_synthetics_bots/
[2]: /ja/synthetics/private_locations/
[3]: /ja/help/
[4]: /ja/synthetics/settings/#global-variables
[5]: /ja/api/v1/synthetics/#create-or-clone-a-test
[6]: http://daringfireball.net/projects/markdown/syntax
[7]: /ja/monitors/notifications/?tab=is_alert#integrations
[8]: /ja/integrations/#cat-notification
[9]: https://www.google.com/chrome
[10]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[11]: /ja/synthetics/browser_tests/actions/
[12]: /ja/synthetics/browser_tests/actions/#assertion