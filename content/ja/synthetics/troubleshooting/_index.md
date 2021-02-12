---
title: Synthetic モニタリングのトラブルシューティング
kind: documentation
description: Synthetic モニタリングでよくある問題のトラブルシューティング。
further_reading:
  - link: /synthetics/
    tag: ドキュメント
    text: Synthetic テストの管理
  - link: /synthetics/browser_tests/
    tag: ドキュメント
    text: ブラウザテストの設定
  - link: /synthetics/api_tests/
    tag: ドキュメント
    text: APIテストの設定
---
Datadog Synthetic モニタリングのセットアップや構成で問題が発生した場合は、こちらの情報を参考にしてトラブルシューティングをお試しください。問題が解決されない場合は、[サポートチームまでお問い合わせ][1]ください。

## ブラウザテスト

### iframe でウェブサイトがロードされず、ウェブサイトをポップアップで開いてもステップを記録できない

[Datadog 拡張機能][2]をダウンロードすると、ブラウザテストのレコーダーの右側にある iframe でウェブサイトを確認できなくなります。さらに、ウェブサイトを iframe およびポップアップで開いても、ステップを記録できなくなります。

{{< img src="synthetics/recording_iframe.mp4" alt="ブラウザテストのステップの記録に関する問題" video="true"  width="100%" >}}

このような場合は、`On specific sites` セクションでウェブサイトを指定するか、`On all sites` にトグルボタンを変更して、意図したウェブサイトのデータの読み取りおよび変更の許可を [Datadog 拡張機能][3]に付与してください。

{{< img src="synthetics/extension.mp4" alt="拡張機能にすべてのサイトのデータ読み取りを許可" video="true"  width="100%" >}}


### レコーダーにログインページが表示されません。なぜですか？

デフォルトでは、レコーダーの iframe/ポップアップは独自のブラウザを使用します。これは、すでにアプリケーションにログインしている場合、iframe/ポップアップがログイン後のページを直接表示する可能性があるため、最初にログアウトせずにログイン手順を記録できないということです。

アプリケーションからログアウトせずに手順を記録できるようにするには、レコーダーの**シークレットモード**を利用します。

{{< img src="synthetics/incognito_mode.mp4" alt="シークレットモードのブラウザテストの使用" video="true"  width="100%" >}}

**シークレットモードでポップアップを開く**と、独自のブラウザのメインセッションとユーザーデータから完全に分離されたセッションで、テストコンフィギュレーションに設定された開始 URL からテストの記録を開始できます。

新しく開いたシークレットポップアップは、以前のブラウザ履歴 (Cookie やローカルデータなど) をすべて無視します。その結果、アカウントから自動的にログアウトされ、初めてウェブサイトにアクセスした場合と同じようにログイン手順の記録を開始できます。

### ブラウザテストに `None or multiple elements detected` のステップ警告が表示される

ブラウザテストのステップに `None or multiple elements detected` のステップ警告が表示されています。

{{< img src="synthetics/step_warning.png" alt="ユーザーのロケーターのステップ警告" style="width:100%;" >}}

これは、このステップに定義されたユーザーロケーターが複数要素を対象としているか、何も対象としていないことを意味するもので、ブラウザテストでテストされるべき要素が不明になってしまっています。   
修正するには、記録を編集し、問題のあるステップの高度な設定を開いてステップでテストしているページへ移動し、`Test` をクリックします。これにより、配置された要素をハイライトまたはエラーメッセージを印刷できます。次に、ユーザーロケーターをページの単一要素と一致するよう修正します。

{{< img src="synthetics/fix_user_locator.mp4" alt="ユーザーロケーターのエラーを修正" video="true"  width="100%" >}}

## API およびブラウザのテスト

### 不正なエラー

Synthetics テストの 1 つが 401 をスローしている場合は、エンドポイントで認証できないことを意味している可能性が高いです。そのエンドポイント (Datadog 外) での認証に使用するメソッドを使用し、Synthetic テストを構成するときにそれを複製する必要があります。

* エンドポイントは**ヘッダーベース認証**を使用していますか？
  * **基本認証**: [HTTP][4] または[ブラウザテスト][5]の**高度なオプション**で関連する認証情報を指定します。
  * **トークンベース認証**: 最初の [HTTP テスト][4]でトークンを抽出し、その最初のテストの応答をパースして[グローバル変数][6]を作成し、その変数を認証トークンを必要とする 2 回目の [HTTP][4] または[ブラウザテスト][8]に再挿入します。
  * **セッションベース認証**: [HTTP][4] または[ブラウザテスト][5]の**高度なオプション**に必要なヘッダーまたはクッキーを追加します。

* このエンドポイントは**認証用のクエリパラメーター**を使用していますか (たとえば、URL パラメーターに特定の API キーを追加する必要がありますか)？

* このエンドポイントは **IP ベース認証**を使用していますか？その場合は、[Synthetics テストの元となる IP][9] の一部またはすべてを許可する必要があります。

### Forbidden エラー

Synthetic テストによって返された `403 Forbidden` エラーが確認された場合は、`Sec-Datadog` ヘッダーを含むリクエストを Web サーバーがブロックまたはフィルタリングした結果である可能性があります。このヘッダーは、Datadog が開始する各 Synthetic リクエストに追加され、トラフィックのソースを識別し、Datadog サポートが特定のテスト実行を識別するのを支援します。

さらに、[Datadog Synthetics のモニタリング IP 範囲][9]がファイアウォールによってトラフィックソースとして許可されていることを確認する必要がある場合もあります。

### 通知の欠落

デフォルト設定では、Synthetic テストは [再通知][10]しません。これは、トランジション（たとえば、テストがアラート状態になる、または直近のアラートから回復するなど）が生成された後に通知ハンドル（メールアドレスや Slack ハンドルなど）を追加しても、そのトランジションの通知は送信されないことを意味します。次のトランジションから通知が送信されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[3]: chrome://extensions/?id=kkbncfpddhdmkfmalecgnphegacgejoa
[4]: /ja/synthetics/api_tests/?tab=httptest#make-a-request
[5]: /ja/synthetics/browser_tests/#test-details
[6]: /ja/synthetics/settings/?tab=createfromhttptest#global-variables
[7]: /ja/synthetics/api_tests/?tab=httptest#use-global-variables
[8]: /ja/synthetics/browser_tests/#use-global-variables
[9]: https://ip-ranges.datadoghq.com/synthetics.json
[10]: /ja/synthetics/api_tests/?tab=httptest#notify-your-team