---
aliases:
- /ja/mobile_testing/mobile_app_tests/steps
- /ja/mobile_app_testing/mobile_app_tests/steps
description: モバイルテストの記録の自動記録と手動でのステップ設定方法について説明します。
further_reading:
- link: /synthetics/mobile_app_testing/
  tag: ドキュメント
  text: Synthetic モバイルテストについて
- link: /synthetics/mobile_app_testing/mobile_app_tests/advanced_options
  tag: ドキュメント
  text: モバイルテストの高度なオプションについて
title: Mobile App Testing のステップ
---

## 概要

ステップは、テストで実行したいインタラクションやアサーションを 1 つずつ記録したものです。ステップを定義するには、**Start Recording** をクリックして通常どおりデバイスを操作するか、**Assertion** または **Interaction** をクリックして手動でステップを作成します。

## デバイスの起動

ステップの記録と追加を開始するには、ドロップダウンメニューからモバイルアプリのテストを開始するデバイスを選択し、**Launch Device** をクリックします。

{{< img src="mobile_app_testing/launch_device.png" alt="モバイルテストを実行するデバイスを選択する" style="width:60%" >}}

**Show only available devices. Available devices load faster** (利用可能なデバイスのみを表示します。利用可能なデバイスの読み込みが速くなります) を選択すると、最も利用可能なデバイスが表示され、テストの待ち時間が短縮されます。

### 通知

**Launch a device to start recording** モーダルで緑色の **Device Connection Notification** ボタンをクリックすると、デバイスの準備ができたときと、デバイスが非アクティブでタイムアウトになるときの通知を有効にすることができます。

## 自動記録されたステップ

**Start Recording** をクリックすると、Datadog がデバイス上の操作を自動的に記録し、左側のステップ一覧に表示します。

記録を停止するには、**Stop Recording** をクリックします。

## 手動で追加したステップ

