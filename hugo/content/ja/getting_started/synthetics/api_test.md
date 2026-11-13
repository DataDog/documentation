---
description: Datadog API テストを作成して、エンドポイントを能動的に監視します。アサーションを含む単一およびマルチステップの API テストを作成し、アラートを送信するように設定し、問題のトラブルシューティングを行います。
further_reading:
- link: /api/latest/synthetics/#create-an-api-test
  tag: API
  text: プログラムによる API テストの作成
- link: /synthetics/api_tests
  tag: ドキュメント
  text: 単一の API テストの詳細
- link: /getting_started/synthetics/private_location
  tag: ドキュメント
  text: プライベートロケーションの詳細
- link: /continuous_testing/cicd_integrations/
  tag: ドキュメント
  text: CI/CD パイプラインから Synthetic テストをトリガーする方法
- link: /synthetics/guide/identify_synthetics_bots
  tag: ドキュメント
  text: API テスト用の Synthetic ボットを特定する方法
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターの詳細
- link: /synthetics/guide/export-tests-to-terraform
  tag: ガイド
  text: Synthetic テストを Terraform にエクスポートする
title: API テストの概要
---
## 概要 {#overview}

API テストは、**最も重要なサービス**がいつでもどこからでも利用可能であることを**プロアクティブに監視**します。[単一の API テスト][1] には 8 つのサブタイプがあり、システムのさまざまなネットワークレイヤー (`HTTP`、`SSL`、`DNS`、`WebSocket`、`TCP`、`UDP`、`ICMP`、および `gRPC`) でリクエストを開始できます。[マルチステップ API テスト][2] を使用すると、API テストを順番に実行して、API レベルで主要なジャーニーの稼働時間を監視することができます。

## 単一の API テストを作成する {#create-a-single-api-test}

HTTP テストは、API エンドポイントを監視し、レスポンス遅延が大きい場合や、期待される HTTP ステータスコード、レスポンスヘッダー、レスポンス本文の内容など、定義した条件を満たさない場合にアラートを送信します。

以下の例では、[単一の API テスト][1] のサブタイプである [HTTP テスト][3] を作成する方法を示しています。

1. Datadog サイトで、[{{< ui >}}Digital Experience{{< /ui >}}] (デジタルエクスペリエンス) にカーソルを合わせ、[{{< ui >}}Synthetic Monitoring & Testing{{< /ui >}}] の下にある [[{{< ui >}}Tests{{< /ui >}}][4]] (テスト) を選択します。

2. {{< ui >}}New Test{{< /ui >}} をクリックし、[{{< ui >}}New API test{{< /ui >}}][5] をクリックします。

3. 次のいずれかの方法でテストを作成します。

   - **テンプレートからテストを作成する**:

      1. 事前設定済みテンプレートのいずれかにカーソルを合わせて、[{{< ui >}}View Template{{< /ui >}}] (テンプレートを表示) をクリックします。すると、[Test Details] (テストの詳細)、[Request Details] (リクエストの詳細)、[Assertions] (アサーション)、[Alert Conditions] (アラートの条件)、[Monitor Settings] (モニターの設定) など、あらかじめ設定された構成情報が表示されるサイドパネルが開きます。
      2. [{{< ui >}}+Create Test{{< /ui >}}] (テストを作成) をクリックして、[{{< ui >}}Define Request{{< /ui >}}] (リクエストを定義) ページを開きます。このページで、事前に設定された構成オプションを確認し、編集できます。表示されるフィールドは、テストを一から作成する際に利用可能なフィールドと同じです。
      3. [{{< ui >}}Save Details{{< /ui >}}] (詳細を保存) をクリックして、API テストを送信します。<br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="テンプレートを使った Synthetics API テストのランディングページの動画" video="true" >}}

   - **テストを一から作成する**:

      1. テストを一から作成するには、[{{< ui >}}+ Start from scratch{{< /ui >}}] (テストを一から作成する) テンプレートをクリックし、`HTTP` リクエストタイプを選択します。

      2. 監視するエンドポイントの URL を追加します。何から始めればよいかわからない場合は、テスト用の e コマース Web アプリケーションである `https://www.shopist.io/` を使用できます。テスト用の Shopist URL を使用する場合、テスト名 `Test on shopist.io` が自動入力されます。 

      3. 必要に応じて [{{< ui >}}Advanced Options{{< /ui >}}] (詳細オプション) を選択すると、カスタムリクエストオプションの設定、証明書や認証情報の追加、動的入力用の安全な [グローバル変数][6] や [ローカル変数][7] の作成ができます。

         **注**: 該当するフィールドに `{{` と入力すると、変数を選択して、その値をテストオプションに挿入できます。
          
      4. Optionally, set tags such as `env:prod` and `app:shopist` on your test. Tags allow you to keep your test suite organized and quickly find tests you're interested in on the homepage.

      5. Click {{< ui >}}Send{{< /ui >}} to trigger a sample test run.

         {{< img src="getting_started/synthetics/api-test-config-4.png" alt="API テスト構成" style="width:90%;">}}

      6. Click {{< ui >}}Create Test{{< /ui >}} to submit your API test.

