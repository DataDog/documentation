---
further_reading:
- link: https://docs.datadoghq.com/monitors/guide/alert-on-no-change-in-value/
  tag: ガイド
  text: 値に変化がない場合のアラート
- link: https://docs.datadoghq.com/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting/
  tag: ガイド
  text: 特定のタグがレポートを停止した場合のアラート設定
- link: https://docs.datadoghq.com/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/
  tag: ガイド
  text: ダウンタイムになったモニターからのアラートを防止する
- link: https://www.datadoghq.com/blog/datadog-recommended-monitors/
  tag: ブログ
  text: モニター テンプレートで事前構成済みアラートを有効化
- link: https://www.datadoghq.com/blog/datadog-recommended-monitors/
  tag: ブログ
  text: OpsGenie と Datadog によるアラートとイベントの監視
- link: https://www.datadoghq.com/blog/set-and-monitor-slas/
  tag: ブログ
  text: Datadog によるサービスの監視と SLA 設定
title: モニターアラートのトラブルシューティング
---

## 概要

このガイドでは、モニターのアラート動作が妥当かどうかを判断するのに役立つ基礎概念の概要を説明します。モニターの評価が基になるデータを正確に反映していないと疑われる場合は、このガイドを使ってモニターを確認し、次の項目をトラブルシューティングしてください:
- [モニターの状態またはステータスが評価と一致しない](#monitor-state-and-monitor-status)
- [データが存在することを確認する](#verify-the-presence-of-data)
- [アラート設定](#alert-conditions)
- [不要な通知](#notification-issues)

## モニター状態とモニターステータス

モニターの*評価*はステートレスで、与えられた評価の結果は以前の評価の結果に依存しないことを意味しますが、モニター自体はステートフルで、その状態はクエリや構成の評価結果に基づいて更新されます。あるステータスのモニター評価によって、モニターのステータスが同じステータスに変化するとは限りません。考えられる原因については、以下を参照してください。

#### メトリクスモニターの評価ウィンドウ内で、メトリクスがまばらすぎる

モニターの評価ウィンドウにメトリクスがなく、モニターが[データなし条件][1]を予期するように構成されていない場合、評価は `skip` されるかもしれません。このような場合、モニターの状態は更新されないので、以前は `OK` 状態であったモニターは `OK` のままであり、同様に `Alert` 状態であったモニターについても同様です。モニターステータスページの[履歴][2]グラフを使用して、対象となるグループと時間帯を選択します。データがまばらな場合は、[モニターの演算処理とまばらなメトリクス][3]を参照してください。

#### 外部条件による状態の更新を監視する

また、[自動解決][4]などにより、モニターの評価がない状態でもモニターの状態が更新されることがあります。

#### Rollup 関数を使用した場合の "No Data" ステータス

モニターが想定外に "No Data" ステータスで評価される場合は、ロールアップと評価ウィンドウの設定を見直してください。たとえば、ロールアップ間隔が 4 分、評価ウィンドウが 20 分のモニターでは、4 分ごとに 1 つのデータ ポイントが生成され、ウィンドウ内のデータ ポイントは最大 5 個になります。"Require Full Window" オプションが有効になっていると、ウィンドウが完全に埋まっていないため評価が "No Data" になることがあります。

多くのユース ケースでは、正確な評価に完全なデータが不可欠な特殊なケースを除き、"Require Full Window" 設定は無効にすることを推奨します。詳細は [モニターにおけるロールアップ][21] を参照してください。

## データの有無を確認する

モニターの状態やステータスが想定どおりでない場合は、基盤となるデータ ソースの挙動を確認してください。メトリクス モニターでは、[履歴][2] グラフを使って、メトリクス クエリで取り込まれているデータ ポイントを確認できます。`N/A` グループはモニターには含まれませんが、ダッシュボード クエリでは表示されます。

## アラートの条件

予期しないモニターの動作は、時には[モニタータイプ][6]によって異なる[ アラート条件][5]を誤って設定した結果である可能性があります。モニタークエリが `as_count()` 関数を使用している場合、[モニター評価における `as_count()`][7] のガイドを確認してください。

回復しきい値を使用する場合は、[回復しきい値ガイド][8]に記載されている条件を確認し、想定される動作であるかどうかを確認してください。

## モニターステータスとグループ

モニター評価と状態の両方について、ステータスはグループごとに追跡されます。

マルチアラートモニターの場合、グループは各グループ化キーに 1 つの値を持つタグのセットです (例えば、`env` と `host` でグループ化されたモニターには `env:dev, host:myhost` があります)。単純なアラートでは、グループ (`*`) は 1 つだけで、モニターの範囲内のすべてを表します。

デフォルトでは、Datadog はクエリを変更しない限り、モニターグループを UI で 24 時間、ホストモニターでは 48 時間利用可能な状態に保ちます。詳しくは、[モニター設定の変更が反映されない][9]を参照してください。

マルチアラートモニターの範囲内に新しいモニターグループを作成することが予想される場合、これらの新しいグループの評価のための遅延を構成することができます。これは、新しいコンテナの作成に関連する高いリソース使用量など、新しいグループの予想される動作からアラートを回避するのに役立ちます。詳細については、[新規グループ遅延][10]を参照してください。

モニターがクローラーベースのクラウドメトリクスをクエリする場合、[評価遅延][11]を使用して、モニターが評価する前にメトリクスが到着していることを確認します。クラウドインテグレーションクローラーのスケジュールについての詳細は、[クラウドメトリクスの遅延][12]をお読みください。

## 通知に関する問題

モニターが正常に動作しているにもかかわらず、不要な通知が表示される場合、通知を削減または抑制するための複数のオプションが用意されています。

- 状態が急激に変化するモニターの場合、警告の疲労を最小限に抑える方法については、[アラートのバタつきを抑える][13]をお読みください。
- 予想されるアラート、または組織にとって有用でないアラートについては、[ダウンタイム][14]で不要な通知を抑制してください。
- アラートのルーティングを制御するには、[テンプレート変数][15]と、[条件変数][16]による**警告**と**アラート**の状態の分離を使用します。

### 通知の欠落

通知が正しく届いていないと思われる場合は、以下の項目を確認し、通知が届くように設定してください。

- 受信者の[メール設定][17]を確認し、`Notification from monitor alerts` がチェックされていることを確認します。
- [イベントストリーム][18]に、文字列 `Error delivering notification` があるイベントをチェックします。

### Opsgenie 複数通知

モニターで複数の `@opsgenie-[...]` 通知を使用している場合、同じエイリアスを持つそれらの通知を Opsgenie に送信します。
[Opsgenie の機能][19]により、Opsgenie は重複とみなされたものを破棄します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/configuration/?tabs=thresholdalert#no-data
[2]: /ja/monitors/status/#history
[3]: /ja/monitors/guide/monitor-arithmetic-and-sparse-metrics/
[4]: /ja/monitors/configuration/?tabs=thresholdalert#auto-resolve
[5]: /ja/monitors/configuration/?tabs=thresholdalert#set-alert-conditions
[6]: /ja/monitors/types
[7]: /ja/monitors/guide/as-count-in-monitor-evaluations/
[8]: /ja/monitors/guide/recovery-thresholds/#behavior
[9]: /ja/monitors/guide/why-did-my-monitor-settings-change-not-take-effect
[10]: /ja/monitors/configuration/?tabs=thresholdalert#new-group-delay
[11]: /ja/monitors/configuration/?tabs=thresholdalert#evaluation-delay
[12]: /ja/integrations/faq/cloud-metric-delay/
[13]: /ja/monitors/guide/reduce-alert-flapping/
[14]: /ja/monitors/guide/suppress-alert-with-downtimes/
[15]: /ja/monitors/notify/variables/?tab=is_alert&tabs=is_alert#template-variables
[16]: /ja/monitors/notify/variables/?tab=is_alert&tabs=is_alert#conditional-variables
[17]: /ja/account_management/#preferences
[18]: /ja/events/stream
[19]: https://docs.opsgenie.com/docs/alert-deduplication
[20]: /ja/notebooks
[21]: /ja/dashboards/functions/rollup/#rollups-in-monitors