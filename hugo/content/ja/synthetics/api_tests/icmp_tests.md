---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API テスト
  tags:
  - icmp
  - icmp テスト
  - icmp テスト
aliases:
- /ja/synthetics/icmp_test
- /ja/synthetics/icmp_check
description: ホストの可用性を監視し、ネットワークの問題を診断します。
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: API テストの概要
- link: /synthetics/private_locations
  tag: Documentation
  text: 内部エンドポイントで ICMP Ping を実行する
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
title: ICMP テスト
---

## 概要

ICMP テストを使用すると、ホストの可用性を監視し、ネットワーク通信の問題を診断できます。Datadog は、エンドポイントへの 1 つ以上の ICMP ping から受信した値をアサートすることにより、接続の問題、ラウンドトリップ時間のクォータを超えるレイテンシー、セキュリティファイアウォールコンフィギュレーションの予期しない変更を検出するのに役立ちます。テストでは、ホストに接続するために必要なネットワークホップ (TTL) の数を追跡し、traceroute の結果を表示して、パスに沿った各ネットワークホップの詳細を検出することもできます。

ICMP テストは、ネットワークの外部または内部のどちらからエンドポイントへの ICMP ping をトリガーするかに応じて、[管理ロケーション](#select-locations)および[プライベートロケーション][1]の両方から実行できます。ICMP テストは、定義されたスケジュールで、オンデマンドで、または [CI/CD パイプライン][2]内から実行できます。

## 構成

You may create a test using one of the following options:

   - **Create a test from a template**:

       1. Hover over one of the pre-populated templates and click **View Template**. This opens a side panel displaying pre-populated configuration information, including: Test Details, Request Details, Assertions, Alert Conditions, and Monitor Settings.
       2. Click **+Create Test** to open the **Define Request** page, where you can review and edit the pre-populated configuration options. The fields presented are identical to those available when creating a test from scratch.
       3. Click **Save Details** to submit your API test.<br /><br>
          {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Video of Synthetics API test landing page with templates" video="true" >}}

   - **Build a test from scratch**:

      1. テストを一から作成するには、**+ Start from scratch** テンプレートをクリックし、`ICMP` リクエストタイプを選択します。
      1. テストを実行する**ドメイン名**または **IP アドレス**を指定します。
      1. **Track number of network hops (TTL)** (ネットワークホップ数 (TTL) の追跡) を選択または選択解除します。このオプションを選択すると、"traceroute" プローブをオンにして、ホストの宛先へのパスに沿ったすべてのゲートウェイを検出します。
      1. テストセッションごとにトリガーする **Number of Pings** (Ping の数) を選択します。 デフォルトでは、ping の数は 4 に設定されています。この数値は、減らすか最大 10 まで増やすかを選択できます。
      1. ICMP テストに**名前**を付けます。
      1. ICMP テストに Environment **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring & Continuous Testing ページ][3]で Synthetic テストをフィルタリングできます。
      1. **Test Host** をクリックして、リクエストの構成をテストします。画面の右側に応答プレビューが表示されます。<br /><br>

        {{< img src="synthetics/api_tests/icmp_test_config_2.png" alt="ICMP リクエストを定義する" style="width:90%;" >}}
      8. Click **Create Test** to submit your API test.




### スニペット

{{% synthetics-api-tests-snippets %}}

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。**Test URL** をクリックすると、`latency`、`packet loss`、`packet received` の基本的なアサーションが追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ          | 集計    |演算子                                                                               | 値の型       |
|-----------------|----------------|------------------------------------------------------------------------|------------------|
| レイテンシー         | `avg`、`max`、`min` または `stddev` (別名 `jitter`) |`is less than`、`is less than or equal`、<br> `is`、`is more than`、`is more than or equal` | 整数 (ms)    |
| パケットロス     | - |`is less than`、`is less than or equal`、`is`、`is more than`、`is more than or equal` | パーセント (%) |
| 受信したパケット | - |`is less than`、`is less than or equal`、`is`、`is more than`、`is more than or equal` | _integer_        |
| ネットワークホップ    | - |`is less than`、`is less than or equal`、`is`、`is more than`、`is more than or equal` | _integer_        |

**New Assertion** を選択するか、応答プレビューを直接選択することで、API テストごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/icmp_assertion.png" alt="ICMP テストが成功または失敗するためのアサーションを定義する" style="width:90%;" >}}

テストがレスポンス本文にアサーションを含まない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連するレスポンスタイムを返します。

テストがレスポンス本文に対するアサーションを含み、タイムアウトの制限に達した場合、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

### ロケーションを選択する

ICMP テストを実行する**ロケーション**を選択します。ICMP テストは、ネットワークの外部または内部のどちらから ICMP ping をトリガーするかの好みによって、管理ロケーションと[プライベートロケーション][1]の両方から実行できます。

{{% managed-locations %}}

### テストの頻度を指定する

ICMP テストは次の頻度で実行できます。

* **On a schedule**: 最も重要なサービスにユーザーが常にアクセスできるようにします。Datadog で ICMP テストを実行する頻度を選択します。
* [**Within your CI/CD pipelines**][2]。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### 変数を使用する

ICMP テストの URL およびアサーションで、[**Settings** ページで定義されたグローバル変数][8]を使用できます。

変数のリストを表示するには、目的のフィールドに `{{` と入力します。

## テストの失敗

テストが 1 つ以上のアサーションを満たさない場合、またはリクエストが時期尚早に失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストすることなくテストが実際に失敗することがあります。

これらの理由には以下が含まれます。

`DNS`
: テスト URL に対応する DNS エントリが見つかりませんでした。原因としては、テスト URL の誤構成や DNS エントリの誤構成が考えられます。

## 権限

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][9]を持つユーザーのみが、Synthetic ICMP テストを作成、編集、削除できます。Synthetic ICMP テストの作成、編集、および削除のアクセス権を取得するには、ユーザーのロールをこれら 2 つの[デフォルトのロール][9]のいずれかにアップグレードしてください。

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