---
title: ログモニター
kind: documentation
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: モニター通知の設定
  - link: monitors/downtimes
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: monitors/monitor_status
    tag: Documentation
    text: モニターステータスを確認
---
## 概要

組織で[ログ管理を有効に][1]すると、指定された種類のログが、ユーザー定義のしきい値を一定時間超えた場合にアラートするように、ログモニターを作成することができます。

## モニターの作成

Datadog で[ログモニター][2]を作成するには、メインナビゲーションで *Monitors --> New Monitor --> Logs* の順に進みます。

### 検索クエリを定義する

検索クエリを定義すると、検索フィールドの上にあるグラフが更新されます。

1. [ログインデックスが複数][3]ある場合は、検索するインデックスを選択してください。
2. [ログエクスプローラーでの検索][4]と同じロジックを使用して検索クエリを作成します。
3. ログカウント、[ファセット][5]、または[メジャー][6]に対するモニターを選択します。
    * **Monitor over a log count**: 検索バーを使用し（任意）、ファセットまたはメジャーを選択**しません**。選択されたタイムフレームで Datadog がログ数を評価し、それをしきい値の条件と比較します。
    * **Monitor over a facet**: [ファセット][5]が選択されていると、モニターはファセットの `Unique value count` に対してアラートを出します。
    * **Monitor over measure**: [メジャー][6]が選択されていると、モニターは (メトリクスモニターと同様に) ログファセットの数値に対してアラートを出します。また、集計を選択する必要があります（`min`、`avg`、 `sum`、`median`、`pc75`、`pc90`、`pc95`、`pc98`、`pc99`、または `max`）。
4. アラートグループを定義します（任意）。**注**: アラートグループが定義されているかどうかにかかわらず、集計値が設定された条件を満たしたときに、アラートを **1 つ**受け取ります。クエリをホストで分割した場合でも、複数のホストが設定された条件を満たすと、通知が 1 つだけ送信されます。これは、通知ノイズを減らすためです。

{{< img src="monitors/monitor_types/log/define-the-search-query.png" alt="バックエンドサービスの下限モニター"  style="width:60%;" >}}

### アラートの条件を設定する

* メトリクスが `above`、`above or equal to`、`below`、`below or equal to` の場合にトリガーされる
* 最後の `5 minutes`、`15 minutes`、`1 hour` などの間のしきい値
* アラートのしきい値 `<数値>`
* 警告のしきい値 `<数値>`

#### データなしと下限のアラート

サービス内のすべてのグループがログの送信を停止した場合に通知を受け取るには、条件を `below 1` に設定します。これにより、すべての集計グループについて、指定のタイムフレームでモニタークエリと一致するログがない場合に通知が行われます。

モニターを何らかのディメンション (タグまたはファセット) で分割している場合に `below` 条件を使用すると、特定のグループのログが存在してカウントがしきい値未満である**場合に限り**、または**すべての**グループについてログが存在しない場合に、アラートがトリガーされます。

**例**:

* このモニターは、すべてのサービスについてログが存在しない場合にのみトリガーします。
  {{< img src="monitors/monitor_types/log/log_monitor_below_by_service.png" alt="サービスで分割された下限モニター"  style="width:60%;" >}}
* このモニターは、サービス `backend` のログが存在しない場合にトリガーします。
  {{< img src="monitors/monitor_types/log/log_monitor_below_condition.png" alt="バックエンドサービスの下限モニター"  style="width:60%;" >}}

### Notifications

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][7] のページを参照してください。

#### ログのサンプル

デフォルトでは、ログモニターをトリガーすると、サンプルまたは値が通知メッセージに追加されます。

| モニターの対象     | 通知メッセージに追加されるもの                                                                            |
|------------------|----------------------------------------------------------------------------------------------------------|
| ログ数        | グループ: 上位 10 個の違反値とそれぞれの数。<br>非グループ: 上位 10 個のログサンプル。 |
| ファセットまたはメジャー | 上位 10 個のファセットまたはメジャーの値。                                                                      |

これらの通知の送信に、Slack、Jira、webhooks、Microsoft Teams、Pagerduty、電子メールを使用することができます。**注**: サンプルはリカバリ通知には表示されません。

ログサンプルを無効にするには、**Say what's happening** セクションの一番下にあるチェックボックスをオフにします。チェックボックスの隣に表示されるテキストは、モニターのグループ化によって変わります（上記を参照）。

#### 例

上位 10 の違反値の表を含める:
{{< img src="monitors/monitor_types/log/top_10_breaching_values.png" alt="上位 10 の違反値"  style="width:60%;" >}}

10 のログのサンプルをアラート通知に含める:
{{< img src="monitors/monitor_types/log/10_sample_logs.png" alt="上位 10 の違反値"  style="width:60%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs
[2]: https://app.datadoghq.com/monitors#create/log
[3]: /ja/logs/indexes
[4]: /ja/logs/explorer/search
[5]: /ja/logs/explorer/?tab=facets#setup
[6]: /ja/logs/explorer/?tab=measures#setup
[7]: /ja/monitors/notifications