---
title: ブラウザテストのステップ
kind: ドキュメント
description: Synthetic ブラウザテストのステップの記録
further_reading:
  - link: /synthetics/browser_tests/advanced_options/
    tag: ドキュメント
    text: ステップの高度なオプションを構成する方法を学ぶ
---
## 概要

ステップは、ブラウザテスト用に記録できる一連のアクションで、これは編集または作成できます。 Datadog テストレコーダー拡張機能を使用して直接記録するか、目的のステップを手動で追加することにより、ブラウザテストで実行するステップを定義できます。すべてのステップには、構成可能な[高度なオプション][1]のセットが付属しています。

**注**: 各ステップのデフォルトのタイムアウトは約 60 秒です。このデフォルトのタイムアウトは、専用の[高度なオプション][2]を使用してオーバーライドできます。

## 自動記録されたステップ

次のステップは、[Datadog ブラウザテストレコーダー拡張機能][3]で自動的に記録されます。

## クリック

[Datadog ブラウザテストレコーダー拡張機能][3]は、ページのクリックを自動的に記録します。ブラウザテストで実行時に実行するクリックのタイプを指定します。

{{< img src="synthetics/browser_tests/browser_test_click_step.mp4" alt="ブラウザテストのクリックステップ" video="true" width="60%">}}

以下から選択します。

* プライマリクリック（左クリックに対応）
* ダブルクリック
* コンテキストクリック（右クリックに対応）

## テキストを入力する

[Datadog ブラウザテストレコーダー拡張機能][3]は、ウェブサイトの任意のフィールド (フォームやテキストエリアなど) に入力されたテキストを自動的に記録します。

{{< img src="synthetics/browser_tests/input_text.mp4" alt="ブラウザテストテキスト入力ステップ" video="true" width="100%">}}

## オプションを選択する

[Datadog ブラウザテストレコーダー拡張機能][3]は、`select` ドロップダウンメニューから選択されているオプションを自動的に記録します。

{{< img src="synthetics/browser_tests/select_options.png" alt="オプション選択ステップ"  style="width:60%;">}}

## ファイルをアップロードする

ファイルのアップロードをステップとして記録できます。**アップロード**ステップを記録するには、次のことができます。

* ブラウザからデスクトップを開くか、
* または、ファイルを記録する iframe にドラッグアンドドロップします。

{{< img src="synthetics/browser_tests/upload_file_step.png" alt="ファイルのアップロードステップを作成する"  style="width:60%;">}}

ファイル数は 10 個、ファイルあたりのサイズは 5MB に制限されています。

## 手動で追加したステップ

次のステップは、ブラウザテストレコーダーページで構成することにより、ブラウザテストに手動で追加できます。

## アサーション

{{< img src="synthetics/browser_tests/browser_test_assertions.png" alt="ブラウザテストアサーション"  style="width:60%;">}}

アサーションを使用すると、シミュレートされたユーザージャーニーの任意の時点で、ブラウザテストが想定した状態にあることを検証できます。これが、ブラウザテストを**アサーション**で終了して、予期した状態になったことを確認する必要がある理由です。

一部のアサーションは、**アクティブページ**で実行されます。アクティブページとは、たとえば、特定のページ要素で**クリック**や**アサーション**を使用するなど、最後の操作を経験したページを指します。

### 要素のコンテンツをテストする

要素を選択し、特定の値が含まれているかどうかを確認します。たとえば、`div` を選択して、「hello」という単語が含まれているかどうかを確認できます。

### 要素の属性をテストする

ページの要素を選択し、その属性の 1 つが期待されるコンテンツと一致するかどうかを確認します。たとえば、`src` 属性値が期待される画像のパスと一致することをテストできます。

### テキストがアクティブページに存在することをテストする

特定のテキストが現在のページにあることを確認します。

### テキストがアクティブページに存在しないことをテストする

特定のテキストが現在のページに**ない**ことを確認します。

