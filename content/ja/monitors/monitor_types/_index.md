---
title: モニター
kind: documentation
aliases:
  - /ja/monitoring
  - /ja/monitors/faq/can-i-set-up-a-monitor-for-a-metric-that-hasn-t-been-reported-to-datadog-yet/
---
## 作成

Datadog で[モニターを作成するには][1]、メインメニューで **Monitors** の上にマウスを合わせて、サブメニューにある **New Monitor** をクリックします。モニターをプログラムで作成する方法については、[Datadog API][2] または [コミュニティ寄稿のライブラリ][3]を参照してください。

モニターのタイプを選択します。

* [Host][4] - Datadog に報告を行っているホストがあるかどうかをチェックします。
* [Metric][5] - メトリクスの値をユーザー定義のしきい値と比較します。
* [Anomaly][6] - メトリクスの異常動作を履歴データに基づいて検出します。
* [Outlier][7] - グループ内の他のメンバーと挙動が異なるメンバーについてアラートします。
* [Forecast][8] - メトリクスがしきい値を超えて送信された場合にアラートします。
* [Integration][9] - 特定のインテグレーションのメトリクス値または健全性ステータスを監視します。
* [Live Process][10] - ホストで実行中のプロセスがあるかどうかをチェックします。
* [Process Check][11] - `process.up` サービスチェックで生成されたステータスを監視します。
* [Network][12] - TCP/HTTP エンドポイントのステータスをチェックします。
* [Custom Check][13] - 任意のカスタムチェックのステータスを監視します。
* [Event][14] - Datadog によって収集されたイベントを監視します。
* [Logs][15] - Datadog によって収集されたログを監視します。
* [APM][16] - APM メトリクスをユーザー定義のしきい値と比較します。
* [Real User Monitoring][17] - Datadog によって収集されたリアルなユーザーデータを監視します。
* [Watchdog][18] - Watchdog が異常動作を検出した場合に通知を受け取ります。
* [Composite][19] - 複数のモニターを組み合わせた式に対してアラートします。

## インポート

メインナビゲーションで、*Monitors --> New Monitor --> Import* の順に選択し、Datadog に JSON で[モニターをインポート][20]します。

モニターのステータスページから、任意のモニターのエクスポートを JSON で取得できます。右上にある歯車アイコン（設定）をクリックし、メニューから **Export** を選択します。

## 監査

モニターのタイプを変更すると、[イベントストリーム][21]にイベントが作成され、変更内容と変更を行ったユーザーが表示されます。

モニターを変更した場合、イベント検索を実行すると以下の例のように表示されます。

```text
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

Datadog には、作成したモニターへの変更を通知するオプションもあります。モニターエディターの下部に移動し、**Notify your team** の下で、*alert recipients when this alert is modified* の隣のドロップダウンから **Notify** を選択します。

この設定により、モニター監査イベントに関する電子メールが、特定のモニターの全アラート受信者に送信されます。モニター監査イベントは[イベントストリーム][20]にも表示されます。

[1]: https://app.datadoghq.com/monitors#/create
[2]: /ja/api/v1/monitors/
[3]: /ja/developers/libraries/#managing-monitors
[4]: /ja/monitors/monitor_types/host/
[5]: /ja/monitors/monitor_types/metric/
[6]: /ja/monitors/monitor_types/anomaly/
[7]: /ja/monitors/monitor_types/outlier/
[8]: /ja/monitors/monitor_types/forecasts/
[9]: /ja/monitors/monitor_types/integration/
[10]: /ja/monitors/monitor_types/process/
[11]: /ja/monitors/monitor_types/process_check/
[12]: /ja/monitors/monitor_types/network/
[13]: /ja/monitors/monitor_types/custom_check/
[14]: /ja/monitors/monitor_types/event/
[15]: /ja/monitors/monitor_types/log/
[16]: /ja/monitors/monitor_types/apm/
[17]: /ja/monitors/monitor_types/real_user_monitoring/
[18]: /ja/monitors/monitor_types/watchdog/
[19]: /ja/monitors/monitor_types/composite/
[20]: https://app.datadoghq.com/monitors#create/import
[21]: /ja/events/