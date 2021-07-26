---
title: DNS テスト
kind: documentation
description: DNS レコードの解決可能性とルックアップ時間を監視します
aliases:
  - /ja/synthetics/dns_test
  - /ja/synthetics/dns_check
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: API テストの概要
  - link: /synthetics/private_locations
    tag: Documentation
    text: 内部エンドポイントの DNS 解決をテストする
  - link: 'https://www.datadoghq.com/blog/monitor-dns-with-datadog/'
    tag: ブログ
    text: Datadog による DNS モニタリング
---
## 概要

DNS テストを使用すると、**任意のネームサーバーを使用して、DNS レコードの解決可能性とルックアップ時間**をプロアクティブに監視できます。解決が予想外に遅い場合、または DNS サーバーが予想外の A、AAAA、CNAME、TXT、または MX エントリで応答した場合、Datadog は**失敗の詳細を含むアラート**を送信し、問題の根本原因をすばやく特定、修正できるようにします。
DNS テストは[管理ロケーション][1]および[プライベートロケーション][2]から実行でき、**パブリックドメイン**および内部 DNS を使用している可能性のある**内部サービス**でテストを実行できます。

## コンフィギュレーション

作成するテストのタイプ ([`HTTP`][3]、[`SSL`][4]、[`TCP`][5]、[`DNS`][6]、[`ICMP` test][7])を選択した後、テストのリクエストを定義できます。

### リクエストを定義する

{{< img src="synthetics/api_tests/dns_test_config_new.png" alt="DNS クエリを定義する"  style="width:90%;" >}}

1. テストでクエリする**ドメイン**を指定します (例: `www.example.com`)。
2. 使用する **DNS サーバー** を指定します（任意）。ドメイン名または IP アドレスを使用できます。指定されていない場合、DNS テストは `8.8.8.8` を使用して解決を実行し、 `1.1.1.1` と内部 AWS DNS サーバーにフォールバックします。
3. DNS サーバーの **ポート** を指定します（任意）。指定されていない場合、DNS サーバーのポートはデフォルトで 53 になります。
4. DNS テストに**名前**を付けます。
5. DNS テストに `env` **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring ホームページ][8]で Synthetic テストをすばやくフィルタリングできます。
6. DNS テストを実行する**ロケーション**を選択します。DNS テストは、パブリックドメインとプライベートドメインのどちらを監視するかによって、[管理ロケーション][1]と[プライベートロケーション][2]から実行できます。

**Test URL** をクリックして、リクエストのコンフィギュレーションをテストします。画面の右側に応答プレビューが表示されます。

### テストの頻度を指定する

DNS テストは次の頻度で実行できます。

* **On a schedule**: 最も重要なサービスにユーザーが常にアクセスできるようにします。Datadog で DNS テストを実行する頻度を選択します。

{{< img src="synthetics/api_tests/schedule.png" alt="スケジュールどおりに API テストを実行する"  style="width:90%;" >}}

* [**CI/CD パイプライン内**][9].
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。`Test URL` を押すと、`response time` の基本的なアサーションと利用可能なレコードが追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ                | レコードタイプ                                                     | 演算子                                           | 値の型                 |
|---------------------|-----------------------------------------------------------------|----------------------------------------------------|----------------------------|
| response time       |                                                                 | `is less than`                                     | 整数 (ms)             |
| すべてのレコード        | タイプ A、タイプ AAAA、タイプ MX、タイプ TXT、タイプ CNAME | `is`、`contains`、<br> `matches`、`does not match` | _String_ <br> _[Regex][10]_ |
| at least one record | タイプ A、タイプ AAAA、タイプ MX、タイプ TXT、タイプ CNAME | `is`、`contains`、<br> `matches`、`does not match` | _String_ <br> _[Regex][10]_ |

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、API テストごとに最大 10 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions.png" alt="DNS テストのアサーションを定義する" style="width:90%;" >}}

### アラート条件を定義する

アラート条件で、テストが失敗しアラートをトリガーする状況を設定します。

#### アラート設定規則

アラートの条件を `An alert is triggered if any assertion fails for X minutes from any n of N locations` に設定すると、次の 2 つの条件が当てはまる場合にのみアラートがトリガーされます。

* 直近 *X* 分間に、最低 1 個のロケーションで失敗 (最低 1 つのアサーションが失敗)、
* 直近 *X* 分間に、ある時点で最低 *n* 個のロケーションで失敗。

#### 高速再試行

テスト結果が失敗した場合、テストによって再試行をトリガーすることができます。デフォルトでは、再試行は最初に失敗したテスト結果の 300 ミリ秒後に実行されます。この間隔は [API][11] を介して構成できます。


ロケーションのアップタイムは、評価ごとに計算されます (評価前の最後のテスト結果がアップかダウンか)。合計アップタイムは、構成されたアラート条件に基づいて計算されます。送信される通知は、合計アップタイムに基づきます。

### チームへの通知

以前に定義された[アラート条件](#define-alert-conditions)に基づいて、テストによって通知が送信されます。このセクションを使用して、チームに送信するメッセージの方法と内容を定義します。

1. [モニターと同様][12]、メッセージに `@notification `を追加するか、ドロップダウンボックスでチームメンバーと接続されたインテグレーションを検索して、通知を受信する**ユーザーやサービス**を選択します。

2. テストの通知**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][13]のほか、以下の[条件付き変数][14]を使用できます。

    | 条件付き変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            |テストがアラートを発する場合に表示します。                                          |
    | `{{^is_alert}}`            |テストがアラートを発しない限り表示します。                                        |
    | `{{#is_recovery}}`         |テストがアラートから回復したときに表示します。                             |
    | `{{^is_recovery}}`         |テストがアラートから回復しない限り表示します。                           |

3. テストが失敗した場合に、テストで**通知メッセージを再送信する**頻度を指定します。テストの失敗を再通知しない場合は、`Never renotify if the monitor has not been resolved` オプションを使用してください。

メール通知には、このセクションで定義されているメッセージと、失敗したアサーションの要約が含まれます。通知の例:

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

HTTP テストの URL、高度なオプション、アサーションで、[`Settings` で定義されたグローバル変数][15]と[ローカルで定義された変数](#create-local-variables)を使用できます。
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
[6]: /ja/synthetics/api_tests/dns_test
[7]: /ja/synthetics/api_tests/icmp_tests
[8]: /ja/synthetics/search/#search
[9]: /ja/synthetics/ci
[10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[11]: /ja/api/v1/synthetics/#create-a-test
[12]: /ja/monitors/notifications/?tab=is_alert#notification
[13]: https://www.markdownguide.org/basic-syntax/
[14]: /ja/monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[15]: /ja/synthetics/settings/#global-variables