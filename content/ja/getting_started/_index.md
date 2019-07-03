---
title: はじめに
kind: documentation
aliases:
  - /ja/overview
  - /ja/guides/overview/
  - /ja/getting_started/faq/
further_reading:
  - link: 'https://learn.datadoghq.com/course/view.php?id=2'
    tag: ラーニング センター
    text: Datadog 入門
---
このページでは、エージェントを[インストール][1]してDatadogを使い始めたばかりの方や、[Datadog で何ができるのか][2]興味をお持ちの方に、Datadog の機能の概要およびインフラストラクチャーの管理方法をご紹介します。

## インテグレーション

{{< img src="getting_started/integrations.png" alt="integrations" responsive="true" >}}

* 350 種類以上のインテグレーションを[公式にサポート][3]しており、今後もさらに増加する予定です。
* [Datadog API を使用した][4]カスタム インテグレーションが可能です。活発な Datadog ユーザーコミュニティで、さまざまな関連文書を参照できます。
* エージェントは[オープンソース][5]のため、自由に調整が可能。
* インテグレーションを構築した後は、データセンターおよび
オンラインサービスのデータはすべて Datadog で同様に扱われます。

## インフラストラクチャー

{{< img src="getting_started/infrastructure.png" alt="infrastructure" responsive="true" >}}

* すべてのマシンは[インフラストラクチャー リスト][6]に表示されます。
* ここで、各マシンに適用されたタグを確認できます。
タグは特定の役割を実行するために割り当てられるので、
タグ付けにより、各マシンの目的を示すことができます。
* サーバーを可能な限り自動的に分類し、
インフラストラクチャーの構成の手間を　
最小限に抑えます（すべてのクラスターを明示的に作成する必要はありません）。　
つまり、新しいマシンがタグ付けされていれば、そのタグの既存の設定情報に基づいて
マシンの統計情報をすぐに確認できます。[タグ付けについて、詳しくはこちら][7]を参照してください。

## ホストマップ

{{< img src="getting_started/hostmap-overview.png" alt="hostmap overview" responsive="true" >}}

インフラストラクチャー メニューにある[ホストマップ][8]では、以下の機能を利用できます。

* ホスト数の大小にかかわらず、環境全体をすばやく視覚化できます。
* 外れ値の特定
* 利用パターンの検出
* リソースの最適化

ホストマップの詳細は、[ホストマップに関するドキュメント][8]を参照してください。

## イベント

{{< img src="getting_started/event_stream.png" alt="Event stream" responsive="true" >}}

[イベントストリーム][9]には、ブログと同じルールが適用されます。つまり、

* ストリームのすべてのイベントにコメントが可能です。
* 分散された[チーム][10]も、調査を 1 か所にまとめて管理することができます。
* たとえば、以下の[フィルター条件][11]を使用します：`user`、`source`、`tag`、`host`、`status`、`priority`、`incident`

それぞれのインシデントに対し、次の操作が可能です。

* 優先度の増減
* コメント
* 類似のインシデントを表示
* メールを受信する[チームメンバーに @ で通知][12]
* `@support-datadog` で[サポート依頼][13]

{{< img src="getting_started/event_stream_event.png" alt="event stream event" responsive="true" style="width:70%;">}} 

## ダッシュボード  

{{< img src="getting_started/dashboard.png" alt="dashboard" responsive="true" >}} 

ダッシュボードには、リアルタイムのパフォーマンス メトリクスが[グラフ][14]で表示されます。

* [スクリーンボード][15]にあるすべてのグラフは、同じマウス操作で閲覧可能。
* 棒グラフの縦軸は、メトリクスのコンテキスト内のイベントを表します。
* グラフをクリック＆ドラッグして特定のタイムフレームを拡大表示。
* グラフにマウスを合わせるとイベントストリームが一緒に移動します。
* ゾーン、ホスト、総使用量別に表示。
* グラフの JSON エディタで、[演算][16] や
[関数][17]をメトリクスに適用。
* ストリームに表示されるグラフのスナップショットを共有。
スナップショットボタン（グラフ右上のカメラ アイコン）をクリックすると、元のダッシュボードに戻ります。
* iframe にグラフを埋め込み、社外にもグラフをライブで提供。
データや他の情報に直接アクセスされることはありません（グラフ右上の鉛筆アイコン）。

## モニタリング

{{< img src="getting_started/monitor.png" alt="monitor" responsive="true" >}}　

[モニタリング][18]では、指定したしきい値から特定のメトリクスの総計が
外れた場合に通知するよう設定できます。

* インフラストラクチャー全体　
* マシンごと（平均、最大、最小、合計）
* 任意のメトリクスに適用（データ センターの温度など）
* 複数のアラート（デバイスごと、ホストごとなど）
* アラートの通知メッセージを設定（@ 機能を含む）

{{< img src="getting_started/alert_setup.png" alt="alert setup" responsive="true" >}}　

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent
[2]: http://www.datadoghq.com/product
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