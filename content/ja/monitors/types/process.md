---
aliases:
- /ja/monitors/monitor_types/process
- /ja/monitors/create/types/process/
description: ホストでプロセスが実行されているかをチェックする
further_reading:
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/status/
  tag: ドキュメント
  text: モニターステータスを確認
- link: https://www.datadoghq.com/blog/monitor-fargate-processes/
  tag: ブログ
  text: AWS Fargate 上で実行されるプロセスを Datadog で監視する
title: ライブプロセスモニター
---

<div class="alert alert-warning">
Live Processes および Live Process Monitoring は Enterprise プランに含まれています。他のプランをご利用の場合、この機能をリクエストするにはアカウント担当者または <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> へご連絡ください。
</div>

## 概要

ライブプロセスモニターは、[Process Agent][1] によって収集されるデータを基に機能します。複数のホストまたはタグにまたがるプロセスグループのカウントに基づいて、警告またはアラートを生成するモニターを作成しましょう。

ライブプロセスモニターは、以下のような場合に最適です。

- コンテナ化されていない長寿命プロセスのインスタンスが十分に実行されていることを確認する。
- 特定のプロセスが実行中である場合にフラグを立てる。

**注**: Agent によって検出されるのは長寿命のプロセスのみです。20 秒未満の寿命のプロセスのモニターは不安定になる可能性があります。

## モニターの作成

ライブプロセスモニターを作成するには 2 つの方法があります。

- メインナビゲーションで、**Monitors --> New Monitor --> Live Process** の順に選択する。
- [ライブプロセスページ][4]で、監視したいプロセスを検索します。次に、**+New Metric** の隣にあるドロップダウンメニューをクリックし、**Create monitor** をクリックします。

### プロセスの選択

タグまたはあいまい検索を使用して、インフラストラクチャー内のすべてのプロセスをフィルタリングできます。一致するプロセスとカウントは、検索の下に表示されます。

{{< img src="monitors/monitor_types/process/select_processes.png" alt="プロセスの選択" style="width:90%;">}}

検索を定義すると、検索入力の上にグラフが表示され、見つかったプロセスの総数の概算が表示されます。モニターのスコープは数千プロセス程度にしておくことをお勧めします。必要に応じて、追加のタグを使用して検索を絞り込むか、モニターを複数に分割することを検討してください。より詳細なデータについては、[ライブプロセスページ][4]を参照してください。

#### タグ検索

タグで監視するプロセスをフィルタリングします。Datadog は、全文検索を使用する前に、タグでプロセスをフィルタリングしてみることをお勧めします。

#### 全文検索

タグを使用して希望する粒度までプロセスを絞り込めない場合は、テキスト検索を使用してコマンドラインとユーザー名の両方に対してフィルタリングすることができます。この検索では、インフラストラクチャー上のすべてのプロセスに対して部分一致検索とあいまい検索を行います。検索演算子 `AND`、`OR`、`NOT` がサポートされています。詳細は[ライブプロセスモニタリングのドキュメント][3]を参照してください。

##### 例

| クエリの例 | 説明 |
|---|---|
| `foo AND bar` | コマンドラインに `foo` と `bar` の両方が含まれるプロセスにマッチします |
| `foo AND NOT bar` | コマンドラインに `bar` ではなく `foo` が含まれるプロセスにマッチします。 |
| `foo OR bar` | `foo` または `bar` が含まれるプロセスにマッチします。 |
| `foo or NOT bar` | `foo` が含まれるか、`bar` が含まれないプロセスにマッチします。 |

#### アラートのグループ化

`シンプルアラート` (デフォルト): すべての報告元ソースに関わるアラートを集計します。集計値が設定条件を満たすと、アラートを 1 件受信します。

`マルチアラート`: グループパラメーターに従って、ソースごとにアラートを適用します。設定条件を満たすと各グループにつき 1 件のアラートを受信します。

### アラートの条件を設定する

- プロセスカウントが `above`、`above or equal to`、`below`、または `below or equal to` の時
- 過去 `5 minutes`、`15 minutes`、`1 hour` またはそれ以上のしきい値。また、`custom` を使用して 5 分～24 時間の値を設定することができます。

この場合、プロセスカウントは、時間間隔中に生存していたすべてのマッチングプロセスの数を指します。

閾値を使用してアラートをトリガーする数値を設定しましょう。Datadog で使用できる通知タイプは 2 種類 (アラートおよび警告) あります。ライブプロセスモニターはアラートまたは警告閾値に基づいて自動で復旧措置を講じます。

#### 時間枠選択のベストプラクティス

ライブプロセスモニターは、[ローリングタイムウィンドウ][7]を使用してプロセス数を評価します。言い換えると、モニターは 1 分ごとに過去 X 分間をチェックし、アラート条件が満たされた場合にトリガーします。Process Agent と Datadog 間の散発的なネットワーク障害による誤検知を防ぐために、5 分未満の評価ウィンドウを使用することは推奨されません。

### 高度なアラート条件

高度なアラートオプション (自動解決、評価遅延など) の詳細な手順については、[モニターコンフィギュレーション][5]ページを参照してください。

### 通知

**Configure notifications and automations** (通知と自動化の構成) セクションの詳しい説明は、[通知][6]のページをご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/infrastructure/process/
[2]: https://app.datadoghq.com/monitors/create/live_process
[3]: /ja/infrastructure/process/#search-syntax
[4]: https://app.datadoghq.com/process
[5]: /ja/monitors/configuration/#advanced-alert-conditions
[6]: /ja/monitors/notify/
[7]: /ja/monitors/configuration/?tab=thresholdalert#evaluation-window