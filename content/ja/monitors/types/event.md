---
title: Event Monitor
description: "Monitor events gathered by Datadog"
aliases :
    - /monitors/monitor_types/event
    - /monitors/create/types/event/
further_reading:
- link: /service_management/events/
  tag: Documentation
  text: Event Management Overview
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Check your monitor status
---

## 概要

Datadog automatically creates events from various products including monitors, Watchdog, and Error Tracking. You can also track events generated from the Agent and installed integrations and ingest events from sources, including alert events from third parties, change requests, deployments, configuration changes.

Event monitors alert on ingested events that match a search query, allowing you to focus attention on the events that matter most to your team.

## モニターの作成

Datadog で[イベントモニター][1]を作成するには、**Monitors** > **New Monitor** > **Event** に移動します。

<div class="alert alert-info"><strong>注</strong>: デフォルトでは、1 アカウントあたり 1000 イベントモニターという制限があります。この制限に引っかかっている場合、<a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">マルチアラート</a>の使用を検討するか、<a href="/help/">サポートにお問い合わせ</a>ください。</div>

### 検索クエリを定義する

検索クエリを定義すると、上部のグラフが更新されます。

1. [イベントエクスプローラーの検索構文][2]を使って検索クエリを作成します。
2. イベント数またはファセットのモニタリングを選択します。
    * **Monitor over an event count**: 検索バーを使用し (任意)、ファセットを選択**しません**。選択されたタイムフレームで Datadog がイベント数を評価し、それをしきい値の条件と比較します。
    * **Monitor over a facet**: ファセットが選択されていると、モニターはファセットのユニークな値のカウントに対してアラートを作成します。
3. アラートのグループ化方法を構成します（任意）:
    * **Simple alert**: すべてのソースをまとめて集計します。集計値が設定条件を満たすと、1 件のアラートを受け取ります。これは、単一のホストから受け取るメトリクスまたは多くのホストからの合計メトリクスを監視する場合に最適です。通知件数を減らしたい場合にこの方法を選択します。
    * **Multi Alert**: グループパラメーターに従い、複数のアラートを各ソースに適用します (最大 1000 件の一致するグループ)。アラートイベントは、設定された条件を満たすと各グループに生成されます。例えば、`host` でグループ化し、各ホストに対して別々のアラートを受信することができます。

4. Group events by multiple dimensions (optional): 

   All events matching the query are aggregated into groups based on the value of up to four event facets. When there are multiple dimensions, the top values are determined according to the first dimension, then according to the second dimension within the top values of the first dimension, and so on up to the last dimension. Dimensions limit depends on the total number of dimensions:
   * **ファセット 1 個**: 上位値 1000
   * **ファセット 2 個**: ファセットごとに上位値 30 (最大 900 グループ)
   * **ファセット 3 個**: ファセットごとに上位値 10 (最大 1000 グループ)
   * **ファセット 4 個**: ファセットごとに上位値 5 (最大 625 グループ)

### アラートの条件を設定する

* カウントが `above`、`above or equal to`、`below`、または `below or equal to` の時
* `<しきい値の数>`
* 過去 `5 minutes`、`15 minutes`、`1 hour` など、または `custom` に 5 分～48 時間の値を設定します。

**注**: 一部のプロバイダーでは、イベントが**ポスト**されてから実際に開始されるまでにかなりの遅延が生じます。このような場合、Datadog は発生時刻にまでさかのぼってイベントを記録しますが、これにより現在のモニター評価ウィンドウ外のイベントを認識することがあります。評価ウィンドウを広げると時間差が発生する原因を理解しやすくなります。適切なモニター設定の調整についてサポートが必要な場合は、[Datadog のサポートチーム][3]までお問い合わせください。

#### 高度なアラート条件

高度なアラートオプション (自動解決、評価遅延など) の詳細な手順については、[モニターコンフィギュレーション][4]ページを参照してください。

### 通知

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][5] page.

#### イベントテンプレート変数

イベントモニターには、通知メッセージを入力できる特殊なテンプレート変数があります。

| テンプレート変数          | 定義                                                                     |
|----------------------------|--------------------------------------------------------------------------------|
| `{{event.id}}`             | イベントの ID。                                                           |
| `{{event.title}}`          | イベントのタイトル。                                                        |
| `{{event.text}}`           | イベントのテキスト。                                                         |
| `{{event.host.name}}`      | イベントを生成したホストの名前。                                 |
| `{{event.tags}}`           | イベントに関連したタグのリスト                                          |
| `{{event.tags.<タグ_キー>}}` | イベントに関連した特定のタグキーの値。下記のサンプルを参照してください。 |

##### `key:value` 構文のタグ

次のタグ専用: `env:test`、`env:staging`、`env:prod`。

* `env` はタグキーです。
* `test`、`staging`、`prod` はタグ値です。

テンプレート変数は `{{event.tags.env}}` です。このテンプレート変数を使用した場合の結果は、`test`、`staging`、または `prod` です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/event
[2]: /service_management/events/explorer/searching
[3]: /help/
[4]: /monitors/configuration/#advanced-alert-conditions
[5]: /monitors/notify/
