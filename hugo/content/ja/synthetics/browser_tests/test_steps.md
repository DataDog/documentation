---
aliases:
- /ja/synthetics/browser_tests/actions
description: ブラウザテストの記録の自動記録と手動でのステップ設定方法について説明します。
further_reading:
- link: /synthetics/browser_tests/advanced_options/
  tag: ドキュメント
  text: ブラウザテストの高度なオプションについて
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
  tag: 外部サイト
  text: Terraform による Synthetic グローバル変数の作成と管理
title: ブラウザテストのステップ
---

## 概要

ステップは、ブラウザテストで記録し、編集または構築することができる一連のアクションです。ブラウザテストで実行するステップを定義するには、Datadog のテストレコーダ拡張機能で直接記録するか、手動で追加します。各ステップには、構成可能な[詳細オプション][1]のセットが含まれています。

各ステップのデフォルトのタイムアウトは 60 秒です。このデフォルトのタイムアウトは、専用の[タイムアウトオプション][2]を使用してオーバーライドできます。

## 自動記録されたステップ

**Start Recording** をクリックすると、[Datadog ブラウザテストレコーダー拡張機能][3]が自動的に Web サイト上の操作手順を検出し、記録します。

### クリック

ページ上の要素とインタラクトすることで、ステップを記録します。

{{< img src="synthetics/browser_tests/click_step.mp4" alt="クリックステップタイプのクリックタイプドロップダウンメニュー" video="true" width="60%" >}}

ステップをクリックし、実行時にブラウザテストを実行させたいクリックタイプを選択します。

* 左クリックに対応するプライマリクリック
* ダブルクリック
* 右クリックに対応するコンテキストクリック

### テキストを入力する

Datadog は、`select` ドロップダウンメニューからオプションを選択するなど、アプリケーション上で実行したステップを記録し、その要約がステップとして表示されます。

{{< img src="synthetics/browser_tests/type_text.mp4" alt="ブラウザテストのテキスト入力ステップ" video="true" width="95%" >}}

### オプションを選択する

Datadog は、`select` ドロップダウンメニューからオプションを選択するなど、アプリケーション上で実行したステップを記録し、その要約が左隅にステップとして表示されます。

{{< img src="synthetics/browser_tests/select_options.png" alt="オプション選択ステップ" style="width:70%;" >}}

### ファイルをアップロードする

**Upload** ステップを記録するには、次のいずれかを行います。

* ブラウザからデスクトップを開く
* ファイルを記録する iframe にドラッグアンドドロップする

Datadog は、アップロードなどアプリケーション上で実行したステップを記録し、その要約が左隅にステップとして表示されます。アップロードできるファイルは 10 個までで、それぞれ 5MB までの制限があります。

{{< img src="synthetics/browser_tests/upload_file_step.png" alt="ファイルのアップロードステップを作成する" style="width:70%;" >}}

## 手動で追加したステップ

ブラウザテストの記録の左隅で、手動でステップを追加したり、アレンジしたりすることができます。

### アサーション

アサーションによって、シミュレーションされたユーザージャーニーのどの時点でも、ブラウザテストが期待通りの状態であることを検証することができます。

テストが期待通りの状態で終了することを確認するために、ブラウザテストは**アサーション**で終了させる必要があります。

{{< img src="synthetics/browser_tests/browser_test_assertions_2.png" alt="ブラウザテストステップでのアサーションのオプション" style="width:70%;" >}}

いくつかのアサーションは、アクティブなページ、つまりユーザーがページ要素上で**クリック**や**アサーション**など、最後に操作したページを検証します。

ステップを作成するには、アサーションタイプを選択します。

{{< tabs >}}
{{% tab "アクティブページで要素をテストする" %}}

#### 要素のコンテンツをテストする

このアサーションステップを作成すると、ブラウザテストでページ要素を選択し、特定の値が含まれているかどうかを確認することができます。

#### 要素の属性をテストする

このアサーションステップを作成すると、ブラウザテストでページ要素を選択し、その属性の 1 つが期待される内容と一致するかどうかを確認することができます。

#### ある要素が存在するかどうかをテストする

このアサーションステップを作成すると、ブラウザテストで特定の `span`、`div`、`h`、`a` などのページ要素を選択し、それがページ上に存在することを確認できます。

