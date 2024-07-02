---
title: Troubleshooting Monitor Alerts
further_reading:
- link: "https://docs.datadoghq.com/monitors/guide/alert-on-no-change-in-value/"
  tag: Guide
  text: Alert on no change in value
- link: "https://docs.datadoghq.com/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting/"
  tag: Guide
  text: Set up an alert for when a specific tag stops reporting
- link: "https://docs.datadoghq.com/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/"
  tag: Guide
  text: Prevent alerts from monitors that were in downtime
- link: "https://www.datadoghq.com/blog/datadog-recommended-monitors/"
  tag: Blog
  text: Enable preconfigured alerts with recommended monitors
- link: "https://www.datadoghq.com/blog/datadog-recommended-monitors/"
  tag: Blog
  text: Monitor alerts and events with OpsGenie and Datadog
- link: "https://www.datadoghq.com/blog/set-and-monitor-slas/"
  tag: Blog
  text: Monitoring services and setting SLAs with Datadog
---

## 概要

このガイドでは、モニターのアラート動作が有効であるかどうかを判断するのに役立つ、いくつかの基本的な概念の概要を説明します。モニターの評価が基礎データを正確に反映していないと思われる場合、モニターを検査する際に以下のセクションを参照してください。

### モニター状態とモニターステータス

モニターの*評価*はステートレスで、与えられた評価の結果は以前の評価の結果に依存しないことを意味しますが、モニター自体はステートフルで、その状態はクエリや構成の評価結果に基づいて更新されます。あるステータスのモニター評価によって、モニターのステータスが同じステータスに変化するとは限りません。考えられる原因については、以下を参照してください。

#### メトリクスモニターの評価ウィンドウ内で、メトリクスがまばらすぎる

モニターの評価ウィンドウにメトリクスがなく、モニターが[データなし条件][1]を予期するように構成されていない場合、評価は `skip` されるかもしれません。このような場合、モニターの状態は更新されないので、以前は `OK` 状態であったモニターは `OK` のままであり、同様に `Alert` 状態であったモニターについても同様です。モニターステータスページの[履歴][2]グラフを使用して、対象となるグループと時間帯を選択します。データがまばらな場合は、[モニターの演算処理とまばらなメトリクス][3]を参照してください。

#### 外部条件による状態の更新を監視する

また、[自動解決][4]などにより、モニターの評価がない状態でもモニターの状態が更新されることがあります。

### データの有無を確認する

モニターの状態やステータスが期待したものと異なる場合、基礎となるデータソースの動作を確認します。メトリクスモニターの場合、[履歴][2]グラフを使用して、メトリクスクエリによって引き込まれたデータポイントを表示できます。メトリクスの進化をさらに調査するには、ステータスグラフのそばにある **Open in a notebook** をクリックします。これにより、モニタークエリのフォーマットされたグラフを持つ調査用[ノートブック][20]が生成されます。

{{< img src="monitors/monitor_status/notebook-button2.png" alt="1 つのモニターグループのステータスバーの横にある Open in a notebook ボタンにマウスカーソルを合わせた状態でのモニターのステータスページ" style="width:60%;">}}

### アラートの条件

予期しないモニターの動作は、時には[モニタータイプ][6]によって異なる[ アラート条件][5]を誤って設定した結果である可能性があります。モニタークエリが `as_count()` 関数を使用している場合、[モニター評価における `as_count()`][7] のガイドを確認してください。

回復しきい値を使用する場合は、[回復しきい値ガイド][8]に記載されている条件を確認し、想定される動作であるかどうかを確認してください。

### モニターステータスとグループ

モニター評価と状態の両方について、ステータスはグループごとに追跡されます。

マルチアラートモニターの場合、グループは各グループ化キーに 1 つの値を持つタグのセットです (例えば、`env` と `host` でグループ化されたモニターには `env:dev, host:myhost` があります)。単純なアラートでは、グループ (`*`) は 1 つだけで、モニターの範囲内のすべてを表します。

デフォルトでは、Datadog はクエリを変更しない限り、モニターグループを UI で 24 時間、ホストモニターでは 48 時間利用可能な状態に保ちます。詳しくは、[モニター設定の変更が反映されない][9]を参照してください。

マルチアラートモニターの範囲内に新しいモニターグループを作成することが予想される場合、これらの新しいグループの評価のための遅延を構成することができます。これは、新しいコンテナの作成に関連する高いリソース使用量など、新しいグループの予想される動作からアラートを回避するのに役立ちます。詳細については、[新規グループ遅延][10]を参照してください。

モニターがクローラーベースのクラウドメトリクスをクエリする場合、[評価遅延][11]を使用して、モニターが評価する前にメトリクスが到着していることを確認します。クラウドインテグレーションクローラーのスケジュールについての詳細は、[クラウドメトリクスの遅延][12]をお読みください。

### 通知に関する問題

モニターが正常に動作しているにもかかわらず、不要な通知が表示される場合、通知を削減または抑制するための複数のオプションが用意されています。

- 状態が急激に変化するモニターの場合、警告の疲労を最小限に抑える方法については、[アラートのバタつきを抑える][13]をお読みください。
- 予想されるアラート、または組織にとって有用でないアラートについては、[ダウンタイム][14]で不要な通知を抑制してください。
- アラートのルーティングを制御するには、[テンプレート変数][15]と、[条件変数][16]による**警告**と**アラート**の状態の分離を使用します。

#### 通知の欠落

通知が正しく届いていないと思われる場合は、以下の項目を確認し、通知が届くように設定してください。

- 受信者の[メール設定][17]を確認し、`Notification from monitor alerts` がチェックされていることを確認します。
- [イベントストリーム][18]に、文字列 `Error delivering notification` があるイベントをチェックします。

#### Opsgenie 複数通知

モニターで複数の `@opsgenie-[...]` 通知を使用している場合、同じエイリアスを持つそれらの通知を Opsgenie に送信します。
[Opsgenie の機能][19]により、Opsgenie は重複とみなされたものを破棄します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/configuration/?tabs=thresholdalert#no-data
[2]: /monitors/manage/status/#history
[3]: /monitors/guide/monitor-arithmetic-and-sparse-metrics/
[4]: /monitors/configuration/?tabs=thresholdalert#auto-resolve
[5]: /monitors/configuration/?tabs=thresholdalert#set-alert-conditions
[6]: /monitors/types
[7]: /monitors/guide/as-count-in-monitor-evaluations/
[8]: /monitors/guide/recovery-thresholds/#behavior
[9]: /monitors/guide/why-did-my-monitor-settings-change-not-take-effect
[10]: /monitors/configuration/?tabs=thresholdalert#new-group-delay
[11]: /monitors/configuration/?tabs=thresholdalert#evaluation-delay
[12]: /integrations/faq/cloud-metric-delay/
[13]: /monitors/guide/reduce-alert-flapping/
[14]: /monitors/guide/suppress-alert-with-downtimes/
[15]: /monitors/notify/variables/?tab=is_alert&tabs=is_alert#template-variables
[16]: /monitors/notify/variables/?tab=is_alert&tabs=is_alert#conditional-variables
[17]: /account_management/#preferences
[18]: /events/stream
[19]: https://docs.opsgenie.com/docs/alert-deduplication
[20]: /notebooks