デバイスを直接操作してステップを自動作成する方法に加えて、[要素インスペクター](#element-inspector)、[アサーション](#assertion)、[インタラクション](#interaction) を使って手動でステップを作成することもできます。また、記録済みのステップをクリックして内容を更新したり、ステップ一覧で上下にドラッグして [ステップを並べ替える](#manage-step-order) こともできます。

### Element Inspector

Element Inspector を使うと、要素階層を可視化したり、属性をコピーしたり、XML を使って対象要素を指定しながらインタラクション ステップを生成したりできます。

この機能は、テスト レコーダーを開いてデバイスを起動し、Element Inspector ボタンをクリックすると利用できます。Element Inspector では、次のことができます。

- **要素ツリーを可視化**: アプリケーション内の要素階層を全体として表示し、構造を整理して把握できます。
- **属性をコピー**: 要素名や XPATH 値などの属性を、インスペクターから直接コピーできます。
- **要素をターゲット化**: 要素ツリー内で対象要素を選択して、_tap_ や _scroll_ などのステップを生成できます。

{{< img src="mobile_app_testing/element_inspector_3.mp4" alt="Mobile App Tests の Element Inspector を示す動画" style="width:60%; height:300px;" video="true" >}}

### アサーション

アサーションによって、テストフローの特定のセクションで表示される (または表示されない) コンテンツを検証できます。


{{< img src="mobile_app_testing/assertions.png" alt="モバイルテストにおけるアサーションのオプション" style="width:60%;" >}}


ステップを作成するには、アサーションタイプを選択します。

{{< tabs >}}
{{% tab "アクティブ画面で要素をテストする" %}}

#### 要素のコンテンツをテストする

このアサーションステップを作成すると、モバイルアプリテストでページ要素を選択し、特定の値が含まれているかどうかを確認することができます。

{{% /tab %}}
{{% tab "アクティブ画面コンテンツのテスト" %}}

#### テキストがアクティブ画面に存在することをテストする

このアサーションステップを作成すると、`Value` フィールドに指定したテキストが、記録中の現在のページに存在することをモバイルアプリテストで確認することができます。

#### テキストがアクティブ画面に存在しないことをテストする

このアサーションステップを作成すると、`Value` フィールドに指定したテキストが、記録中の現在のページに**存在しない**ことをモバイルアプリテストで確認することができます。

{{% /tab %}}
{{< /tabs >}}

### インタラクション

デバイスを操作してステップを自動記録するだけでなく、**Interaction** をクリックして手動でステップを作成することもできます。

{{< img src="mobile_app_testing/test_steps/mobile_app_interaction_2.png" alt="インタラクションステップを追加するためのアクションタイプを選択" style="width:60%;" >}}

#### ダブルタップ

モバイルアプリケーションのダブルタップで要素を操作すると、ステップが記録されます。

{{< img src="mobile_app_testing/test_steps/double_tap_2.mp4" alt="モバイル テストでダブル タップのステップを記録している様子" style="width:60%" video=true >}}

#### デバイスの回転

ステップに名前を付け、**Portrait** または **Landscape** モードを選択します。

{{< img src="mobile_app_testing/rotate_device.png" alt="モバイルテストでのデバイス回転ステップの記録" style="width:60%" >}}

#### スクロール

モバイルアプリテストでは、操作が必要な要素まで自動的にスクロールします。ほとんどの場合、手動でスクロールステップを追加する必要はありません。スクロールステップを使用するのは、無限スクロールのような追加の操作を発生させる必要がある場合です。

モバイルアプリテストで縦横にスクロールさせたいピクセル数を指定します。

{{< img src="mobile_app_testing/scroll_step.png" alt="モバイルテスト記録のスクロールステップ" style="width:60%;" >}}

デフォルトでは、**Scroll** ステップは、ページ全体をスクロールします。特定の要素 (例えば、特定の `<div>`) でスクロールする必要がある場合、**Starting Element** をクリックして、モバイルアプリテストでスクロールさせたい要素を選択します。

#### Scroll to element

このアクションでは、指定した要素まで横方向または縦方向にスクロールできます。

{{< img src="mobile_app_testing/test_steps/scroll_to_element_3.mp4" alt="モバイル テストで Scroll to element を記録している様子" style="width:60%" video=true >}}

#### タップ

モバイルアプリケーションのタップで要素を操作すると、ステップが記録されます。

{{< img src="mobile_app_testing/test_steps/tap_2.mp4" alt="モバイル テストで tap のステップを記録している様子" video=true >}}

#### テキストを入力する

モバイルアプリケーションのテキスト入力フィールドを操作して、名前を追加し、値を設定すると、ステップが記録されます。

{{< img src="mobile_app_testing/test_steps/type_text_2.mp4" alt="モバイル テストで Type Text のステップを記録している様子" video=true >}}

手動で追加したステップで利用可能なすべての変数を表示するには、入力フィールドに `{{` と入力します。

{{< img src="mobile_app_testing/injecting_variable.png" alt="モバイルテストにおける変数を使用するためのテキスト入力ステップ" style="width:25%" >}}

自動記録されたステップで変数を使用するには、ステップ名を追加して変数値を指定し、記録中に変数値を入力します。

#### 戻るを押す

モバイル アプリケーションの下にある **Back** ボタンを操作すると、ステップが記録されます。Android のみで利用できます。

{{< img src="mobile_app_testing/test_steps/press_back_2.mp4" alt="モバイル テストで Press Back のステップを記録している様子" video=true >}}

#### Extract variable from element

このアクションでは、要素の値を抽出して変数として保存できます。

{{< img src="/mobile_app_testing/test_steps/extract_variable_from_element_2.mp4" alt="モバイル テストで要素から変数を抽出する手順を記録している様子" style="width:60%" video=true >}}

#### ディープリンクを開く

ステップに名前を追加し、ディープリンク URI を入力します。

{{< img src="mobile_app_testing/open_deep_link.png" alt="モバイルテストでのディープリンクを開くステップの記録" style="width:60%" >}}

#### Restart application

このアクションを使うと、アプリケーションを再起動できます。
アプリケーションの再インストールは行わず、いったん終了してから再度起動します。

{{< img src="mobile_app_testing/test_steps/restart_application_2.mp4" alt="アプリケーションの再起動手順を記録している様子" style="width:60%" video=true >}}

#### 待機

ページやページ要素の読み込みに 60 秒以上かかることがわかっている場合、最大値 300 秒の待機ステップを追加することができます。

{{< img src="mobile_app_testing/wait_step.png" alt="モバイルテストでの待機ステップの記録" style="width:60%;" >}}

デフォルトでは、モバイルアプリテストは、ステップまたは次のステップを実行する前に、ページが完全に読み込まれるのを 60 秒のタイムアウトで待ちます。この追加時間は、モバイルアプリのテスト記録の**すべての実行**に体系的に追加されます。

#### Toggle Wi-Fi

このアクションでは、テスト中に Wi-Fi を有効化または無効化し、インターネット接続の有無によるアプリケーションの動作を確認できます。

{{< img src="mobile_app_testing/test_steps/toggle_wifi.png" alt="Toggle Wi-Fi のインタラクション ステップ" style="width:60%" >}}

#### HTTP リクエスト

モバイル アプリ テストでは、HTTP リクエストの実行、[アサーションの追加](#add-assertions)、[レスポンスからの変数抽出](#extract-a-variable-from-the-response) を行えます。[制限付きネットワーク][8] を使用している場合は、必要な IP アドレス範囲を許可リスト (allowlist) に追加し、Synthetic Monitoring の Mobile テストで HTTP ステップが実行できるようにしてください。

**注**: Synthetic Monitoring の Mobile テストから HTTP ステップをコピーして、Synthetic Monitoring の Browser テストで再利用できます。ただし、Browser テストから Mobile テストへのステップ コピーはサポートされていません。

{{< img src="mobile_app_testing/test_steps/http_interaction.png" alt="モバイル アプリ テストのインタラクション (HTTP テストの実行)" style="width:70%;" >}}

HTTP リクエストを定義するには、

1. テストしたい URL を入力します。
2. オプションで、**Advanced Options** を指定します。

   {{< tabs >}}

   {{% tab "リクエストオプション" %}}

   * **Follow redirects**: このオプションを選択すると、HTTP テストが最大 10 回のリダイレクトを追従します。
   * **Ignore server certificate error**: SSL 証明書の検証でエラーが発生しても、HTTP テストを継続する場合にこのオプションを選択します。
   * **Request headers**: HTTP リクエストに追加するヘッダーを定義します。デフォルトのヘッダー (たとえば、`user-agent` ヘッダー) をオーバーライドすることもできます。
   * **Cookies**: HTTP リクエストに追加するクッキーを定義します。`<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>` の形式を使用して複数のクッキーを設定します。

   {{% /tab %}}

   {{% tab "認証" %}}

   * **Client certificate**: クライアント証明書と関連する秘密キーをアップロードして、mTLS を介して認証します。
   * **HTTP Basic Auth**: HTTP 基本認証資格情報を追加します。
   * **Digest Auth**: ダイジェスト認証の資格情報を追加します。
   * **AWS Signature**: AWS Access Key ID と Secret Access Key を追加します。
   * **NTLM**: NTLM 認証の資格情報を追加します。NTLMv2 と NTLMv1 の両方をサポートします。
   * **OAuth 2.0**: Grant Type (Client credentials または Resource owner password) を選択します。

   {{% /tab %}}

   {{% tab "クエリパラメーター" %}}

   * **Encode parameters**: エンコーディングが必要なクエリパラメーターの名前と値を追加します。

   {{% /tab %}}

   {{% tab "リクエスト本文" %}}

   * **Body type**: HTTP リクエストに追加するリクエスト本文のタイプ (`text/plain`、`application/json`、`text/xml`、`text/html`、`application/x-www-form-urlencoded`、`GraphQL`、または `None`) を選択します。
   * **Request body**: HTTP リクエストの本文を追加します。リクエスト本文のサイズ上限は最大 50 KB です。

   {{% /tab %}}

   {{% tab "プロキシ" %}}

   * **Proxy URL**: HTTP リクエストが通過する必要があるプロキシの URL (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`) を指定します。
   * **Proxy Header**: プロキシへの HTTP リクエストに含めるヘッダーを追加します。

   {{% /tab %}}

   {{% tab "Privacy" %}}

   * **Do not save response body**: レスポンスの本文が実行時に保存されないようにするには、このオプションを選択します。これは、テスト結果に機密データが表示されないようにするために役立ちますが、障害のトラブルシューティングが困難になる可能性があります。セキュリティに関する完全な推奨事項については、[Synthetic モニタリングデータセキュリティ][1]を参照してください。

[1]: /ja/data_security/synthetics
   {{% /tab %}}

   {{< /tabs >}}
   </br>
3. **Send** をクリックしてリクエストを送信すると、レスポンスのプレビューが表示されます。

{{< img src="mobile_app_testing/test_steps/http_mobile_request.png" alt="HTTP リクエストを実行" style="width:80%;" >}}

##### アサーションの追加

アサーションは、期待されるテスト結果を定義するものです。**Send** をクリックすると、テストのレスポンスに基づいて `status code`、`response time`、および `header` の `content-type` に関する基本的なアサーションが追加されます。モバイル アプリ テストの HTTP ステップでは、アサーションは任意です。

| タイプ            | 演算子                                                                                                               | 値の型                                               |
|-----------------|------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| `body`          | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`、<br> [`jsonpath`][11]、[`xpath`][12] | _String_ <br> _[Regex][13]_ <br> _String_, _[Regex][13]_ |
| `header`        | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`                                       | _文字列_ <br> _[正規表現][13]_                              |
| `response time` | `is less than`                                                                                                         | 整数 (ms)                                           |
| `status code`   | `is`、`is not`                                                                                                         | 整数                                                |

HTTP リクエストでは、`br`、`deflate`、`gzip`、`identity` の `content-encoding` ヘッダーを使用して本文を解凍することが可能です。

- テストがレスポンス本文にアサーションを含まない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連するレスポンスタイムを返します。

- テストがレスポンス本文に対するアサーションを含み、タイムアウトの制限に達した場合、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

{{< img src="synthetics/browser_tests/assertions.png" alt="ブラウザテストが成功または失敗するためのアサーションを定義する" style="width:80%;" >}}

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、ステップごとに最大 20 個のアサーションを作成できます。

##### 応答から変数を抽出する

オプションで、応答ヘッダーまたは本文をパースすることにより、HTTP リクエストの応答から変数を抽出します。変数の値は、HTTP リクエストステップが実行されるたびに更新されます。一度作成すると、この変数はブラウザテストの[次のステップ](#use-variables)で使用することができます。

変数のパースを開始するには、**Extract a variable from response content** をクリックします。

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。また、3 文字以上にする必要があります。
2. 変数をレスポンスのヘッダーから抽出するか、本文から抽出するか決定します。

   * レスポンスヘッダーから値を抽出する場合は、HTTP リクエストのレスポンスヘッダー全体を変数として使用するか、[`regex`][13] で解析します。
   * レスポンスボディから値を抽出する場合は、HTTP リクエストの完全なレスポンスボディをそのまま変数の値として利用するか、[`regex`][13]、[`JSONPath`][11]、[`XPath`][12] で解析します。

{{< img src="synthetics/browser_tests/extracted_variable.png" alt="応答から抽出された変数" style="width:80%;" >}}

</br>

テストステップの追加構成の詳細については、[モバイルアプリのテストステップの詳細オプション][4]を参照してください。

### サブテスト

既存のワークフローを再利用するために、他のモバイルアプリテストの中でモバイルアプリテストを実行し、最大 2 レベルまで入れ子にすることができます。

既存のモバイルアプリテストをサブテストとして使用するには、**Subtest** をクリックし、ドロップダウンメニューからモバイルアプリテストを選択し、**Add Subtest** をクリックします。

{{< img src="mobile_app_testing/example_subtest.png" alt="サブテストとして追加するモバイルテストを選択" style="width:60%" >}}

サブテストにある変数を親テストでオーバーライドするには、親テストレベルで作成された変数が、サブテストに存在する変数と同じ名前であることを確認してください。変数は、常に最初に代入された値を使用します。

サブテストの高度なオプションの詳細については、[モバイルアプリテストステップの高度なオプション][5]を参照してください。

サブテストを独立して実行することに意味がない場合は、一時停止することができます。このテストは親テストの一部として引き続き呼び出され、個別には実行されません。詳しくは、[ブラウザのテストジャーニーをテストスイート全体で再利用する][6]を参照ください。

#### ステップ プレビュー

モバイル テストにサブテストを追加するときは、**steps** ドロップダウンをクリックすると、サブテスト内の各ステップのプレビューを確認できます。

{{< img src="mobile_app_testing/test_steps/subtest_mobile_preview_steps.png" alt="サブテストを追加し、既存のサブテストを選択するか steps から抽出する" style="width:60%" >}}

サブテストをモバイル テストに追加した後は、サブテストをクリックすると、サブテスト内の各ステップのプレビューをもう一度表示できます。

{{< img src="mobile_app_testing/test_steps/subtest_preview_steps_click.png" alt="サブテストを選択するとステップのプレビューが表示される" style="width:60%" >}}

## 変数

{{% synthetics-variables %}}

**注**: サブテストを別のテストにインポートすると、サブテスト内で定義された変数はメイン テストに引き継がれます。
これらの変数を上書きするには、親テスト側で、サブテスト内の変数と同じ名前の変数を作成してください。

### グローバル変数を使用する

モバイル アプリ テストの詳細画面では、**Advanced Options** で [**Settings** で定義したグローバル変数][4] を使用できるほか、記録中にローカル変数を定義することもできます。利用可能な変数の一覧を確認するには、該当フィールドに `{{` と入力します。

記録を開始する前に、ユーザー ジャーニーで使用する変数をあらかじめ定義しておいてください。

記録中に、利用可能な変数をテスト ステップへ直接挿入できます。

## ステップ順序の管理

個々のステップをドラッグアンドドロップして新しいステップを手動で並べ替える代わりに、記録の特定の段階でテストステップにカーソルをセットし、追加のステップを挿入することができます。

1. 記録済みの 2 つのテスト ステップの間にカーソルを合わせ、**Add Steps here** をクリックします。テスト ステップの上に青い線が表示されます。
2. [テストステップ](#automatically-recorded-steps)を追加記録するか、[ステップを手動で](#manually-added-steps)追加します。
3. テスト ステップの上に追加ステップを挿入し終えたら、**Clear** をクリックして終了します。

{{< img src="mobile_app_testing/test_steps/manage_step_order_2.mp4" alt="テスト ステップにカーソルを合わせ、当該ステップの前に追加ステップを挿入する" video=true >}}

## 記録を編集する

保存したモバイル レコーディングを編集する手順は次のとおりです。

- [Synthetic Monitoring > Tests.][7] に移動します。
- 保存済みのモバイル テストをクリックします。
- 左側パネルのビデオ アイコンをクリックし、続けて "edit recording" をクリックします。
- 削除または再生する複数のステップまたは単一のステップを選択し、**Save &amp; Quit** をクリックします。

{{< img src="mobile_app_testing/test_steps/edit_recording_2.png" alt="モバイル レコーディングを編集し、複数選択機能を使用している様子" width="70%" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/mobile_app_testing/mobile_app_tests/#variables
[2]: /ja/synthetics/settings/#global-variables
[3]: /ja/synthetics/guide/browser-tests-totp/
[4]: /ja/mobile_app_testing/mobile_app_tests/advanced_options
[5]: /ja/mobile_app_testing/mobile_app_tests/advanced_options#subtests
[6]: /ja/synthetics/guide/reusing-browser-test-journeys/
[7]: https://app.datadoghq.com/synthetics/tests
[8]: /ja/synthetics/mobile_app_testing/mobile_app_tests/restricted_networks/
[11]: https://restfulapi.net/json-jsonpath/
[12]: https://www.w3schools.com/xml/xpath_syntax.asp
[13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions