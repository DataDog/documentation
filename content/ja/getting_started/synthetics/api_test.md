---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: ラーニングセンター
  text: Synthetic テストの紹介
- link: /api/latest/synthetics/#create-an-api-test
  tag: API
  text: プログラムによる API テストの作成
- link: /synthetics/api_tests
  tag: ドキュメント
  text: シングル API テストの詳細
- link: /synthetics/multistep
  tag: Documentation
  text: マルチステップ API テストの詳細
- link: /getting_started/synthetics/private_location
  tag: ドキュメント
  text: プライベートロケーションの詳細
- link: /continuous_testing/cicd_integrations/
  tag: ドキュメント
  text: CI/CD パイプラインから Synthetic テストをトリガーする方法を学ぶ
- link: /synthetics/guide/identify_synthetics_bots
  tag: ドキュメント
  text: API テスト用の Synthetic ボットを特定する方法を学ぶ
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
kind: documentation
title: API テストの概要
---

## 概要

API テストは、**最も重要なサービス**がいつでもどこからでも利用できることを**プロアクティブに監視**します。[シングル API テスト][1]には、システムのさまざまなネットワーク層 (`HTTP`、`SSL`、`DNS`、`WebSocket`、`TCP`、`UDP`、`ICMP`、`gRPC`) に対してリクエストを発行できる 8 つのサブタイプがあります。[マルチステップ API テスト][2]では、API テストを順番に実行して、API レベルで主要なジャーニーのアップタイムを監視できます。

## 単一の API テストを作成する

HTTP テストは、API エンドポイントを監視し、レスポンス遅延が大きい場合や、期待される HTTP ステータスコード、レスポンスヘッダー、レスポンス本文の内容など、定義した条件を満たさない場合に警告を発します。

{{< img src="getting_started/synthetics/api-test.png" alt="Synthetics HTTP テストの概要" style="width:100%;" >}}

以下の例では、[シングル API テスト][1]のサブタイプである [HTTP テスト][3]を作成する方法を示しています。

### リクエストを定義する

1. Datadog サイトで、**Digital Experience** にカーソルを合わせ、**[Tests][4]** (**Synthetic Monitoring & Testing** の下) を選択します。
2. **New Test** > **[New API test][5]** をクリックします。
3. `HTTP` リクエストタイプを選択します。
4. リクエストを定義します。

    - 監視するエンドポイントの URL を追加します。何から始めればよいかわからない場合は、テスト用の e コマースウェブアプリケーションである `https://www.shopist.io/` を使用できます。テストするエンドポイントを定義すると、テストの名前が `Test on www.shopist.io` に自動的に入力されます。
    - **Advanced Options** を選択すると、カスタムリクエストオプション、証明書、認証情報などを設定することができます。

      **注:** 資格情報を保存するための安全な[グローバル変数][6]を作成し、リクエストペイロードで使用する動的タイムスタンプを生成するための[ローカル変数][7]を作成できます。これらの変数を作成した後、関連するフィールドに `{{` と入力し、変数を選択して、テストオプションにその値を挿入します。

      この例では、特定の詳細オプションは必要ありません。
    - テストでは、`env:prod` や `app:shopist` などのタグを設定できます。タグを使用すると、テストスイートを整理し、ホームページで興味のあるテストをすばやく見つけることができます。

5. **Test URL** をクリックして、サンプルのテスト実行をトリガーします。

{{< img src="getting_started/synthetics/api-test-config-3.png" alt="API テストコンフィギュレーション" style="width:100%;">}}

### アサーションを定義する

**Test URL** をクリックすると、エンドポイントの応答に関する基本的なアサーションが自動的に入力されます。アサーションは、成功したテスト実行が何であるかを定義します。

この例では、サンプルのテスト実行をトリガーした後、3 つのデフォルトのアサーションが設定されます。

{{< img src="getting_started/synthetics/assertions-example-2.png" alt="デフォルトアサーション" style="width:100%;">}}

アサーションは完全にカスタマイズ可能です。カスタムアサーションを追加するには、ヘッダーなどの応答プレビューの要素をクリックするか、**New Assertion** をクリックして新しいアサーションを最初から定義します。

{{< img src="getting_started/synthetics/api-test-configuration-2.mp4" alt="API テストのコンフィギュレーション例" video="true" >}}

### ロケーションを選択する

テストを実行する 1 つ以上の **Managed Locations** または **Private Locations** を選択します。{{% managed-locations %}}