### アクティブページの URL のコンテンツをテストする

操作した最後のページの URL を取得し、特定の値（`string`、`number`、`regex`）がその中に存在するかどうかをアサートします。

### 要素がアクティブページに存在することをテストする

要素 (特定の `span`、`div`、`h`、`a` など) が現在のページにあることを確認します。

### メールが受信されたことをテストする

メールが送信されたこと、および特定の値（`string`、`number`、`regex`）がメールの件名または本文内にあるかどうかをアサートします。このアサーションは、[メール変数][4]を利用します。このため、`Test that an email was received` アサーションを使用できるようにするために、最初にメール変数を作成する必要があります。

### カスタム JavaScript で UI をテストする

独自の JavaScript コードを使用して、アクティブページでカスタムアサーションをテストします。

**注**: JavaScript アサーションは、同期コードと非同期コードの両方をサポートしています。

JavaScript アサーション関数には以下のパラメーターが付属しており、return ステートメントが必要です。

* `return` (必須) ステートメントは、ブラウザテストステップが成功するためにアサーションが満たす必要がある条件を反映する必要があります。任意のタイプを返すことができますが、値はブール値として自動的にキャストされます。

* `vars` (オプション): ブラウザテスト[変数][5]を含む文字列。JavaScript スニペットでブラウザテスト変数を参照するには、`vars.<YOUR_VARIABLE>` を使用します。たとえば、ブラウザテストに `USERNAME` 変数が含まれている場合は、`vars.USERNAME` を使用して JavaScript スニペットでそれを呼び出します。

* `element` (オプション): ページ上の要素のロケーター。これを設定するには、**Select** および **Update** ターゲット要素ボタンを使用します。選択された要素は、Datadog のブラウザテストの複数配置アルゴリズムを自動的に利用します。

{{< img src="synthetics/browser_tests/js_assertion.mp4" alt="ブラウザテスト JavaScript アサーション" video="true" width="100%">}}

JavaScript アサーションはアクティブページのコンテキストで実行されるため、これらのステップはアクティブページで定義されたすべてのオブジェクト (ライブラリ、組み込み、グローバル変数など) にアクセスできます。外部ライブラリをロードするには、promise を使用します。例:

```javascript
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

// スクリプトが読み込まれました

return jQuery().jquery.startsWith('3.5.1')
```

### ダウンロードされたファイルのテスト

前のステップでダウンロードしたファイルに対して検証を実行します。ファイルが正しくダウンロードされたことを確認し、ファイル名、サイズ、MD5 値をアサートできます。

**注**: ダウンロードのテスト方法の詳細については、[この専用ガイド][6]をご覧ください。

## ナビゲーション

{{< img src="synthetics/browser_tests/navigation_step.png" alt="ブラウザテストナビゲーションステップ"  style="width:60%;">}}

### ページを更新する

シナリオの現在のページを更新する。

### メールに移動してリンクをクリックする

このステップでは、[メール変数][4]を作成した後、一意の Synthetic メール受信ボックスにアクセスできます。興味のあるメールを選択し、ブラウザテストでクリックするリンクをクリックします。このステップでは、対応するページにテストが表示され、その特定のページから残りのジャーニーに進むことができます。

### 特定のリンクをたどる

特定のページに移動します。

**注**: **Enter link URL** ボックスで URL の先頭に `http` または `https` を付ける必要があります。

## 特別なアクション

[Datadog ブラウザテストレコーダー拡張機能][3]は、監視したいユーザージャーニーに関連するほとんどのステップを記録できます。ただし、**ホバー**、**キーを押す**、**スクロール**などの一部のステップは自動的に記録されません。レコーダーの左上隅にある **Special Actions** メニューを使用して、明示的にステップを追加する必要があります。

### ホバー

記録中にホバーする各要素でステップを生成しないようにするために、このブラウザテストステップは、実際のホバーメカニズムではなく、クリックによる専用ステップを使用して追加されます。