ブラウザテストが正しい要素をターゲットにするように、ドロップダウンメニューから `CSS` または `XPath 1.0` を選択し、セレクタを追加してユーザーロケータを設定します。**Test** をクリックします。

#### チェックボックスやラジオボタンの状態をテストする

このアサーションステップを作成することで、ブラウザテストでページ要素を選択し、アサーションの状態 (未チェックまたはチェック済み) を検証することができます。

{{< img src="synthetics/browser_tests/checkbox_state_assertion.png" alt="ブラウザテストステップでのアサーションのオプション" style="width:60%;" >}}

{{% /tab %}}
{{% tab "アクティブページコンテンツのテスト" %}}

#### テキストがアクティブページに存在しないことをテストする

このアサーションステップを作成すると、`Value` フィールドに指定したテキストが、記録中の現在のページに**存在しない**ことをブラウザテストで確認することができます。

#### テキストがアクティブページに存在することをテストする

このアサーションステップを作成すると、`Value` フィールドに指定したテキストが、記録中の現在のページに存在することをブラウザテストで確認することができます。

#### アクティブページの URL のコンテンツをテストする

このアサーションステップを作成すると、ブラウザテストで、最後に操作されたページの URL に指定した値が含まれているかどうかを検証することができます。

`string`、`number`、`regex` などの URL 内の値をテストすることができます。

{{% /tab %}}

{{% tab "特殊アサーション" %}}

#### メールが受信されたことをテストする

このアサーションステップを作成すると、ブラウザテストでアプリケーションのメールメカニズムが動作していることを確認し、`string`、`number`、`regex` などの指定した値がメールの件名や本文に存在することを検証することができます。

詳しくは、[ブラウザテストによるメール検証][1]をご覧ください。

#### カスタム JavaScript で UI をテストする

このアサーションステップを作成すると、アクティブなページで JavaScript コードを使用してカスタムアサーションをテストすることができます。JavaScript アサーションは、同期と非同期の両方のコードをサポートします。ブラウザテストはページにスクリプトを追加することで外部 JavaScript を読み込むので、 ウェブサイトが外部 JavaScript を受け入れる場合にのみ機能します。

JavaScript アサーション関数には以下のパラメーターが含まれており、return ステートメントが必要です。

* `return` (必須) ステートメントは、テストステップが成功するためにアサーションが満たす必要がある条件を反映します。任意のタイプを返すことができますが、値はブール値として自動的にキャストされます。偽の値が返された場合、テストステップは失敗します。

* `vars` (オプション): ブラウザテストの[変数][2]を含む文字列。JavaScript スニペットでブラウザテスト変数を参照するには、`vars.<YOUR_VARIABLE>` を使用します。たとえば、ブラウザテストに `USERNAME` 変数が含まれている場合は、`vars.USERNAME` を使用して JavaScript スニペットでそれを呼び出します。

* `element` (オプション): ページ上の要素のロケーター。これを設定するには、**Select** および **Update** ターゲット要素ボタンを使用します。選択された要素は、Datadog のブラウザテストの複数配置アルゴリズムを自動的に利用します。

{{< img src="synthetics/browser_tests/assertion_java.mp4" alt="ブラウザテストの JavaScript アサーション" video="true" width="100%" >}}

JavaScript アサーションはアクティブページのコンテキストで実行されるため、これらのステップはアクティブページで定義されたすべてのオブジェクト (ライブラリ、組み込み、グローバル変数など) にアクセスできます。外部ライブラリをロードするには、promise を使用します。

例:

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

#### ダウンロードされたファイルのテスト

このアサーションステップを作成すると、ブラウザテストで前のステップでダウンロードしたファイルを検証することができます。ファイルが正しくダウンロードされたことを確認し、ファイル名、サイズ、および MD5 値をアサートすることができます。

ダウンロードのテスト方法については、[ファイルのアップロードとダウンロードのテスト][3]を参照してください。

[1]: /ja/synthetics/guide/email-validation
[2]: /ja/synthetics/browser_tests/test_steps#use-variables
[3]: /ja/synthetics/guide/testing-file-upload-and-download/#testing-a-file-download

#### HTTP リクエスト数のテスト

このアサーションステップを作成して、特定の URL パターンへの HTTP リクエスト数をテストします。期待されるリクエスト数と、テスト対象のターゲット URL の正規表現を入力してください。

