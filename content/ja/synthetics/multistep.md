---
description: リクエストをチェーンして主要なサービスで高度なトランザクションを監視します。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-with-datadog/
  tag: ブログ
  text: Datadog マルチステップ API テストでワークフローを監視する
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: ラーニングセンター
  text: Synthetic テストの紹介
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: API テストの概要
- link: /synthetics/private_locations
  tag: Documentation
  text: 内部エンドポイントで Multistep API テストを実行する
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: 外部サイト
  text: Terraform による Synthetic Multistep API テストの作成と管理
title: マルチステップ API テスト
---

## 概要

Multistep API tests allow you to chain several [HTTP requests][1] or [gRPC requests][20] at once to proactively monitor and ensure that the sophisticated journeys on your key services are available at anytime, and from anywhere. If you want to perform single requests to your services, use [API tests][2].

以下を実現できます。

* 認証を必要とする API エンドポイントで HTTP リクエストを実行します (たとえば、トークンを介して)
* API レベルで主要なビジネストランザクションを監視します
* エンドツーエンドのモバイルアプリケーションのジャーニーをシミュレートします

{{< img src="synthetics/multistep_tests/multistep_test_steps.png" alt="マルチステップ API テストの複数のテストステップ" style="width:90%;" >}}

サービスの 1 つが応答遅延を起こしたり、予期しない方法 (たとえば、予期しない応答本文やステータスコード) で応答を開始した場合、テストは[**チームに警告する**][3]、[**CI パイプラインをブロックする**][4]、または[**障害のあるデプロイをロールバックする**][4]ことができます。

Multistep API テストは、Datadog [管理ロケーション](#select-locations)および[プライベートロケーション][5]から実行できるため、外部と内部の両方で**システムを完全にカバー**できます。

## 構成

### テストに名前を付けてタグを付ける

1. Multistep API テストに名前を付けます。
2. Multistep API テストに `env` タグおよび他のタグを追加します。これらのタグを使用して、[Synthetic Monitoring & Continuous Testing ページ][6]で Synthetic テストをフィルタリングできます。

### ロケーションを選択する

Multistep API テストの**ロケーション**を選択します。Multistep API テストは、ネットワークの外部または内部のどちらからテストを実行するかの好みによって、管理ロケーションと[プライベートロケーション][5]の両方から実行できます。

{{% managed-locations %}} 

### ステップを定義する

To create an API request step, click **Create Your First Step**.

{{< img src="synthetics/api_tests/ms_create_request.png" alt="Multistep API テストリクエストを作成する" style="width:90%;" >}}

デフォルトでは、最大 10 個のテストステップを作成することができます。この制限を増やすには、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>に連絡してください。

#### リクエストを定義する

1. ステップに**名前**を付けます。
2. リクエストタイプとして HTTP または gRPC を選択します。

   {{< tabs >}}
   {{% tab "HTTP" %}}

   See the [HTTP Tests documentation][101] to create an HTTP request and add assertions. Assertions are optional in multistep API tests.

   [101]: /synthetics/api_tests/http_tests/

   {{% /tab %}}
   {{% tab "gRPC" %}}

   See the [gRPC Tests documentation][101] to create a gRPC request and add assertions for a behavior check or a health check. Assertions are optional in multistep API tests.

   [101]: /synthetics/api_tests/grpc_tests#define-the-request

   {{% /tab %}}
   {{< /tabs >}}

#### 実行パラメーターの追加

**Continue with test if this step fails** をクリックすると、ステップに失敗しても次のステップに進むことができます。こうすることで、テストが後始末をすることができます。例えば、あるテストでは、リソースを作成し、そのリソースに対していくつかのアクションを実行し、そのリソースを削除して終了することができます。

中間ステップの 1 つが失敗した場合、テスト終了時にリソースが削除され、誤検出が発生しないようにするため、すべての中間ステップでこの設定を有効にしたいと思います。

このテストでは、エンドポイントが期待通りに応答しない場合、アラートが生成されます。テストが失敗した場合、Y ミリ秒後に X 回再試行することができます。再試行の間隔は、警告の感性に合うようにカスタマイズしてください。

#### 応答から変数を抽出する

Optionally, extract variables from the response of your API request by parsing its response headers or body. The value of the variable updates each time the API request step runs.

変数のパースを開始するには、**Extract a variable from response content** をクリックします。

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。また、3 文字以上にする必要があります。
2. 変数をレスポンスのヘッダーから抽出するか、本文から抽出するか決定します。

   * Extract the value from **response header**: use the full response header of your API request as the variable value, or parse it with a [`regex`][9].
   * Extract the value from **response body**: use the full response body of your API request as the variable value or parse it with a [`regex`][9], a [`JSONPath`][7], or a [`XPath`][8].

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="Extract variables from API requests in Multistep API test" style="width:90%;" >}}