### アサーションを定義する {#define-assertions}

[{{< ui >}}Send{{< /ui >}}] (送信) をクリックすると、エンドポイントのレスポンスに対する基本的なアサーションが自動的に入力されます。アサーションは、テスト実行が成功したとみなされる条件を定義します。

この例では、サンプルのテスト実行をトリガーした後、3 つのデフォルトのアサーションが設定されます。

{{< img src="getting_started/synthetics/assertions-example-2.png" alt="デフォルトのアサーション" style="width:100%;">}}

アサーションは完全にカスタマイズ可能です。カスタムアサーションを追加するには、ヘッダーなどのレスポンスプレビューの要素をクリックするか、[{{< ui >}}New Assertion{{< /ui >}}] (新しいアサーション) をクリックして新しいアサーションを最初から定義します。

{{< img src="getting_started/synthetics/api-test-configuration-2.mp4" alt="API テスト構成の例" video="true" >}}

### ロケーションを選択する {#select-locations}

テストを実行する [{{< ui >}}Managed Locations{{< /ui >}}] (管理ロケーション) または [{{< ui >}}Private Locations{{< /ui >}}] (プライベートロケーション) を 1 つ以上選択します。{{% managed-locations %}}

Shopist アプリケーションは `https://www.shopist.io/` で公開されているため、テストを実行する任意の管理ロケーションを選択できます。内部アプリケーションをテストする場合や、特定の地理的リージョンでのユーザーの動作をシミュレートする場合は、代わりに [プライベートロケーション][8] を使用します。

### テストの頻度を指定する{#specify-test-frequency}

テストを実行する頻度を選択します。デフォルトの頻度である 1 分のままにしておくことができます。

スケジュールに従って Synthetic テストを実行できるだけでなく、手動で実行したり、[CI/CD パイプライン][9] から直接トリガーしたりすることもできます。

### アラート条件を定義する {#define-alert-conditions}

アラート条件を定義して、散発的なネットワークブリップなどのテストがトリガーされないようにすることができます。これにより、エンドポイントに実際の問題が発生した場合にのみアラートが送信されるようになります。

ロケーションが失敗したと見なされるまでに、連続して何回失敗する必要があるかを指定できます。

```text
Retry test 2 times after 300 ms in case of failure
```

また、エンドポイントが一定時間ダウンし、かつ特定の数のロケーションでテストが失敗した場合にのみ通知をトリガーするようにテストを構成することもできます。以下の例では、2 つの異なるロケーションでテストが 3 分間失敗した場合に通知を送信するようにアラートルールが設定されています。

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### テストモニターを構成する {#configure-the-test-monitor}

このセクションを使用して、通知と一緒に送信する **メッセージ** を作成します。通知には、カスタムメッセージと失敗したロケーションに関する詳細が含まれます。自動入力済みのモニターメッセージがメッセージ本文に含まれています。

{{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="自動入力済みのモニターメッセージが強調表示されている Synthetic Monitoring のモニターセクション" style="width:100%;" >}}

