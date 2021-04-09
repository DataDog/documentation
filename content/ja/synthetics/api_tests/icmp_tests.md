---
title: ICMP テスト
kind: documentation
description: ホストの可用性を監視し、ネットワークの問題を診断します
aliases:
  - /ja/synthetics/icmp_test
  - /ja/synthetics/icmp_check
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: API テストの概要
  - link: /synthetics/private_locations
    tag: Documentation
    text: 内部エンドポイントで ICMP Ping を実行する
---
## 概要

ICMP テストを使用すると、ホストの可用性を簡単に監視し、ネットワーク通信の問題を診断できます。Datadog は、エンドポイントへの 1 つ以上の ICMP ping から受信した値をアサートすることにより、接続の問題、ラウンドトリップ時間のクォータを超えるレイテンシー、セキュリティファイアウォールコンフィギュレーションの予期しない変更を検出するのに役立ちます。テストでは、ホストに接続するために必要なネットワークホップ (TTL) の数を追跡し、traceroute の結果を表示して、パスに沿った各ネットワークホップの詳細を検出することもできます。

ICMP テストは、ネットワークの外部または内部のどちらからエンドポイントへの ICMP ping をトリガーするかに応じて、[管理ロケーション][1]および[プライベートロケーション][2]から実行できます。ICMP テストは、定義されたスケジュールで、オンデマンドで、または [CI/CD パイプライン][3]内から実行できます。

## コンフィギュレーション

作成するテストのタイプを選択した後 ([`HTTP`][4]、[`SSL`][5]、[`TCP`][6]、[`DNS`][7]、または [`ICMP` テスト][8])、テストのリクエストを定義できます。

### リクエストを定義する

{{< img src="synthetics/api_tests/icmp_test_config.png" alt="ICMP リクエストを定義する" style="width:90%;" >}}

1. テストを実行する**ドメイン名**または **IP アドレス**を指定します。
2. **Track number of network hops (TTL)** (ネットワークホップ数 (TTL) の追跡) を選択または選択解除します。このオプションは、"traceroute" プローブをオンにして、ホストの宛先へのパスに沿ったすべてのゲートウェイを検出します。
3. テストセッションごとにトリガーする **Number of Pings** (Ping の数) を選択します。 デフォルトでは、ping の数は 4 に設定されています。最大 10 まで減らすか増やすかを選択できます。
4. ICMP テストに**名前**を付けます。
5. ICMP テストに `env` **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring ホームページ][9]で Synthetic テストをすばやくフィルタリングできます。
6. ICMP テストを実行する**ロケーション**を選択します。ICMP テストは、ネットワークの外部または内部のどちらから ICMP ping をトリガーするかに応じて、[管理ロケーション][1]および[プライベートロケーション][2]から実行できます。

**Test URL** をクリックして、リクエストのコンフィギュレーションをテストします。画面の右側に応答プレビューが表示されます。


### テストの頻度を指定する

ICMP テストは次の頻度で実行できます。

* **On a schedule**: 最も重要なサービスにユーザーが常にアクセスできるようにします。Datadog で ICMP テストを実行する頻度を選択します。

{{< img src="synthetics/api_tests/schedule.png" alt="スケジュールどおりに API テストを実行する"  style="width:90%;" >}}

* [**Within your CI/CD pipelines**][3]。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。


### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。`Test URL` を押すと、`latency`、`packet loss`、`packet received` の基本的なアサーションが追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ          | 集計    |演算子                                                                               | 値の型       |
|-----------------|----------------|------------------------------------------------------------------------|------------------|
| レイテンシー         | `avg`、`max`、`min` または `stddev` (別名 `jitter`) |`is less than`、`is less than or equal`、<br> `is`、`is more than`、`is more than or equal` | 整数 (ms)    |
| パケットロス     | - |`is less than`、`is less than or equal`、`is`、`is more than`、`is more than or equal` | パーセント (%) |
| 受信したパケット | - |`is less than`、`is less than or equal`、`is`、`is more than`、`is more than or equal` | _integer_        |
| ネットワークホップ    | - |`is less than`、`is less than or equal`、`is`、`is more than`、`is more than or equal` | _integer_        |

**New Assertion** を選択するか、応答プレビューを直接選択することで、API テストごとに最大 10 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/icmp_assertion.png" alt="ICMP テストのアサーションを定義する" style="width:90%;" >}}


### アラート条件を定義する

アラート条件を設定して、テストが失敗してアラートをトリガーする状況を判断できます。

#### アラート設定規則

アラートの条件を `An alert is triggered if any assertion fails for X minutes from any n of N locations` に設定すると、次の 2 つの条件が当てはまる場合にのみアラートがトリガーされます。

* 直近 *X* 分間に、最低 1 個のロケーションで失敗 (最低 1 つのアサーションが失敗)、
* 直近 *X* 分間に、ある時点で最低 *n* 個のロケーションで失敗。

#### 高速再試行

テスト結果が失敗した場合、テストによって再試行をトリガーすることができます。デフォルトでは、再試行は最初に失敗したテスト結果の 300 ミリ秒後に実行されます。この間隔は [API][10] を介して構成できます。

ロケーションのアップタイムは、評価ごとに計算されます (評価前の最後のテスト結果がアップかダウンか)。合計アップタイムは、構成されたアラート条件に基づいて計算されます。送信される通知は、合計アップタイムに基づきます。

### チームへの通知

以前に定義された[アラート条件](#define-alert-conditions)に基づいて、テストによって通知が送信されます。このセクションを使用して、チームに送信するメッセージの方法と内容を定義します。

1. [モニターと同様][11]、メッセージに `@notification`を追加するか、ドロップダウンボックスでチームメンバーと接続されたインテグレーションを検索して、通知を受信する**ユーザーやサービス**を選択します。

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

ICMP テストの URL およびアサーションで、[`Settings` で定義されたグローバル変数][13]と[ローカルで定義された変数](#create-local-variables)を使用できます。
変数のリストを表示するには、目的のフィールドに `{{` と入力します。

{{< img src="synthetics/api_tests/use_variable.mp4" alt="API テストでの変数の使用" video="true" width="90%" >}}

## テストの失敗

テストが 1 つまたは複数のアサーションを満たさない場合、またはリクエストが時期尚早に失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストできずにテストが実際に失敗することがあります。これらの理由には次のものがあります。

| エラー             | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                          |
| DNS               | テスト URL に対応する DNS エントリが見つかりませんでした。テスト URL の構成の誤り、DNS エントリの構成の誤りなどの原因が考えられます。                    |                                                                                                                                                                                                                          

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/v1/synthetics/#get-all-locations-public-and-private
[2]: /ja/synthetics/private_locations
[3]: /ja/api/v1/synthetics/#create-a-test
[4]: /ja/synthetics/api_tests/http_tests
[5]: /ja/synthetics/api_tests/ssl_tests
[6]: /ja/synthetics/api_tests/tcp_tests
[7]: /ja/synthetics/api_tests/dns_tests
[8]: /ja/synthetics/api_tests/icmp_tests
[9]: /ja/synthetics/ci
[10]: /ja/monitors/notifications/?tab=is_alert#notification
[11]: https://www.markdownguide.org/basic-syntax/
[12]: /ja/monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[13]: /ja/synthetics/settings/#global-variables