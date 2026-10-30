---
aliases:
- /ja/monitors/monitor_types/event
- /ja/monitors/create/types/event/
description: Datadog によって収集されたイベントを監視する
further_reading:
- link: /events/
  tag: ドキュメント
  text: Event Management の概要
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/status/
  tag: ドキュメント
  text: モニターステータスを確認
title: イベントモニター
---
## 概要 {#overview}

Datadog は、モニター、Watchdog、Error Tracking を含むさまざまな製品から自動的にイベントを作成します。また、Agent やインストール済みのインテグレーションから生成されたイベントを追跡することや、サードパーティからのアラートイベント、変更リクエスト、デプロイ、構成変更などのソースからイベントを取り込むこともできます。

<div class="alert alert-info">イベントモニターは、<a href="/monitors/status/events/">モニターイベント</a>に対してはアラートを送信しません。これは無限ループを引き起こす可能性があるためです。</a></div>

イベントモニターは、取り込まれたイベントのうち、検索クエリに一致するものに関するアラートを送信するため、チームにとって最も重要なイベントに注意を集中させることができます。

## モニターの作成 {#monitor-creation}

Datadog でイベントモニターを作成するには、[[{{< ui >}}Monitors{{< /ui >}}] (モニター) > [{{< ui >}}New Monitor{{< /ui >}}] (新規モニター) > [{{< ui >}}Event{{< /ui >}}] (イベント)][1] に移動します。

<div class="alert alert-info">アカウントごとに 1000 個のイベントモニターというデフォルトの制限があります。この制限に達した場合は、<a href="/monitors/configuration/#set-alert-aggregation">マルチアラート</a>の使用を検討するか、<a href="/help/">サポートにお問い合わせ</a>ください。</div>

### 検索クエリを定義する {#define-the-search-query}

検索クエリを定義すると、上部のグラフが更新されます。

1. [Event Explorer の検索構文][2]を使用して、検索クエリを作成します。
2. イベント数、ファセット、タグ、または属性のいずれをモニターするかを選択します。
    * Datadog は選択された期間内のイベント数を評価し、それをしきい値条件と比較します。
    * 一部の属性やタグについては、Datadog は集計値 (例: 平均、中央値、最小値、合計) を評価します。
    * [{{< ui >}}Monitor over a facet{{< /ui >}}] (ファセットをモニター): ファセットが選択されていると、モニターはファセットのユニークな値のカウントに対してアラートを送信します。
      
3. 複数のディメンションでイベントをグループ化する (オプション):

   クエリに一致するすべてのイベントは、最大 4 つのイベントファセットの値に基づいてグループに集約されます。複数のディメンションがある場合、上位の値は最初のディメンションに基づいて決定されます。続けて、最初のディメンション内の上位値内の 2 番目のディメンションに基づいて決定されます。同様の処理が最後のディメンションまで行われます。ディメンションの制限は、ディメンションの合計数によって異なります。
   * **ファセット 1 個**: 上位 1000 の値
   * **ファセット 2 個**: ファセットごとに上位値 30 (最大 900 グループ)
   * **ファセット 3 個**: ファセットごとに上位値 10 (最大 1000 グループ)
   * **ファセット 4 個**: ファセットごとに上位値 5 (最大 625 グループ)

   イベントモニターで複数のクエリや式が定義されている場合、各ディメンションの上位または下位の値の数を選択できます。

   上位値の合計数の上限は、ファセットの数に関係なく 1,000 です。上位値の数を 1,000 より多くした場合、Datadog によって、すべての上位値の合計数 1,000 未満になるように他のディメンションの上位値が調整されます。すべてのグループ化のデフォルトの上位値の数 10 ですが、4 番目のファセットのみ、上位 5 つの値がデフォルトです。

   たとえば、検索クエリで 4 つのグループ化が行われるイベントモニターの場合は、次のようになります。
   * **1 番目のファセット**: 上位 10 個の値
   * **2 番目のファセット**: 上位 10 個の値
   * **3 番目のファセット**: 上位 5 個の値
   * **4 番目のファセット**: 上位 2 つの値

### アラート条件を設定する {#set-alert-conditions}

クエリがしきい値と比較して次のいずれかの条件を満たしたときにトリガーします。
- `above`
- `above or equal to`
- `below`
- `below or equal to`
- `equal to`
- `not equal to`

**注**: 一部のプロバイダーでは、イベントが**投稿**されてからイベントが開始されるまでに大幅な遅延が発生します。その場合、Datadog はイベントを発生時刻まで遡って記録するため、受信したイベントの時刻が現在のモニター評価ウィンドウ外になることがあります。評価ウィンドウを広げることで、この時間差に対応できます。

#### 高度なアラート条件 {#advanced-alert-conditions}

高度なアラートオプション (自動解決、評価遅延など) の詳細な手順については、[モニターコンフィギュレーション][4]ページを参照してください。

### Notifications {#notifications}

[{{< ui >}}Configure notifications & automations{{< /ui >}}] (通知および自動化の構成) セクションの詳しい説明は、「[Notifications][5]」ページをご覧ください。

#### イベントテンプレート変数 {#event-template-variables}

イベントモニターには、通知メッセージを記載できる特殊なテンプレート変数があります。

| テンプレート変数          | 定義                                                                     |
|----------------------------|--------------------------------------------------------------------------------|
| `{{event.id}}`             | The ID of the event.                                                           |
| `{{event.title}}`          | The title of the event.                                                        |
| `{{event.text}}`           | The text of the event.                                                         |
| `{{event.host.name}}`      | The name of the host that generated the event.                                 |
| `{{event.tags}}`           | A list of tags attached to the event.                                          |
| `{{event.tags.<TAG_KEY>}}` | イベントに追加された特定のタグキーの値。以下の例を参照してください。|

##### タグ `key:value` 構文 {#tags-keyvalue-syntax}

タグ `env:test`、`env:staging`、および `env:prod` の場合:

* `env` はタグキーです。
* `test`、`staging`、および `prod` はタグ値です。

テンプレート変数は `{{event.tags.env}} です。`. The result of using this template variable is `test`, `staging`, or `prod` です。

### 通知の集計 {#notification-aggregation}

アラートのグループ化方法を構成します。
    * [{{< ui >}}Simple-Alert{{< /ui >}}] (シンプルアラート): シンプルアラートは、すべての報告ソースにわたって集計されます。集計値が設定条件を満たすと、アラートを 1 件受信します。これは、単一ホストのメトリクスや、多数のホストにわたるメトリクスの合計を監視する場合に最適です。通知のノイズを減らす場合は、この方法を選択してください。
    * [{{< ui >}}Multi Alert{{< /ui >}}] (マルチアラート): マルチアラートは、グループ化パラメーターに従って各ソースにアラートを適用します (最大 1000 個の一致グループ)。設定条件を満たすグループごとに、アラートイベントが生成されます。たとえば、`host` でグループ化することで、ホストごとに個別のアラートを受け取ることができます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/event
[2]: /ja/events/explorer/searching
[3]: /ja/help/
[4]: /ja/monitors/configuration/#advanced-alert-conditions
[5]: /ja/monitors/notify/