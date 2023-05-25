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
  tag: Terraform
  text: Terraform による Synthetic Multistep API テストの作成と管理
kind: documentation
title: Multistep API テスト
---

## 概要

Multistep API テストは、一度に複数の [HTTP リクエスト][1]を連鎖させ、主要サービスの洗練されたジャーニーをいつでも、どこからでもプロアクティブに監視・確認できるようにするものです。サービスに対して単一のリクエストを実行したい場合は、[API テスト][2]を活用してください。

以下を実現できます。

* 認証を必要とする API エンドポイントで HTTP リクエストを実行します (たとえば、トークンを介して)
* API レベルで主要なビジネストランザクションを監視します
* エンドツーエンドのモバイルアプリケーションのジャーニーをシミュレートします

{{< img src="synthetics/multistep_tests/multistep_test_steps.png" alt="マルチステップ API テストの複数のテストステップ" style="width:90%;" >}}

サービスの 1 つが応答遅延を起こしたり、予期しない方法 (たとえば、予期しない応答本文やステータスコード) で応答を開始した場合、テストは[**チームに警告する**][3]、[**CI パイプラインをブロックする**][4]、または[**障害のあるデプロイをロールバックする**][4]ことができます。

Multistep API テストは、Datadog [管理ロケーション](#select-locations)および[プライベートロケーション][5]から実行できるため、外部と内部の両方で**システムを完全にカバー**できます。

## コンフィギュレーション

### テストに名前を付けてタグを付ける

1. Multistep API テストに名前を付けます。
2. Multistep API テストに `env` などのタグを追加します。これらのタグを使用して、[Synthetic Monitoring ホームページ][6]で Synthetic テストをすばやくフィルタリングできます。

### ロケーションを選択する

Multistep API テストの**ロケーション**を選択します。Multistep API テストは、ネットワークの外部または内部のどちらからテストを実行するかの好みによって、管理ロケーションと[プライベートロケーション][5]の両方から実行できます。

{{% managed-locations %}} 

### ステップを定義する

HTTP リクエストのステップを作成するには、**Create Your First Step** をクリックします。

{{< img src="synthetics/api_tests/ms_create_request.png" alt="Multistep API テストリクエストを作成する" style="width:90%;" >}}

デフォルトでは、最大 10 個のテストステップを作成することができます。この制限を増やすには、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>に連絡してください。

#### リクエストを定義する

1. ステップに**名前**を付けます。
2. **HTTP Method** を選択し、クエリする **URL** を指定します。使用可能なメソッドは、`GET`、`POST`、`PATCH`、`PUT`、`HEAD`、`DELETE`、`OPTIONS` です。`http` と `https` の両方の URL がサポートされています。
3. **Advanced Options** を使用して HTTP リクエストを加工します (オプション)。

   {{< tabs >}}

   {{% tab "リクエストオプション" %}}

   * **Follow redirects**: チェックマークを付けると、リクエストを実行するときに HTTP テストで最大 10 個のリダイレクトをフォローします。
   * **Ignore server certificate error**: チェックマークを付けると、SSL 証明書の検証時にエラーが発生した場合でも、HTTP テストが接続を続行します。
   * **Request headers**: HTTP リクエストに追加するヘッダーを定義します。デフォルトのヘッダー (たとえば、`user-agent` ヘッダー) をオーバーライドすることもできます。
   * **Cookies**: HTTP リクエストに追加するクッキーを定義します。`<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>` の形式を使用して複数のクッキーを設定します。

   {{< /tabs >}}

   {{% tab "認証" %}}

   * **Client certificate**: クライアント証明書と関連する秘密キーをアップロードして、mTLS を介して認証します。
   * **HTTP Basic Auth**: HTTP 基本認証資格情報を追加します。
   * **Digest Auth**: ダイジェスト認証の資格情報を追加します。
   * **NTLM**: NTLM 認証の資格情報を追加します。NTLMv2 と NTLMv1 の両方をサポートします。
   * **AWS Signature v4**: Access Key ID と Secret Access Key を入力します。Datadog は、リクエストの署名を生成します。このオプションは、SigV4 の基本的な実装を使用します。AWS S3 などの特定の署名はそのままではサポートされていません。
   AWS S3 バケットへの "Single Chunk" 転送リクエストでは、リクエストの本文を sha256 エンコードした `x-amz-content-sha256` をヘッダーとして追加します (本文が空の場合: `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`)。
   * **OAuth 2.0**: クライアント資格情報またはリソース所有者のパスワードのどちらかを付与するかを選択し、アクセストークンの URL を入力します。選択内容に応じて、クライアント ID とシークレット、またはユーザー名とパスワードを入力します。ドロップダウンメニューから、API トークンを基本認証ヘッダーとして送信するか、クライアント資格情報を本文に送信するかを選択します。オプションで、オーディエンス、リソース、スコープなどの追加情報を提供できます (**Resource Owner Password** を選択した場合は、クライアント ID とシークレットも提供します)。

   {{< /tabs >}}

   {{% tab "クエリパラメーター" %}}

   * **Encode parameters**: エンコーディングが必要なクエリパラメーターの名前と値を追加します。

   {{< /tabs >}}

   {{% tab "リクエスト本文" %}}

   * **Body type**: HTTP リクエストに追加するリクエスト本文のタイプ (`text/plain`、`application/json`、`text/xml`、`text/html`、`application/x-www-form-urlencoded`、`GraphQL`、または `None`) を選択します。
   * **Request body**: HTTP リクエスト本文のコンテンツを追加します。リクエスト本文は最大サイズ 50 キロバイトに制限されています。

   {{< /tabs >}}

   {{% tab "プロキシ" %}}

   * **Proxy URL**: HTTP リクエストが通過する必要があるプロキシの URL (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`) を指定します。
   * **Proxy Header**: プロキシへの HTTP リクエストに含めるヘッダーを追加します。

   {{< /tabs >}}

   {{% tab "Privacy" %}}

   * **Do not save response body**: レスポンスの本文が実行時に保存されないようにするには、このオプションを選択します。これは、テスト結果に機密データが表示されないようにするために役立ちますが、障害のトラブルシューティングが困難になる可能性があります。セキュリティに関する推奨事項については、[Synthetic モニタリングデータセキュリティ][1]を参照してください。

[1]: /ja/data_security/synthetics
   {{% /tab %}}

   {{< /tabs >}}

**Test URL** をクリックして、リクエストのコンフィギュレーションをテストします。応答プレビューが表示されます。

{{< img src="synthetics/api_tests/ms_define_request.png" alt="Multistep API テストのリクエストを定義する" style="width:90%;" >}}

#### アサーションの追加

アサーションは、期待されるテスト結果が何であるかを定義します。**Test URL** をクリックすると、`response time`、`status code`、`header`、`content-type` の基本的なアサーションが、取得された応答に基づいて追加されます。マルチステップ API テストでは、アサーションはオプションです。

| タイプ          | 演算子                                                                                               | 値の型                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| 本文          | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`、<br> [`jsonpath`][7]、[`xpath`][8] | _String_ <br> _[Regex][9]_ <br> _String_、_[Regex][9]_ |
| ヘッダー        | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`                       | _String_ <br> _[Regex][9]_                                      |
| response time | `is less than`                                                                                         | 整数 (ms)                                                  |
| ステータスコード   | `is`、`is not`                                                                                         | 整数                                                      |

HTTP テストでは、`br`、`deflate`、`gzip`、`identity` の `content-encoding` ヘッダーを使用して本文を解凍することが可能です。

- テストがレスポンス本文にアサーションを含まない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連するレスポンスタイムを返します。

- テストがレスポンス本文に対するアサーションを含み、タイムアウトの制限に達した場合、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

{{< img src="synthetics/api_tests/ms_assertions.png" alt="Multistep API テストが成功または失敗するためのアサーションを定義する" style="width:90%;" >}}

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、ステップごとに最大 20 個のアサーションを作成できます。

#### 実行パラメーターの追加

**Continue with test if this step fails** をクリックすると、ステップに失敗しても次のステップに進むことができます。こうすることで、テストが後始末をすることができます。例えば、あるテストでは、リソースを作成し、そのリソースに対していくつかのアクションを実行し、そのリソースを削除して終了することができます。

中間ステップの 1 つが失敗した場合、テスト終了時にリソースが削除され、誤検出が発生しないようにするため、すべての中間ステップでこの設定を有効にしたいと思います。

このテストでは、エンドポイントが期待通りに応答しない場合、アラートが生成されます。テストが失敗した場合、Y ミリ秒後に X 回再試行することができます。再試行の間隔は、警告の感性に合うようにカスタマイズしてください。

#### 応答から変数を抽出する

オプションで、応答ヘッダーまたは本文をパースすることにより、HTTP リクエストの応答から変数を抽出します。変数の値は、HTTP リクエストステップが実行されるたびに更新されます。

変数のパースを開始するには、**Extract a variable from response content** をクリックします。

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。また、3 文字以上にする必要があります。
2. 変数をレスポンスのヘッダーから抽出するか、本文から抽出するか決定します。

   * **応答ヘッダー**から値を抽出: HTTP リクエストの応答ヘッダー全体を変数値に使用するか、[`regex`][9] によりパースします。
   * **応答本文**から値を抽出: HTTP リクエストの応答本文全体を変数値に使用するか、[`regex`][9]、[`JSONPath`][7] または [`XPath`][8] によりパースします。

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="Multistep API テストで HTTP リクエストから変数を抽出する" style="width:90%;" >}}

1 つのテストステップにつき最大 10 個の変数を抽出することができます。一度作成すると、この変数はマルチステップ API テストの次のステップで使用することができます。詳しくは、[変数の使用](#use-variables)を参照してください。

### テストの頻度を指定する

Multistep API テストは次の頻度で実行できます。

* **On a schedule**: 最も重要なエンドポイントにユーザーが常にアクセスできるようにします。Datadog で Multistep API テストを実行する頻度を選択します。

{{< img src="synthetics/api_tests/schedule.png" alt="スケジュールどおりに API テストを実行する" style="width:90%;" >}}

* [**Within your CI/CD pipelines**][4]: 欠陥のあるコードがカスタマーエクスペリエンスに影響を与える可能性があることを恐れずに出荷を開始します。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

### アラート条件を定義する

アラート条件で、テストが失敗しアラートをトリガーする状況を設定します。

#### アラート設定規則

アラートの条件を `An alert is triggered if any assertion fails for X minutes from any n of N locations` に設定すると、次の 2 つの条件が当てはまる場合にのみアラートがトリガーされます。

* 直近 *X* 分間に、最低 1 個のロケーションで失敗 (最低 1 つのアサーションが失敗)、
* 直近 *X* 分間に、ある時点で最低 *n* 個のロケーションで失敗。

#### 高速再試行

テストが失敗した場合、`Y` ミリ秒後に `X` 回再試行することができます。再試行の間隔は、警告の感性に合うようにカスタマイズしてください。

ロケーションのアップタイムは、評価ごとに計算されます (評価前の最後のテスト結果がアップかダウンか)。合計アップタイムは、構成されたアラート条件に基づいて計算されます。送信される通知は、合計アップタイムに基づきます。

### テストモニターを構成する

以前に定義された[アラート条件](#define-alert-conditions)に基づいて、テストによって通知が送信されます。このセクションを使用して、チームに送信するメッセージの方法と内容を定義します。

1. [モニターと同様][10]、メッセージに `@notification`を追加するか、ドロップダウンボックスでチームメンバーと接続されたインテグレーションを検索して、通知を受信する**ユーザーやサービス**を選択します。

2. テストの通知**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][11]のほか、以下の[条件付き変数][12]を使用できます。

    | 条件付き変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            |テストがアラートを発する場合に表示します。                                          |
    | `{{^is_alert}}`            |テストがアラートを発しない限り表示します。                                        |
    | `{{#is_recovery}}`         |テストがアラートから回復したときに表示します。                             |
    | `{{^is_recovery}}`         |テストがアラートから回復しない限り表示します。                           |

3. テストが失敗した場合に、テストで**通知メッセージを再送信する**頻度を指定します。テストの失敗を再通知しない場合は、`Never renotify if the monitor has not been resolved` オプションを使用してください。
4. **Create** をクリックすると、テストの構成とモニターが保存されます。

詳しくは、[Synthetic テストモニターの使用][13]をご覧ください。

## 変数

### 変数の抽出

ローカル変数の作成に加えて、マルチステップ API テストの[任意のステップから変数を抽出](#extract-variables-from-the-response)し、[後続のステップで値を再挿入する](#use-variables)ことが可能です。

### ローカル変数を作成する

ローカル変数を作成するには、右上の **Create Local Variable** をクリックします。以下の利用可能なビルトインのいずれかから選択することができます。

`{{ numeric(n) }}`
: `n` 桁の数字列を生成します。

`{{ alphabetic(n) }}`
: `n` 文字のアルファベット文字列を生成します。

`{{ alphanumeric(n) }}`
: `n` 文字の英数字文字列を生成します。

`{{ uuid }}`
: バージョン 4 の UUID (Universally unique identifier) を生成します。

`{{ date(n unit, format) }}` 
: テストが + または - `n` 単位で開始された UTC 日付に対応する値を使用して、Datadog の許容される形式のいずれかで日付を生成します。

`{{ timestamp(n, unit) }}` 
: テストが + または - `n` 単位で開始された UTC タイムスタンプに対応する値を使用して、Datadog の許容される単位のいずれかでタイムスタンプを生成します。

テスト結果のローカル変数値を難読化するには、**Hide and obfuscate variable value** を選択します。変数文字列を定義したら、**Add Variable** をクリックします。

### 変数を使用する

HTTP テストの URL、高度なオプション、およびアサーションで、[`Settings` で定義されたグローバル変数][14]と[ローカルで定義された変数](#create-local-variables)を使用できます。

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
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`  は、リクエストとアサーションの時間が最大時間 (60.5s) に達したことを示しています。

`MALFORMED_RESPONSE` 
: リモートサーバーが HTTP 仕様に準拠していないペイロードで応答しました。

## アクセス許可

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][16]を持つユーザーのみが、Synthetic Multistep API テストを作成、編集、削除できます。Synthetic Multistep API テストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][16]のいずれかにアップグレードします。

[カスタムロール機能][17]を使用している場合は、Synthetic Monitoring の `synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

### アクセス制限

アカウントに[カスタムロール][18]を使用しているお客様は、アクセス制限が利用可能です。

組織内の役割に基づいて、Multistep API テストへのアクセスを制限することができます。Multistep API テストを作成する際に、(ユーザーのほかに) どのロールがテストの読み取りと書き込みを行えるかを選択します。

{{< img src="synthetics/settings/restrict_access.png" alt="テストのアクセス許可の設定" style="width:70%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/http_tests
[2]: /ja/synthetics/api_tests/
[3]: /ja/synthetics/api_tests/http_tests?tab=requestoptions#notify-your-team
[4]: /ja/synthetics/cicd_integrations
[5]: /ja/synthetics/private_locations
[6]: /ja/synthetics/search/#search
[7]: https://restfulapi.net/json-jsonpath/
[8]: https://www.w3schools.com/xml/xpath_syntax.asp
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[10]: /ja/monitors/notify/?tab=is_alert#notification
[11]: http://daringfireball.net/projects/markdown/syntax
[12]: /ja/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[13]: /ja/synthetics/guide/synthetic-test-monitors
[14]: /ja/synthetics/settings/#global-variables
[15]: /ja/synthetics/api_tests/errors/#ssl-errors
[16]: /ja/account_management/rbac/
[17]: /ja/account_management/rbac#custom-roles
[18]: /ja/account_management/rbac/#create-a-custom-role