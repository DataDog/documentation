---
aliases:
- /ja/guides/eventcorrelation/
- /ja/guides/markdown/
further_reading:
- link: /api/v1/events/
  tag: ドキュメント
  text: Datadog イベント API
kind: documentation
title: イベント
---

{{< img src="events/events-overview.png" alt="イベントエクスプローラー" >}}

## はじめに

_イベント_とは、コードのデプロイメント、サービスの健全性、構成変更、監視アラートなど、IT 運用の管理およびトラブルシューティングに関連する注目すべき変化の記録です。

Datadog Events は、あらゆるソースからのイベントを一箇所で検索、分析、フィルタリングするための統合インターフェイスを提供します。

追加設定なしで、Datadog Events は、Agent とインストールされたインテグレーションによって収集されるイベントを自動的に収集します。

[Kubernetes][1]、[Docker][2]、[Jenkins][3]、[Chef][4]、[Puppet][5]、[AWS ECS][6] または [Autoscaling][7]、[Sentry][8]、[Nagios][9] など 100 以上の Datadog インテグレーションがイベント収集をサポートしています。

## Datadog にカスタムイベントを送信する

[Datadog API][10]、[Custom Agent Check][11]、[DogStatsD][12]、または [Events Email API][13] を使って、独自のカスタムイベントを送信することも可能です。

## Datadog Events の確認

### イベントエクスプローラーと分析

[イベントエクスプローラー][14]を使用して、Datadog に流入するイベントを集計・表示します。イベントを属性でグループ化またはフィルタリングし、[イベント分析][15]でグラフィカルに表現します。[クエリ構文][16]を使用して、ブール演算子やワイルドカード演算子を使用してイベントをフィルタリングします。

{{< img src="events/events-explorer.mp4" alt="イベントを属性でソートし、分析結果を調べる" video=true >}}

### ダッシュボードウィジェットのソースとしてのイベント

[グラフウィジェット][17]でイベントをデータソースとして利用することができます。イベント検索クエリの時系列、表、上位リストウィジェットを構築することができます。

{{< img src="events/events-dashboard.mp4" alt="イベントをソースとするグラフウィジェット" video=true >}}

例えば、[Monitor Notifications Overview][18] ダッシュボードは、モニターアラートイベントの傾向を分析し、構成の改善とアラートの疲労を軽減するのに役立ちます。

### イベントからカスタムメトリクスを生成 

イベント検索クエリから 15 ヶ月間保持される[メトリクスを生成][15]し、過去のイベントやアラートを作成、監視します。

{{< img src="events/generate-metrics.png" alt="イベント検索クエリによるメトリクスのイメージ。" >}}

### 処理パイプラインによるイベントの正規化およびリッチ化

_プロセッサー_は、イベント属性が取り込まれると、その属性に対してデータ構造化アクションを実行します。パイプラインは、1 つまたは複数のプロセッサーを順番に実行することで構成されます。イベント処理パイプラインを使用すると、以下のことが可能になります。

- 属性の再マッピングにより、異なるイベントのソースを正規化する。例えば、予約済みの[サービスタグ][19]をどこでも同じように使用します。
- [Reference Table][20] に保存された外部データでイベントをリッチ化する (ベータ版)。例えば、サービス名とサービスディレクトリを対応させ、チームの所有者情報、ダッシュボードへのリンク、ドキュメントへのリンクでイベントをリッチ化することができます。

より多くのプロセッサーの種類に対応するため、現在開発中です。詳しくは、[サポートにお問い合わせください][21]。

[処理パイプラインの詳細はこちら][22]。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/agent/kubernetes/#event-collection
[2]: /ja/agent/docker/#events
[3]: /ja/integrations/jenkins/#events
[4]: /ja/integrations/chef/#report-handler
[5]: /ja/integrations/puppet/#events
[6]: /ja/integrations/amazon_ecs/#events
[7]: /ja/integrations/amazon_auto_scaling/#events
[8]: /ja/integrations/sentry/
[9]: /ja/integrations/nagios/#events
[10]: /ja/api/latest/events/#post-an-event
[11]: /ja/events/guides/agent/
[12]: /ja/events/guides/dogstatsd/
[13]: /ja/events/guides/email/
[14]: /ja/events/explorer/
[15]: /ja/events/explorer/#event-analytics
[16]: /ja/logs/explorer/search_syntax/
[17]: /ja/dashboards/widgets/alert_graph/
[18]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[19]: /ja/getting_started/tagging/unified_service_tagging/
[20]: /ja/logs/guide/reference-tables/
[21]: /ja/help/
[22]: /ja/logs/log_configuration/processors/