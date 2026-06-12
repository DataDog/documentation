---
aliases:
- /ja/guides/eventcorrelation/
- /ja/guides/markdown/
- /ja/events
further_reading:
- link: '#post-an-event'
  tag: Documentation
  text: Datadog イベント API
- link: /service_management/events/guides/recommended_event_tags/
  tag: Documentation
  text: イベントへのタグ付けのベストプラクティス
- link: https://www.datadoghq.com/blog/identify-sensitive-data-leakage-in-apm-rum-with-sensitive-data-scanner/
  tag: ブログ
  text: 機密データスキャナーでイベントの機密データを特定し、編集する
- link: https://app.datadoghq.com/event/configuration/quick-start
  tag: App
  text: クイックスタートガイド
- link: https://www.datadoghq.com/blog/datadog-event-management
  tag: ブログ
  text: Aggregate, correlate, and act on alerts faster with AIOps-powered Event Management
is_beta: true
title: イベント管理
---

{{< img src="service_management/events/correlation/event_management.png" alt="what is event management" style="width:100%;" >}}

## 概要

あらゆるソースからイベントを取り込み、リッチ化・正規化して、関連付け (公開ベータ版を参照) を行い、実用的なインサイトを得ることができます。Datadogは、モニター、Watchdog、エラー追跡を含むさまざまな製品から自動的にイベントを作成します。Agent とインストールされたインテグレーションから生成されたイベントも追跡できます。また、イベント管理では、サードパーティのアラートイベント、変更リクエスト、デプロイ、構成変更など、さまざまなソースからイベントを取り込むことができます。

[Kubernetes][1]、[Docker][2]、[Jenkins][3]、[Chef][4]、[Puppet][5]、[Amazon ECS][6] または [Autoscaling][7]、[Sentry][8]、[Nagios][9] など 100 以上の Datadog インテグレーションがイベント収集をサポートしています。

## コンポーネント

{{< whatsnext desc="Event Management features:">}}
    {{< nextlink href="/service_management/events/ingest/" >}}<u>Ingest events</u> - Learn how to send events to Datadog{{< /nextlink >}}
     {{< nextlink href="/service_management/events/pipelines_and_processors/">}}<u>Pipelines and Processors</u> - Enrich and Normalize your events{{< /nextlink >}}
    {{< nextlink href="/service_management/events/explorer/" >}}<u>Events Explorer</u> - View, search and send notifications from events coming into Datadog{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/usage/" >}}<u>Using events</u> - Analyze, investigate, and monitor events {{< /nextlink >}}
    {{< nextlink href="/service_management/events/correlation/" >}}<u>Correlation</u> - reduce alert fatigure and the number of tickets/notifictions you recieve {{< /nextlink >}}

{{< /whatsnext >}}

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
