---
title: SSL テスト
kind: documentation
description: 世界中のロケーションから SSL 証明書を監視します
aliases:
  - /ja/synthetics/ssl_test
  - /ja/synthetics/ssl_check
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: API テストの概要
  - link: /synthetics/private_locations
    tag: Documentation
    text: 内部ホストで SSL テストを実行する
---
## 概要

SSL テストを使用すると、**SSL/TLS 証明書の有効性と有効期限をプロアクティブに監視**して、主要なサービスとユーザー間の安全な接続を確保できます。証明書の有効期限が近づいているか、侵害された場合、Datadog は**失敗の詳細を含むアラート**を送信し、問題の根本原因をすばやく特定、修正できるようにします。
SSL テストは、**パブリックホストと内部ホスト**のどちらの証明書を監視するかに応じて、[管理ロケーション][1]および[プライベートロケーション][2]から実行できます。

## コンフィギュレーション

作成するテストのタイプ ([`HTTP`][3]、[`SSL`][4]、[`TCP`][5]、または [`DNS` テスト][6]) を選択した後、テストのリクエストを定義できます。

### リクエストを定義する

{{< img src="synthetics/api_tests/ssl_test_config.png" alt="SSL リクエストを定義する"  style="width:90%;" >}}

1. テストを実行する **Host** と **Port** を指定します。デフォルトでは、ポートは `443` に設定されています。
2. **Advanced Options** (オプション) をテストに追加します。
    * **Accept self-signed certificates**: 自己署名証明書に関連するサーバーエラーをバイパスします。
    * **クライアント証明書**: クライアント証明書 (`.crt`) と関連する秘密キー (`.key`) を `PEM` 形式でアップロードして、mTLS を介して認証します。**注**: `openssl` ライブラリを使用して証明書を変換することができます。たとえば、`PKCS12` 証明書を `PEM` 形式の秘密キーと証明書に変換できます。

  ```
  openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts 
  openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
  ```

3. SSL テストに**名前**を付けます。
4. SSL テストに `env` **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring ホームページ][7]で Synthetic テストをすばやくフィルタリングできます。
5. SSL テストを実行する**ロケーション**を選択します。SSL テストは、ネットワークの外部または内部のどちらから証明書を監視するかによって、[管理ロケーション][1]と[プライベートロケーション][2]から実行できます。

<mrk mid="59" mtype="seg"/><mrk mid="60" mtype="seg"/>

### テストの頻度を指定する

SSL テストは次の頻度で実行できます。

* **On a schedule**: SSL/TLS 証明書が常に有効であり、主要なサービスのユーザーへの安全な接続が確保されるようにします。Datadog で SSL テストを実行する頻度を選択します。

{{< img src="synthetics/api_tests/schedule.png" alt="スケジュールどおりに API テストを実行する"  style="width:90%;" >}}