**Hover** ステップを選択したら、新しいステップとして作成する要素をクリックします。

### キーの押下

**Press Key** ステップを使用して、ユーザーがキーストロークを入力するのをシミュレートできます。以下のキーは、[Datadog ブラウザテストレコーダー拡張機能][3]を使用して記録できます。

* Enter
* 矢印（上、下、右、左）
* Tab（フォーム外）
* Escape
* Backspace

自動的に記録されないキーを押すには、特別なステップ **Press Key** の値ボックスで、どの値を押す必要があるかを指定します。

{{< img src="synthetics/browser_tests/browser_test_press_key.png" alt="ブラウザテストのキーの押下"  style="width:60%;">}}

以下の修飾キーは、入力された値にも適用できます。

* Alt
* Control
* Meta
* Shift

### スクロール

ブラウザテストは、操作する必要のある要素まで自動的にスクロールします。したがって、ほとんどの場合、手動でスクロールステップを追加する必要はありません。スクロールステップは、無限スクロールなど、追加のネットワークリクエストをトリガーする必要がある場合にのみ追加する必要があります。

{{< img src="synthetics/browser_tests/browser_test_scroll_step.png" alt="ブラウザテストのスクロールステップ"  style="width:60%;">}}

ブラウザテストで縦または横にスクロールするピクセル数を指定する必要があります。

デフォルトでは、**Scroll** ステップはページ全体をスクロールします。特定の要素（たとえば、特定の `<div>`）にスクロールする必要がある場合は、**Target Element** オプションを使用して、ブラウザテストでスクロールする要素を選択します。

## 変数

### 変数の作成

{{< img src="synthetics/browser_tests/variables.png" alt="ブラウザテスト変数"  style="width:60%;">}}

変数を作成するには、最初に変数に名前を付け、次に値を定義します。

#### パターン

以下の利用可能な組み込みの 1 つから値を定義して変数を作成します。

| パターン                    | 説明                                                                                                 |
|----------------------------|-------------------------------------------------------------------------------------------------------------|
| `{{ numeric(n) }}`         | `n` 桁の数字列を生成します。                                                                 |
| `{{ alphabetic(n) }}`      | `n` 文字のアルファベット文字列を生成します。                                                            |
| `{{ alphanumeric(n) }}`    | `n` 文字の英数字文字列を生成します。                                                       |
| `{{ date(n, format) }}`    | テストが開始された日付 + `n` 日の値を使用して、許容される形式のいずれかで日付を生成します。        |
| `{{ timestamp(n, unit) }}` | テストが +/- `n` 選択単位で開始されたタイムスタンプの値を使用して、許容される単位のいずれかでタイムスタンプを生成します。 |

#### 要素

`span`、`div` などの要素のテキストを抽出して、その内容から変数を作成できます。

#### JavaScript

変数を割り当てたい値を返すカスタム JavaScript コードを記述します。

**注**: JavaScript ステップは、同期コードと非同期コードの両方をサポートしています。

JavaScript 関数には以下のパラメーターが付属しており、return ステートメントが必要です。

* `return` (必須) ステートメントは JavaScript 変数に関連付けたい値を返す必要があります。任意のタイプを返すことができますが、値は文字列として自動的にキャストされます。

* `vars` (オプション): コード内で活用したい既存のブラウザテスト[変数][5]を含む文字列。JavaScript スニペットでブラウザテスト変数を参照するには、`vars.<YOUR_VARIABLE>` を使用します。たとえば、ブラウザテストですでに `PRICE` 変数を使用している場合は、`vars.PRICE` を使用して JavaScript スニペットでそれを呼び出します。

* `element` (オプション): ページ上の要素のロケーター。これを設定するには、**Select** および **Update** ターゲット要素ボタンを使用します。選択された要素は、Datadog のブラウザテストの複数配置アルゴリズムを自動的に利用します。

{{< img src="synthetics/browser_tests/js_variable.mp4" alt="ブラウザテスト JavaScript 変数" video="true" width="100%">}}

