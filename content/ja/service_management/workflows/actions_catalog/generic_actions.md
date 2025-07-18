---
aliases:
- /ja/workflows/generic_actions
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentation
  text: インテグレーションについて
is_beta: true
kind: documentation
title: 汎用アクション
type: ワークフロー
---

ジェネリックアクションは、Datadog インテグレーションやリソースと関連付けられていないワークフローアクションです。これらのアクションを使用すると、条件に基づいてワークフローを分岐させたり、カスタム HTTP リクエストを作成したり、コードでデータやオブジェクトを変換するなど、ワークフロー内でカスタムロジックを実装することができます。全てのワークフローアクションと同様に、[context variables][1] タブを使用して、ワークフローコンテキストで利用可能な値にアクセスすることができます。

## HTTP

HTTP アクションを使用すると、任意のカスタムエンドポイントにリクエストを行うことができます。リクエストメソッドとその内容、認証と処理の方法、有効期限切れの証明書やリダイレクトなどのシナリオに対応する方法を制御することができます。HTTP アクションが期待通りに動作するように、許可リストに Datadog の IP アドレス範囲を追加する必要がある場合、`webhooks` オブジェクトにリストされた IP を使用します。詳細は [IP 範囲ページ][2]を参照してください。

リクエスト方法と必要な[認証][3]を指定することから始めます。利用可能な構成タブの詳細については、以下のセクションをお読みください。オプションとして、リクエストは **Conditional wait** セクションで指定した条件で待機し、条件が満たされない場合は所定の間隔で再試行することができます。

### リクエストオプション

任意のヘッダー、クッキー、およびエラーを返すステータスコードをコンマで区切って入力します。`Response Parsing` ドロップダウンを使って、ヘッダーから推測されるデフォルトのレスポンスパース方法をオーバーライドし、ターゲットサーバーがレスポンスヘッダーに間違ったエンコーディングを指定している場合は `Response Encoding` を使用します。また、リクエストが期限切れの証明書やフォローリダイレクトを許可するかどうかを決めることができます。

{{< img src="service_management/workflows/http-request-options-tab2.png" alt="ワークフローキャンバスは、HTTP リクエスト アクションが選択され、構成タブが開かれています。Request Options タブが選択され、アクションは Connection という名前のヘッダーと keep-alive という値で構成され、Error on Status フィールドは 202, 300-305 という値で埋められています" >}}

### リクエスト本文

リクエストに本文がある場合は、`Request Body` タブを使用してその内容と形式を構成します。ワークフローコンテキストから `Request Body` フィールドの[コンテキスト変数][1]に入力を追加するか、`multipart/form-data` 本文タイプの `Name` と `Value` のペアに補間してリクエスト本文に加えます。`Body Type` ドロップダウンでは、以下のオプションを選択できます。

  - `application/json`
  - `text/plain`
  - `text/html`
  - `text/xml`
  - `multipart/form-data`
  - `None`

### URL パラメーター

任意の URL パラメーター名と値を指定します。

## データ変換

**Expression** および **Function** アクションは、JavaScript を使用してワークフロー内のカスタムデータ変換を実行します。ワークフロー内で利用可能なコンテキスト変数の値を、JavaScript の式や関数の入力として使用するには、`$.Steps.<step_name>.<variable>` という構文を使用します。また、同じ構文でデータ変換アクションに [Lodash][4] を利用するために `_` を使用することができます。例えば、HTTP リクエストステップ (`Make_request`) から HTTP リクエストステータス変数 (`status`) を参照するには、以下のコンテキスト変数を使用します。

```
$.Steps.Make_request.status
```

また、前のステップの `Array_function` が返す配列に `_.includes` Lodash 関数を適用して、名前 `Bits` が含まれているかどうかを判断するには、次の構文を用います。

```
_.includes($.Steps.Array_function.data, "Bits")
```

これらのアクションによって返されたデータは、その後のワークフローのステップで参照することができます。

### 式

式アクションは、1 行のコードで実現でき、変数の割り当てや複数の独立した操作を必要としないデータ変換に使用します。例:

`[1, 2, 3].filter(x => x < 3)`

### 関数

関数アクションは、複数の式を必要とする変数割り当てやデータ変換を可能にします。

## ロジック

ロジックアクションは、条件に応じて別のワークフローに分岐したり、ワークフローの実行を一時停止したりするなど、ワークフローの実行時にカスタムロジックを実装することが可能です。

### 条件からワークフローを分岐

ワークフローの実行経路を、定義した 1 つまたは複数のステートメントの評価に基づいて分岐させることができます。例えば、以下のスクリーンショットでは、HTTP リクエストアクションのステータスコードが `200` の場合に、ワークフローのアクションを分岐させることを検討しています。

{{< img src="service_management/workflows/branch-workflow-configuration2.png" alt="条件分岐ワークフローが選択され、構成タブが開かれたワークフロー キャンバス。Statements セクションは、前のリクエストのステータスが 200 であること、前の関数の戻り値が true であることを指定する 2 つのステートメントで強調表示されています。" >}}

### スリープ

秒単位で指定した期間、ワークフローの実行を一時停止します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/workflows/build/#context-variables
[2]: https://docs.datadoghq.com/ja/api/latest/ip-ranges/#list-ip-ranges
[3]: /ja/service_management/workflows/access/
[4]: https://lodash.com/