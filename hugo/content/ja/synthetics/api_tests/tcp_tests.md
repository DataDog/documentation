---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API Tests
  tags:
  - tcp
  - tcp test
  - tcp tests
aliases:
- /ja/synthetics/tcp_test
- /ja/synthetics/tcp_check
description: ホストで TCP 接続をシミュレートする
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic Monitoring の紹介
- link: /getting_started/synthetics/api_test
  tag: ドキュメント
  text: API テストの概要
- link: /synthetics/private_locations
  tag: ドキュメント
  text: 内部ホストで TCP テストを実行する
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
title: TCP テスト
---
## 概要 {#overview}

TCP テストを使用すると、特定のホストのポートで低レベルの TCP 接続を確立できるかどうかを監視でき、`SSH` (22)、`SMTP` (25)、`DNS` (53)、VPN over `HTTPS` (443) などのいくつかの主要サービスおよび他のポートに存在するカスタムサービスの可用性を確認できます。組み込みの応答時間データを使用して、ネットワークアプリケーションのパフォーマンスを追跡し、予期しない速度低下が発生した場合にアラートを受け取ります。

TCP テストは、ネットワーク外部または内部のどちらから実行するかという要件に応じて、[管理](#select-locations)ロケーションと[プライベートロケーション][1]の両方から実行できます。TCP テストは、スケジュール、オンデマンド、または [CI/CD パイプライン][2]内で直接実行できます。

## 構成 {#configuration}

次のいずれかの方法でテストを作成します。

- **テンプレートからテストを作成する**:
   
     1. 事前設定済みテンプレートのいずれかにカーソルを合わせて、{{< ui >}}View Template{{< /ui >}} をクリックします。サイドパネルが開き、{{< ui >}}Test Details{{< /ui >}}、{{< ui >}}Request Details{{< /ui >}}、{{< ui >}}Assertions{{< /ui >}}、{{< ui >}}Alert Conditions{{< /ui >}}、{{< ui >}}Monitor Settings{{< /ui >}} など、事前に設定された構成情報が表示されます。
     2. {{< ui >}}\+ Create Test{{< /ui >}} をクリックして {{< ui >}}Define Request{{< /ui >}} ページを開きます。このページで、事前に設定された構成オプションを確認し、編集できます。表示されるフィールドは、テストを一から作成する際に利用可能なフィールドと同じです。
     3. {{< ui >}}Save Details{{< /ui >}} をクリックして、API テストを送信します。<br /><br>
        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="テンプレートを使った Synthetics API テストのランディングページの動画" video="true" >}}

- **テストを一から作成する**:

    1. テストを一から作成するには、{{< ui >}}\+ Start from scratch{{< /ui >}} テンプレートをクリックし、`TCP` リクエストタイプを選択します。
    1. テストを実行する {{< ui >}}Host{{< /ui >}} と {{< ui >}}Port{{< /ui >}} を指定します。
    1. {{< ui >}}Track number of network hops (TTL){{< /ui >}} するかどうかを決定します。このオプションを使用すると、ネットワークホップ数をアサートし、テスト結果で TCP Traceroute にアクセスできます。
    1. テストがタイムアウトするまでの時間を秒単位で指定します (オプション)。
    1. TCP テストに {{< ui >}}Name{{< /ui >}} を付けます。
    1. TCP テストに Environment {{< ui >}}Tags{{< /ui >}} およびその他のタグを追加します。その後、これらのタグを使用して、[{{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} ページ][3]で Synthetic テストをフィルタリングできます。
    1. {{< ui >}}Test Host{{< /ui >}} をクリックして、リクエストの構成を試します。画面の右側にレスポンスのプレビューが表示されます。<br /><br>

       {{< img src="synthetics/api_tests/tcp_test_config_2.png" alt="TCP コネクションを定義する" style="width:90%;" >}}

    8. Click {{< ui >}}Create Test{{< /ui >}} to submit your API test.


### スニペット {#snippets}

{{% synthetics-api-tests-snippets %}}

### アサーションを定義する {#define-assertions}

アサーションは、期待されるテスト結果を定義します。{{< ui >}}Test URL{{< /ui >}} をクリックすると、`response time` の基本的なアサーションが追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ          | 演算子                                                                | 値の型     |
|---------------|-------------------------------------------------------------------------|----------------|
| 応答時間 | `is less than`                                                          | _整数 (ms)_ |
| ネットワークホップ    | `is less than`、`is less than or equal`、`is`、`is more than`、`is more than or equal` | _整数_        |
| コネクション | `is`                                                          | `established`、`refused`、`timeout` |

[{{< ui >}}New Assertion{{< /ui >}}] をクリックするか、レスポンスプレビューを直接クリックすることで、API テストごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions_tcp.png" alt="TCP テストの成功または失敗を判定するアサーションを定義する" style="width:90%;" >}}

テストに応答本文に関するアサーションが含まれていない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連する応答時間が返されます。

テストに応答本文に関するアサーションが含まれていて、タイムアウトの制限に達した場合は、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

### ロケーションを選択する {#select-locations}

TCP テストを実行する {{< ui >}}Locations{{< /ui >}} を選択します。TCP テストは、ネットワークの外部または内部のどちらからコネクションを開始するかという要件に応じて、管理ロケーションと[プライベートロケーション][1]の両方から実行できます。

{{% managed-locations %}}

### テストの頻度を指定する {#specify-test-frequency}

TCP テストは次の頻度で実行できます。

* **スケジュール**: 最も重要なサービスにユーザーが常にアクセスできるようにします。Datadog で TCP テストを実行する頻度を選択します。
* [**CI/CD パイプライン**][2]。
[* **オンデマンド**]: チームにとって最適なタイミングでテストを実行します。

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

{{% synthetics-variables %}}

### 変数を使用する {#use-variables}

TCP テストの URL、高度なオプション、アサーションでは、[{{< ui >}}Settings{{< /ui >}} ページ][8]で定義されたグローバル変数を使用できます。

変数のリストを表示するには、目的のフィールドに `{{` と入力します。

## テストの失敗 {#test-failure}

テストが 1 つ以上のアサーションを満たさない場合、またはリクエストが途中で失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストすることなくテストが失敗することもあります。

エラーコードの完全なリストについては、[API テストのエラー][11]を参照してください。

## 権限 {#permissions}

デフォルトでは、[Datadog Admin および Datadog 標準のロール][9]を持つユーザーのみが、Synthetic TCP テストを作成、編集、削除できます。Synthetic TCP テストの作成、編集、削除のアクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][9]のいずれかにアップグレードします。

[カスタムロール機能][10]を使用している場合は、`synthetics_read` および `synthetics_write` の権限を含むカスタムロールにユーザーを追加してください。

### アクセス制限 {#restrict-access}

{{% synthetics_grace_permissions %}}

## 参考資料 {#further-reading}

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
[11]: /ja/synthetics/api_tests/errors/#tcp-errors