JavaScript アサーションはアクティブページのコンテキストで実行されるため、これらのステップはアクティブページで定義されたすべてのオブジェクト (ライブラリ、組み込み、グローバル変数など) にアクセスできます。外部ライブラリをロードするには、たとえば次のように promise を使用します。

```javascript
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

// スクリプトが読み込まれました

return jQuery().jquery.startsWith('3.5.1')
```

#### グローバル変数

[Synthetic Monitoring Settings][7] で定義されたグローバル変数を選択します。

#### メール

テストステップで使用できるランダムな Synthetic メールアドレスを生成して、[メールが正しく送信されたかどうかをアサート][8]したり、[メールに含まれるリンクに移動][9] (たとえば、確認用のリンクをクリック) したりします。テスト実行間の競合を回避するために、テスト実行ごとに一意のメールボックスが生成されます。

### 変数の使用

`{{` 表示のあるすべてのステップ入力フィールドは変数をサポートします。

{{< img src="synthetics/browser_tests/autocomplete.png" alt="変数オートコンプリートインジケーター"  style="width:70%;">}}

変数を利用してステップを記録したい場合は、変数ボックスの手のアイコンを使うことができます。

{{< img src="synthetics/browser_tests/variable_input.mp4" alt="変数入力" video="true"  width="100%" >}}

記録時に、これは、Web サイトの入力に挿入される変数の実際の値に変換され (その結果、残りのステップに進むことができます)、`{{ <YOUR_VARIABLE_NAME> }}` を特徴とする関連する `Type text` ステップが作成されます。
テストの実行時に、`{{ <YOUR_VARIABLE_NAME> }}` は体系的に変数に関連付けられた値に置き換えられます。

**注**: 場合によっては、変数値は実行時にのみ計算されます (HTTP リクエストから変数を作成するとき、JavaScript ステップから変数を抽出するときなど)。次のステップの記録に進むには、結果として、`{{ <YOUR_VARIABLE_NAME> }}` を Web サイトに直接入力するか、実際の値を使用する必要がある場合があります。
2 番目のオプションを使用する場合は、テストを保存する前に、ステップで実際の値を `{{ <YOUR_VARIABLE_NAME> }}` に置き換えて、ブラウザテストが、前のステップで生成された変数値でステップを自動的に実行するようにします。

{{< img src="synthetics/browser_tests/variables_auto.mp4" alt="変数のオートコンプリートの例" video="true"  width="100%" >}}

## 待機

デフォルトでは、Datadog はステップまたは次のステップを実行する前に、ページが完全にロードされるのを待ちます。タイムアウトは 60 秒です。ただし、場合によっては、カスタムの待機時間を設定することもできます。たとえば、ページまたはページ要素のロードに 60 秒以上かかることがわかっている場合は、待機ステップを利用して、デフォルトのタイムアウトを延長できます。この機能を使用する場合、待機ステップの値は 300 秒を超えてはなりません。

**注**: この追加の時間は、ブラウザテストシナリオの**各実行**に体系的に追加されます。

## サブテスト

{{< img src="synthetics/browser_tests/subtest.png" alt="ブラウザテストサブテスト"  style="width:60%;">}}

既存のワークフローを再利用するために、他のブラウザテスト内でブラウザテストを実行できます。これは、テストスイート間のメンテナンスポイントの数を減らすのに特に役立ちます。ブラウザテストは、最大 2 レベルのネストをサポートします。[高度なオプション][10]では、サブテストを再生するタブを選択することもできます。

**注**: サブテストを個別に実行しても意味がない場合は、一時停止できます。メインテストの一部として引き続き呼び出されますが、個別に実行されることはありません。

## HTTP リクエスト

ブラウザテストの一環として HTTP リクエストを実行できます。

{{< img src="synthetics/browser_tests/recorder_http_requests.png" alt="HTTP リクエストの手順"  style="width:70%;" >}}

### セットアップ

