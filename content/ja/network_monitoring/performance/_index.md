---
title: Network Performance Monitoring
description: Explore metrics for point to point communication on your infrastructure.
aliases:
  - /monitors/network_flow_monitors/
  - /graphing/infrastructure/network_performance_monitor/
  - /network_performance_monitoring/
further_reading:
- link: "https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/"
  tag: Blog
  text: Monitor cloud architecture and app dependencies with Datadog NPM
- link: "https://www.datadoghq.com/blog/network-performance-monitoring"
  tag: Blog
  text: Network Performance Monitoring
- link: "https://www.datadoghq.com/blog/npm-windows-support/"
  tag: Blog
  text: Monitor Windows hosts with Network Performance Monitoring
- link: "https://www.datadoghq.com/blog/cloud-service-autodetection-datadog/"
  tag: Blog
  text: Monitor cloud endpoint health with cloud service autodetection
- link: "https://www.datadoghq.com/blog/npm-best-practices/"
  tag: Blog
  text: Best practices for getting started with Datadog NPM
- link: "https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/"
  tag: Blog
  text: Datadog NPM now supports Consul networking
- link: "https://www.datadoghq.com/blog/npm-story-centric-ux/"
  tag: Blog
  text: Quickstart network investigations with NPM's story-centric UX
- link: "https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/"
  tag: ブログ
  text: Monitor DNS logs for network and security analysis
algolia:
  tags: [npm, network performance monitoring]
---

## 概要

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/670228207/rendition/1080p/file.mp4?loc=external&signature=42d4a7322017fffa6d5cc2e49ddbb7cfc4c6bbbbf207d13a5c9830630bda4ece" poster="/images/poster/npm.png" >}}

Datadog ネットワークパフォーマンスモニタリング (NPM) は Datadog のサービス、コンテナ、アベイラビリティーゾーン、およびその他のタグまで、ネットワークトラフィックを可視化します。IP、ポート、PID レベルの接続データは有意義なクライアントとサーバーのエンドポイント間のアプリケーションレイヤーの依存関係に集約され、カスタマイズ可能な[ネットワークページ][1]と[ネットワークマップ][2]経由で分析および可視化することができます。フローデータと主要なネットワークトラフィック、および DNS サーバーのメトリクスを使用すると以下のことが行えます。

* 予期しない、または潜在的なサービスの依存関係を特定
* クロスリージョンやマルチクラウドなど、高コストの通信を最適化
* クラウドプロバイダーのリージョンやサードパーティーツールの機能停止を特定
* クライアントおよびサーバーサイドにおける、DNS サーバーに関する問題のトラブルシューティング

NPM は Linux および [Windows OS][3] の組み込みサポートと、[Istio サービスメッシュのインスツルメンテーション][4]およびオーケストレーションに対応したコンテナ化環境を搭載しており、複雑なネットワークの監視をシンプルにします。

Additionally, [Network path][5], a feature of NPM, is available in private beta, which allows you to see hop-by-hop traffic in your network.

{{< whatsnext desc="This section includes the following topics:">}}
    {{< nextlink href="network_monitoring/performance/setup" >}}<u>Setup</u>: Configure the Agent to collect network data.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/performance/network_analytics" >}}<u>Network Analytics</u>: Graph your network data between each client and server available.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/performance/network_map" >}}<u>Network Map</u>: Map your network data between your tags.{{< /nextlink >}}
    {{< nextlink href="monitors/types/network_performance/" >}}<u>Recommended Monitors</u>: Configure recommended NPM monitors.{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map
[3]: https://www.datadoghq.com/blog/npm-windows-support/
[4]: https://www.datadoghq.com/blog/monitor-istio-with-npm/
[5]: /network_monitoring/network_path/
