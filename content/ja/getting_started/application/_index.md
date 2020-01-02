---
title: Datadog の開始
kind: documentation
further_reading:
  - link: 'https://learn.datadoghq.com/course/view.php?id=2'
    tag: ラーニングセンター
    text: Datadog 入門
---
このページでは、Datadog [US サイト][1]および [EU サイト][2]の機能に関する高度な概要を説明します。

## インテグレーション

{{< img src="getting_started/integrations.png" alt="integrations"  >}}

* Datadog では、350 個以上のインテグレーションが[公式にリストされています][3]。
* [Datadog API の使用による][4]カスタムインテグレーションも使用可能です。
* Agent は[オープンソース][5]です。
* インテグレーションの構成後は、データセンターやオンラインサービス内のすべてのデータが Datadog で一元管理されます。

## インフラストラクチャー

{{< img src="getting_started/infrastructure.png" alt="infrastructure"  >}}

* すべてのマシンは[インフラストラクチャー リスト][6]に表示されます。
* 各マシンに適用されたタグを確認できます。タグ付けによって各マシンの目的を示すことができます。
* Datadog では、サーバーの分類が自動的に試みられます。新しいマシンにタグ付けすれば、既にそのタグに設定されている情報に基づいて、そのマシンの統計情報を即座に確認できます。[タグ付けの詳細については、こちらを参照してください][7]。

## Host Map

{{< img src="getting_started/hostmap-overview.png" alt="hostmap overview"  >}}

[ホストマップ][8]は、インフラストラクチャーメニューにある機能です。この機能を使用すると、以下のことができます。

* 環境のすばやい可視化
* 外れ値の特定
* 利用パターンの検出
* リソースの最適化

ホストマップの詳細は、[ホストマップに関するドキュメント][8]を参照してください。

## イベント

{{< img src="getting_started/event_stream.png" alt="Event stream"  >}}

[イベントストリーム][9]には、ブログと同じルールが適用されます。つまり、

* ストリーム内のイベントにコメントできます。
* [チーム][10]メンバーが分散していても、調査内容をまとめて管理できます。
* イベントを `user`、`source`、`tag`、`host`、`status`、`priority`、`incident` で[絞り込む][11]ことができます。

各インシデントに対して次の操作が可能です。

* 優先度の増減
* コメント
* 類似のインシデントを表示
* メールを受信する[チームメンバーに @ で通知][12]
* `@support-datadog` で[サポート依頼][13]

{{< img src="getting_started/event_stream_event.png" alt="event stream event"  style="width:70%;">}} 

## ダッシュボード  

{{< img src="getting_started/dashboard.png" alt="dashboard"  >}} 

ダッシュボードには、リアルタイムパフォーマンスメトリクスが[グラフ][14]で表示されます。

* [スクリーンボード][15]にあるすべてのグラフは、同じマウス操作で閲覧可能。
* 棒グラフはイベントです。これによってコンテキストにメトリクスを与えることができます。
* グラフ内の特定のタイムフレームをクリックアンドドラッグで拡大表示できます。
* グラフ内にマウスポインターを合わせて、イベントストリームを移動させることができます。
* ゾーン、ホスト、総使用量別に表示。
* Datadog はグラフの JSON エディターを公開します。これにより、[数式][16]と[関数][17]をメトリクスに適用できます。
* グラフのスナップショットをストリームに表示して共有できます。
* グラフを iframe に埋め込むことができます。これにより、自社のデータやその他の情報へのアクセス権を付与しなくても、サードパーティにライブグラフを提供することができます。

## モニター

[モニター][18]は、メトリクスのしきい値、インテグレーションの有無、ネットワークエンドポイントなどに基づいて、アラートと通知を提供します。

* Datadog に報告される任意のメトリクスを使用できます。
* マルチアラートをセットアップ (デバイスごと、ホストごとなど) できます。
* アラートメッセージで `@` を使用することで適切な相手に通知を届けることができます。
* ダウンタイムをスケジューリングすると、システムシャットダウン時やオフラインメンテナンス時などに通知を停止できます。

{{< img src="getting_started/application/metric_monitor.png" alt="alert setup"  >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: https://app.datadoghq.eu
[3]: http://www.datadoghq.com/integrations
[4]: /ja/api
[5]: https://github.com/DataDog/dd-agent
[6]: /ja/graphing/infrastructure
[7]: /ja/tagging
[8]: /ja/graphing/infrastructure/hostmap
[9]: /ja/graphing/event_stream
[10]: /ja/account_management/team
[11]: https://www.datadoghq.com/blog/filter-datadog-events-stream-pinpoint-events-infrastructure
[12]: /ja/graphing/event_stream/#@-notifications
[13]: /ja/help
[14]: /ja/graphing
[15]: /ja/graphing/dashboards/screenboard
[16]: /ja/graphing/functions
[17]: https://www.datadoghq.com/blog/rank-filter-performance-monitoring-metrics-top-function
[18]: /ja/monitors