---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API テスト
  tags:
  - tcp
  - tcp テスト
  - tcp テスト
aliases:
- /ja/synthetics/tcp_test
- /ja/synthetics/tcp_check
description: ホストで TCP 接続をシミュレートする
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: API テストの概要
- link: /synthetics/private_locations
  tag: Documentation
  text: 内部ホストで TCP テストを実行する
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
title: TCP テスト
---

## 概要

TCP テストを使用すると、特定のホストのポートで低レベルの TCP 接続を確立できるかどうかを監視でき、`SSH` (22)、`SMTP` (25)、`DNS` (53)、VPN over `HTTPS` (443) などのいくつかの主要サービスおよび他のポートに存在するカスタムサービスの可用性を確認できます。組み込みの応答時間データを使って、ネットワークアプリケーションのパフォーマンスを追跡し、予期しない速度低下が発生した場合にアラートを受け取ります。

TCP テストは、ネットワークの外部または内部からのテストの実行の好みに応じて、[管理ロケーション](#select-locations)と[プライベートロケーション][1]の両方から実行することができます。TCP テストは、スケジュール、オンデマンド、または [CI/CD パイプライン][2]内で直接実行することができます。

## 構成

You may create a test using one of the following options:

- **Create a test from a template**:

     1. Hover over one of the pre-populated templates and click **View Template**. This opens a side panel displaying pre-populated configuration information, including: Test Details, Request Details, Assertions, Alert Conditions, and Monitor Settings.
     2. Click **+Create Test** to open the **Define Request** page, where you can review and edit the pre-populated configuration options. The fields presented are identical to those available when creating a test from scratch.
     3. Click **Save Details** to submit your API test.<br /><br>
        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Video of Synthetics API test landing page with templates" video="true" >}}

- **Build a test from scratch**:

    1. テストを一から作成するには、**+ Start from scratch** テンプレートをクリックし、`TCP` リクエストタイプを選択します。
    1. テストを実行する **Host** と **Port** を指定します。
    1. **Track number of network hops (TTL) (ネットワークホップ数 (TTL) を追跡する)**かどうかを決定します。このオプションを使用すると、ネットワークホップ数をアサートし、テスト結果で TCP Traceroute にアクセスできます。
    1. テストがタイムアウトするまでの時間を秒単位で指定します (オプション)。
    1. TCP テストに**名前**を付けます。
    1. TCP テストに Environment **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring & Continuous Testing ページ][3]で Synthetic テストをフィルタリングできます。
    1. **Test Host** をクリックして、リクエストの構成をテストします。画面の右側に応答プレビューが表示されます。<br /><br>

       {{< img src="synthetics/api_tests/tcp_test_config_2.png" alt="TCP 接続を定義する" style="width:90%;" >}}

    8. Click **Create Test** to submit your API test.


### スニペット

{{% synthetics-api-tests-snippets %}}

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。**Test URL** をクリックすると、`response time` の基本的なアサーションが追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ          | 演算子                                                                | 値の型     |
|---------------|-------------------------------------------------------------------------|----------------|
| response time | `is less than`                                                          | 整数 (ms) |
| ネットワークホップ    | `is less than`、`is less than or equal`、`is`、`is more than`、`is more than or equal` | _integer_        |
| 接続 | `is`                                                          | `established`、`refused`、`timeout` |

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、API テストごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions_tcp.png" alt="TCP テストが成功または失敗するためのアサーションを定義する" style="width:90%;" >}}

テストがレスポンス本文にアサーションを含まない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連するレスポンスタイムを返します。

テストがレスポンス本文に対するアサーションを含み、タイムアウトの制限に達した場合、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

### ロケーションを選択する

TCP テストを実行する**ロケーション**を選択します。TCP テストは、ネットワークの外部または内部のどちらから接続を開始するかの好みによって、管理ロケーションと[プライベートロケーション][1]の両方から実行できます。

{{% managed-locations %}}

### テストの頻度を指定する

TCP テストは次の頻度で実行できます。

* **On a schedule**: 最も重要なサービスにユーザーが常にアクセスできるようにします。Datadog で TCP テストを実行する頻度を選択します。
* [**Within your CI/CD pipelines**][2]。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### 変数を使用する

TCP テストの URL、高度なオプション、アサーションで、[**Settings** ページで定義されたグローバル変数][8]を使用することができます。

変数のリストを表示するには、目的のフィールドに `{{` と入力します。

## テストの失敗

テストが 1 つ以上のアサーションを満たさない場合、またはリクエストが時期尚早に失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストすることなくテストが実際に失敗することがあります。

これらの理由には以下が含まれます。

`CONNRESET`
: 接続がリモートサーバーによって突然閉じられました。Web サーバーにエラーが発生した、応答中にシステムが停止した、Web サーバーへの接続が失われた、などの原因が考えられます。

`DNS`
: テスト URL に対応する DNS エントリが見つかりませんでした。原因としては、テスト URL の誤構成や DNS エントリの誤構成が考えられます。

`INVALID_REQUEST`
: テストのコンフィギュレーションが無効です (URL に入力ミスがあるなど)。

`TIMEOUT`
: リクエストを一定時間内に完了できなかったことを示します。`TIMEOUT` には 2 種類あります。
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` は、リクエストの持続時間がテスト定義のタイムアウト (デフォルトは 60 秒に設定されています) に当たったことを示します。
  各リクエストについて、ネットワークウォーターフォールに表示されるのは、リクエストの完了したステージのみです。例えば、`Total response time` だけが表示されている場合、DNS の解決中にタイムアウトが発生したことになります。
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`  は、テスト時間 (リクエスト＋アサーション) が最大時間 (60.5s) に達したことを示しています。

## 権限

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][9]を持つユーザーのみが、Synthetic TCP テストを作成、編集、削除できます。Synthetic TCP テストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][9]のいずれかにアップグレードします。

[カスタムロール機能][10]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

### アクセス制限

{{% synthetics_grace_permissions %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/private_locations
[2]: /ja/synthetics/cicd_integrations
[3]: /ja/synthetics/search/#search
[4]: /ja/monitors/notify/#configure-notifications-and-automations
[5]: https://www.markdownguide.org/basic-syntax/
[6]: /ja/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[7]: /ja/synthetics/guide/synthetic-test-monitors
[8]: /ja/synthetics/settings/#global-variables
[9]: /ja/account_management/rbac/
[10]: /ja/account_management/rbac#custom-roles