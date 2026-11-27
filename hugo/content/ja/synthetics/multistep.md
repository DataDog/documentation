---
description: リクエストを続けて行って、主要サービスの高度なトランザクションを監視します。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-with-datadog/
  tag: ブログ
  text: Datadog マルチステップ API テストでワークフローを監視する
- link: /synthetics/guide/version_history/
  tag: ガイド
  text: Synthetic Monitoring のバージョン履歴
- link: /synthetics/private_locations
  tag: ドキュメント
  text: 内部エンドポイントでマルチステップ API テストを実行する
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: 外部サイト
  text: Terraform による Synthetic マルチステップ API テストの作成と管理
- link: /synthetics/guide/export-tests-to-terraform
  tag: ガイド
  text: Synthetic API テストを Terraform にエクスポートする
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: ラーニングセンター
  text: Synthetic Monitoring およびブラウザテストの概要
title: マルチステップ API テスト
---
## 概要 {#overview}

マルチステップ API テストでは、複数の [API テスト][1]を一度に連続して実行し、主要サービスにおける高度なプロセスが利用可能であることを、いつでも、どこからでも事前に監視し、確認することができます。サービスに対してリクエストを 1 つのみ実行する場合は、[API テスト][1]を使用してください。

以下を行えます。

* 認証が必要な API エンドポイントで HTTP リクエストを実行する (たとえば、トークンを利用して)
* API レベルで主要なビジネストランザクションを監視する
* エンドツーエンドのモバイルアプリケーションジャーニーをシミュレートする

{{< img src="synthetics/multistep_tests/multistep_test_steps.png" alt="マルチステップ API テストにおける複数のテストステップ" style="width:90%;" >}}

いずれかのサービスで応答速度が低下したり、予期しない形で応答するようになった (予期しないレスポンスボディやステータスコードで応答するなど) 場合は、テストが[**チームにアラートを送信する**][2]、[**CI パイプラインをブロックする**][3]、または[**問題が発生したデプロイをロールバックする**][3]ことができます。