Shopist アプリケーションは `https://www.shopist.io/` で公開されているので、管理された任意の場所からテストを実行することができます。内部アプリケーションのテストや、地理的に離れた場所でのユーザーの行動をシミュレートするには、代わりに[プライベートロケーション][8]を使ってください。

### テストの頻度を指定する

テストを実行する頻度を選択します。デフォルトの頻度である 1 分のままでも構いません。

スケジュールに従って Synthetic テストを実行することに加えて、[CI/CD パイプライン][9]から手動または直接トリガーすることができます。

### アラート条件を定義する

アラート条件を定義して、散発的なネットワークブリップなどのテストがトリガーされないようにすることができます。これにより、エンドポイントに実際の問題が発生した場合にのみアラートが送信されます。

ロケーションが失敗したと見なす前に発生する必要がある連続した失敗の数を指定できます。

```text
Retry test 2 times after 300 ms in case of failure
```

エンドポイントが特定の時間とロケーションの数だけダウンしたときにのみ通知をトリガーするようにテストを構成することもできます。次の例では、2 つの異なるロケーションでテストが 3 分間失敗した場合に、アラートルールが通知を送信するように設定されています。

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### テストモニターを構成する

アラートメッセージを設計し、テストでアラートを送信するメールアドレスを追加します。Slack、PagerDuty、Microsoft Teams、Webhook などの[通知インテグレーション][10]を使用することもできます。これらの通知ツールへの Synthetic アラートをトリガーするには、最初に対応する[インテグレーション][11]を設定する必要があります。

テストの構成とモニターを保存する準備ができたら、**Create** をクリックします。

## マルチステップ API テストを作成する

[マルチステップ API テスト][2]では、主要なビジネストランザクションを API レベルで監視することができます。

{{< img src="getting_started/synthetics/multistep-api-test.png" alt="マルチステップ Synthetics API テストの概要" style="width:100%;" >}}

[API テスト][3]と同様、マルチステップ API テストは、エンドポイントの反応が遅すぎる場合や定義した条件を満たさない場合に警告を発します。個々のステップ応答から変数を作成し、後続のステップでそれらの値を再注入して、アプリケーションまたはサービスの動作を模倣する方法でステップをチェーン化することもできます。

以下のテスト例は、カートへのアイテムの追加を監視するマルチステップ API テストの作成を示しています。このテストには、次の 3 つのステップが含まれます。

- カートを取得する
- 商品を取得する
- カートに商品を追加する

マルチステップ API テストを作成する API エンドポイントがわからない場合は、以下のエンドポイントの例を使用してください。

新しいマルチステップ API テストを作成するには、**New Test** > **[Multistep API test][12]** をクリックします。`カートに商品を追加する` などのテスト名を追加し、タグを含め、ロケーションを選択します。

### カートを取得する

1. **Define steps** で、**Create Your First Step** をクリックします。
2. ステップに名前を追加します。例: `カートを取得する`
3. クエリする HTTP メソッドと URL を指定します。`POST` と `https://api.shopist.io/carts` を入力できます。
4. **Test URL** をクリックします。これにより、Shopist アプリケーションのバックエンドにカートアイテムが作成されます。
5. デフォルトのアサーションのままにするか、変更します。
6. オプションで、実行パラメーターを定義します。

   **Continue with test if this step fails** (このステップが失敗した場合はテストを続行) を選択すると、前のステップの成功または失敗に関係なく、エンドポイントコレクション全体がテストされていること、または最後のクリーンアップステップが実行されていることを確認できます。**Retry** ステップ機能は、API エンドポイントが応答するまでに時間がかかることがわかっている場合に便利です。

   この例では、特定の実行パラメーターは必要ありません。

7. `location` ヘッダーの最後にあるカート ID の値から変数を作成するには
    - **Extract a variable from response content** (応答コンテンツから変数を抽出する) をクリックします。
    - 変数に `CART_ID` という名前を付けます。
    - **Response Header** で、`location` を選択します。
    - **Parsing Regex** フィールドに、`(?:[^\\/](?!(\\|/)))+$` などの正規表現を追加します。

   {{< img src="getting_started/synthetics/multistep-test-extract-variables.png" alt="応答コンテンツから抽出された変数" style="width:100%;" >}}

8. **Save Variable** をクリックします。
9. このテストステップの作成が完了したら、**Save Step** をクリックします。

### 商品を取得する

