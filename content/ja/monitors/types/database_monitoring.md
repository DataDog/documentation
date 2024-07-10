---
title: データベースモニタリングモニター
---


## 概要

[データベースモニタリング (DBM)][1] のモニタータイプでは、モニターを作成し、DBM で表示されるデータに対してアラートを発することができます。これらのモニターは、DBM のイベントタイプが所定の期間にわたって事前に定義されたしきい値から逸脱した場合にアラートするように構成することができます。

一般的なモニタリングシナリオは以下の通りです。
- [待機クエリ数](#number-of-waiting-queries)
- [一定時間を超えるクエリ数](#queries-exceeding-30-seconds)
- [実行計画コストの大幅な変化](#change-in-explain-plan-cost)

手順については、[モニター例](#example-monitors)を参照してください。

## モニターの作成

Datadog で新しい DBM モニターを作成するには、UI で [**Monitors** > **New Monitor** > **Database Monitoring**][2] に移動します。

<div class="alert alert-info"><strong>注</strong>: デフォルトでは、1 アカウントあたり 1000 DBM モニターという制限があります。この制限に引っかかっている場合、<a href="/monitors/configuration/?tab=thresholdalert#multi-alert">マルチアラート</a>の使用を検討するか、<a href="/help/">サポートにお問い合わせて</a>アカウントのこの制限を解除してください。</div>

## 検索クエリを定義する

注: クエリが変更されると、それに応じて検索バーの上のチャートが更新されます。

### 一般的なモニタータイプ

[モニターをゼロから作成](#creating-monitors-from-scratch)したくない場合は、以下の定義済みのモニタータイプのいずれかを使うことができます。
- 待機クエリ
- 長時間実行クエリ

{{< img src="database_monitoring/dbm_event_monitor/dbm_common_monitor_types.png" alt="待機クエリおよび長時間実行クエリに関連する OOTB モニターの例" style="width:80%;" >}}

これらの既存のモニタータイプやその他のモニタータイプに関するご意見は、カスタマーサクセスマネージャーまたは[サポートチーム][9]までお寄せください。

### ゼロからのモニター作成

1. **Query Samples** または **Explain Plans** のどちらを監視するかを決定し、ドロップダウンメニューから対応するオプションを選択します。

{{< img src="database_monitoring/dbm_event_monitor/dbm_event_monitor_data_types.png" alt="Database Monitoring モニタータイプで利用可能な異なるデータソースを示すドロップダウンメニュー" style="width:80%;" >}}

2. DBM Query Samples アクティビティと実行計画エクスプローラーと同じロジックを使用して検索クエリを構築します。これは、検索バーに含める 1 つ以上の**ファセット**を選択することを意味します。例えば、ユーザー `postgresadmin` が実行した待機クエリにアラートを出したい場合、検索バーは以下のようになります。

{{< img src="database_monitoring/dbm_event_monitor/dbm_example_query_no_group_by.png" alt="検索バーに 2 つのファセットを含む検索クエリの例。" style="width:80%;" >}}

注: 構成したモニターは、ファセットの**一意な値カウント**に対してアラートを発します。

3. また、複数のディメンションで DBM イベントをグループ化するオプションもあります。クエリに一致するすべての DBM イベントは、最大 **5 つのファセット**の値に基づいてグループ化されます。group by 機能では、**アラートグループ化戦略**を構成することもできます。
    * **Simple Alert**: シンプルアラートはすべてのレポートソースを集計するため、1 つまたは複数のグループの値がしきい値を超えたときに 1 つのアラートがトリガーされます。通知ノイズを減らすためにこの戦略を使用することができます。
    * **Multi Alert**: マルチアラートは、グループパラメーターに従って各ソースにアラートを適用します。つまり、設定された条件を満たすグループごとにアラートイベントが生成されます。例えば、`@db.user` でクエリをグループ化し、マルチアラート集計タイプを選択すると、定義したアラートのトリガーとなるデータベースユーザーごとに個別のアラートを受け取ることができます。

### アラートの条件を設定する

1. クエリ結果が、定義したしきい値 `above` (より上)、`above or equal to` (以上)、`below` (より下)、または `below or equal to` (以下) である場合にトリガーするアラートを設定します。このビューのオプションの構成については、[モニターの構成][5]を参照してください。
2. データが 5 分間欠落した場合の動作を決定します。例えば、`evaluate as zero`、`show NO DATA`、`show NO DATA and notify`、`show OK` などです。

#### データなしと下限のアラート

アプリケーションが DBM イベントの送信を停止した場合に通知を受け取るには、条件を `below 1` に設定します。このアラートは、すべての集計グループについて、指定のタイムフレームでモニタークエリと一致する DBM イベントがない場合にトリガーされます。

任意のディメンション (タグまたはファセット) でモニターを分割し、`below` 条件を使用すると、アラートは以下の**場合に限り**にトリガーされます。
1. 指定されたグループの DBM イベントがあるが、カウントがしきい値以下である。
2. どのグループにも DBM イベントがない。

#### 高度なアラート条件

評価遅延などの高度なアラートオプションについて、詳しくは[モニターの構成][3]をご覧ください。

### 通知
**Notify your team** および **Say what's happening** セクションの詳細については、[通知][4]を参照してください。

## モニター例

### 待機クエリ数

このモニターは、待機中のクエリの数が所定のしきい値を超えたかどうかを検出します。

{{< img src="database_monitoring/dbm_event_monitor/waiting_queries_monitor.png" alt="待機中のデータベースクエリの数を監視するための構成されたメトリクスクエリ" style="width:80%;" >}}

#### モニタリングクエリの構築

1. Datadog で [**Monitors > New Monitor > Database Monitoring**][2] に進みます。
1. **Common monitor types** ボックスで、**Waiting Queries** をクリックします。

#### アラートしきい値の設定

1. 典型的な値の範囲を把握するには、チャート上部のドロップダウンメニューを使用して、時間枠を **Past 1 Month** に設定します。
1. 選択したアラートしきい値を **Alert threshold** ボックスに入力します。例えば、待機クエリ数がチャート上で `3000` を下回る場合、**Alert threshold** を `4000` に設定すれば異常なアクティビティを反映することができるでしょう。構成の詳細については、[アラート条件の設定][6] および [高度なアラート条件][3] を参照してください。
1. チャートの赤い網掛け部分を使用して、アラートのトリガーが稀すぎたり頻繁すぎたりしないことを確認し、必要に応じてしきい値を調整してください。

#### 通知の構成

1. **Notify your team** の下に、通知メッセージを書きます。詳細な手順については、[通知][4]を参照してください。このテキストはメッセージ本文に使用できます。
{{< code-block lang="text" >}}
{{#is_alert}}
{{host.name}} で待機クエリが {{value}} の値で 
{{threshold}} を超えました。
{{/is_alert}}

{{#is_recovery}}
{{threshold}} を超えた {{host.name}} の待機クエリ数が回復しました。
{{/is_recovery}}
{{< /code-block >}}
1. **Notify your services and your team members** (サービスおよびチームメンバーに通知する) ボックスに自分の名前を入力して選択し、通知先に自身を追加します。

#### モニターの検証と保存

1. モニターの設定を検証するには、**Test Notifications** をクリックします。**Alert** を選択してテストアラートをトリガーし、**Run Test** をクリックします。
1. **Create** をクリックしてモニターを保存します。

### 30 秒を超えるクエリ

このモニターは、長時間実行しているクエリの数が所定のしきい値を超えたかどうかを検出します。

{{< img src="database_monitoring/dbm_event_monitor/long_running_queries_monitor.png" alt="長時間実行しているデータベースクエリの数を監視するための構成されたメトリクスクエリ" style="width:80%;" >}}

#### モニタリングクエリの構築

1. Datadog で [**Monitors > New Monitor > Database Monitoring**][2] に進みます。
1. **Common monitor types** で、**Long Running Queries** をクリックします。
1. クエリフィルターを **Duration:>30s** に更新します。

#### アラートしきい値の設定

1. 典型的な値の範囲を把握するには、チャート上部のドロップダウンメニューを使用して、時間枠を **Past 1 Month** に設定します。
1. 選択したアラートしきい値を **Alert threshold** ボックスに入力します。例えば、チャート上の値が `2000` を下回る場合、**Alert threshold** を `2500` に設定すれば異常なアクティビティを反映することができるでしょう。構成の詳細については、[アラート条件の設定][6] および [高度なアラート条件][3] を参照してください。
1. チャートの赤い網掛け部分を使用して、アラートのトリガーが稀すぎたり頻繁すぎたりしないことを確認し、必要に応じてしきい値を調整してください。

#### 通知の構成

1. **Notify your team** の下に、通知メッセージを書きます。詳細な手順については、[通知][4]を参照してください。このテキストはメッセージ本文に使用できます。
{{< code-block lang="text" >}}
{{#is_alert}}
{{host.name}} で継続時間が 30 秒を超えるクエリの数が 
{{value}} の値で {{threshold}} を超えました。
{{/is_alert}}

{{#is_recovery}}
{{threshold}} を超えた {{host.name}} の継続期間が 30 秒を超えるクエリの数が回復しました。
{{/is_recovery}}
{{< /code-block >}}
1. **Notify your services and your team members** (サービスおよびチームメンバーに通知する) ボックスに自分の名前を入力して選択し、通知先に自身を追加します。

#### モニターの検証と保存

1. モニターの設定を検証するには、**Test Notifications** をクリックします。**Alert** を選択してテストアラートをトリガーし、**Run Test** をクリックします。
1. **Create** をクリックしてモニターを保存します。

### 実行計画コストの変化

{{< img src="database_monitoring/dbm_event_monitor/explain_plan_cost_monitor.png" alt="1 日あたりの平均実行計画コストの変化を追跡するように構成されたモニター" style="width:80%;" >}}

このモニターは、2 つのクエリの結果を比較することで、1 日あたりの平均実行計画コストの大幅な変化を検出します。

- クエリ **a** は、現在の実行計画コストを反映しています
- クエリ **b** は、1 週間前の実行計画コストを反映しています

これにより、例えば連続する 2 つの月曜日を比較することができます。

ちょっとした変更で、モニターに 1 時間あたりの平均値を反映させたり、今日と昨日の差を測定したり、ホストの代わりにクエリシグネチャでグループ化したりすることができます。

#### 1 つ目のモニタリングクエリの構築

1. Datadog で [**Monitors > New Monitor > Database Monitoring**][2] に進みます。
1. **Define the search query** で、以下の更新を行います。
    - **Query Samples** を **Explain Plans** に変更します。
    - __*__ を **Explain Plan Cost (@db.plan.cost)** に変更します。フィールドに "cost" と入力すると、オートコンプリートオプションが入力されます。
    - **(everything)** を **Host (host)** に変更します。
1. **∑** ボタンをクリックし、**rollup** と入力してオートコンプリート候補を入力します。**moving_rollup** を選択します。

#### 2 つ目のモニタリングクエリの構築

1. **Add Query** をクリックして、クエリ **a** のコピーであるクエリ **b** を作成します。
1. **a + b** を **a - b** に変更します。2 つのクエリは一時的に同一であるため、この値はチャート上では 0 として表示されます。
1. **b** クエリ内で、**∑** ボタンをクリックし、**Timeshift > Week before** を選択します。これにより、先週と現在の間の大幅な変化を検出するようにモニターが構成されます。

#### アラートしきい値の設定

1. チャートの上部にあるドロップダウンメニューで、時間枠を **Past 1 Month** に拡大すると、週ごとの典型的なコスト変動を把握することができます。
1. 選択したアラートしきい値を **alert threshold** ボックスに入力します。例えば、実行計画コストの差がチャート上で `8000` を下回る場合、**alert threshold** を `9000` に設定すれば異常なアクティビティを反映することができるでしょう。構成の詳細については、[アラート条件の設定][6] および [高度なアラート条件][3] を参照してください。
1. チャートの赤い網掛け部分を使用して、アラートのトリガーが稀すぎたり頻繁すぎたりしないことを確認し、必要に応じてしきい値を調整してください。

#### 通知の構成

1. **Notify your team** の下に、通知メッセージを書きます。詳細な手順については、[通知][4]を参照してください。このテキストはメッセージ本文に使用できます。
{{< code-block lang="text" >}}
{{#is_alert}}
{{host.name}} の 1 日あたりの平均実行計画コストは、1 週間前と比べて少なくとも {{threshold}} 増加しており、
その値は {{value}} です。
{{/is_alert}}

{{#is_recovery}}
{{host.name}} の 1 日あたりの平均実行計画コストは、先週のこの曜日のコストの {{threshold}} 以内に回復しました。
{{/is_recovery}}
{{< /code-block >}}
1. **Notify your services and your team members** (サービスおよびチームメンバーに通知する) ボックスに自分の名前を入力して選択し、通知先に自身を追加します。

#### モニターの検証と保存

1. モニターの設定を検証するには、**Test Notifications** をクリックします。**Alert** を選択してテストアラートをトリガーし、**Run Test** をクリックします。
1. **Create** をクリックしてモニターを保存します。


[1]: /ja/database_monitoring/
[2]: https://app.datadoghq.com/monitors/create/database-monitoring
[3]: /ja/monitors/create/configuration/#advanced-alert-conditions
[4]: /ja/monitors/notify/
[5]: /ja/monitors/configuration/?tab=thresholdalert#thresholds
[6]: /ja/monitors/configuration/?tab=thresholdalert#set-alert-conditions
[7]: /ja/monitors/configuration/?tab=thresholdalert#notify-your-team
[8]: https://app.datadoghq.com/databases/list
[9]: /ja/help/