たとえば、次のモニターメッセージは、ステップを反復処理し、ブラウザテスト用の変数を抽出するモニターを作成します。

   ```text
   {{!成功したすべてのステップで抽出された変数を一覧表示 }}
   # 抽出された変数
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **名前**: `{{extractedValue.name}}`
   **値:** {{#if extractedValue.secure}}*難読化 (値は非表示)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

When you're ready to save your test configuration and monitor, click {{< ui >}}Save & Edit Recording{{< /ui >}}.

For more information, see [Using Synthetic Test Monitors][13].


## Create a multistep API test 

[Multistep API tests][2] allow you to monitor key business transactions at the API level. 

{{< img src="getting_started/synthetics/multistep-api-test.png" alt="マルチステップ Synthetics API テストの概要" style="width:100%;" >}}

[API テスト][3] と同様に、マルチステップ API テストでは、エンドポイントの応答が遅すぎる場合や定義した条件を満たさない場合にアラートを送信します。個々のステップのレスポンスから変数を作成し、その値を後続のステップに再注入します。これにより、ステップを連鎖させて、アプリケーションやサービスの動作を模倣下テストを構築できます。

以下のテスト例は、カートへのアイテムの追加を監視するマルチステップ API テストの作成を示しています。このテストには、次の 3 つのステップが含まれます。

- カートを取得する
- 商品を取得する
- カートに商品を追加する

マルチステップ API テストを作成する API エンドポイントがわからない場合は、下記のエンドポイントの例を使用してください。

新しいマルチステップ API テストを作成するには、[{{< ui >}}New Test{{< /ui >}}] (新しいテスト) > [[{{< ui >}}Multistep API test{{< /ui >}}][12]] (マルチステップ API テスト) をクリックします。テスト名として `Add product to cart` などを追加し、タグを含め、ロケーションを選択します。

### カートを取得する {#get-a-cart}

1. [{{< ui >}}Define steps{{< /ui >}}] (ステップを定義) で、[{{< ui >}}Create Your First Step{{< /ui >}}] (最初のステップを作成) をクリックします。
2. ステップに名前 (例: `Get a cart`) を追加します。
3. HTTP メソッドとクエリを実行する URL を指定します。`POST` と `https://api.shopist.io/carts` を入力できます。
4. [{{< ui >}}Test URL{{< /ui >}}] (テスト URL) をクリックします。これにより、Shopist アプリケーションのバックエンドにカートアイテムが作成されます。
5. デフォルトのアサーションのままにするか、変更します。
6. オプションで、実行パラメーターを定義します。

    [{{< ui >}}Continue with test if this step fails{{< /ui >}}] (このステップが失敗した場合にもテストを続行) を選択すると、前のステップの成功や失敗に関係なく、エンドポイントコレクション全体がテストされるようにしたり、最後のクリーンアップステップが確実に実行されるようにしたりするのに役立ちます。{{< ui >}}Retry{{< /ui >}} ステップ機能は、API エンドポイントの応答に時間がかかる可能性があることがわかっている場合に便利です。
    
    この例では、特定の実行パラメーターは必要ありません。

7. `location` ヘッダーの最後にあるカート ID の値から変数を作成するには、次のようにします。
    - {{< ui >}}Extract a variable from response content{{< /ui >}} をクリックします。
    - 変数に `CART_ID` という名前を付けます。
    - {{< ui >}}Response Header{{< /ui >}} で、`location` を選択します。
    - {{< ui >}}Parsing Regex{{< /ui >}} フィールドに、`(?:[^\\/](?!(\\|/)))+$` などの正規表現を追加します。

   {{< img src="getting_started/synthetics/multistep-test-extract-variables.png" alt="レスポンスコンテンツから抽出された変数" style="width:100%;" >}}

8. {{< ui >}}Save Variable{{< /ui >}} をクリックします。
9. このテストステップの作成が完了したら、{{< ui >}}Save Step{{< /ui >}} をクリックします。

### 商品を取得する {#get-a-product}
   
1. {{< ui >}}Define another step{{< /ui >}} で、{{< ui >}}Add Another Step{{< /ui >}} をクリックします。デフォルトでは、最大 10 ステップまで作成できます。
2. ステップに名前 (例: `Get a product`) を追加します。
3. HTTP メソッドとクエリを実行する URL を指定します。ここでは、`GET` と `https://api.shopist.io/products.json` を追加できます。
4. [{{< ui >}}Test URL{{< /ui >}}] (テスト URL) をクリックします。これにより、Shopist アプリケーションで利用可能な商品のリストが取得されます。
5. デフォルトのアサーションのままにするか、変更します。
6. オプションで、実行パラメーターを定義します。この例では、特定の実行パラメーターは必要ありません。
7. レスポンス本文にある商品 ID から変数を作成するには、次のようにします。
    - {{< ui >}}Extract a variable from response content{{< /ui >}} をクリックします。
    - 変数に `PRODUCT_ID` という名前を付けます。
    - {{< ui >}}Response Body{{< /ui >}} タブをクリックします。
    - 商品の `$oid` キーをクリックして、`$[0].id['$oid']` などの JSON パスを生成します。
