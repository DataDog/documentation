---
kind: documentation
title: データベースモニタリングモニター
---


## 概要

[データベースモニタリング (DBM)][1] のモニタータイプでは、モニターを作成し、DBM で表示されるデータに対してアラートを発することができます。これらのモニターは、DBM のイベントタイプが所定の期間にわたって事前に定義されたしきい値から逸脱した場合にアラートするように構成することができます。

これらのイベントタイプの例としては、クエリがブロックしているクエリの解決を待っているときや、アクティブなクエリの実行が所定の持続時間のしきい値を超えたときなどがあります。

## モニターの作成

Datadog で新しい DBM モニターを作成するには、UI で [**Monitors** > **New Monitor** > **Database Monitoring**][2] に移動します。

<div class="alert alert-info"><strong>注</strong>: デフォルトでは、1 アカウントあたり 1000 人の DBM モニターという制限があります。この制限に引っかかっている場合、<a href="/monitors/types/database_monitoring/#creating-monitors-from-scratch">シンプルアラート</a>を使用するか、<a href="/help/">サポートに連絡</a>してアカウントのこの制限を解除することを検討してください。</div>

## 検索クエリを定義する

注: クエリが変わると、検索バーの上のチャートがそれに対応して更新されます。

### 一般的なモニタータイプ

[モニターをゼロから作成する](#creating-monitors-from-scratch)ことを望まない場合は、以下のあらかじめ定義されたモニタータイプのいずれかを使用することができます。
- 待機クエリ
- 長時間実行クエリ

{{< img src="database_monitoring/dbm_event_monitor/dbm_common_monitor_types.png" alt="待機クエリや長時間実行クエリに関する OOTB モニターの例" style="width:100%;" >}}

これらの既存のモニタータイプやその他のモニタータイプに関するご意見は、カスタマーサクセスマネージャーにお伝えください。

### モニターをゼロから作成する

1. **Query Samples** と **Explain Plans** のどちらを監視したいかを決定し、ドロップダウンメニューから該当するオプションを選択します。

{{< img src="database_monitoring/dbm_event_monitor/dbm_event_monitor_data_types.png" alt="データベースモニタリングのデータタイプで利用可能なさまざまなデータソースを示すドロップダウンメニュー" style="width:80%;" >}}

2. <a href="https://docs.datadoghq.com/database_monitoring/query_samples/">DBM Query Samples</a> のアクティビティと実行計画の説明と同じロジックを使用して検索クエリを構築してください。これは、検索バーに含める 1 つ以上の**ファセット**を選択することを意味します。例えば、ユーザー `postgresadmin` が実行した待機クエリについてアラートを出したい場合、検索バーは次のようになります。

{{< img src="database_monitoring/dbm_event_monitor/dbm_example_query_no_group_by.png" alt="検索バーに 2 つのファセットを含む検索クエリの例。" style="width:100%;" >}}

注: 構成するモニターは、ファセットの**一意の値カウント**に対してアラートを発します。

3. また、複数のディメンションで DBM イベントをグループ化するオプションもあります。クエリに一致するすべての DBM イベントは、最大 **5 つのファセット**の値に基づいて一緒にグループ化されます。グループ化機能では、**アラートグループ化戦略**を構成することも可能です。
    * **シンプルアラート**: シンプルアラートは、すべてのレポートソースを集計するため、1 つまたは複数のグループ値がしきい値を突破したときに 1 つのアラートがトリガーされます。通知のノイズを減らすために、この戦略を使用することができます。
    * **マルチアラート**: マルチアラートは、グループパラメーターに従って各ソースにアラートを適用します。つまり、設定された条件を満たす各グループに対してアラートイベントが生成されます。例えば、クエリを `@db.user` でグループ化し、Multi Alert Aggregation タイプを選択すると、定義したとおりにアラートをトリガーするデータベースユーザーごとに個別のアラートを受信することが可能です。

### アラートの条件を設定する

1. メトリクスが、定義したしきい値 `above` (より上)、`above or equal to` (以上)、`below` (より下)、または `below or equal to` (以下) になったときにトリガーするアラートを設定します。このビューのオプションの構成については、[モニターの構成][5]を参照してください。
2. データが 5 分間欠落した場合の動作を決定します。例えば、`evaluate as zero` (ゼロと評価)、`show NO DATA` (NO DATA を表示)、`show NO DATA and notify` (NO DATA を表示して通知)、または `show OK` (OK を表示) です。

#### データなしと下限のアラート

アプリケーションが DBM イベントの送信を停止した場合に通知を受け取るには、条件を `below 1` に設定します。これにより、すべての集計グループについて、指定のタイムフレームでモニタークエリと一致する DBM イベントがない場合にアラートがトリガーされます。

モニターを任意のディメンション (タグやファセット) で分割し、`below` 条件を使用すると、アラートは**以下の場合にのみ**トリガーされます。
1. あるグループに対して DBM イベントが発生しているが、カウントがしきい値より下になっている。
2. どのグループにも DBM イベントがない。

#### 高度なアラート条件

評価遅延などの高度なアラートオプションについて、詳しくは[モニターの構成][6]をご覧ください。

### 通知
**Notify your team** および **Say what's happening** セクションの詳細については、[通知][5]を参照してください。

[1]: /ja/database_monitoring/
[2]: https://app.datadoghq.com/monitors/create/databases
[3]: /ja/monitors/create/configuration/#advanced-alert-conditions
[4]: /ja/monitors/notify/
[5]: /ja/monitors/configuration/?tab=thresholdalert#thresholds