1. **Define another step** (別のステップを定義する) で、**Add Another Step** (別のステップを追加する) をクリックします。デフォルトでは、最大 10 個のステップを作成できます。
2. ステップに名前を追加します。例: `商品を取得する`
3. クエリする HTTP メソッドと URL を指定します。 ここでは、`GET` と `https://api.shopist.io/products.json` を追加できます。
4. **Test URL** をクリックします。これにより、Shopist アプリケーションで購入できる商品のリストが取得されます。
5. デフォルトのアサーションのままにするか、変更します。
6. オプションで、実行パラメーターを定義します。この例では、特定の実行パラメーターは必要ありません。
7. 応答本文にある商品 ID から変数を作成するには、次のようにします。
    - **Extract a variable from response content** (応答コンテンツから変数を抽出する) をクリックします。
    - 変数に `PRODUCT_ID` という名前を付けます。
    - **Response Body** タブをクリックします。
    - 商品の `$oid` キーをクリックして、`$[0].id['$oid']` などの JSON パスを生成します。
8. **Save Variable** をクリックします。
9. このテストステップの作成が完了したら、**Save Step** をクリックします。

### カートに商品を追加する

1. **Add Another Step** をクリックして、商品のカートへの追加という最後のステップを追加します。
2. ステップに名前を追加します。例: `カートに商品を追加する`
3. クエリする HTTP メソッドと URL を指定します。 ここでは、`POST` と `https://api.shopist.io/add_item.json` を追加できます。
4. **Request Body** タブで、`application/json` 本文タイプを選択し、以下を挿入します。

    {{< code-block lang="java" disable_copy="true" collapsible="true" >}}
    {
      "cart_item": {
        "product_id": "{{ PRODUCT_ID }}",
        "amount_paid": 500,
        "quantity": 1
      },
      "cart_id": "{{ CART_ID }}"
    } 
    {{< /code-block >}}

5. **Test URL** をクリックします。これにより、ステップ 2 で抽出した商品が、ステップ 1 で作成したカートに追加され、チェックアウト URL が返されます。
6. **Add assertions (optional)** で、**Response Body** をクリックし、`url` キーをクリックして、チェックアウト URL を含む応答でジャーニーが終了したことをテストにアサートさせます。
7. この最後のステップでは、実行パラメーターや変数の抽出は必要ありません。
10. このテストステップの作成が完了したら、**Save Step** をクリックします。

{{< img src="getting_started/synthetics/defined-steps.png" alt="作成されたテストステップ" style="width:100%;" >}}

その後、テスト頻度やアラート条件など、残りのテスト条件やテストモニターを構成します。テストの構成とモニターを保存する準備ができたら、**Create** をクリックします。

詳しくは、[Synthetic テストモニターの使用][13]をご覧ください。

## テスト結果を確認する

**API test** と **Multistep API test detail** ページには、テストコンフィギュレーションの概要、ロケーションごとにテストされたエンドポイントに関連付けられたグローバル稼働時間、応答時間とネットワークタイミングに関するグラフ、およびテスト結果とイベントのリストが表示されます。

失敗したテストのトラブルシューティングを行うには、**Test Results** まで下にスクロールして、失敗したテスト結果をクリックします。失敗したアサーションと、ステータスコード、応答時間、関連するヘッダーと本文などの応答の詳細を確認して、問題を診断します。

{{< img src="getting_started/synthetics/api-test-failure-5.png" alt="API テストの失敗" style="width:100%;">}}

Datadog の [APM と Synthetic モニタリングのインテグレーション][14]を使用して、**Traces** タブでテスト実行から生成されたトレースを確認して、失敗したテスト実行の根本原因にアクセスします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/
[2]: /ja/synthetics/multistep
[3]: /ja/synthetics/api_tests/http_tests
[4]: https://app.datadoghq.com/synthetics/tests
[5]: https://app.datadoghq.com/synthetics/create
[6]: /ja/synthetics/settings/#global-variables
[7]: /ja/synthetics/api_tests/http_tests#variables
[8]: /ja/getting_started/synthetics/private_location
[9]: /ja/synthetics/ci
[10]: /ja/integrations/#cat-notification
[11]: https://app.datadoghq.com/account/settings
[12]: https://app.datadoghq.com/synthetics/multi-step/create
[13]: /ja/synthetics/guide/synthetic-test-monitors
[14]: /ja/synthetics/apm/
[15]: /ja/synthetics/api_tests/grpc_tests