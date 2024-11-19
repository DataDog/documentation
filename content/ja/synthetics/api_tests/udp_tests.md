---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API テスト
  tags:
  - udp
  - udp テスト
  - udp テスト
description: ホストで UDP 接続をシミュレートする
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: https://www.datadoghq.com/blog/udp-websocket-api-tests/
  tag: ブログ
  text: UDP と WebSocket のテストを実行し、レイテンシーが重要なアプリケーションを監視します
- link: /getting_started/synthetics/api_test/
  tag: ドキュメント
  text: API テストの概要
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
title: UDP テスト
---
## 概要

UDP テストでは、指定したホストのポートに低レベルの UDP 接続が確立されていることを監視し、UDP ポートに存在するあらゆるサービスの可用性を確保することが可能です。応答時間データを内蔵しているため、ネットワークアプリケーションのパフォーマンスを追跡し、予期しない速度低下が発生した場合に警告を受けることができます。

通常の UDP トラフィックでは、確認応答を求めることなく、送信元から宛先へ情報を送信します。UDP サービスを監視するために、Datadog では UDP ポートをリッスンし、応答を返すプロセスを受信側のホストに置くことを推奨しています。このプロセスをセットアップした後、UDP テストを作成し、期待される応答についてアサーションを設定することができます。

UDP テストは、ネットワークの外部または内部からのテストの実行の好みに応じて、[管理ロケーション](#select-locations)と[プライベートロケーション][1]の両方から実行することができます。UDP テストは、スケジュール、オンデマンド、または [CI/CD パイプライン][2]内で直接実行することができます。

## コンフィギュレーション

`UDP` テストの作成を選択した後、テストのリクエストを定義します。

### リクエストを定義する

1. テストを実行する **Host** と **Port** を指定します。
2. テストで送信したい文字列を入力します。
3. テストがタイムアウトするまでの時間を秒単位で指定します (オプション)。
4. UDP テストに**名前**を付けます。
5. UDP テストに `env` **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring & Continuous Testing ページ][3]で Synthetic テストをフィルタリングできます。

{{< img src="synthetics/api_tests/udp_test_config.png" alt="UDP リクエストを定義する" style="width:90%;" >}}

**Test URL** をクリックして、リクエストのコンフィギュレーションをテストします。画面の右側に応答プレビューが表示されます。

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。**Test URL** をクリックすると、`response time` の基本的なアサーションが追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ            | 演算子                                                                        | 値の型                        |
|-----------------|---------------------------------------------------------------------------------|-----------------------------------|
| response time   | `is less than`                                                                  | *整数 (ms)*                    |
| 文字列応答 | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`| *文字列* <br> *[Regex][4]*        |

応答プレビューを直接選択するか、**New Assertion** をクリックしてアサーションを作成します。UDP テストごとに最大 20 個のアサーションを作成することができます。

{{< img src="synthetics/api_tests/udp_assertions.png" alt="UDP テストが成功または失敗するためのアサーションを定義する" style="width:90%;" >}}

アサーションで `OR` ロジックを実行するには、`matches regex` あるいは `does not match regex` コンパレータを使用して、`(0|100)` のように同じアサーションタイプに対して複数の期待値を設定した正規表現を定義します。文字列レスポンスアサーションの値が 0 あるいは 100 の場合、テストは成功です。

テストがレスポンス本文にアサーションを含まない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連するレスポンスタイムを返します。

テストがレスポンス本文に対するアサーションを含み、タイムアウトの制限に達した場合、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

### ロケーションを選択する

UDP テストを実行する**ロケーション**を選択します。UDP テストは、ネットワークの外部または内部のどちらからテストを実行するかの好みによって、管理ロケーションと[プライベートロケーション][1]の両方から実行できます。

{{% managed-locations %}}

### テストの頻度を指定する

UDP テストは次の頻度で実行できます。

- **On a schedule**: 最も重要なサービスにユーザーが常にアクセスできるようにします。Datadog で UDP テストを実行する頻度を選択します。
- [**Within your CI/CD pipelines**][2]。
- **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### 変数を使用する

UDP テストの URL およびアサーションで、[**Settings** ページで定義されたグローバル変数][7]を使用できます。

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

デフォルトでは、Datadog 管理者および Datadog 標準ロールを持つユーザーのみが、Synthetic UDP テストを作成、編集、削除できます。Synthetic UDP テストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][9]のいずれかにアップグレードします。

[カスタムロール機能][10]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

### アクセス制限

アカウントに[カスタムロール][11]を使用しているお客様は、アクセス制限が利用可能です。

組織内の役割に基づいて、UDP テストへのアクセスを制限することができます。UDP テストを作成する際に、(ユーザーのほかに) どのロールがテストの読み取りと書き込みを行えるかを選択します。

{{< img src="synthetics/settings/restrict_access_1.png" alt="テストの権限の設定" style="width:70%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/private_locations/
[2]: /ja/synthetics/cicd_integrations
[3]: /ja/synthetics/search/#search
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: /ja/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /ja/synthetics/settings/#global-variables
[8]: /ja/synthetics/guide/synthetic-test-monitors
[9]: /ja/account_management/rbac/
[10]: /ja/account_management/rbac#custom-roles
[11]: /ja/account_management/rbac/#create-a-custom-role
