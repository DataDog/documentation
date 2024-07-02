---
title: Overview Page
description: The Network Performance Monitoring Overview Page in the Datadog UI.
further_reading:
    - link: "https://www.datadoghq.com/blog/network-performance-monitoring"
      tag: Blog
      text: Network Performance Monitoring
---

## 概要

The [NPM overview page][3] provides a high-level overview of your network, from costly network traffic to DNS health to service top talkers. Use the Overview page to filter network traffic by environment or team with tags, and adjust the time frame for your network data. 

{{< img src="/network_performance_monitoring/overview_page/overview_page_2.png" alt="The network overview page in Datadog" style="width:100%;">}}

## 外部ネットワークトラフィック

コストのかかるネットワークトラフィックの概要を把握するには、**External Network Traffic** セクションを使用します。ネットワークから離脱する Egress トラフィックは一般的なコストソースであるため、どの外部エンドポイントに最も多くのトラフィックが到達しているかを判断することは、トラフィック量が予想される範囲内に収まっていることを確認するのに役立ちます。例えば、**Top AWS gateway users** は、AWS Internet Gateway または AWS NAT Gateway に通信している上位のエンドポイントを示しています。**AWS PrivateLink eligible traffic** は、トラフィック全体のコストを削減するために AWS PrivateLink を活用できるトラフィックを示しています。 

これらのエリアをさらに詳しく調べるには、概要ページの各セクションの右下にある **View in Analytics** ボタンをクリックします。Analytics ページが開き、クエリが事前に入力されているので、調査を続けることができます。

{{< img src="/network_performance_monitoring/overview_page/external_network_traffic.png" alt="View in Analytics オプションがハイライトされている、概要ページの外部ネットワークトラフィックセクション" style="width:90%;">}}

## アプリケーションと依存関係のトップトーカー

**Application and Dependency Top Talkers** を使用すると、ネットワーク内の特定のエンドポイントを選択し、エンドポイントのアップストリームおよびダウンストリームの上位のトラフィックソースを調べることができます。**See all Dependencies** を選択すると、エンドポイントのアップストリームとダウンストリームの両方で最も高いトラフィック依存関係が表示され、選択した時間枠のグラフ ([時系列][1]) 表示と[トップリスト][2]表示が切り替わります。

{{< img src="/network_performance_monitoring/overview_page/application_dependency_top_talkers.png" alt="概要ページの Application and Dependency Top Talkers セクション" style="width:90%;">}}

## DNS の健全性

**DNS Health** セクションは、クエリされたドメイン、クライアント、またはその両方による上位の DNS 呼び出し元のおおまかな概要を提供します。最もクエリされたドメイン、DNS クエリを行うトップクライアント、またはその 2 つの組み合わせを確認し、選択した時間枠内に予期しない変更があったかどうかを確認するために変更アイコンをチェックします。

また、NXDOMAIN、タイムアウト、SERVFAIL などの一般的な DNS エラーの上位呼び出し元を表示できます。任意のエラータイプに起因するクライアントから DNS へのクエリの組み合わせの上位を検索し、そのエラー率が選択した時間枠でどのように変化したかを確認します。これは、特にインシデントのトラブルシューティング中に、調査が必要な異常な DNS エラーを特定するのに役立ちます。

{{< img src="/network_performance_monitoring/overview_page/dns_health.png" alt="概要ページの DNS Health セクション" style="width:90%;">}}

## 上位トラフィックソースの特定

**Identify Top Traffic Sources** セクションでは、データのタグ付け方法に応じて、アベイラビリティゾーン、チーム、クラウドプロバイダー、リージョンなど、さまざまなソースにわたるトラフィックが表示されます。たとえば、アベイラビリティゾーン (AZ) のトラフィックの上位を確認すると、AZ をまたがるトラフィックは一般的な出費であるため、クラウドのコスト削減の調査を開始するのに役立ちます。さらに **View in Analytics** ボタンをクリックして調査を続けると、クロス AZ トラフィックの大部分を占めるサービスがわかります。このセクションを使用して、上位のクロスチーム、クロスクラウドプロバイダー、またはクロスリージョントラフィックの同様の調査を行うことができます。

{{< img src="/network_performance_monitoring/overview_page/top_traffic_sources.png" alt="概要ページの Identify Top Traffic Sources セクション" style="width:90%;">}}

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}


[1]: /dashboards/widgets/timeseries/
[2]: /dashboards/widgets/top_list/
[3]: https://app.datadoghq.com/network/overview