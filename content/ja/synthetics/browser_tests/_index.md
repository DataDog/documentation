---
title: ブラウザテスト
kind: ドキュメント
description: 特定の場所からユーザー操作をシミュレートして監視します。
aliases:
  - /ja/synthetics/browser_check
  - /ja/synthetics/browser_test
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: 'https://www.datadoghq.com/blog/browser-tests/'
    tag: ブログ
    text: ブラウザテストによるユーザーエクスペリエンスの監視
  - link: /synthetics/
    tag: ドキュメント
    text: チェックの管理
  - link: /synthetics/api_tests/
    tag: ドキュメント
    text: APIテストの設定
  - link: /synthetics/browser_tests/test_results/
    tag: ドキュメント
    text: ブラウザテストの結果
---
## 概要

ブラウザテストは、Datadog が Web アプリケーション上で実行するシナリオです。世界中の複数の場所からさまざまなデバイスを使用して実行され、テスト間隔は自由に設定できます。これらのテストは、アプリケーションが稼働してリクエストに応答していること、シナリオで定義された条件が満たされていることを確認します。

## コンフィギュレーション

### テストの詳細

ブラウザテストの構成を定義します。

1. <mrk mid="23" mtype="seg"/><mrk mid="24" mtype="seg"/>
    * Advanced Options（オプション）: カスタムリクエストヘッダー、Cookie、Basic 認証などを設定します。
        * <mrk mid="38" mtype="seg"/><mrk mid="39" mtype="seg"/><mrk mid="40" mtype="seg"/>
        * Authentication: HTTP Basic 認証を使用し、ユーザー名とパスワードで認証を行います。
        * クッキー: 定義したクッキーをデフォルトのブラウザクッキーに追加します。複数のクッキーを設定するには、次の書式を使用します `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`。

2. <mrk mid="33" mtype="seg"/><mrk mid="34" mtype="seg"/>
3. **Select your tags**: タグはブラウザテストに紐付いています。`<KEY>:<VALUE>` フォーマットを使用して `<VALUE>` に Synthetic テストページ上の任意の `<KEY>` でフィルターを適用します。
4. **Devices**: テストを実行するデバイス。利用可能なデバイスは `Laptop Large`、`Tablet`、`Mobile Small` です。
5. **Locations**: Datadog 管理下のロケーションからテストを実行します。世界中どこからでも使用できる AWS ロケーションが多数用意されています。また、[プライベートロケーション][2]をセットアップして、公共インターネットからアクセスできない非公開の URL で Synthetic ブラウザテストを実行することもできます。
6. **How often should Datadog run the test?**: 5 分間隔から週に一度までの間でインターバルを設定します。

### グローバル変数を使用する

[**設定**で定義したグローバル変数][3]は、URL のほか、ブラウザテストの Advanced Options でも使用できます。変数の一覧を表示するには、フィールドに `{{` と入力します。

{{< img src="synthetics/browser_tests/using_variables_browser.mp4" alt="ブラウザテストで変数を使用する" video="true"  width="80%" >}}

### アラート条件を定義する

アラートの条件をカスタマイズして、通知アラートの送信をテストする状況を定義できます。

* `<選択した数>` のうち `<数を挿入>` の数の場所で、`<数を挿入>` の時間（分）継続してアサーションが失敗した場合は、アラートがトリガーされます。このアラートルールにより、通知をトリガーする前にテストが失敗する必要がある時間と場所の数を指定できます。
* 場所が失敗としてマークされる前に、 `<数を挿入>` 回再試行します。これにより、場所が失敗と見なされるために、連続していくつのテスト失敗が発生する必要があるかを定義できます。デフォルトでは、失敗したテストを再試行する前に 300 ミリ秒待機します。この間隔は、[API][4] を介して構成できます。

{{< img src="synthetics/browser_tests/alerting_rules.png" alt="ブラウザテストのアラートルール"  >}}

### チームへの通知

通知はアラート設定の条件に従って送信されます。通知を構成するには以下の手順に従ってください。

1. ブラウザテストの**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][5]のほか、以下の[条件付き変数][6]を使用できます。

    | 条件付き変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | モニターがアラートする場合に表示                                            |
    | `{{^is_alert}}`            | モニターがアラートしない場合に表示                                          |
    | `{{#is_recovery}}`         | モニターがいずれかの ALERT から回復する場合に表示   |
    | `{{^is_recovery}}`         | モニターがいずれかの ALERT から回復しない場合に表示 |

    通知メッセージには、このセクションで定義された**メッセージ**や、失敗した場所に関する情報が記載されます。

2. 通知先の[サービス][7]あるいはチームメンバーを選択します。
3. 再通知の頻度を指定します。テストの失敗を再通知しない場合は、`Never renotify if the monitor has not been resolved` オプションを使用してください。
4. **Save Details and Record Test** をクリックします。
5. テストを記録します。

## テストの記録

テストの記録を実行できるのは **[Google Chrome][8]** だけです。テストを記録するには、[Google Chrome 用の Datadog test recorder][9]をダウンロードする必要があります。

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="ブラウザでのテストの記録"  >}}

1. オプションで、ページの右上にある **Open in a pop-up** を選択します。これにより、テストの記録が別のポップアップウィンドウに開かれるため、Datadog のインターフェイス内にウィンドウを表示する場合のサイズの問題がなくなります。
**Shift** キーを押して **Open in a pop-up** をクリックすると、ポップアップウィンドウがシークレットモードで開きます。これを使用すると、既存のブラウザでログインしたセッションや Cookie を持たないフレッシュな状態のブラウザで記録を開始できます。
2. **Start recording** をクリックして、ブラウザテストの記録を開始します。
3. アクションが記録され、ブラウザテストのシナリオで[ステップ][10]を作成するために使用されます。
4. 左上にある[ステップ][10]を使用して、シナリオを強化します。
    {{< img src="synthetics/browser_tests/browser_test_step.png" alt="ブラウザのテスト手順"  style="width:80%;">}}

   **注**: ブラウザテストによって実行されたジャーニーが期待される状態になったことを確認するために、**最後のブラウザテストステップは、[アサーション][11]である必要があります**。
5. シナリオが終了したら、**Save and Launch Test** をクリックします。

## ステップ

ブラウザテストを保存した後、[ステップ][10]を記録して、編集または作成することができます。

ステップは、ブラウザテスト用に記録できる一連のアクションで、これは編集または作成できます。 Datadog テストレコーダー拡張機能を使用して直接記録するか、目的のステップを手動で追加することにより、ブラウザテストで実行するステップを定義できます。[高度なオプション][12]を使用して特定のステップを構成することもできます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/identify_synthetics_bots/
[2]: /ja/synthetics/private_locations/
[3]: /ja/synthetics/settings/#global-variables
[4]: /ja/api/v1/synthetics/#create-or-clone-a-test
[5]: http://daringfireball.net/projects/markdown/syntax
[6]: /ja/monitors/notifications/?tab=is_alert#integrations
[7]: /ja/integrations/#cat-notification
[8]: https://www.google.com/chrome
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /ja/synthetics/browser_tests/actions/
[11]: /ja/synthetics/browser_tests/actions/#assertion
[12]: /ja/synthetics/browser_tests/advanced_options/