マルチステップ API テストは、Datadog の[管理対象の](#select-locations)ロケーションおよび[プライベートロケーション][4]から実行できるので、外部および内部の両方について**システム全体を完全にテスト**できます。

## 構成 {#configuration}

### テストに名前とタグを付ける {#name-and-tag-your-test}

1. マルチステップ API テストに名前を付けます。
2. マルチステップ API テストに `env` やその他のタグを追加します。これらのタグを使用して、[[Synthetic Monitoring & Continuous Testing] ページ][5]で Synthetic テストをフィルタリングできます。

### ロケーションを選択する {#select-locations}

マルチステップ API テストの [{{< ui >}}Locations{{< /ui >}}] (ロケーション) を選択します。マルチステップ API テストは、ネットワークの外部と内部のどちらからテストを実行するのかに応じて、管理対象のロケーションと[プライベートロケーション][4]のいずれからでも実行できます。

{{% managed-locations %}} 

### ステップを定義する {#define-steps}

API リクエストステップを作成するには、[{{< ui >}}Create Your First Step{{< /ui >}}] (最初のステップを作成する) をクリックします。

{{< img src="synthetics/api_tests/ms_create_request.png" alt="マルチステップ API テストリクエストを作成する" style="width:90%;" >}}

デフォルトでは、最大 10 個のテストステップを作成できます。この上限を増やすには、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>にお問い合わせください。

#### リクエストを定義する {#define-the-request}

1. **ステップに名前**を付けます。
2. リクエストタイプを選択します。
   
   {{< tabs >}}
   {{% tab "HTTP" %}}

   HTTP リクエストを作成し、動作チェックやヘルスチェックのためのアサーションを追加するには、[HTTP テストのドキュメント][101]を参照してください。マルチステップ API テストでは、アサーションはオプションです。

   [101]: /synthetics/api_tests/http_tests/

   {{% /tab %}}
   {{% tab "gRPC" %}}

   gRPC リクエストを作成し、動作チェックやヘルスチェックのためのアサーションを追加するには、[gRPC テストのドキュメント][102]を参照してください。マルチステップ API テストでは、アサーションはオプションです。

   [102]: /synthetics/api_tests/grpc_tests/

   {{% /tab %}}

   {{% tab "SSL" %}}

   SSL リクエストを作成し、動作チェックやヘルスチェックのためのアサーションを追加するには、[SSL テストのドキュメント][103]を参照してください。マルチステップ API テストでは、アサーションはオプションです。

   [103]: /synthetics/api_tests/ssl_tests/

   {{% /tab %}}

   {{% tab "DNS" %}}

   DNS リクエストを作成し、動作チェックやヘルスチェックのためのアサーションを追加するには、[DNS テストのドキュメント][104]を参照してください。マルチステップ API テストでは、アサーションはオプションです。

   [104]: /synthetics/api_tests/dns_tests/

   {{% /tab %}}

   {{% tab "WebSocket" %}}

   WebSocket リクエストを作成し、動作チェックやヘルスチェックのためのアサーションを追加するには、[WebSocket テストのドキュメント][105]を参照してください。マルチステップ API テストでは、アサーションはオプションです。

   [105]: /synthetics/api_tests/websocket_tests/

   {{% /tab %}}

   {{% tab "TCP" %}}

   TCP リクエストを作成し、動作チェックやヘルスチェックのためのアサーションを追加するには、[TCP テストのドキュメント][106]を参照してください。マルチステップ API テストでは、アサーションはオプションです。

   [106]: /synthetics/api_tests/tcp_tests/

   {{% /tab %}}

   {{% tab "UDP" %}}

   UDP リクエストを作成し、動作チェックやヘルスチェックのためのアサーションを追加するには、[UDP テストのドキュメント][107]を参照してください。マルチステップ API テストでは、アサーションはオプションです。

   [107]: /synthetics/api_tests/udp_tests/

   {{% /tab %}}

   {{% tab "ICMP" %}}

   ICMP リクエストを作成し、動作チェックやヘルスチェックのためのアサーションを追加するには、[ICMP テストのドキュメント][108]を参照してください。マルチステップ API テストでは、アサーションはオプションです。

   [108]: /synthetics/api_tests/icmp_tests/

   {{% /tab %}}

   {{< /tabs >}}

### 実行設定を追加する {#add-execution-settings}

[{{< ui >}}Execution Settings{{< /ui >}}] (実行設定) で、以下のオプションを利用できます。

#### ステップの成功: {#step-success}

ステップが正常に完了したら、テストの次のステップに進むようにする場合は、[{{< ui >}}If step succeeds, continue to next step{{< /ui >}}] (ステップが成功した場合は、次のステップに進む) をクリックします。 

{{< img src="synthetics/multistep_tests/multistep_test_success.png" alt="ステップが成功したら次のステップに進むオプションが示されている、実行設定のスクリーンショット" style="width:90%;" >}}

ステップが正常に完了したらテストを終了する場合は、[{{< ui >}}If step succeeds, exit test and mark it as passed{{< /ui >}}] (ステップが成功した場合は、テストを終了して合格とマークする) をクリックします。これにより、不要なステップの実行を防ぎ、テストが失敗とマークされないようにすることができます。

{{< img src="synthetics/multistep_tests/multistep_execution_settings.png" alt="ステップが成功したら終了し、合格とマークすることが示されている、実行設定のスクリーンショット" style="width:90%;" >}}

#### ステップの失敗 {#step-failure}

ステップが失敗したら、次のステップに進むようにする場合は、[{{< ui >}}If step fails, continue to next step{{< /ui >}}] (ステップが失敗したら、次のステップに進む) をクリックします。このオプションを選択すると、[{{< ui >}}and mark test as{{< /ui >}}] (およびテストを次でマーク) メニューが表示されます。このステップが失敗した場合に、テストを失敗とするには、[{{< ui >}}failed{{< /ui >}}] (失敗) のままにします (デフォルトで選択されています)。このステップが失敗しても、テストは失敗しないようにするには、[{{< ui >}}passed{{< /ui >}}] (合格) を選択します。

ステップが失敗しても続行することは、後続のステップを実行する必要があるクリーンアップタスクで役立ちます。たとえば、テストでリソースを作成し、そのリソースに対していくつかの操作を実行した後、削除するとします。

中間ステップのいずれかが失敗した場合に備えて、すべての中間ステップでこの設定を有効にして、テストの終了時にリソースが確実に削除され、誤検知が発生しないようにすることをお勧めします。

エンドポイントが期待通りに応答しない場合、テストはアラートを生成します。テスト結果が失敗だった場合に備えて、Y ミリ秒後に再試行を X 回トリガーするように設定できます。アラートの感度に合わせて再試行間隔をカスタマイズしてください。

{{< img src="synthetics/multistep_tests/step_failure.png" alt="ステップ失敗が示されている、実行設定のスクリーンショット" style="width:90%;" >}}

#### レスポンスから変数を抽出する {#extract-variables-from-the-response}

必要に応じて、API リクエストのレスポンスヘッダーまたはボディをパースして、レスポンスから変数を抽出できます。変数の値は、API リクエストステップが実行されるたびに更新されます。

変数のパースを開始するには、[{{< ui >}}Extract a variable from response content{{< /ui >}}] (レスポンスコンテンツから変数を抽出する) をクリックします。

1. [{{< ui >}}Variable Name{{< /ui >}}] (変数名) を入力します。変数名には、大文字の英字、数字、アンダースコアのみを使用でき、3 文字以上である必要があります。
2. 変数をレスポンスヘッダーまたはレスポンスボディのどちらから抽出するかを決定します。

   * [{{< ui >}}response header{{< /ui >}}] (レスポンスヘッダー) から値を抽出する: API リクエストのレスポンスヘッダー全体を変数値として使用するか、[`regex`][8] を使用してパースします。
   * [{{< ui >}}response body{{< /ui >}}] (レスポンスボディ) から値を抽出する: API リクエストのレスポンスボディ全体を変数値として使用するか、[`regex`][8]、[`JSONPath`][6]、または [`XPath`][7] を使用してパースします。

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="マルチステップ API テストで API リクエストから変数を抽出する" style="width:90%;" >}}

