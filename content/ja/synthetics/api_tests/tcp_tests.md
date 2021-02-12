---
title: TCP テスト
kind: documentation
description: 特定の接続からホスト上の TCP 接続をシミュレートします
aliases:
  - /ja/synthetics/tcp_test
  - /ja/synthetics/tcP_check
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: API テストの概要
  - link: /synthetics/private_locations
    tag: Documentation
    text: 内部ホストで TCP テストを実行する
---
## 概要

TCP テストを使用すると、**特定のホストのポートで低レベルの TCP 接続を確立できることを簡単に監視**でき、`SSH` (22)、`SMTP` (25)、`DNS` (53)、VPN over `HTTPS` (443) などのさまざまな主要サービスおよび他のポートに存在するカスタムサービスの可用性を確認できます。組み込みの応答時間データのおかげで、ネットワークアプリケーションのパフォーマンスを追跡し、予期しない速度低下が発生した場合にアラートを受け取ることができます。
TCP テストは、**ネットワークの外部と内部**のどちらから TCP 接続を開始するかに応じて、[管理ロケーション][1]および[プライベートロケーション][2]から実行できます。

## コンフィギュレーション

作成するテストのタイプ ([`HTTP`][3]、[`SSL`][4]、[`TCP`][5]、または [`DNS` テスト][6]) を選択した後、テストのリクエストを定義できます。

### リクエストを定義する

{{< img src="synthetics/api_tests/tcp_test_config.png" alt="TCP 接続を定義する"  style="width:90%;" >}}

1. テストを実行する **Host** と **Port** を指定します。デフォルトでは、ポートは `443` に設定されています。
2. TCP テストに**名前**を付けます。
3. TCP テストに `env` **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring ホームページ][7]で Synthetic テストをすばやくフィルタリングできます。
4. TCP テストを実行する**ロケーション**を選択します。TCP テストは、ネットワークの外部または内部のどちらから接続を開始するかによって、[管理ロケーション][1]と[プライベートロケーション][2]から実行できます。

<mrk mid="59" mtype="seg"/><mrk mid="60" mtype="seg"/>

### テストの頻度を指定する

TCP テストは次の頻度で実行できます。

* **On a schedule**: 最も重要なサービスにユーザーが常にアクセスできるようにします。Datadog で TCP テストを実行する頻度を選択します。

{{< img src="synthetics/api_tests/schedule.png" alt="スケジュールどおりに API テストを実行する"  style="width:90%;" >}}

* [**CI/CD パイプライン内**][8]。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。`Test URL` を押すと、`response time` の基本的なアサーションが追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ          | 演算子                                                                | 値の型     |
|---------------|-------------------------------------------------------------------------|----------------|
| response time | `is less than`                                                          | 整数 (ms) |

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、API テストごとに最大 10 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions.png" alt="TCP テストのアサーションを定義する" style="width:90%;" >}}

### アラート条件を定義する

アラート条件で、テストが失敗しアラートをトリガーする状況を設定します。

#### アラート設定規則

アラートの条件を `An alert is triggered if any assertion fails for X minutes from any n of N locations` に設定すると、次の 2 つの条件が当てはまる場合にのみアラートがトリガーされます。

* 直近 *X* 分間に、最低 1 個のロケーションで失敗 (最低 1 つのアサーションが失敗)、
* 直近 *X* 分間に、ある時点で最低 *n* 個のロケーションで失敗。

#### Fast Retry

テスト結果が失敗した場合、テストによって再試行をトリガーすることができます。デフォルトでは、再試行は最初に失敗したテスト結果の 300 ミリ秒後に実行されます。この間隔は [API][9] を介して構成できます。


ロケーションのアップタイムは、評価ごとに計算されます (評価前の最後のテスト結果がアップかダウンか)。合計アップタイムは、構成されたアラート条件に基づいて計算されます。送信される通知は、合計アップタイムに基づきます。

### チームへの通知

以前に定義された[アラート条件](#define-alert-conditions)に基づいて、テストによって通知が送信されます。このセクションを使用して、チームに送信するメッセージの方法と内容を定義します。

1. [モニターと同様][10]、メッセージに `@notification` を追加するか、ドロップダウンボックスでチームメンバーと接続されたインテグレーションを検索して、通知を受信する**ユーザーやサービス**を選択します。

2. テストの通知**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][11]のほか、以下の[条件付き変数][12]を使用できます。

    | 条件付き変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            |モニターがアラートする場合に表示します。                                          |
    | `{{^is_alert}}`            |テストが警告しない限り表示します。                                        |
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

HTTP テストの URL、高度なオプション、アサーションで、[`Settings` で定義されたグローバル変数][13]と[ローカルで定義された変数](#create-local-variables)を使用できます。
変数のリストを表示するには、目的のフィールドに `{{` と入力します。

{{< img src="synthetics/api_tests/use_variable.mp4" alt="API テストでの変数の使用" video="true" width="90%" >}}

## テストの失敗

テストが 1 つまたは複数のアサーションを満たさない場合、またはリクエストが時期尚早に失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストできずにテストが実際に失敗することがあります。これらの理由には次のものがあります。

| エラー             | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CONNRESET`       | 接続がリモートサーバーによって突然閉じられました。Web サーバーにエラーが発生した、応答中にシステムが停止した、Web サーバーへの接続が失われた、などの原因が考えられます。                                                                                                                                                                                                                                                         |
| DNS               | テスト URL に対応する DNS エントリが見つかりませんでした。テスト URL の構成の誤り、DNS エントリの構成の誤りなどの原因が考えられます。                                                                                                                                                                                                                                                                                                                  |
| `INVALID_REQUEST` | テストのコンフィギュレーションが無効です (URL に入力ミスがあるなど)。                                                                                                                                                                                                                                                                                                                                                                                     |
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
[9]: /ja/api/v1/synthetics/#create-a-test
[10]: /ja/monitors/notifications/?tab=is_alert#notification
[11]: https://www.markdownguide.org/basic-syntax/
[12]: /ja/monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[13]: /ja/synthetics/settings/#global-variables
[14]: /ja/synthetics/api_tests/errors/#ssl-errors