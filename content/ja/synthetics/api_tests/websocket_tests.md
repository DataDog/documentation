---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API テスト
  tags:
  - websocket
  - websocket テスト
  - websocket テスト
aliases: null
description: WebSocket リクエストをシミュレートして、パブリックおよび内部 API エンドポイントを監視します
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: https://www.datadoghq.com/blog/udp-websocket-api-tests/
  tag: ブログ
  text: UDP と WebSocket のテストを実行し、レイテンシーが重要なアプリケーションを監視します
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: ラーニングセンター
  text: Synthetic テストの紹介
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
title: WebSocket テスト
---
## 概要

WebSocket テストでは、エンドポイントで WebSocket 接続を積極的に開き、応答と、全体的な応答時間や期待されるヘッダーなどの定義された条件を確認することができます。

WebSocket テストは、ネットワークの外部または内部からのテストの実行の好みに応じて、[管理ロケーション](#select-locations)と[プライベートロケーション][1]の両方から実行することができます。WebSocket テストは、スケジュール、オンデマンド、または [CI/CD パイプライン][2]内で直接実行することができます。

## 構成

You may create a test using one of the following options:

- **Create a test from a template**:

     1. Hover over one of the pre-populated templates and click **View Template**. This opens a side panel displaying pre-populated configuration information, including: Test Details, Request Details, Assertions, Alert Conditions, and Monitor Settings.
     2. Click **+Create Test** to open the **Define Request** page, where you can review and edit the pre-populated configuration options. The fields presented are identical to those available when creating a test from scratch.
     3. Click **Save Details** to submit your API test.<br /><br>
        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Video of Synthetics API test landing page with templates" video="true" >}}

- **Build a test from scratch**:

    1. テストを一から作成するには、**+ Start from scratch** テンプレートをクリックし、`WebSocket` リクエストタイプを選択します。
    1. テストを実行する **URL** を指定します。
    1. テストで送信したい文字列を入力します。
    1. **Advanced Options** (オプション) をテストに追加します。<br /><br>

   {{< tabs >}}

   {{% tab "リクエストオプション" %}}
   * **Timeout**: テストがタイムアウトするまでの時間を秒単位で指定します。
   * **Request headers**: WebSocket 接続を開始する HTTP リクエストに追加するヘッダーを定義します。デフォルトのヘッダー (たとえば、`user-agent` ヘッダー) をオーバーライドすることもできます。
   * **Cookies**: クッキーを定義して WebSocket 接続を開始する HTTP リクエストに追加します。複数のクッキーを設定するには、次の書式を使用します `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`。

   {{% /tab %}}

   {{% tab "認証" %}}

   * **HTTP Basic Auth**: HTTP 基本認証資格情報を追加します。

   {{% /tab %}}

   {{< /tabs >}}

</br>

  5. WebSocket テストに**名前**を付けます。
  6. WebSocket テストに Environment **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring & Continuous Testing ページ][3]で Synthetic テストをフィルタリングできます。
  7. **Send** をクリックして、リクエストの構成をテストします。画面の右側に応答プレビューが表示されます。

     {{< img src="synthetics/api_tests/websocket_test_config_2.png" alt="WebSocket リクエストを定義する" style="width:90%;" >}}

  8. Click **Create Test** to submit your API test.

### スニペット

{{% synthetics-api-tests-snippets %}}

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。**Test URL** をクリックすると、`response time` の基本的なアサーションが追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ            | 演算子                                                                         | 値の型                        |
|-----------------|----------------------------------------------------------------------------------|-----------------------------------|
| response time   | `is less than`                                                                   | 整数 (ms)                    |
| 文字列応答 | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match` | _文字列_ <br> _[正規表現][4]_        |
| ヘッダー          | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match` | _文字列_ <br> _[正規表現][4]_        |

応答プレビューを直接選択するか、**New Assertion** をクリックしてアサーションを作成します。WebSocket テストごとに最大 20 個のアサーションを作成することができます。

{{< img src="synthetics/api_tests/websocket_assertions.png" alt="WebSocket テストが成功または失敗するためのアサーションを定義する" style="width:90%;" >}}

アサーションで `OR` ロジックを実行するには、`matches regex` あるいは `does not match regex` コンパレータを使用して、`(0|100)` のように同じアサーションタイプに対して複数の期待値を設定した正規表現を定義します。文字列レスポンスまたはヘッダーアサーションの値が 0 あるいは 100 の場合、テストは成功です。

テストがレスポンス本文にアサーションを含まない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連するレスポンスタイムを返します。

テストがレスポンス本文に対するアサーションを含み、タイムアウトの制限に達した場合、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

### ロケーションを選択する

WebSocket テストを実行する**ロケーション**を選択します。WebSocket テストは、ネットワークの外部または内部のどちらからテストを実行するかの好みによって、管理ロケーションと[プライベートロケーション][1]の両方から実行できます。

{{% managed-locations %}}

### テストの頻度を指定する

WebSocket テストは次の頻度で実行できます。

* **On a schedule**: 最も重要なエンドポイントにユーザーが常にアクセスできるようにします。Datadog で WebSocket テストを実行する頻度を選択します。
* [**Within your CI/CD pipelines**][2]: 欠陥のあるコードがカスタマーエクスペリエンスに影響を与える可能性があることを恐れずに出荷を開始します。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### 変数を使用する

WebSocket テストの URL、高度なオプション、アサーションで、[**Settings** ページで定義されたグローバル変数][4]を使用することができます。

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

`SSL`
: SSL 接続を実行できませんでした。[詳細については、個別のエラーページを参照してください][9]。

`TIMEOUT`
: リクエストを一定時間内に完了できなかったことを示します。`TIMEOUT` エラーには 2 種類あります。
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` は、リクエストの持続時間がテスト定義のタイムアウト (デフォルトは 60 秒に設定されています) に当たったことを示します。
  各リクエストについて、ネットワークウォーターフォールに表示されるのは、リクエストの完了したステージのみです。例えば、`Total response time` だけが表示されている場合、DNS の解決中にタイムアウトが発生したことになります。
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`  は、テスト時間 (リクエスト＋アサーション) が最大時間 (60.5s) に達したことを示しています。

`WEBSOCKET`
: WebSocket 接続が閉じられたか、開くことができません。`WEBSOCKET` エラーには次のようなものがあります。
  - `WEBSOCKET: Received message longer than the maximum supported length.` は応答メッセージの長さが最大長 (50kb) に達したことを示します。

## 権限

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][10]を持つユーザーのみが、Synthetic WebSocket テストを作成、編集、削除できます。Synthetic WebSocket テストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][10]のいずれかにアップグレードします。

[カスタムロール機能][11]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

### アクセス制限

{{% synthetics_grace_permissions %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/private_locations
[2]: /ja/synthetics/cicd_integrations
[3]: /ja/synthetics/search/#search
[4]: /ja/synthetics/settings/#global-variables
[5]: /ja/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /ja/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /ja/synthetics/guide/synthetic-test-monitors
[9]: /ja/synthetics/api_tests/errors/#ssl-errors
[10]: /ja/account_management/rbac/
[11]: /ja/account_management/rbac#custom-roles