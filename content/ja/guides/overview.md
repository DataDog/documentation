---
last_modified: 2017/02/13
translation_status: complete
language: ja
title: Datadogが提供するサービスの概要
kind: guide
sidebar:
  nav:
    - header: Datadog のサービスについて
    - text: 便利な Integrations
      href: "#integrations"
    - text: インフラを構成しているホストのリスト表示
      href: "#infrastructure"
    - text: Host Map の表示
      href: "#hostmap"
    - text: イベントの時系列表示
      href: "#events"
    - text: 原因追跡用ダッシュボード
      href: "#dashboards"
    - text: 監視とアラート
      href: "#monitoring"
---

<!-- So, you've just finished [installing](/guides/basic_agent_usage/) the Datadog
Agent, or maybe you're just curious about [what (else) Datadog can do for you](http://www.datadoghq.com/product/).
This document gives a high level overview of Datadog's capabilities and how
it can help you bring your infrastructure to heel. -->

Datadog Agent の[インストール][j1]は、無事終了しましたか。もしかしたら、[Datadog が提供するサービス][1]に興味を持っていただいたばかりかもしれませんね。

このドキュメントでは、**Datadog の各機能**と**それらの有要性**を解説します。


<!-- ## Integrations
{: #integrations}

![](/static/images/integrations.png){: style="width:100%; border:1px solid #777777"}

* About 100 integrations <a target="_blank" href="http://www.datadoghq.com/integrations/">officially listed</a>, always adding more.
* Custom integrations are available <a target="_blank" href="http://docs.datadoghq.com/api/">via our API</a>, many documented by our active user community.
* The Agent is <a target="_blank" href="https://github.com/DataDog/dd-agent/">open source</a> and you can instrument your own if you'd like.
* Once integrations have been configured, data living in a datacenter or
in an online service is treated the same throughout Datadog.
-->

## 簡単で便利な Integrations
{: #integrations}

![](/static/images/integrations.png){: style="width:100%; border:1px solid #777777"}

* [150以上のIntegrations][3] を公式に公開中です。Integrations は随時追加される予定です。
* カスタム Integrationsは、[Datadog API][j2] を介し開発することができます。これらのAPIは、活発なユーザーコミュニティによってドキュメント化が進められています。
* [Datadog Agent][2] はオープンソースです。 必要に応じて独自に改造することもできます。
* Integration の設定が完了すればデータセンターやオンラインサービス等から転送したデータもDatadog を介し同じように取り扱うことができます。


<!-- ## Infrastructure
{: #infrastructure}

![](/static/images/infrastructure.png){: style="width:100%; border:1px solid #777777"}

* All machines show up in the infrastructure overview
* Here you can see the tags applied to each machine; as they're assigned to
perform certain roles, tagging allows you to indicate machines have
a certain purpose
* We do as much as possible to automatically categorize your servers
for you, to create structure in your infrastructure with as little
work as possible (unlike explicitly creating all your clusters).
Thus if a new machine is tagged, you can immediately see the stats
for that machine based on what was previously set up for that tag.
* For more on tagging, please see <a target="_blank" href="/faq/#tagging">here</a>.
-->

## インフラを構成しているホストのリスト表示
{: #infrastructure}

![](/static/images/infrastructure.png){: style="width:100%; border:1px solid #777777"}

* 全てのホストは、`Infrastructure` のページに表示されます。
* 上の図では、各種の役割を与えられたホストに適用されたタグを見ることができます。タグを付与することによって各ホストがどのような目的で利用されているか識別することができます。
* Datadog では、インフラ全体の構造を最小限の努力で表現できるように、ホストをできる限り自動的に分類するようにしています。明示的に、すべてのクラスタを作成する必要はありません。従って新しいホストにタグが付与されると、以前にそのタグ用に設定した内容にしたがい直ちにステータスを見ることができるように成ります。
* タグ設定の詳細は、["FAQ:タグの詳細"][j3]をご参照ください。


<!-- ## Host Map
{: #hostmap}

![](/static/images/hostmap-overview.png){: style="width:100%; border:1px solid #777777"}

The Host Map can be found under the Infrastructure menu and offers the ability to:

* Quickly visualize your entire environment regardless of whether it 5, 500, or 50,000 hosts.
* Identify outliers
* Detect usage patterns
* Optimize resources

To learn more about the Host Map, visit the [Host Map Guide](/guides/hostmap). -->

## Host Map の表示
{: #hostmap}

![](/static/images/hostmap-overview.png){: style="width:100%; border:1px solid #777777"}

Host Map は、`Infrastructure` メニューのドロップダウンメニュー内にあります。この表示を使うことにより、次のようなことが可能になります:

* 運用中のインフラの規模に関わらず、全体像を素早く可視化
* 外れ値の検出
* 利用パターンの検出
* リソース利用の最適化

Host Map 表示について詳しく知りたい場合は、[Host Map ガイド](/ja/guides/hostmap)ページを参照してください。


<!-- ## Events
{: #events}

![](/static/images/event_stream.png){: style="width:100%; border:1px solid #777777"}

The Event Stream is based on the same conventions as a blog:

* Every event in the stream can be commented on.
* Great for distributed <a target="_blank" href="/faq/#team">teams</a> and maintaining the focus of an investigation
* You can <a target="_blank" href="https://www.datadoghq.com/blog/filter-datadog-events-stream-pinpoint-events-infrastructure/">filter</a>
by: user, source, tag, host, status, priority, incident

![](/static/images/event_stream_post_incident_history.png){: style="width:100%; border:1px solid #777777"}

For each incident users can:

* Claim it
* Increase/decrease priority
* Comment
* See similar incidents
* <a target="_blank" href="/faq/#notify">@ notify team members</a>, who receive an email
* @support-datadog to ask for assistance

![](/static/images/event_stream_claim.png){: style="width:100%; border:1px solid #777777"}
-->

## イベントの時系列表示
{: #events}

![](/static/images/event_stream.png){: style="width:100%; border:1px solid #777777"}

Event の掲載は、ブログと同じ規則に基づいています:

* ストリーム内のすべてのEvent にはコメントを付けることができます。
* 分散した[チーム][j4]や、問題の調査時に問題点をフォーカスするのに便利です。
* `by: user`, `source`, `tag`, `host`, `status`, `priority`, `incident` 等の項目で、[フィルタリング][j5]することができます。

![](/static/images/event_stream_post_incident_history.png){: style="width:100%; border:1px solid #777777"}

ユーザは、インシデント(出来事)に対して次の操作ができます:

* 問題の提案
* プライオリティの変更(上げる/下げる)
* コメントの追加
* 同様なインシデントの閲覧
* [@ notify][j6] を使ったチームメンバーへの通知やemail 送信</li>
* @support-datadog でのサポートの要請
</ul>

![](/static/images/event_stream_claim.png){: style="width:100%; border:1px solid #777777"}


<!-- ## Dashboards
{: dashboards}

![](/static/images/dashboard_events.png){: style="width:100%; border:1px solid #777777"}

Dashboards contain <a target="_blank" href="/graphing/">graphs</a> with real-time performance metrics

* Synchronous mousing across all graphs in a dashboard.
* Vertical bars are events in the context of the metric.
* Click & drag on a graph to zoom-in on a particular time-frame.
* As you hover over the graph the event stream moves with you.
* Display by zone, host, or total usage.
* We expose the JSON editor of the graph allowing for <a target="_blank" href="http://docs.datadoghq.com/graphing/#functions">arithmetic</a> and
<a target="_blank" href="https://www.datadoghq.com/blog/rank-filter-performance-monitoring-metrics-top-function/">functions</a> to be applied to metrics.
* Share a graph snapshot that will appear in the stream; clicking on
that snapshot returns you to the original dashboard (via the camera in the upper right of a graph).
* Graphs can be embedded in an iframe, giving a 3rd party a live graph
without access to your data or any other information (via the pencil in the upper right of a graph).
 -->

## 原因追跡用ダッシュボード
{: dashboards}

![](/static/images/dashboard_events.png){: style="width:100%; border:1px solid #777777"}

ダッシュボードには、[グラフ化][j7]されたパフォーマンスメトリクスがリアルタイムに表示されます。

* ダッシュボード内の全てのグラフは、マウスで操作できます。
* グラフ内のビンクの縦の線は、Eventの発生を表しています。
* グラフ上で"Click & drag" することによって、時間軸を変更することができます。
* グラフ上でカーソルを移動することによって、Event ストリームの表示も該当箇所へ自動的に移動していきます。
* zone, host, total usage で、表示することができます。
* グラフ内に表示するメトリクスの[計算][j8]や[集計][4]を可能にするために、JSON editorを画面上に設置しています。
* グラフのスナップショットをEvent ストリームで共有することができます。Event ストリームに掲載されたスナップショットを"Click" すると、そのグラフが表示されているダッシュボードに移動することができます。(グラフ右上のカメラマークから)
* グラフは、iframe に挿入することができます。この機能を使い、基礎データや他の情報を隠蔽したまま、第３者にグラフを公開することができます。(グラフ右上の鉛筆マークから)


<!-- ## Monitoring
{: monitoring}

![](/static/images/alert.png){: tyle="width:100%; border:1px solid #777777"}

[Monitoring](/guides/monitoring/) gives you the ability to be notified if the aggregate of a specific
metric is above or below a certain threshold:

* Across your entire infrastructure
* Per machine (average, max, min, or sum)
* Applies to any metric you want, revenue: data center temperature, etc.
* Multi alerts (by device, host, etc.)
* Set alert notification message, including @ capabilities

![](/static/images/alert_setup.png){: style="width:100%; border:1px solid #777777"}


Does the data have to be pushed to Datadog?

Currently, yes:

1. All integrations we have get data flowing almost automatically after
launching the Agent (intial reporting may take a few minutes, but not longer than 10).
2. If you have custom metrics, you can indicate specifically where
to pull the data from.
-->

## 監視とアラート
{: monitoring}

![](/static/images/alert.png){: tyle="width:100%; border:1px solid #777777"}

[Monitor機能][j9]によって、特定のメトリクスの集計が閾値を超えた場合にアラートを発報する機能を実現することができます:

* インフラ全体のメトリクスのaverage, max, min, or sum を基に
* ホスト毎のメトリクスのaverage, max, min, or sum を基に
* 指定できるメトリクスなら全てOK。例: 売上情報, データーセンターの温度, など</li>
* 同一条件による、別デバイスや別ホストに股がったアラート機能 (by device, host, etc.)
* "@" 機能によるグループ毎の通知設定

![](/static/images/alert_setup.png){: style="width:100%; border:1px solid #777777"}

アラート機能のためのデータは、Datadog に送信する必要がありますか?

はい、必要です:

* Datadog で公開しているIntegrations は、Datadog Agent を起動することによって、自動的にデータを送信するように成っています。(初回のデータ送信に関しては、数分の時間を要します。但し、10分以上になることはありません。)
* カスタムメトリクスがある場合は、データの収集先情報を特別に指定することができます。



[1]: http://www.datadoghq.com/product/
[2]: https://github.com/DataDog/dd-agent
[3]: http://www.datadoghq.com/integrations/
[4]: https://www.datadoghq.com/blog/rank-filter-performance-monitoring-metrics-top-function/
[j1]: /ja/guides/basic_agent_usage/
[j2]: /ja/api/
[j3]: /ja/faq/#tagging
[j4]: /ja/faq/#team
[j5]: https://www.datadoghq.com/blog/filter-datadog-events-stream-pinpoint-events-infrastructure/
[j6]: /ja/faq/#notify
[j7]: /ja/graphing/
[j8]: /ja/graphing/#functions
[j9]: /ja/guides/monitoring/