* [**CI/CD パイプライン内**][8]。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。`Test URL` を押すと、証明書の有効性、有効期限データ、TLS バージョン、`response time` の基本的なアサーションが、取得された応答に基づいて追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ                  | 演算子                                                                               | 値の型                 |
|-----------------------|----------------------------------------------------------------------------------------|----------------------------|
| 証明書           | `expires in more than`、`expires in less than`                                         | _整数 (日数)_ |
| プロパティ              | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`       | _String_ <br> _[Regex][9]_ |
| response time         | `is less than`                                                                         | 整数 (ms)             |
| TLS 最大バージョン   | `is less than`、`is less than or equal`、`is`、`is more than`、`is more than or equal` | _Decimal_                  |
| TLS 最小バージョン   | `is more than`、`is more than or equal`                                                | _Decimal_                  |


**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、API テストごとに最大 10 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions.png" alt="SSL テストのアサーションを定義する" style="width:90%;" >}}

### アラート条件を定義する

アラート条件で、テストが失敗しアラートをトリガーする状況を設定します。

#### アラート設定規則

アラートの条件を `An alert is triggered if any assertion fails for X minutes from any n of N locations` に設定すると、次の 2 つの条件が当てはまる場合にのみアラートがトリガーされます。

* 直近 *X* 分間に、最低 1 個のロケーションで失敗 (最低 1 つのアサーションが失敗)、
* 直近 *X* 分間に、ある時点で最低 *n* 個のロケーションで失敗。

#### 高速再試行

テスト結果が失敗した場合、テストによって再試行をトリガーすることができます。デフォルトでは、再試行は最初に失敗したテスト結果の 300 ミリ秒後に実行されます。この間隔は [API][10] を介して構成できます。

ロケーションのアップタイムは、評価ごとに計算されます (評価前の最後のテスト結果がアップかダウンか)。合計アップタイムは、構成されたアラート条件に基づいて計算されます。送信される通知は、合計アップタイムに基づきます。

### チームへの通知

以前に定義された[アラート条件](#define-alert-conditions)に基づいて、テストによって通知が送信されます。このセクションを使用して、チームに送信するメッセージの方法と内容を定義します。

1. [モニターと同様][11]、メッセージに `@notification` を追加するか、ドロップダウンボックスでチームメンバーと接続されたインテグレーションを検索して、通知を受信する**ユーザーやサービス**を選択します。

2. テストの通知**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][12]のほか、以下の[条件付き変数][13]を使用できます。

    | 条件付き変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            |テストがアラートを発する場合に表示します。                                          |
    | `{{^is_alert}}`            |テストがアラートを発しない限り表示します。                                        |
    | `{{#is_recovery}}`         |テストがアラートから回復したときに表示します。                             |
    | `{{^is_recovery}}`         |テストがアラートから回復しない限り表示します。                           |

3. テストが失敗した場合に、テストで**通知メッセージを再送信する**頻度を指定します。テストの失敗を再通知しない場合は、`Never renotify if the monitor has not been resolved` オプションを使用してください。

メール通知には、このセクションで定義されているメッセージと、失敗したアサーションの要約が含まれます。
通知の例:

{{< img src="synthetics/api_tests/notifications-example.png" alt="API テスト通知"  style="width:90%;" >}}

**Save** をクリックしてテストを保存し、Datadog にテストの実行を開始させます。

## 変数

### ローカル変数を作成する

以下の利用可能な組み込みの 1 つから値を定義してローカル変数を作成できます。

| パターン                    | 説明                                                                                                 |
|----------------------------|-------------------------------------------------------------------------------------------------------------|
| `{{ numeric(n) }}`         | `n` 桁の数字列を生成します。                                                                 |
| `{{ alphabetic(n) }}`      | `n` 文字のアルファベット文字列を生成します。                                                            |
| `{{ alphanumeric(n) }}`    | `n` 文字の英数字文字列を生成します。                                                       |
| `{{ date(n, format) }}`    | テストが開始された日付 + `n` 日の値を使用して、許容される形式のいずれかで日付を生成します。        |
| `{{ timestamp(n, unit) }}` | テストが +/- `n` 選択単位で開始されたタイムスタンプの値を使用して、許容される単位のいずれかでタイムスタンプを生成します。 |

### 変数を使用する

HTTP テストの URL、高度なオプション、アサーションで、[`Settings` で定義されたグローバル変数][14]と[ローカルで定義された変数](#create-local-variables)を使用できます。
変数のリストを表示するには、目的のフィールドに `{{` と入力します。

{{< img src="synthetics/api_tests/use_variable.mp4" alt="API テストでの変数の使用" video="true" width="90%" >}}

## テストの失敗

テストが 1 つまたは複数のアサーションを満たさない場合、またはリクエストが時期尚早に失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストできずにテストが実際に失敗することがあります。これらの理由には次のものがあります。

| エラー             | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CONNRESET`       | 接続がリモートサーバーによって突然閉じられました。Web サーバーにエラーが発生した、応答中にシステムが停止した、Web サーバーへの接続が失われた、などの原因が考えられます。                                                                                                                                                                                                                                                         |
| DNS               | テスト URL に対応する DNS エントリが見つかりませんでした。テスト URL の構成の誤り、DNS エントリの構成の誤りなどの原因が考えられます。                                                                                                                                                                                                                                                                                                                  |
| `INVALID_REQUEST` | テストのコンフィギュレーションが無効です (URL に入力ミスがあるなど)。                                                                                                                                                                                                                                                                                                                                                                                     |
| `SSL`             | SSL 接続を実行できませんでした。[詳細については、個別のエラーページを参照してください][15]。                                                                                                                                                                                                                                                                                                                                                      |
| `TIMEOUT`         | リクエストを一定時間内に完了できなかったことを示します。`TIMEOUT` には 2 種類あります。<br> - `TIMEOUT: The request couldn’t be completed in a reasonable time.`  は、タイムアウトが TCP ソケットの接続レベルで発生したことを示します。<br> - `TIMEOUT: Retrieving the response couldn’t be completed in a reasonable time.` は、タイムアウトがリクエストの実行全体 (TCP ソケット接続、データ転送、アサーション) で発生したことを示します。 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/v1/synthetics/#get-all-locations-public-and-private
[2]: /ja/synthetics/private_locations
[3]: /ja/synthetics/api_tests/http_tests
[4]: /ja/synthetics/api_tests/ssl_tests
[5]: /ja/synthetics/api_tests/tcp_tests
[6]: /ja/synthetics/api_tests/dns_tests
[7]: /ja/synthetics/search/#search
[8]: /ja/synthetics/ci
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[10]: /ja/api/v1/synthetics/#create-a-test
[11]: /ja/monitors/notifications/?tab=is_alert#notification
[12]: https://www.markdownguide.org/basic-syntax/
[13]: /ja/monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[14]: /ja/synthetics/settings/#global-variables
[15]: /ja/synthetics/api_tests/errors/#ssl-errors