---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API テスト
  tags:
  - ssl
  - ssl テスト
  - ssl テスト
aliases:
- /ja/synthetics/ssl_test
- /ja/synthetics/ssl_check
description: 世界中のロケーションから SSL 証明書を監視します
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: API テストの概要
- link: /synthetics/private_locations
  tag: Documentation
  text: 内部ホストで SSL テストを実行する
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
title: SSL テスト
---

## 概要

SSL テストを使用すると、SSL/TLS 証明書の有効性と有効期限をプロアクティブに監視して、主要なサービスとユーザー間の安全な接続を確保できます。証明書の有効期限が近づいているか、侵害された場合、Datadog は失敗の詳細を含むアラートを送信し、問題の根本原因をすばやく特定、修正できるようにします。

SSL テストは、ネットワークの外部または内部からのテストの実行の好みに応じて、[管理ロケーション](#select-locations)と[プライベートロケーション][1]の両方から実行することができます。SSL テストは、スケジュール、オンデマンド、または [CI/CD パイプライン][2]内で直接実行することができます。

## コンフィギュレーション

`SSL` テストの作成を選択した後、テストのリクエストを定義します。

### リクエストを定義する

1. テストを実行する **Host** と **Port** を指定します。デフォルトでは、ポートは `443` に設定されています。
2. **Advanced Options** (オプション) をテストに追加します。
   * **Accept self-signed certificates**: 自己署名証明書に関連するサーバーエラーをバイパスします。
   * **Fail on revoked certificate in stapled OCSP**: 証明書が OCSP ステープリングによって取り消されたとラベル付けされた場合、テストに失敗します。
   * **Timeout**: テストがタイムアウトするまでの時間を秒単位で指定します。
   * **Server Name**: TLS ハンドシェイクを開始するサーバーを指定し、サーバーが同じ IP アドレスと TCP ポート番号上の複数の可能な証明書のうちの 1 つを提示することを可能にします。デフォルトでは、このパラメータは **Host** の値で埋められています。
   * **Client certificate**: クライアント証明書 (`.crt`) と `PEM` 形式の関連する秘密キー (`.key`) をアップロードして、mTLS を介して認証します。

   `openssl` ライブラリを使用して、証明書を変換することができます。例えば、`PKCS12` 形式の証明書を `PEM` 形式の秘密キーや証明書に変換することができます。

   ```
   openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
   openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
   ```

3. SSL テストに**名前**を付けます。

4. SSL テストに `env` **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring ホームページ][3]で Synthetic テストをすばやくフィルタリングできます。

   {{< img src="synthetics/api_tests/ssl_test_config.png" alt="SSL リクエストを定義する" style="width:90%;" >}}