8. {{< ui >}}Save Variable{{< /ui >}} をクリックします。
9. このテストステップの作成が完了したら、{{< ui >}}Save Step{{< /ui >}} をクリックします。

### カートに商品を追加する {#add-product-to-cart}

1. {{< ui >}}Add Another Step{{< /ui >}} をクリックして、商品のカートへの追加という最後のステップを追加します。
2. ステップに名前 (例: `Add product to cart`) を追加します。
3. HTTP メソッドとクエリを実行する URL を指定します。ここでは、`POST` と `https://api.shopist.io/add_item.json` を追加できます。
4. {{< ui >}}Request Body{{< /ui >}} タブで、`application/json` ボディタイプを選択し、以下を挿入します。
        
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
        
5. {{< ui >}}Test URL{{< /ui >}} をクリックします。これにより、ステップ 2 で抽出した商品が、ステップ 1 で作成したカートに追加され、チェックアウト URL が返されます。
6. {{< ui >}}Add assertions (optional){{< /ui >}} で {{< ui >}}Response Body{{< /ui >}} をクリックし、`url` キーをクリックして、ジャーニーがチェックアウト URL を含むレスポンスで終了したことをテストでアサートします。
7. この最後のステップでは、実行パラメーターや変数の抽出は必要ありません。
10. このテストステップの作成が完了したら、{{< ui >}}Save Step{{< /ui >}} をクリックします。

{{< img src="getting_started/synthetics/defined-steps.png" alt="作成されたテストステップ" style="width:100%;" >}}

この後で、テスト頻度やアラート条件、テストモニターなど、残りのテスト条件を構成できます。テストの構成とモニターを保存する準備ができたら、{{< ui >}}Create{{< /ui >}} をクリックします。

詳しくは、[Synthetic テストモニターの使用][13] をご覧ください。

## テスト結果を確認する{#look-at-test-results}

{{< ui >}}API test{{< /ui >}} と {{< ui >}}Multistep API test detail{{< /ui >}} ページには、テスト構成の概要、ロケーションごとにテストされたエンドポイントに関連付けられたグローバル稼働時間、レスポンス時間とネットワークタイミングに関するグラフ、およびテスト結果とイベントのリストが表示されます。

失敗したテストのトラブルシューティングを行うには、[**Activity**] (アクティビティ) タブまたは [**Test Runs**] (テスト実行) タブで失敗を確認し、失敗したテスト結果をクリックします。失敗したアサーションと、ステータスコード、レスポンス時間、関連するヘッダーや本文などのレスポンス詳細を確認して、問題を診断します。

{{< img src="synthetics/api_tests/api_test_summary_updated.png" alt="グローバルアップタイム、アラートタイムライン、最近のテスト実行一覧が表示されている [Activity] タブを示す API テスト詳細ページ" style="width:100%;">}}

Datadog の [APM と Synthetic Monitoring のインテグレーション][14] を使用して、{{< ui >}}Traces{{< /ui >}} タブでテスト実行から生成されたトレースを確認し、失敗したテスト実行の根本原因にアクセスします。

### Bits Investigation を起動する{#launch-a-bits-investigation}

Synthetic API テストの失敗の根本原因を特定するには、[Bits Investigation][16] を起動します。Bits Investigation は、テスト結果、トレース、ログ、およびメトリクスを分析して根本原因を明らかにし、その失敗がリグレッションによるものか、設定ミスによるものかをフラグ付けします。

## 参考資料 {#further-reading}

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
[13]: /ja/monitors/types/synthetic_monitoring/
[14]: /ja/synthetics/apm/
[15]: /ja/synthetics/api_tests/grpc_tests
[16]: /ja/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page