1 つのテストステップにつき最大 10 個の変数を抽出することができます。一度作成すると、この変数はマルチステップ API テストの次のステップで使用することができます。詳しくは、[変数の使用](#use-variables)を参照してください。

### テストの頻度を指定する

Multistep API テストは次の頻度で実行できます。

* **On a schedule**: 最も重要なエンドポイントにユーザーが常にアクセスできるようにします。Datadog でマルチステップ API テストを実行する頻度を選択します。
* [**Within your CI/CD pipelines**][4]: 欠陥のあるコードがカスタマーエクスペリエンスに影響を与える可能性があることを恐れずに出荷を開始します。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### 変数の抽出

ローカル変数の作成に加えて、マルチステップ API テストの[任意のステップから変数を抽出](#extract-variables-from-the-response)し、[後続のステップで値を再挿入する](#use-variables)ことが可能です。

### Use variables

You can use the [global variables defined in the `Settings`][14] and the [locally defined variables](#create-local-variables) in the URL, advanced options, and assertions of your API tests.

変数のリストを表示するには、目的のフィールドに `{{` と入力します。

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Multistep API テストでの変数の使用" video="true" width="90%" >}}

## テストの失敗

ステップが 1 つまたは複数のアサーションを満たさない場合、またはステップのリクエストが時期尚早に失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストできずにテストが実際に失敗することがあります。これらの理由には次のものがあります。

`CONNREFUSED`
: ターゲットマシーンが積極的に拒否したため、接続できませんでした。

`CONNRESET`
: 接続がリモートサーバーによって突然閉じられました。Web サーバーにエラーが発生した、応答中にシステムが停止した、Web サーバーへの接続が失われた、などの原因が考えられます。

`DNS`
: テスト URL に対応する DNS エントリが見つかりませんでした。テスト URL の構成の誤りまたは DNS エントリの構成の誤りの原因が考えられます。

`INVALID_REQUEST` 
: テストのコンフィギュレーションが無効です (URL に入力ミスがあるなど)。

`SSL`
: SSL 接続を実行できませんでした。[詳細については、個別のエラーページを参照してください][15]。

`TIMEOUT`
: リクエストを一定時間内に完了できなかったことを示します。`TIMEOUT` には 2 種類あります。
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` は、リクエストの持続時間がテスト定義のタイムアウト (デフォルトは 60 秒に設定されています) に当たったことを示します。
  各リクエストについて、ネットワークウォーターフォールに表示されるのは、リクエストの完了したステージのみです。例えば、`Total response time` だけが表示されている場合、DNS の解決中にタイムアウトが発生したことになります。
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indicates that the request and assertions duration hit the maximum duration (30 minutes).

For HTTP steps, see [common HTTP step failures][15]. For gRPC steps, see [common gRPC step failures][16].

## 権限

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][17]を持つユーザーのみが、Synthetic Multistep API テストを作成、編集、削除できます。Synthetic Multistep API テストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][17]のいずれかにアップグレードします。

[カスタムロール機能][18]を使用している場合は、Synthetic Monitoring の `synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

### アクセス制限

アカウントに[カスタムロール][19]を使用しているお客様は、アクセス制限が利用可能です。

組織内の役割に基づいて、Multistep API テストへのアクセスを制限することができます。Multistep API テストを作成する際に、(ユーザーのほかに) どのロールがテストの読み取りと書き込みを行えるかを選択します。

{{< img src="synthetics/settings/restrict_access_1.png" alt="テストの権限の設定" style="width:70%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/http_tests
[2]: /ja/synthetics/api_tests/
[3]: /ja/synthetics/api_tests/http_tests?tab=requestoptions#configure-the-test-monitor
[4]: /ja/synthetics/cicd_integrations
[5]: /ja/synthetics/private_locations
[6]: /ja/synthetics/search/#search-for-tests
[7]: https://restfulapi.net/json-jsonpath/
[8]: https://www.w3schools.com/xml/xpath_syntax.asp
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[10]: /ja/monitors/notify/?tab=is_alert#configure-notifications-and-automations
[11]: http://daringfireball.net/projects/markdown/syntax
[12]: /ja/monitors/notify/variables/?tab=is_alert#conditional-variables
[13]: /ja/synthetics/guide/synthetic-test-monitors
[14]: /ja/synthetics/settings/#global-variables
[15]: /ja/synthetics/api_tests/http_tests?tab=requestoptions#test-failure
[16]: /ja/synthetics/api_tests/grpc_tests?tab=unarycall#test-failure
[17]: /ja/account_management/rbac/
[18]: /ja/account_management/rbac#custom-roles
[19]: /ja/account_management/rbac/#create-a-custom-role
[20]: /ja/synthetics/api_tests/grpc_tests