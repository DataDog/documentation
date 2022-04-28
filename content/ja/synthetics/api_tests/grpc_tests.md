---
description: gRPC リクエストをシミュレートして、パブリックおよび内部 API エンドポイントを監視します
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: https://www.datadoghq.com/blog/grpc-health-check-datadog-synthetic-monitoring/
  tag: ブログ
  text: Datadog で gRPC API を監視する
- link: https://learn.datadoghq.com/course/view.php?id=39
  tag: ラーニングセンター
  text: Synthetic テストの紹介
- link: /synthetics/private_locations
  tag: ドキュメント
  text: 内部エンドポイントで gRPC ヘルスチェックを実行する
- link: https://www.datadoghq.com/blog/grpc-health-check-datadog-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングによる gRPC API の監視
kind: documentation
title: GRPC ヘルスチェック
---
## 概要

gRPC ヘルスチェックは、gRPC サービスの健全性を報告するための規格です。これにより、gRPC サーバーやサービスが応答し、実行され、リモートプロシージャコール (RPC) を処理する能力があるかどうかを判断することができます。

ヘルスチェックのメカニズムは、gRPC サーバー上の gRPC サービスとして実装することができます。gRPC コミュニティで共有されているヘルスチェックのプロトファイル例にアクセスするには、[オープンソースの gRPC リポジトリ][1]を参照してください。

gRPC ヘルスチェックテストは、ネットワークの外部または内部からのテストの実行の好みに応じて、[管理ロケーション][2]と[プライベートロケーション][3]の両方から実行することができます。gRPC テストは、スケジュール、オンデマンド、または [CI/CD パイプライン][4]内で直接実行することができます。

<div class="alert alert-warning">
Synthetic テストの gRPC のユースケースについて、<a href="https://docs.datadoghq.com/help/">サポート</a>チームにフィードバックをお送りください。
</div>

## コンフィギュレーション

`gRPC` ヘルスチェックテストの作成を選択した後、テストのリクエストを定義します。

### リクエストを定義する

1. ヘルスチェックテストを実行する **Host** と **Port** を指定します。デフォルトでは、ポートは `50051` に設定されています。
2. ヘルスチェックを送信したいサービスを入力します。gRPC サーバーのヘルスチェックを送信する場合は、このフィールドを空白にします。

3. gRPC ヘルスチェックテストの名前を入力します。

4. gRPC ヘルスチェックテストに `env` **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring ホームページ][5]で Synthetic テストをすばやくフィルタリングできます。

{{< img src="synthetics/api_tests/grpc_test_config.png" alt="gRPC リクエストを定義する" style="width:90%;" >}}

**Test Service** をクリックして、リクエストのコンフィギュレーションをテストします。画面の右側に応答プレビューが表示されます。

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。**Test Service** をクリックすると、取得したレスポンスに基づいて `response time` と `healthcheck status` に関するアサーションが追加されます。モニターするテストには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ                    | 演算子                                        | 値の型                           |
|-------------------------|-------------------------------------------------|--------------------------------------|
| response time           | `is less than`                                  | 整数 (ms)                       |
| ヘルスチェックのステータス      | `is`、`is not`                                  | 整数 (ms)                       |

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、API テストごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions_grpc.png" alt="gRPC テストが成功または失敗するためのアサーションを定義する" style="width:90%;" >}}

### ロケーションを選択する

gRPC ヘルスチェックテストを実行する **Locations** を選択します。gRPC ヘルスチェックテストは、ヘルスチェックテストをネットワークの外部から実行するか内部から実行するかに応じて、[管理ロケーション][2]と[プライベートロケーション][3]の両方から実行することができます。

### テストの頻度を指定する

gRPC ヘルスチェックテストは次の頻度で実行できます。

* **On a schedule**: 最も重要なサービスにユーザーが常にアクセスできるようにします。Datadog で gRPC テストを実行する頻度を選択します。
* [**Within your CI/CD pipelines**][4]: 欠陥のあるコードがカスタマーエクスペリエンスに影響を与える可能性があることを恐れずに出荷を開始します。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

### アラート条件を定義する

アラート条件で、ヘルスチェックテストが失敗しアラートをトリガーする状況を設定します。

#### アラート設定規則

アラートの条件を `An alert is triggered if any assertion fails for X minutes from any n of N locations` に設定すると、次の 2 つの条件が当てはまる場合にのみアラートがトリガーされます。

* 直近 *X* 分間に、最低 1 個のロケーションで失敗 (最低 1 つのアサーションが失敗)、
* 直近 *X* 分間に、ある時点で最低 *n* 個のロケーションで失敗。

#### 高速再試行

ヘルスチェックテストが失敗した場合、`Y` ミリ秒後に `X` 回再試行することができます。再試行の間隔は、警告の感性に合うようにカスタマイズしてください。

ロケーションのアップタイムは、評価ごとに計算されます (評価前の最後のテスト結果がアップかダウンか)。合計アップタイムは、構成されたアラート条件に基づいて計算されます。送信される通知は、合計アップタイムに基づきます。

### チームへの通知

