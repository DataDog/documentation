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

Unary Calls
: アプリケーションの API エンドポイントに gRPC リクエストを送信し、応答時間、ヘッダー、本文のコンテンツなど、定義された条件と応答を検証します。

Health Checks 
: gRPC ヘルスチェックは、gRPC サービスの健全性を報告するための標準的なものです。gRPC サーバーとサービスが応答し、実行され、リモートプロシージャコール (RPC) を処理できるかを判断します。<br>gRPC ヘルスチェックを実装することで、Datadog に `.proto` ファイルを提供しなくても、gRPC ヘルスチェックテストを実行することができるようになります。詳細については、gRPC コミュニティで共有されている[ヘルスチェックの例 `.proto` ファイル][1]を参照してください。

gRPC テストは、ネットワークの外部または内部からのテストの実行の好みに応じて、[管理ロケーション](#select-locations)と[プライベートロケーション][2]の両方から実行することができます。gRPC テストは、スケジュール、オンデマンド、または [CI/CD パイプライン][3]内で直接実行することができます。

## コンフィギュレーション

`gRPC` テストの作成を選択した後、テストのリクエストを定義します。

### リクエストを定義する

1. テストを実行する **Host** と **Port** を指定します。デフォルトでは、ポートは `50051` に設定されています。

{{< tabs >}}
{{% tab "Unary Call" %}}

2. gRPC サーバーを定義した [`.proto` ファイル][1]をアップロードします。

   - ドロップダウンメニューから gRPC メッセージの送信先となるサービスやメソッドを選択します。
     Datadog はストリーミングメソッドをサポートしていないため、アプリ内でグレーアウトしています。
   - リクエストメッセージを追加します。


[1]: https://grpc.io/docs/what-is-grpc/introduction/#working-with-protocol-buffers
{{% /tab %}}
{{% tab "Health Check" %}}
2. ヘルスチェックを送信したいサービスを入力します。gRPC サーバーのヘルスチェックを送信する場合は、このフィールドを空白にします。

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

4. gRPC テストに `env` **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring ホームページ][4]で Synthetic テストをすばやくフィルタリングできます。

   {{< img src="synthetics/api_tests/grpc_test_config.png" alt="gRPC リクエストを定義する" style="width:90%;" >}}

**Test Service** をクリックして、リクエストのコンフィギュレーションをテストします。画面の右側に応答プレビューが表示されます。

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。**Test Service** をクリックすると、取得したレスポンスに基づいて `response time` に関するアサーションが追加されます。モニターするテストには、少なくとも 1 つのアサーションを定義する必要があります。

{{< tabs >}}
{{% tab "Unary Call" %}}
| タイプ                    | 演算子                                        | 値のタイプ                           |
|-------------------------|-------------------------------------------------|--------------------------------------|
| 応答時間           | `is less than`                                  | _整数 (ms)_                       |
| gRPC 応答           | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`、<br> [`jsonpath`][1]、[`xpath`][2] | _文字列_ <br> _[Regex][3]_ |


[1]: https://restfulapi.net/json-jsonpath/
[2]: https://www.w3schools.com/xml/xpath_syntax.asp
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}
{{% tab "Health Check" %}}
| タイプ                    | 演算子                                        | 値のタイプ                           |
|-------------------------|-------------------------------------------------|--------------------------------------|
| 応答時間           | `is less than`                                  | _整数 (ms)_                       |
| ヘルスチェックステータス      | `is`、`is not`                                  | _整数 (ms)_                       |

{{% /tab %}}
{{< /tabs >}}

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、API テストごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions_grpc.png" alt="gRPC テストが成功または失敗するためのアサーションを定義する" style="width:90%;" >}}

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

1. [モニターの構成方法と同様][5]、メッセージに `@notification` を追加するか、ドロップダウンボックスでチームメンバーと接続されたインテグレーションを検索して、通知を受信する**ユーザーやサービス**を選択します。

2. テストの通知**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][6]のほか、以下の[条件付き変数][7]を使用できます。

    | 条件付き変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            |テストがアラートを発する場合に表示します。                                          |
    | `{{^is_alert}}`            |テストがアラートを発しない限り表示します。                                        |
    | `{{#is_recovery}}`         | テストがアラートから回復したときに表示します。                          |
    | `{{^is_recovery}}`         | テストがアラートから回復しない限り表示します。                        |
    | `{{#is_renotify}}`         | モニターが再通知したときに表示します。                                   |
    | `{{^is_renotify}}`         | モニターが再通知しない限り表示します。                                 |
    | `{{#is_priority}}`         | モニターが優先順位 (P1～P5) に一致したときに表示します。                  |
    | `{{^is_priority}}`         | モニターが優先順位 (P1～P5) に一致しない限り表示します。                |

3. テストが失敗した場合に、テストで**通知メッセージを再送信する**頻度を指定します。テストの失敗を再通知しない場合は、`Never renotify if the monitor has not been resolved` オプションを使用してください。

4. **Create** をクリックすると、テストの構成とモニターが保存されます。

詳しくは、[Synthetic テストモニターの使用][8]をご覧ください。

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

## アクセス許可

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][12]を持つユーザーのみが、Synthetic gRPC テストを作成、編集、削除できます。Synthetic gRPC テストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][12]のいずれかにアップグレードします。

[カスタムロール機能][13]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

## アクセス制限

アカウントに[カスタムロール][14]を使用しているお客様は、アクセス制限が利用可能です。

組織内の役割に基づいて、ブラウザテストへのアクセスを制限することができます。ブラウザテストを作成する際に、(ユーザーのほかに) どのロールがテストの読み取りと書き込みを行えるかを選択します。

{{< img src="synthetics/settings/restrict_access.png" alt="テストの権限の設定" style="width:70%;" >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
[2]: /ja/synthetics/private_locations
[3]: /ja/synthetics/cicd_testing
[4]: /ja/synthetics/search/#search
[5]: /ja/monitors/notify/#notify-your-team
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /ja/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /ja/synthetics/guide/synthetic-test-monitors
[9]: /ja/synthetics/settings/#global-variables
[10]: https://grpc.github.io/grpc/core/md_doc_statuscodes.html
[11]: /ja/synthetics/api_tests/errors/#ssl-errors
[12]: /ja/account_management/rbac/
[13]: /ja/account_management/rbac#custom-roles
[14]: /ja/account_management/rbac/#create-a-custom-role