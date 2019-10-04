---
title: Datadog Docs
kind: documentation
aliases:
  - /ja/basic_agent_usage/
  - /ja/guides/
  - /ja/faq/
  - /ja/docs/
disable_toc: true
---
# Datadog Docsへようこそ！

*Datadog を初めて利用される方に、本製品の概要をご紹介します。*

{{< tile-nav >}}

アプリケーション スタックには未使用のメタデータが大量に存在します。その中には、うまく機能していない部分を突き止めるための情報が隠れています。

想定外のスロー、データベース クエリの遅延、キャッシュミス、アップストリーム サービスのフラッピング、エラーログの増加などはどれも不具合を示す現象です。が、それらを個別に見ているだけでは、その意味を把握し適切な改善策を講じることは困難です。

Datadog なら、すべてのメトリクス、イベント、サービス状態を一元管理し、そのデータを美しいグラフで視覚化して相関性を表したり、柔軟なアラート条件を設定したりすることが可能です。しかも、お客様がストレージの運用やインフラストラクチャーの監視をする必要はありません。

## すべてを収集

コードを書かなくても、既存の豊富なデータを収集できます。すべてのサーバー、インスタンス、VM、ノード、[コンテナ実行ホスト][1]に [Datadog エージェントをインストール][2]し、すぐに使える 280 種類以上の[インテグレーション][3]から選んで有効化します。インストール後は、Datadog のバックエンドにメトリクスが流れ込みます。

簡単なコーディングで、カスタムアプリケーション メトリクスを送信できます。[DogStatsD][4] で独自のゲージ、カウンター、タイマー、ヒストグラムを実装したり、[APM][5] を使ってコードパスの実行時間をトレースし、要求から応答までの時間に対する影響を確認したりできます。[クライアントライブラリ][6]が[カスタムメトリクス][7]とトレースデータを Datadog エージェントに送信すると、その後データは Datadog に渡されます。

スタックの中には、サーバーではなく SaaS を使用するものもあります。Datadog は[このようなサービスの多くにポーリング][8]できるため、エージェントを介することなく簡単にインテグレーションができます。

## 可視化

収集されたデータは、Datadog ウェブアプリケーションですぐに表示できます。たとえば、Metrics Explorer を使って特定のメトリクスを検索し、その動きを監視します。[イベントストリーム][9]に流れ込むイベント (アプリケーションのデプロイなど) を表示し、これにコメントすることも可能です。[インフラストラクチャー マップ][10]でホストグループを絞り込んだり、デフォルトのダッシュボードで特定のサービス (MySQL) の運用状況について全体像をとらえたりすることもできます。

そのうち、特に気になるグラフ、数値、イベント、サービス状態を組み合わせ、カスタム[Screenboard][11]を作成できるようになります。他のメトリクスを使い対象のメトリクス値をスキューしたり、[異常検知][12]、[外れ値][13]、[予測値][14]を検出したり、イベントを上に重ね合わせたりするなど、グラフを自由にカスタマイズすると、問題を特定しやすくなります。

## モニタリング

グラフで問題を検知できるようになったら、次はメトリクスに基づいて[モニター][15]にアラートの条件を設定します。アラートの通知は、[メール][16] で受け取ることも、[Slack][17] のインテグレーションを設定して専用アプリ内で受け取ることもできます。

既知の問題に対しては、[アラートをサイレント][18]にできます。また、メンテナンス時にサービスを一時停止する場合は、[ダウンタイムをスケジューリング][18]して、その間アラートが発行されないようにすることができます。さらに、ホスト、イベント、メトリクス、サービスに固有のアラートの発行条件を定義できない場合は、代わりに[複合条件モニター][19]を作成できます。

<div class="col text-center">
{{< img src="icons/fr-flag-round-50.png" alt="French Docs" responsive="true" popup="false" href="https://docs.datadoghq.com/fr/" >}}
</div>

{{< partial name="support/support.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: /ja/agent
[3]: /ja/integrations
[4]: /ja/developers/dogstatsd
[5]: /ja/tracing
[6]: /ja/developers/libraries
[7]: /ja/developers/metrics/custom_metrics
[8]: /ja/integrations
[9]: /ja/graphing/event_stream
[10]: /ja/graphing/infrastructure
[11]: /ja/graphing/dashboards/screenboard
[12]: /ja/monitors/monitor_types/anomaly
[13]: /ja/monitors/monitor_types/outlier
[14]: /ja/monitors/monitor_types/forecasts
[15]: /ja/monitors
[16]: /ja/monitors/notifications
[17]: /ja/integrations/slack
[18]: /ja/monitors/downtimes
[19]: /ja/monitors/monitor_types/composite
