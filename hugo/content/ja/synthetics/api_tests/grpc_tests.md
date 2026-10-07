---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API テスト
  tags:
  - grpc
  - grpc テスト
  - grpc テスト
description: gRPC リクエストをシミュレートして、パブリックおよび内部 API エンドポイントを監視します。
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: https://www.datadoghq.com/blog/grpc-health-check-datadog-synthetic-monitoring/
  tag: ブログ
  text: Datadog で gRPC API を監視する
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: ラーニングセンター
  text: Synthetic テストの紹介
- link: /synthetics/multistep
  tag: ドキュメント
  text: マルチステップ API テストによる gRPC リクエストの連鎖
- link: /synthetics/private_locations
  tag: ドキュメント
  text: 内部エンドポイントで gRPC テストを実行する
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
title: GRPC テスト
---
## 概要

gRPC テストは、gRPC サービスやサーバーをプロアクティブに監視することができます。2 つのタイプから選択することができます。

Behavior Checks
: アプリケーションの API エンドポイントに gRPC リクエストを送信して、応答時間、ヘッダー、本文の内容など、応答や定義された条件を検証します。

Health Checks 
: gRPC ヘルスチェックは、gRPC サービスの健全性を報告するための標準的なものです。gRPC サーバーとサービスが応答し、実行され、リモートプロシージャコール (RPC) を処理できるかを判断します。<br><br>gRPC ヘルスチェックを実装することで、Datadog に `.proto` ファイルを提供しなくても、gRPC ヘルスチェックテストを実行することができるようになります。詳細については、gRPC コミュニティで共有されている[ヘルスチェックの例 `.proto` ファイル][1]を参照してください。

gRPC テストは、ネットワークの外部または内部からのテストの実行の好みに応じて、[管理ロケーション](#select-locations)と[プライベートロケーション][2]の両方から実行することができます。gRPC テストは、スケジュール、オンデマンド、または [CI/CD パイプライン][3]内で直接実行することができます。

## 構成

`gRPC` テストの作成を選択した後、テストのリクエストを定義します。

### リクエストを定義する

1. テストを実行する **Host** と **Port** を指定します。デフォルトの gRPC ポートは `50051` です。
2. **Behavior Check** を選択して単一呼び出しを実行するか、**Health Check** を選択してヘルスチェックを実行します。

   {{< tabs >}}
   {{% tab "動作チェック" %}}

   動作チェックを実行するには、gRPC サーバーを定義する **Server Reflection** を指定するか、[**Proto File** をアップロード][101]してください。メソッドを選択し、リクエストメッセージを入力してください。Datadog はストリーミングメソッドには対応していません。

{{< img src="synthetics/api_tests/grpc_behavior_check_test.png" alt="gRPC リクエストを定義する" style="width:90%;" >}}

   [101]: https://grpc.io/docs/what-is-grpc/introduction/#working-with-protocol-buffers

{{% /tab %}}
{{% tab "ヘルスチェック" %}}

ヘルスチェックの場合は、サービスの名前を入力してください。 gRPC サーバーでヘルスチェックを送信する場合は、このフィールドを空白のままにしてください。

{{< img src="synthetics/api_tests/grpc_health_check_test.png" alt="gRPC リクエストを定義する" style="width:90%;" >}}

   {{% /tab %}}
   {{< /tabs >}}

3. **Advanced Options** (オプション) をテストに追加します。

   {{< tabs >}}

   {{% tab "リクエストオプション" %}}

   * **Timeout**: テストがタイムアウトするまでの時間を秒単位で指定します。
   * **Ignore server certificate error**: 選択すると、SSL 証明書の検証時にエラーが発生した場合でも、gRPC テストが接続を続行します。
   * **gRPC メタデータ**: サービス間でメタデータを受け渡すために、gRPC リクエストにメタデータを追加・定義します。

   {{% /tab %}}

   {{% tab "認証" %}}

   * **Client certificate**: クライアント証明書 (`.crt`) と `PEM` 形式の関連する秘密キー (`.key`) をアップロードして、mTLS を介して認証します。

     <br/> 

     `openssl` ライブラリを使用して、証明書を変換することができます。例えば、`PKCS12` 形式の証明書を `PEM` 形式の秘密キーや証明書に変換することができます。

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   {{% /tab %}}

   {{< /tabs >}}

3. gRPC テストに**名前**を付けます。

4. gRPC テストに `env` **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring & Continuous Testing ページ][4]で Synthetic テストをフィルタリングできます。

**Send** をクリックして、リクエストの構成をテストします。画面の右側に応答プレビューが表示されます。

### スニペット

{{% synthetics-api-tests-snippets %}}

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。**Send** をクリックすると、取得したレスポンスに基づいて `response time` に関するアサーションが追加されます。モニターするテストには、少なくとも 1 つのアサーションを定義する必要があります。

{{< tabs >}}
{{% tab "動作チェック" %}}

