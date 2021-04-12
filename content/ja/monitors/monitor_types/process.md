---
title: ライブプロセスモニター
kind: documentation
description: ホストでプロセスが実行されているかをチェックする
further_reading:
  - link: /monitors/notifications/
    tag: Documentation
    text: モニター通知の設定
  - link: /monitors/downtimes/
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: /monitors/monitor_status/
    tag: Documentation
    text: モニターステータスを確認
---
## 概要

ライブプロセスモニターは、[Process Agent][1] によって収集されるデータに基づいて実行されます。複数のホストまたはタグにまたがるプロセスグループのカウントに基づいて、警告またはアラートを生成するモニターを作成しましょう。

## モニターの作成

Datadog で[ライブプロセスモニター][2]を作成するには、メインナビゲーションで *Monitors --> New Monitor --> Live Process* の順に進みます。

### プロセスの選択

文字列をスペース区切りで入力し、監視対象のプロセスを検索します。この検索では部分一致、およびインフラストラクチャー上のすべてのプロセスに対するあいまい検索を実行します。`AND`、`OR`、`NOT` などの検索演算子も使用できます。詳細は[ライブプロセスモニタリング][3]のページを参照してください。特定のスコープのモニターを確認したい場合は、タグを使ったフィルタリングも可能です。

一致するプロセスとその数が画面下の表に表示されます。

{{< img src="monitors/monitor_types/process/select_processes.png" alt="プロセスの選択"  style="width:90%;">}}

検索結果を確定すると、入力した検索語句について見つかったプロセス総数の近似値を示すグラフが表示されます。より詳細なデータについては、[ライブプロセスページ][4]を参照してください。

#### アラートのグループ化

`シンプルアラート` (デフォルト): すべての報告元ソースに関わるアラートを集計します。集計値が設定条件を満たすと、アラートを 1 件受信します。

`マルチアラート`: グループパラメーターに従って、ソースごとにアラートを適用します。設定条件を満たすと各グループにつき 1 件のアラートを受信します。

### アラートの条件を設定する

* カウントが `above`、`above or equal to`、`below`、または `below or equal to` の時
* 過去 `5 minutes`、`15 minutes`、`1 hour` などの間のしきい値、または `custom` に 1 分～48 時間の値を設定します。

閾値を使用してアラートをトリガーする数値を設定しましょう。Datadog で使用できる通知タイプは 2 種類 (アラートおよび警告) あります。ライブプロセスモニターはアラートまたは警告閾値に基づいて自動で復旧措置を講じます。

### Notifications

**Say what's happening** と **Notify your team** のセクションに関して詳しくは、[通知][5] のページを参照してください。

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/infrastructure/process/
[2]: https://app.datadoghq.com/monitors#create/live_process
[3]: /ja/infrastructure/process/#search-syntax
[4]: https://app.datadoghq.com/process
[5]: /ja/monitors/notifications/