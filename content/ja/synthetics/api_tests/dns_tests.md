---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API テスト
  tags:
  - dns
  - dns テスト
  - dns テスト
aliases:
- /ja/synthetics/dns_test
- /ja/synthetics/dns_check
description: DNS レコードの解決可能性とルックアップ時間を監視します
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: https://www.datadoghq.com/blog/monitor-dns-with-datadog/
  tag: ブログ
  text: Datadog による DNS モニタリング
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: API テストの概要
- link: /synthetics/private_locations
  tag: ドキュメント
  text: 内部エンドポイントの DNS 解決をテストする
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
title: DNS テスト
---

## 概要

DNS テストを使用すると、任意のネームサーバーを使用して、DNS レコードの解決可能性とルックアップ時間をプロアクティブに監視できます。解決が予想外に遅い場合、または DNS サーバーが予想外の A、AAAA、CNAME、TXT、または MX エントリで応答した場合、Datadog は失敗の詳細を含むアラートを送信し、問題の根本原因をすばやく特定、修正できるようにします。

DNS テストは、ネットワークの外部または内部からのテストの実行の好みに応じて、[管理ロケーション](#select-locations)と[プライベートロケーション][1]の両方から実行することができます。DNS テストは、スケジュール、オンデマンド、または [CI/CD パイプライン][2]内で直接実行することができます。

## コンフィギュレーション

`DNS` テストの作成を選択した後、テストのリクエストを定義します。

### リクエストを定義する

1. テストでクエリする**ドメイン**を指定します (例: `www.example.com`)。
2. 使用する **DNS サーバー** を指定します（任意）。ドメイン名または IP アドレスを使用できます。指定されていない場合、DNS テストは `8.8.8.8` を使用して解決を実行し、 `1.1.1.1` と内部 AWS DNS サーバーにフォールバックします。
3. DNS サーバーの **ポート** を指定します（任意）。指定されていない場合、DNS サーバーのポートはデフォルトで 53 になります。
4. テストがタイムアウトするまでの時間を秒単位で指定します (オプション)。
5. DNS テストに**名前**を付けます。
6. DNS テストに `env` **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring & Continuous Testing ページ][3]で Synthetic テストをフィルタリングできます。

{{< img src="synthetics/api_tests/dns_test_config_new.png" alt="DNS クエリを定義する" style="width:90%;" >}}

**Test URL** をクリックして、リクエストのコンフィギュレーションをテストします。画面の右側に応答プレビューが表示されます。

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。**Test URL** をクリックした後、`response time` の基本的なアサーションと利用可能なレコードが追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ                | レコードタイプ                                                     | 演算子                                           | 値の型                 |
|---------------------|-----------------------------------------------------------------|----------------------------------------------------|----------------------------|
| response time       |                                                                 | `is less than`                                     | 整数 (ms)             |
| 以下の利用可能なすべてのレコード        | タイプ A、タイプ AAAA、タイプ CNAME、タイプ MX、タイプ NS、タイプ TXT | `is`、`contains`、<br> `matches`、`does not match` | _文字列_ <br> _[正規表現][4]_ |
| at least one record | タイプ A、タイプ AAAA、タイプ CNAME、タイプ MX、タイプ NS、タイプ TXT | `is`、`contains`、<br> `matches`、`does not match` | _文字列_ <br> _[正規表現][4]_ |

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、API テストごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions_dns.png" alt="DNS テストが成功または失敗するためのアサーションを定義する" style="width:90%;" >}}

アサーションで `OR` ロジックを実行するには、`matches regex` コンパレータを使用して、`(0|100)` のように同じアサーションタイプに対して複数の期待値を持つ正規表現を定義します。利用可能なすべてのレコード、あるいは少なくともひとつのレコードのアサーションの値が 0 あるいは 100 であれば、テスト結果は成功です。

テストがレスポンス本文にアサーションを含まない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連するレスポンスタイムを返します。

テストがレスポンス本文に対するアサーションを含み、タイムアウトの制限に達した場合、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

### ロケーションを選択する

DNS テストを実行するための **Locations** を選択します。DNS テストは、パブリックドメインまたはプライベートドメインを監視するかに応じて、管理ロケーションおよび[プライベートロケーション][1]の両方から実行することができます。

{{% managed-locations %}} 

### テストの頻度を指定する

DNS テストは次の頻度で実行できます。

* **On a schedule**: 最も重要なサービスにユーザーが常にアクセスできるようにします。Datadog で DNS テストを実行する頻度を選択します。
* [**Within your CI/CD pipelines**][2]。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}} 

### 変数を使用する

DNS テストの URL、高度なオプション、アサーションで、[**Settings** ページで定義されたグローバル変数][9]を使用することができます。

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

`TIMEOUT`
: リクエストを一定時間内に完了できなかったことを示します。`TIMEOUT` には 2 種類あります。
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` は、リクエストの持続時間がテスト定義のタイムアウト (デフォルトは 60 秒に設定されています) に当たったことを示します。
  各リクエストについて、ネットワークウォーターフォールに表示されるのは、リクエストの完了したステージのみです。例えば、`Total response time` だけが表示されている場合、DNS の解決中にタイムアウトが発生したことになります。
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`  は、テスト時間 (リクエスト＋アサーション) が最大時間 (60.5s) に達したことを示しています。

## 権限

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][10]を持つユーザーのみが、Synthetic DNS テストを作成、編集、削除できます。Synthetic DNS テストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][10]のいずれかにアップグレードします。

[カスタムロール機能][11]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

### アクセス制限

アカウントに[カスタムロール][12]を使用しているお客様は、アクセス制限が利用可能です。

組織内の役割に基づいて、DNS テストへのアクセスを制限することができます。DNS テストを作成する際に、(ユーザーのほかに) どのロールがテストの読み取りと書き込みを行えるかを選択します。

{{< img src="synthetics/settings/restrict_access_1.png" alt="テストの権限の設定" style="width:70%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/private_locations
[2]: /ja/synthetics/cicd_integrations
[3]: /ja/synthetics/search/#search
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: /ja/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /ja/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /ja/synthetics/guide/synthetic-test-monitors
[9]: /ja/synthetics/settings/#global-variables
[10]: /ja/account_management/rbac/
[11]: /ja/account_management/rbac#custom-roles
[12]: /ja/account_management/rbac/#create-a-custom-role