HTTP リクエストを定義するには、

1. <mrk mid="31" mtype="seg"/><mrk mid="32" mtype="seg"/><mrk mid="33" mtype="seg"/>
2. **Advanced Options** を指定します（オプション）
     * Follow redirects: トグルボタンで、監視しているエンドポイントが最大 10 個のリダイレクトをフォローするよう設定します。
     * Allow insecure certificates: トグルボタンで、証明書の検証中にエラーが発生しても、HTTP の接続テストを続行するよう設定できます。
     * Headers: 定義されたヘッダーは、デフォルトのブラウザヘッダをオーバーライドします。
     * <mrk mid="41" mtype="seg"/><mrk mid="42" mtype="seg"/>
     * Body: リクエストの本文と本文のタイプ（`text/plain`、`application/json`、`text/xml`、`text/html` または `None`）。**注**: リクエスト本文の最大サイズは 50 キロバイトに制限されています。
     * Cookies: 定義したクッキーをデフォルトのブラウザクッキーに追加します。複数のクッキーを設定するには、次の書式を使用します `<クッキー名1>=<クッキーの値1>; <クッキー名2>=<クッキーの値2>`。
3. **Test URL** をクリックし、リクエストのコンフィギュレーションをテストします。これにより、反応データのプレビューが表示されます。

{{< img src="synthetics/browser_tests/http_request.png" alt="HTTP リクエストの作成"  style="width:60%;" >}}

### アサーションの追加

任意で、定義済みの HTTP リクエストに関するアサーションに基づきステップの成功をテストすることができます。

| タイプ          | 演算子                                                                                               | 値の型                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| 本文          | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`、<br> [`jsonpath`][9] | _String_ <br> _[Regex][10]_ <br> _String_、_[Regex][10]_ |
| ヘッダー        | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`                       | _String_ <br> _[Regex][10]                                      |
| response time | `is less than`                                                                                         | 整数 (ms)                                                  |
| ステータスコード   | `is`、`is not`                                                                                         | 整数                                                      |

**注**: **Test URL** をクリックすると、基本のアサーションが自動的に入力されます。

- `Response time` _lessThan_ 2000 ms
- `Header content-type` _is_ "戻り値"
- `Status code` _is_ "戻り値"

### 応答から変数を抽出する

オプションで、応答ヘッダーまたは本文をパースすることにより、HTTP リクエストの応答から変数を抽出することもできます。変数の値は、HTTP リクエストステップが実行されるたびに更新されます。

変数をパースするには

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。また、3 文字以上にする必要があります。
2. 変数を応答ヘッダーから抽出するか、本文から抽出するか決定します。

    * **応答ヘッダー**から値を抽出: HTTP リクエストの応答ヘッダー全体を変数値に使用するか、[正規表現][11]によりパースします。
    * **応答本文**から値を抽出: HTTP リクエストの応答本文全体を変数値に使用し、[正規表現][11]または [JSONPath][12] によりパースします。

{{< img src="synthetics/browser_tests/browser_test_vft.mp4" alt="ブラウザテストで HTTP リクエストから変数を作成する" video="true"  width="80%" >}}

作成されたこの変数は、ブラウザテストの次の手順で使用できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/advanced_options/
[2]: /ja/synthetics/browser_tests/advanced_options/#timeout
[3]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[4]: /ja/synthetics/guide/email-validation/#create-an-email-variable
[5]: /ja/synthetics/browser_tests/actions#use-variables-in-javascript-steps
[6]: /ja/synthetics/guide/testing-file-upload-and-download/#testing-a-file-download
[7]: /ja/synthetics/settings/
[8]: /ja/synthetics/browser_tests/actions#test-that-an-email-was-received
[9]: /ja/synthetics/browser_tests/actions#go-to-an-email-and-click-on-a-link
[10]: /ja/synthetics/browser_tests/advanced_options/#subtests
[11]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[12]: https://restfulapi.net/json-jsonpath/