{{< img src="synthetics/browser_tests/number_and_target_2.png" alt="リクエスト数とターゲットをテストするオプションと、リクエストのドロップダウンが表示されている" style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

</br>

### インタラクション

ブラウザのアサーションで記録されたステップに加えて、**Interaction** をクリックして手動でステップを作成することもできます。その後、アクションタイプを選んでインタラクションを追加します。

{{< img src="mobile_app_testing/test_steps/mobile_app_interaction_2.png" alt="インタラクションステップを追加するためのアクションタイプを選択" style="width:60%;" >}}

#### ページを更新

このナビゲーションステップを作成すると、ブラウザテストで記録の現在のページを更新させることができます。

#### メールリンクをクリック

[メール変数][4]を作成したら、このナビゲーションステップを追加し、ブラウザテストが固有の Synthetic メール受信ボックスにアクセスできるようにします。

ブラウザテストでクリックさせたいメールやリンクを選択します。このステップで対応するページが表示され、その特定のページから残りの行程に進むことができます。

#### リンクへ移動する

このナビゲーションステップを作成すると、ブラウザテストで特定のページに移動することができます。**Enter link URL** の欄には、URL の前に `http` または `https` を付ける必要があります。

#### キーの押下

キーストロークを入力するユーザーをシミュレートするために、**Press Key** ステップを追加します。[Datadog ブラウザテストレコーダー拡張機能][3]は、以下のキーを記録することができます。

* Enter
* 矢印（上、下、右、左）
* Tab（フォーム外）
* Escape
* Backspace

自動的に記録されないキーを押すには、**Value** フィールドで押す必要のある値を指定します。

入力された値に追加する修飾子として、`Alt`、`Control`、`Meta`、`Shift` を選択します。

{{< img src="synthetics/browser_tests/browser_test_press_key.png" alt="ブラウザテスト記録の Press Key ステップ" style="width:50%;" >}}

#### 要素にカーソルを合わせる

このステップでは、ホバーリング機構ではなく、専用のクリックを使用し、記録中にユーザーが要素にホバーリングするたびに別のステップが生成されることを回避しています。

**Hover** を選択し、要素をクリックするとステップが追加されます。

#### スクロール

ブラウザテストでは、操作が必要な要素まで自動的にスクロールします。ほとんどの場合、手動でスクロールステップを追加する必要はありません。スクロールステップを使用するのは、無限スクロールのような追加の操作を発生させる必要がある場合です。

ブラウザテストで縦方向および横方向にスクロールさせたいピクセル数を指定します。

{{< img src="synthetics/browser_tests/browser_test_scroll_step.png" alt="ブラウザテスト記録 Test Scroll Step の Scroll ステップ" style="width:50%;" >}}

デフォルトでは、**Scroll** ステップはページ全体をスクロールします。特定の要素 (例えば、特定の `<div>`) でスクロールする必要がある場合、**Target Element** をクリックして、ブラウザテストでスクロールさせたい要素を選択します。

#### 待機

デフォルトでは、ブラウザテストはページが完全に読み込まれるのを待ってから、ステップまたは次のステップを実行し、60 秒のタイムアウトが設定されています。

ページやページ要素の読み込みに 60 秒以上かかることがわかっている場合、ステップの[高度なオプション][2]でタイムアウトをカスタマイズするか、最大値 300 秒のハードコードされた待機ステップを追加することができます。

{{< img src="synthetics/browser_tests/browser_test_wait_step.png" alt="ブラウザテスト記録の Wait ステップ" style="width:50%;" >}}

この追加時間は、ブラウザテストの記録の**すべての実行**に系統的に追加されます。

#### HTTP テストを実行

ブラウザテストの一部として、HTTP リクエストを実行し、[アサーション](#add-assertions)を追加し、[変数を抽出](#extract-a-variable-from-the-response)することができます。

{{< img src="synthetics/browser_tests/http_request_3.png" alt="HTTP Request ステップ" style="width:70%;" >}}

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
   * **NTLM**: NTLM 認証の資格情報を追加します。NTLMv2 と NTLMv1 の両方に対応しています。
   * **OAuth 2.0**: Grant Type (Client credentials または Resource owner password) を選択します。

   {{% /tab %}}

   {{% tab "クエリパラメーター" %}}

   * **Encode parameters**: エンコードが必要なクエリパラメーターの名前と値を追加します。

   {{% /tab %}}

   {{% tab "リクエスト本文" %}}

   * **Body type**: HTTP リクエストのボディタイプを選択します (`text/plain`, `application/json`, `text/xml`, `text/html`, `application/x-www-form-urlencoded`, `application/octet-stream`, `multipart/form-data`, `GraphQL`, または `None`)。
   * **Request body**: HTTP リクエストボディの内容を追加します。ブラウザ HTTP ステップでのファイルアップロードではボディサイズは 3MB に制限され、リクエストボディの最大サイズは 50KB です。

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

アサーションはテスト結果の期待値を定義します。**Send** をクリックした後、`status code`、`response time`、`header` の `content-type` に対する基本的なアサーションがテストレスポンスに基づいて追加されます。ブラウザテストの HTTP ステップではアサーションは任意です。

| 型            | 演算子                                                                                                               | 値の型                                               |
|-----------------|------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| `body`          | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`、<br> [`jsonpath`][11]、[`xpath`][12] | _String_ <br> _[Regex][13]_ <br> _String_, _[Regex][13]_ |
| `header`        | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`                                       | _文字列_ <br> _[正規表現][13]_                              |
| `response time` | `is less than`                                                                                                         | 整数 (ms)                                           |
| `status code`   | `is`、`is not`                                                                                                         | 整数                                                |

HTTP リクエストでは、`br`、`deflate`、`gzip`、`identity` の `content-encoding` ヘッダーを使用して本文を解凍することが可能です。

- テストがレスポンス本文にアサーションを含まない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連するレスポンスタイムを返します。

- テストがレスポンス本文に対するアサーションを含み、タイムアウトの制限に達した場合、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、ステップごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/browser_tests/assertions.png" alt="ブラウザテストが成功または失敗するためのアサーションを定義する" style="width:80%;" >}}

##### 応答から変数を抽出する

必要に応じて、HTTP リクエストのレスポンスヘッダーやボディを解析し、その結果を変数として抽出できます。変数の値は HTTP リクエストステップが実行されるたびに更新され、以降の[ステップ](#use-variables)で使用できます。

変数の解析を開始するには、**Extract a variable from response content** をクリックし、変数を定義します。

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。また、3 文字以上にする必要があります。
2. 変数をレスポンスのヘッダーから抽出するか、本文から抽出するか決定します。

   * レスポンスヘッダーから値を抽出する場合は、HTTP リクエストのレスポンスヘッダー全体を変数として使用するか、[`regex`][13] で解析します。
   * レスポンスボディから値を抽出する場合は、HTTP リクエストの完全なレスポンスボディをそのまま変数の値として利用するか、[`regex`][13]、[`JSONPath`][11]、[`XPath`][12] で解析します。

{{< img src="synthetics/browser_tests/extracted_variable.png" alt="応答から抽出された変数" style="width:80%;" >}}

### 特別なアクション

[Datadog ブラウザテストレコーダー拡張機能][3]を使用すると、ユーザージャーニーに関連するほとんどのステップを記録、監視することができます。しかし、この拡張機能は、**Hover**、*Press Key**、*Scroll**、*Wait** などの一部のステップを自動的に記録しません。

**Special Actions** をクリックし、アクションタイプを選択して、このアサーションステップを手動で作成します。

### 変数

**Variables** をクリックし、ドロップダウンメニューから変数作成の種類を選択します。

{{< img src="synthetics/browser_tests/variables.png" alt="ブラウザテスト変数" style="width:60%;" >}}

ステップ内で変数を使用する方法については、[変数を使用する](#use-variables)を参照してください。

#### パターン

使用可能なビルトインは以下の通りです。

`{{ numeric(n) }}`
: `n` 桁の数字列を生成します。

`{{ alphabetic(n) }}`
: `n` 文字のアルファベット文字列を生成します。

`{{ alphanumeric(n) }}`
: `n` 文字の英数字文字列を生成します。

`{{ date(n unit, format) }}` 
: テストが + または - `n` 単位で開始された UTC 日付に対応する値を使用して、Datadog の許容される形式のいずれかで日付を生成します。

`{{ timestamp(n, unit) }}` 
: テストが + または - `n` 単位で開始された UTC タイムスタンプに対応する値を使用して、Datadog の許容される単位のいずれかでタイムスタンプを生成します。

`{{ uuid }}`
: バージョン 4 の UUID (Universally unique identifier) を生成します。

テスト結果のローカル変数値を難読化するには、**Hide and obfuscate variable value** を選択します。変数文字列を定義したら、**Add Variable** をクリックします。

#### 要素

`span` や `div` などのコンテンツから、要素のテキストを抽出して変数を作成します。

#### メール本文

[`regex`][13] または [`Xpath`][12] のいずれかの方法で、メール本文から変数を作成します。

* [`Regex`][13] はメールのプレーンテキスト本文から最初に一致するパターン (例えば `/*./`) を検索して返します。パターンが見つからない場合は、HTML 本文を検索します。

* [`Xpath`][12] はメールの本文に HTML が含まれている場合にのみ適用されます。これは対応する場所 (例えば `$`) の内容を返します。

#### JavaScript

JavaScript のステップは、同期と非同期の両方のコードをサポートしています。ブラウザテストは、ページにスクリプトを追加することで外部の JavaScript を読み込むため、Web サイトが外部の JavaScript を受け入れる場合にのみ機能します。

JavaScript 関数には以下のパラメーターが付属しており、return ステートメントが必要です。

* `return` (必須) ステートメントは、JavaScript の変数に関連づけたい値を返します。このステートメントは任意のタイプを返すことができますが、値は自動的に文字列にキャストされます。

* `vars` (オプション): コード内で使用することができるブラウザテストの[変数](#use-variables)を含む文字列。JavaScript スニペットでブラウザテスト変数を参照するには、`vars.<YOUR_VARIABLE>` を使用します。たとえば、ブラウザテストですでに `PRICE` 変数を使用している場合は、`vars.PRICE` を使用して JavaScript スニペットでそれを呼び出します。

* `element` (オプション): ページ上の要素のロケーター。これを設定するには、**Select** および **Update** ターゲット要素ボタンを使用します。選択された要素は、Datadog のブラウザテストの複数配置アルゴリズムを自動的に利用します。

{{< img src="synthetics/browser_tests/custom_java_script.mp4" alt="ブラウザテストの JavaScript 変数" video="true" width="100%" >}}

JavaScript アサーションはアクティブページのコンテキストで実行されるため、これらのステップはアクティブページで定義されたすべてのオブジェクト (ライブラリ、組み込み、グローバル変数など) にアクセスできます。外部ライブラリをロードするには、promise を使用します。

例:

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

[Synthetic Monitoring Settings][5] で定義されたグローバル変数を選択します。

#### グローバル変数 - MFA

[Synthetic Monitoring Settings][5] で定義された MFA グローバル変数を選択します。

このタイプのグローバル変数は、時間ベースのワンタイムパスワード (TOTP) シークレットキーを格納し、MFA モジュールと MFA で保護されたワークフローをテストすることができます。詳細については、[ブラウザテストにおける多要素認証 (MFA) のための TOTP][6] を参照してください。

#### Email

Datadog Synthetics のメールアドレスを作成し、テストステップで使用して、[メールが正しく送信されたかどうかをアサート][7]したり、たとえば確認リンクをクリックするために、[メール内のリンクにナビゲート][8]することが可能です。

テスト実行のたびに一意のメールボックスが生成され、テスト実行間の競合を回避することができます。

### サブテスト

ブラウザテストを他のブラウザテストの中で実行することで、既存のワークフローを最大 2 階層まで入れ子にして再利用することが可能です。

既存のブラウザテストをサブテストとして使用するには、**Add New Subtest** をクリックし、**From Existing Test** タブのドロップダウンメニューからブラウザテストを選択し、**Add Subtest** をクリックします。

現在のブラウザテストのステップをサブテストに変換するには、**Extract From Steps** タブをクリックし、抽出したい記録されたステップを選択し、**Convert to Subtest** をクリックしてください。デフォルトでは、サブテストは親テストの前のステップと順番に実行されます。

{{< img src="synthetics/browser_tests/advanced_options/subtest.png" alt="ブラウザテストでサブテストを追加する" style="width:60%;" >}}

サブテストにある変数を親テストでオーバーライドするには、親テストレベルで作成された変数が、サブテストに存在する変数と同じ名前であることを確認してください。変数は、常に最初に代入された値を使用します。

サブテストの高度なオプションについては、[ブラウザテストステップの高度なオプション][9]を参照してください。

サブテストを独立して実行することに意味がない場合は、一時停止することができます。このテストは、親テストの一部として呼び出され続け、 個別に実行されることはありません。詳しくは、[ブラウザのテストジャーニーをテストスイート全体で再利用する][10]を参照ください。

## ステップ順序の管理

個々のステップをドラッグアンドドロップして新しいステップを手動で並べ替える代わりに、記録の特定の段階でテストステップにカーソルをセットし、追加のステップを挿入することができます。

1. 記録したテストステップにカーソルを合わせ、**Set Cursor** アイコンをクリックします。テストステップの上に青い線が表示されます。
2. [テストステップ](#automatically-recorded-steps)を追加記録するか、[ステップを手動で](#manually-added-steps)追加します。
3. テストステップの上にステップを追加し終えたら、**Clear Cursor** をクリックして終了してください。

{{< img src="synthetics/browser_tests/recording_cursor_step.mp4" alt="テストステップにカーソルを合わせると、このステップの前にステップが追加される" video="true" width="100%" >}}

## 変数を使用する

手動で追加したステップで利用可能なすべての変数を表示するには、入力フィールドに `{{` と入力します。

自動で記録されたステップで変数を使うには、**Inject this variable** アイコンをクリックし、記録中に変数の値を入力します。

{{< img src="synthetics/browser_tests/variable_input.mp4" alt="テストステップをクリックすると、レコーダーページに値が挿入される" video="true" width="100%" >}}

ブラウザのテストステップで変数に異なる値が割り当てられる場合 (サブテストなど)、変数は最初に割り当てられた値を一貫して使用します。

HTTP リクエストや JavaScript ステップの変数など、実行時にのみ計算される変数もあります。例えば、`{{ <YOUR_VARIABLE_NAME> }}` を使用する `Type text` ステップがあるとします。テスト実行時には、`{{ <YOUR_VARIABLE_NAME> }}` が、変数に関連付けられた値に一貫して置き換えられます。これらの変数を使ったステップを記録するには、実際の変数の値でステップを記録し、テストを保存する前にステップの定義で実際の値を `{{ <YOUR_VARIABLE_NAME> }}` に置き換えてください。

### 複数の変数を使用

ブラウザテストの記録ステップに複数の変数を追加できます。

ブラウザテストの記録で、**+ Add Variable** ボタンをクリックして、テストに 1 つ以上の変数を追加します。

{{< img src="synthetics/browser_tests/extract_multiple_variables.png" alt="グローバル変数からローカル変数を定義する" width="90%" >}}

ブラウザテストのレコーダーで、ステップ記録を追加し、**Extract variables from the response(optional)** をクリックして、ブラウザテストで変数を抽出して使用します。

{{< img src="synthetics/browser_tests/edit_test_extract_multiple_variables.png" alt="ブラウザ記録中にフィールドにローカル変数を挿入する" width="90%" >}}

## 記録を編集する

ブラウザの記録を保存後に編集するには

- [Synthetic Monitoring > Tests][14] に移動します。
- 以前に保存したブラウザテストをクリックします。
- 右上隅にある歯車アイコンをクリックし、"edit recording" をクリックします。
- 削除または再生する複数のステップまたは単一のステップを選択し、**Save &amp; Quit** をクリックします。

{{< img src="synthetics/browser_tests/edit_a_recording.png" alt="ブラウザ記録を編集し、マルチセレクト機能を使用する"="70%" >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/advanced_options/
[2]: /ja/synthetics/browser_tests/advanced_options/#timeout
[3]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[4]: /ja/synthetics/guide/email-validation/#create-an-email-variable
[5]: /ja/synthetics/settings/
[6]: /ja/synthetics/guide/browser-tests-totp
[7]: /ja/synthetics/guide/email-validation/#confirm-the-email-was-sent
[8]: /ja/synthetics/guide/email-validation/#navigate-through-links-in-an-email
[9]: /ja/synthetics/browser_tests/advanced_options/#subtests
[10]: /ja/synthetics/guide/reusing-browser-test-journeys
[11]: https://restfulapi.net/json-jsonpath/
[12]: https://www.w3schools.com/xml/xpath_syntax.asp
[13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[14]: https://app.datadoghq.com/synthetics/tests