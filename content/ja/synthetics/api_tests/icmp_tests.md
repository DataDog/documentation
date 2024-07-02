---
title: ICMP Testing
kind: documentation
description: Monitor the availability of your hosts and diagnose network issues.
aliases:
  - /synthetics/icmp_test
  - /synthetics/icmp_check
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: Blog
  text: Introducing Datadog Synthetic Monitoring
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: Get started with API tests
- link: /synthetics/private_locations
  tag: Documentation
  text: Run ICMP pings on internal endpoints
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: Learn about Synthetic test monitors
algolia:
  rank: 70
  category: Documentation
  subcategory: Synthetic API Tests
  tags: [icmp, icmp test, icmp tests]
---

## Overview

ICMP tests allow you to monitor the availability of your hosts and diagnose network communication issues. By asserting on the values received from one or more ICMP pings to your endpoint, Datadog can help detect connectivity issues, above-quota latency for round trip times, and unexpected changes in security firewall configuration. The tests can also track the number of network hops (TTL) required to connect to your host and view traceroute results to discover details on each network hop along the path.

ICMP tests can run from both [managed](#select-locations) and [private locations][1] depending on whether you want to trigger ICMP pings to your endpoints from outside or inside your network. You can run ICMP tests on a defined schedule, on demand, or from within your [CI/CD pipelines][2].

## 構成

`ICMP` テストの作成を選択した後、テストのリクエストを定義します。

### リクエストを定義する

1. テストを実行する**ドメイン名**または **IP アドレス**を指定します。
2. **Track number of network hops (TTL)** (ネットワークホップ数 (TTL) の追跡) を選択または選択解除します。このオプションを選択すると、"traceroute" プローブをオンにして、ホストの宛先へのパスに沿ったすべてのゲートウェイを検出します。
3. テストセッションごとにトリガーする **Number of Pings** (Ping の数) を選択します。 デフォルトでは、ping の数は 4 に設定されています。この数値は、減らすか最大 10 まで増やすかを選択できます。
4. ICMP テストに**名前**を付けます。
5. ICMP テストに `env` **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring & Continuous Testing ページ][3]で Synthetic テストをフィルタリングできます。

{{< img src="synthetics/api_tests/icmp_test_config.png" alt="ICMP リクエストを定義する" style="width:90%;" >}}

**Test URL** をクリックして、リクエストのコンフィギュレーションをテストします。画面の右側に応答プレビューが表示されます。

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

テストが 1 つ以上のアサーションを満たさない場合、またはリクエストが途中で失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対するアサーションをテストせずにテストが実際に失敗することがあります。

これらの理由には以下が含まれます。

`DNS`
: テスト URL に対応する DNS エントリが見つかりませんでした。原因としては、テスト URL の誤構成や DNS エントリの誤構成が考えられます。

## 権限

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][9]を持つユーザーのみが、Synthetic ICMP テストを作成、編集、削除できます。Synthetic ICMP テストの作成、編集、および削除のアクセス権を取得するには、ユーザーのロールをこれら 2 つの[デフォルトのロール][9]のいずれかにアップグレードしてください。

[カスタムロール機能][10]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

### アクセス制限

アカウントに[カスタムロール][11]を使用しているお客様は、アクセス制限が利用可能です。

組織内の役割に基づいて、ICMP テストへのアクセスを制限することができます。ICMP テストを作成する際に、ユーザーに加えてどのロールがあなたのテストを読み取りおよび書き込むことができるかを選択します。

{{< img src="synthetics/settings/restrict_access_1.png" alt="テストの権限の設定" style="width:70%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/private_locations
[2]: /synthetics/cicd_integrations
[3]: /synthetics/search/#search
[4]: /monitors/notify/#configure-notifications-and-automations
[5]: https://www.markdownguide.org/basic-syntax/
[6]: /monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[7]: /synthetics/guide/synthetic-test-monitors
[8]: /synthetics/settings/#global-variables
[9]: /account_management/rbac/
[10]: /account_management/rbac#custom-roles
[11]: /account_management/rbac/#create-a-custom-role