**Test URL** をクリックして、リクエストのコンフィギュレーションをテストします。画面の右側に応答プレビューが表示されます。

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。**Test URL** をクリックした後、証明書の有効性、有効期限データ、TLS バージョン、`response time` の基本的なアサーションが、取得された応答に基づいて追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ                  | 演算子                                                                               | 値の型                 |
|-----------------------|----------------------------------------------------------------------------------------|----------------------------|
| 証明書           | `expires in more than`、`expires in less than`                                         | _整数 (日数)_ |
| プロパティ              | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`       | _文字列_ <br> _[正規表現][4]_ |
| response time         | `is less than`                                                                         | 整数 (ms)             |
| TLS 最大バージョン   | `is less than`、`is less than or equal`、`is`、`is more than`、`is more than or equal` | _Decimal_                  |
| TLS 最小バージョン   | `is more than`、`is more than or equal`                                                | _Decimal_                  |

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、API テストごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions_ssl.png" alt="SSL テストが成功または失敗するためのアサーションを定義する" style="width:90%;" >}}

アサーションで `OR` ロジックを実行するには、`matches regex` あるいは `does not match regex` コンパレータを使用して、`(0|100)` のように同じアサーションタイプに対して複数の期待値を設定した正規表現を定義します。プロパティアサーションの値が 0 あるいは 100 の場合、テストは成功です。

テストがレスポンス本文にアサーションを含まない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連するレスポンスタイムを返します。

テストがレスポンス本文に対するアサーションを含み、タイムアウトの制限に達した場合、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

### ロケーションを選択する

SSL テストを実行する**ロケーション**を選択します。SSL テストは、ネットワークの外部または内部のどちらから証明書を監視するかの好みによって、管理ロケーションと[プライベートロケーション][1]の両方から実行できます。

{{% managed-locations %}} 

### テストの頻度を指定する

SSL テストは次の頻度で実行できます。

* **On a schedule**: SSL/TLS 証明書が常に有効であり、主要なサービスのユーザーへの安全な接続が確保されるようにします。Datadog で SSL テストを実行する頻度を選択します。
* [**Within your CI/CD pipelines**][2]。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

### アラート条件を定義する

アラート条件で、テストが失敗しアラートをトリガーする状況を設定します。

#### アラート設定規則

アラートの条件を `An alert is triggered if your test fails for X minutes from any n of N locations` に設定すると、次の 2 つの条件が当てはまる場合にのみアラートがトリガーされます。

* 直近 *X* 分間に、最低 1 個のロケーションで失敗 (最低 1 つのアサーションが失敗)。
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

SSL テストの URL、高度なオプション、アサーションで、[**Settings** ページで定義されたグローバル変数][9]を使用することができます。

変数のリストを表示するには、目的のフィールドに `{{` と入力します。

## テストの失敗

テストが 1 つ以上のアサーションを満たさない場合、またはリクエストが時期尚早に失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストすることなくテストが実際に失敗することがあります。

これらの理由には以下が含まれます。

`CONNRESET`
: 接続がリモートサーバーによって突然閉じられました。Web サーバーにエラーが発生した、応答中にシステムが停止した、Web サーバーへの接続が失われた、などの原因が考えられます。

`DNS`
: テスト URL に対応する DNS エントリが見つかりませんでした。テスト URL の構成の誤りまたは DNS エントリの構成の誤りの原因が考えられます。

`INVALID_REQUEST` 
: テストのコンフィギュレーションが無効です (URL に入力ミスがあるなど)。

`SSL`
: SSL 接続を実行できませんでした。[詳細については、個別のエラーページを参照してください][10]。

`TIMEOUT`
: リクエストを一定時間内に完了できなかったことを示します。`TIMEOUT` には 2 種類あります。
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` は、リクエストの持続時間がテスト定義のタイムアウト (デフォルトは 60 秒に設定されています) に当たったことを示します。
  各リクエストについて、ネットワークウォーターフォールに表示されるのは、リクエストの完了したステージのみです。例えば、`Total response time` だけが表示されている場合、DNS の解決中にタイムアウトが発生したことになります。
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`  は、テスト時間 (リクエスト＋アサーション) が最大時間 (60.5s) に達したことを示しています。

## アクセス許可

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][11]を持つユーザーのみが、Synthetic SSL テストを作成、編集、削除できます。Synthetic SSL テストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][11]のいずれかにアップグレードします。

[カスタムロール機能][12]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

### アクセス制限

アカウントに[カスタムロール][13]を使用しているお客様は、アクセス制限が利用可能です。

組織内の役割に基づいて、SSL テストへのアクセスを制限することができます。SSL テストを作成する際に、(ユーザーのほかに) どのロールがテストの読み取りと書き込みを行えるかを選択します。

{{< img src="synthetics/settings/restrict_access.png" alt="テストのアクセス許可の設定" style="width:70%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/private_locations
[2]: /ja/synthetics/cicd_integrations
[3]: /ja/synthetics/search/#search
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: /ja/monitors/notify/#notify-your-team
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /ja/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /ja/synthetics/guide/synthetic-test-monitors
[9]: /ja/synthetics/settings/#global-variables
[10]: /ja/synthetics/api_tests/errors/#ssl-errors
[11]: /ja/account_management/rbac/
[12]: /ja/account_management/rbac#custom-roles
[13]: /ja/account_management/rbac/#create-a-custom-role