| タイプ | 演算子 | 値の型 |
|---|---|---|
| response time | `is less than` | 整数 (ms) |
| gRPC レスポンス | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`、<br> [`jsonpath`][1]、[`xpath`][2] | _文字列_ <br> _[正規表現][3]_ |
| gRPC メタデータ | `is`、`is not`、`contains`、`does not contain`、`matches regex`、`does not match regex`、`does not exist`  | _整数 (ミリ秒)_ <br> _[正規表現][3]_ |

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、API テストごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions_grpc_behavior_check_blur.png" alt="gRPC テストが成功または失敗するためのアサーションを定義する" style="width:90%;" >}}

[1]: https://restfulapi.net/json-jsonpath/
[2]: https://www.w3schools.com/xml/xpath_syntax.asp
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

{{% /tab %}}
{{% tab "Health Check" %}}

| タイプ | 演算子 | 値の型 |
|---|---|---|
| response time | `is less than` | 整数 (ms) |
| ヘルスチェックのステータス | `is`、`is not` | 整数 (ms) |
| gRPC メタデータ | `is`、`is not`、`contains`、`does not contain`、`matches regex`、`does not match regex`、`does not exist`  | 整数 (ms) |

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、API テストごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions_grpc_health_check.png" alt="gRPC テストが成功または失敗するためのアサーションを定義する" style="width:90%;" >}}

{{% /tab %}}
{{< /tabs >}}

テストがレスポンス本文にアサーションを含まない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連するレスポンスタイムを返します。

テストがレスポンス本文に対するアサーションを含み、タイムアウトの制限に達した場合、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

### ロケーションを選択する

gRPC テストを実行する**ロケーション**を選択します。gRPC テストは、ネットワークの外部または内部のどちらからテストを実行するかの好みによって、管理ロケーションと[プライベートロケーション][2]の両方から実行できます。

{{% managed-locations %}} 

### テストの頻度を指定する

gRPC テストは次の頻度で実行できます。

* **On a schedule**: 最も重要なサービスにユーザーが常にアクセスできるようにします。Datadog で gRPC テストを実行する頻度を選択します。
* [**Within your CI/CD pipelines**][3]: 欠陥のあるコードがカスタマーエクスペリエンスに影響を与える可能性があることを恐れずに出荷を開始します。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### 変数を使用する

gRPC テストの URL、高度なオプション、アサーションで、[**Settings** ページで定義されたグローバル変数][9]を使用することができます。

変数のリストを表示するには、目的のフィールドに `{{` と入力します。

## テストの失敗

テストが 1 つ以上のアサーションを満たさない場合、またはリクエストが時期尚早に失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストすることなくテストが実際に失敗することがあります。

これらの理由には以下が含まれます。

`gRPC specific errors`
: gRPC には、特定のステータスコードのリストがあり、[gRPC 公式ドキュメント][10]に記載されています。

`CONNRESET`
: 接続がリモートサーバーによって突然閉じられました。Web サーバーにエラーが発生した、応答中にシステムが停止した、Web サーバーへの接続が失われた、などの原因が考えられます。

`DNS`
: テスト URL に対応する DNS エントリが見つかりませんでした。テスト URL の構成の誤りまたは DNS エントリの構成の誤りの原因が考えられます。

`INVALID_REQUEST`
: テストのコンフィギュレーションが無効です (URL に入力ミスがあるなど)。

`SSL`
: SSL 接続を実行できませんでした。[詳細については、個別のエラーページを参照してください][11]。

`TIMEOUT`
: リクエストを一定時間内に完了できなかったことを示します。`TIMEOUT` には 2 種類あります。
  - `TIMEOUT: The request couldn't be completed in a reasonable time.`  は、リクエストの持続時間がテスト定義のタイムアウト (デフォルトは 60 秒に設定されています) に当たったことを示します。
  各リクエストについて、ネットワークウォーターフォールに表示されるのは、リクエストの完了したステージのみです。例えば、`Total response time` だけが表示されている場合、DNS の解決中にタイムアウトが発生したことになります。
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`  は、テスト時間 (リクエストとアサーション) が最大時間 (60.5 秒) に達したことを示しています。

## 権限

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][12]を持つユーザーのみが、Synthetic gRPC テストを作成、編集、削除できます。Synthetic gRPC テストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][12]のいずれかにアップグレードします。

[カスタムロール機能][13]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

## アクセス制限

アカウントに[カスタムロール][14]を使用しているお客様は、アクセス制限が利用可能です。

組織内の役割に基づいて、ブラウザテストへのアクセスを制限することができます。ブラウザテストを作成する際に、(ユーザーのほかに) どのロールがテストの読み取りと書き込みを行えるかを選択します。

{{< img src="synthetics/settings/restrict_access_1.png" alt="テストの権限の設定" style="width:70%;" >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
[2]: /ja/synthetics/private_locations
[3]: /ja/synthetics/cicd_testing
[4]: /ja/synthetics/search/#search
[5]: /ja/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /ja/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /ja/synthetics/guide/synthetic-test-monitors
[9]: /ja/synthetics/settings/#global-variables
[10]: https://grpc.github.io/grpc/core/md_doc_statuscodes.html
[11]: /ja/synthetics/api_tests/errors/#ssl-errors
[12]: /ja/account_management/rbac/
[13]: /ja/account_management/rbac#custom-roles
[14]: /ja/account_management/rbac/#create-a-custom-role