テストステップごとに最大 10 個の変数を抽出できます。作成された変数は、マルチステップ API テストの後続のステップで使用できます。詳しくは、「[変数の使用](#use-variables)」を参照してください。

### テストの頻度を指定する {#specify-test-frequency}

マルチステップ API テストは、以下のように実行できます。

* **スケジュールに従って実行**: 最も重要なエンドポイントにユーザーが常にアクセスできるようにします。Datadog でマルチステップ API テストを実行する頻度を選択してください。
* [**CI/CD パイプライン内で実行**][3]: 欠陥のあるコードがカスタマーエクスペリエンスに影響を与えることを心配せずに、デプロイを開始できます。
* **オンデマンドで実行**: チームにとって最適なタイミングでテストを実行します。

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

{{% synthetics-variables %}}

### 変数を抽出する {#extract-variables}

ローカル変数の作成に加え、マルチステップ API テストの[任意のステップから変数を抽出](#extract-variables-from-the-response)し、[その値を後続のステップで再注入](#use-variables)することができます。

### 変数を使用する {#use-variables}

[[{{< ui >}}Settings{{< /ui >}}] (設定) で定義されたグローバル変数][13]と[ローカルで定義された変数](#create-local-variables)を、API テストの URL、高度なオプション、アサーションで使用できます。

変数のリストを表示するには、目的のフィールドに `{{` と入力します。

{{< img src="synthetics/api_tests/use_variable.mp4" alt="マルチステップ API テストでの変数の使用" video="true" width="90%" >}}

### サブテスト {#subtests}

マルチステップ API テストではサブテストがサポートされるため、既存のマルチステップ API テストを再利用することや、ステップを再利用可能なコンポーネントとして抽出することができます。サブテストは最大 2 レベルまでネストできます。

サブテストのステップには 60 秒の制限があります。サブテストのステップの合計時間 (待機ステップを含む) が 60 秒を超えると、サブテストのステップはタイムアウトします。これは、サブテストがスタンドアロンのテストとして合格した場合でも発生する可能性があります。

- **再試行**: テストのステップを再試行するたびに、新たに 60 秒が付与されます。
- **プライベートロケーション**: `apiRequestMaxTimeout` 設定は、この制限をミリ秒単位で制御します (デフォルト: `60000`)。「プライベートロケーションの構成」ページの「[高度な構成][20]」セクションを参照してください。

60 秒を超えるフローを実行する場合は、複数のサブテストステップに分割するか、ステップを親テストに直接追加します。

既存のマルチステップ API テストをサブテストとして使用するには、[{{< ui >}}Subtest{{< /ui >}}] (サブテスト) をクリックし、[{{< ui >}}From Existing Test{{< /ui >}}] (既存のテストから) タブに移動して、ドロップダウンメニューからマルチステップ API テストを選択します。

現在のマルチステップ API テストからステップをサブテストに変換するには、[{{< ui >}}Extract From Steps{{< /ui >}}] (ステップから抽出) タブをクリックし、記録されたステップの中から抽出するものを選択して、[{{< ui >}}Convert to Subtest{{< /ui >}}] (サブテストに変換) をクリックします。

{{< img src="synthetics/multistep_tests/subtest.png" alt="マルチステップ API テストにサブテストを追加するための UI" width="60%" >}}

マルチステップ API テストでサブテスト変数を上書きするには、親テストで同じ名前を使用して変数を定義します。変数は常に、最初に割り当てられた値を使用します。

サブテストを単独で実行する必要がない場合は、一時停止できます。その場合でもマルチステップ API テストの一部としては実行されますが、単独では実行されません。

**注:** サブテストとして追加できるのはマルチステップ API テストのみです。[API テスト][1]をサブテストとして使用することはサポートされていません。

## テストの失敗 {#test-failure}

ステップが 1 つまたは複数のアサーションを満たさない場合、あるいはステップのリクエストが途中で失敗した場合、テストは `FAILED` とみなされます。ステップの [{{< ui >}}and mark test as{{< /ui >}}] オプションが [{{< ui >}}passed{{< /ui >}}] に設定されている場合は、ステップが失敗してもテストは失敗しません。詳細については、「[ステップの失敗](#step-failure)」セクションを参照してください。場合によっては、エンドポイントに対するアサーションをチェックする前にテストが失敗することがあります。理由としては、次のものがあります。

`CONNREFUSED`
: ターゲットマシンが接続を明示的に拒否したため、接続を確立できませんでした。

`CONNRESET`
: リモートサーバーによって接続が突然切断されました。考えられる原因としては、応答中に Web サーバーでエラーが発生したまたはクラッシュした、あるいは Web サーバーの接続が失われたことなどがあります。

`DNS`
: テスト URL の DNS エントリが見つかりませんでした。考えられる原因としては、テスト URL の誤構成や、DNS エントリの誤構成などがあります。

`INVALID_REQUEST`
: テストの構成が無効です (URL に誤字がある場合など)。

`SSL`
: SSL 接続を実行できませんでした。[詳細については、専用のエラーページを参照してください][14]。

`TIMEOUT`
: リクエストを適切な時間内に完了できませんでした。`TIMEOUT` には次の 2 種類があります。
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` は、リクエストの処理時間がテストで定義されたタイムアウト (デフォルトは 60 秒) に達したことを示しています。
  各リクエストについて、ネットワークウォーターフォールにはそのリクエストの完了したステージのみが表示されます。たとえば、`Total response time` のみが表示されている場合、DNS 解決中にタイムアウトが発生しています。
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` は、リクエストとアサーションの処理時間が最大時間 (30 分) に達したことを示しています。

その他の API テストエラーコードすべてを確認するには、「[API テストのエラー][19]」を参照してください。

## 権限 {#permissions}

デフォルトでは、[Datadog Admin および Datadog 標準のロール][16]を持つユーザーのみが、Synthetic マルチステップ API テストを作成、編集、削除できます。Synthetic マルチステップ API テストの作成、編集、削除権限を取得するには、ユーザーをこれら 2 つの[デフォルトのロール][16]のいずれかにアップグレードしてください。

[カスタムロール機能][17]を使用している場合は、Synthetic Monitoring の `synthetics_read` および `synthetics_write` の権限を含むカスタムロールにユーザーを追加してください。

### アクセス制限 {#restrict-access}

アカウントで[カスタムロール][18]を使用しているお客様は、アクセス制限を利用できます。

組織内のロールに基づいて、マルチステップ API テストへのアクセスを制限できます。マルチステップ API テストを作成する際は、(ユーザーに加えて) どのロールがテストの読み取りおよび書き込みを行えるかを選択してください。

{{< img src="synthetics/settings/restrict_access_1.png" alt="テストの権限を設定する" style="width:70%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/
[2]: /ja/synthetics/api_tests/http_tests?tab=requestoptions#configure-the-test-monitor
[3]: /ja/synthetics/cicd_integrations
[4]: /ja/synthetics/private_locations
[5]: /ja/synthetics/search/#search-for-tests
[6]: https://restfulapi.net/json-jsonpath/
[7]: https://www.w3schools.com/xml/xpath_syntax.asp
[8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[9]: /ja/monitors/notify/?tab=is_alert#configure-notifications-and-automations
[10]: http://daringfireball.net/projects/markdown/syntax
[11]: /ja/monitors/notify/variables/?tab=is_alert#conditional-variables
[12]: /ja/monitors/types/synthetic_monitoring/
[13]: /ja/synthetics/settings/#global-variables
[14]: /ja/synthetics/api_tests/errors/#ssl-errors
[15]: /ja/synthetics/api_tests/grpc_tests?tab=unarycall#test-failure
[16]: /ja/account_management/rbac/
[17]: /ja/account_management/rbac#custom-roles
[18]: /ja/account_management/rbac/#create-a-custom-role
[19]: /ja/synthetics/api_tests/errors/
[20]: /ja/synthetics/platform/private_locations/configuration/#advanced-configuration