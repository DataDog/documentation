---
algolia:
  tags:
  - npm
  - ネットワークパフォーマンスモニタリング
aliases:
- /ja/monitors/network_flow_monitors/
- /ja/graphing/infrastructure/network_performance_monitor/
- /ja/network_performance_monitoring/
description: インフラストラクチャー上のポイントツーポイントコミュニケーションのメトリクスを調べます。
further_reading:
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: ブログ
  text: Datadog NPM でクラウドアーキテクチャとアプリの依存関係を監視する
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: ブログ
  text: ネットワークパフォーマンスモニタリング
- link: https://www.datadoghq.com/blog/npm-windows-support/
  tag: ブログ
  text: ネットワークパフォーマンスモニタリングで Windows ホストを監視する
- link: https://www.datadoghq.com/blog/cloud-service-autodetection-datadog/
  tag: ブログ
  text: クラウドサービスの自動検出でクラウドエンドポイントの健全性を監視する
- link: https://www.datadoghq.com/blog/npm-best-practices/
  tag: ブログ
  text: Datadog NPM を始めるためのベストプラクティス
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: ブログ
  text: Datadog NPM が Consul ネットワーキングに対応
title: ネットワークパフォーマンスモニタリング
---

## 概要

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/670228207/rendition/1080p/file.mp4?loc=external&signature=42d4a7322017fffa6d5cc2e49ddbb7cfc4c6bbbbf207d13a5c9830630bda4ece" poster="/images/poster/npm.png" >}}

Datadog ネットワークパフォーマンスモニタリング (NPM) は Datadog のサービス、コンテナ、アベイラビリティーゾーン、およびその他のタグまで、ネットワークトラフィックを可視化します。IP、ポート、PID レベルの接続データは有意義なクライアントとサーバーのエンドポイント間のアプリケーションレイヤーの依存関係に集約され、カスタマイズ可能な[ネットワークページ][1]と[ネットワークマップ][2]経由で分析および可視化することができます。フローデータと主要なネットワークトラフィック、および DNS サーバーのメトリクスを使用すると以下のことが行えます。

* 予期しない、または潜在的なサービスの依存関係を特定
* クロスリージョンやマルチクラウドなど、高コストの通信を最適化
* クラウドプロバイダーのリージョンやサードパーティーツールの機能停止を特定
* クライアントおよびサーバーサイドにおける、DNS サーバーに関する問題のトラブルシューティング

NPM は Linux および [Windows OS][3] の組み込みサポートと、[Istio サービスメッシュのインスツルメンテーション][4]およびオーケストレーションに対応したコンテナ化環境を搭載しており、複雑なネットワークの監視をシンプルにします。

{{< whatsnext desc="このセクションには、次のトピックが含まれています。">}}
    {{< nextlink href="network_monitoring/performance/setup" >}}<u>セットアップ</u>: ネットワークデータを収集するように Agent を構成します。{{< /nextlink >}}
    {{< nextlink href="network_monitoring/performance/network_analytics" >}}<u>ネットワーク分析</u>: 利用可能な各クライアントとサーバー間のネットワークデータをグラフ化します。{{< /nextlink >}}
    {{< nextlink href="network_monitoring/performance/network_map" >}}<u>ネットワークマップ</u>: タグ間でネットワークデータをマッピングします。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map
[3]: https://www.datadoghq.com/blog/npm-windows-support/
[4]: https://www.datadoghq.com/blog/monitor-istio-with-npm/