以前に定義された[アラート条件](#define-alert-conditions)に基づいて、テストによって通知が送信されます。このセクションを使用して、チームに送信するメッセージの方法と内容を定義します。

1. [モニターの構成方法と同様][6]、メッセージに `@notification` を追加するか、ドロップダウンボックスでチームメンバーと接続されたインテグレーションを検索して、通知を受信する**ユーザーやサービス**を選択します。

2. ヘルスチェックテストの通知**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][7]のほか、以下の[条件付き変数][8]を使用できます。

    | 条件付き変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            |テストがアラートを発する場合に表示します。                                          |
    | `{{^is_alert}}`            |テストがアラートを発しない限り表示します。                                        |
    | `{{#is_recovery}}`         |テストがアラートから回復したときに表示します。                             |
    | `{{^is_recovery}}`         |テストがアラートから回復しない限り表示します。                           |

3. テストが失敗した場合に、ヘルスチェックテストで**通知メッセージを再送信する**頻度を指定します。ヘルスチェックテストの失敗を再通知しない場合は、`Never renotify if the monitor has not been resolved` オプションを使用してください。

**Save** をクリックすると、保存され、ヘルスチェックテストが開始されます。

## 変数

### ローカル変数を作成する

ヘルスチェックテストコンフィギュレーションフォームの右上隅にある **Create Local Variable** をクリックすると、ローカル変数を作成できます。以下の利用可能なビルトインのいずれかから値を定義できます。

`{{ numeric(n) }}`
: `n` 桁の数字列を生成します。

`{{ alphabetic(n) }}`
: `n` 文字のアルファベット文字列を生成します。

`{{ alphanumeric(n) }}`
: `n` 文字の英数字文字列を生成します。

`{{ date(n, format) }}`
: テストが開始された日付 + `n` 日の値を使用して、許容される形式のいずれかで日付を生成します。

`{{ timestamp(n, unit) }}`
: テストが +/- `n` 選択単位で開始されたタイムスタンプの値を使用して、許容される単位のいずれかでタイムスタンプを生成します。

### 変数を使用する

gRPC テストの URL、高度なオプション、およびアサーションで、[`Settings` で定義されたグローバル変数][9]と[ローカルで定義された変数](#create-local-variables)を使用できます。

変数のリストを表示するには、目的のフィールドに `{{` と入力します。

{{< img src="synthetics/api_tests/use_variable.mp4" alt="API テストでの変数の使用" video="true" width="90%" >}}

## テストの失敗

ヘルスチェックテストが 1 つ以上のアサーションを満たさない場合、またはリクエストが時期尚早に失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストすることなくヘルスチェックテストが実際に失敗することがあります。

これらの理由には以下が含まれます。

`gRPC specific errors`
: gRPC には、特定のステータスコードのリストがあり、[gRPC 公式ドキュメント][10]に記載されています。

`CONNRESET`
: 接続がリモートサーバーによって突然閉じられました。Web サーバーにエラーが発生した、応答中にシステムが停止した、Web サーバーへの接続が失われた、などの原因が考えられます。

`DNS`
: テスト URL に対応する DNS エントリが見つかりませんでした。テスト URL の構成の誤りまたは DNS エントリの構成の誤りの原因が考えられます。

`INVALID_REQUEST`
: テストのコンフィギュレーションが無効です (URL に入力ミスがあるなど)。

`SSL`
: SSL 接続を実行できませんでした。[詳細については、個別のエラーページを参照してください][11]。

`TIMEOUT`
: リクエストを一定時間内に完了できなかったことを示します。`TIMEOUT` には 2 種類あります。
  - `TIMEOUT: The request couldn’t be completed in a reasonable time.`  は、リクエストの持続時間がテスト定義のタイムアウト (デフォルトは 60 秒に設定されています) に当たったことを示します。
  各リクエストについて、ネットワークウォーターフォールに表示されるのは、リクエストの完了したステージのみです。例えば、`Total response time` だけが表示されている場合、DNS の解決中にタイムアウトが発生したことになります。
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`  は、テスト時間 (リクエストとアサーション) が最大時間 (60.5 秒) に達したことを示しています。

## アクセス許可

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][12]を持つユーザーのみが、Synthetic gRPC ヘルスチェックテストを作成、編集、削除できます。Synthetic gRPC ヘルスチェックテストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][12]のいずれかにアップグレードします。

[カスタムロール機能][13]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

## アクセス制限

アカウントに[カスタムロール][14]を使用しているお客様は、アクセス制限が利用可能です。

組織内の役割に基づいて、ブラウザテストへのアクセスを制限することができます。ブラウザテストを作成する際に、(ユーザーのほかに) どのロールがテストの読み取りと書き込みを行えるかを選択します。

{{< img src="synthetics/settings/restrict_access.png" alt="テストのアクセス許可の設定" style="width:70%;" >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
[2]: /ja/api/v1/synthetics/#get-all-locations-public-and-private
[3]: /ja/synthetics/private_locations
[4]: /ja/synthetics/cicd_testing
[5]: /ja/synthetics/search/#search
[6]: /ja/monitors/notify/#notify-your-team
[7]: https://www.markdownguide.org/basic-syntax/
[8]: /ja/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[9]: /ja/synthetics/settings/#global-variables
[10]: https://grpc.github.io/grpc/core/md_doc_statuscodes.html
[11]: /ja/synthetics/api_tests/errors/#ssl-errors
[12]: /ja/account_management/rbac/
[13]: /ja/account_management/rbac#custom-roles
[14]: /ja/account_management/rbac/#create-a-custom-role