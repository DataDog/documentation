---
algolia:
  tags:
  - Cloud Network Monitoring
  - Network Performance Monitoring
  - CNM
  - NPM
aliases:
- /ja/monitors/network_flow_monitors/
- /ja/graphing/infrastructure/network_performance_monitor/
- /ja/network_performance_monitoring/
- /ja/network_monitoring/performance/
description: インフラストラクチャー上のポイントツーポイントコミュニケーションのメトリクスを調べます。
further_reading:
- link: https://www.datadoghq.com/architecture/hybrid-cloud-network-observability/
  tag: Architecture Center
  text: ハイブリッドマルチクラウドネットワークオブザーバビリティリファレンスアーキテクチャ
- link: https://www.datadoghq.com/blog/cnm-network-health
  tag: ブログ
  text: CNM Network Health を使用して、ネットワークの問題を簡単に検出、診断、および解決します。
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: ガイド
  text: アプリケーションの可用性をネットワークインサイトで検知する
- link: https://www.datadoghq.com/blog/npm-windows-support/
  tag: ブログ
  text: Cloud Network Monitoring で Windows ホストを監視します。
- link: https://www.datadoghq.com/blog/cloud-service-autodetection-datadog/
  tag: ブログ
  text: クラウドサービスの自動検出でクラウドエンドポイントの健全性を監視する
- link: https://www.datadoghq.com/blog/npm-best-practices/
  tag: ブログ
  text: Datadog CNM を始めるためのベストプラクティス
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: ブログ
  text: Datadog CNM が Consul ネットワーキングに対応
- link: https://www.datadoghq.com/blog/npm-story-centric-ux/
  tag: ブログ
  text: CNM のストーリー中心 UX でネットワーク調査を迅速に開始します。
- link: https://www.datadoghq.com/blog/monitor-connection-churn-datadog/
  tag: ブログ
  text: コネクションチャーンを監視し、改善するためのベストプラクティス
- link: /network_monitoring/cloud_network_monitoring/glossary
  tag: ドキュメント
  text: CNM の用語と概念
- link: https://learn.datadoghq.com/courses/getting-started-infra-cnm
  tag: 学習センター
  text: Infrastructure および Cloud Network Monitoring (CNM) の製品概要
title: Cloud Network Monitoring
---
## 概要 {#overview}

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/670228207/rendition/1080p/file.mp4?loc=external&signature=42d4a7322017fffa6d5cc2e49ddbb7cfc4c6bbbbf207d13a5c9830630bda4ece" poster="/images/poster/npm.png" >}}

Datadog Cloud Network Monitoring (CNM) は、Datadog 内のサービス、コンテナ、Availability Zone、およびその他のタグ間のネットワークトラフィックを可視化します。IP、ポート、PID レベルのコネクションデータは、意味のあるクライアントエンドポイントとサーバーエンドポイント間のアプリケーション層の依存関係に集約され、カスタマイズ可能な [network page][1] および [Network Map][2] を通じて分析および可視化できます。フローデータと主要なネットワークトラフィックおよび DNS サーバーメトリクスを使用して、次のことを行います。

* 予期しない、または潜在的なサービスの依存関係を特定します。
* クロスリージョンやマルチクラウドなど、高コストの通信を最適化します。
* クラウドプロバイダーのリージョンやサードパーティツールの機能停止を特定します。
* クライアントおよびサーバーサイドにおける、DNS サーバーに関する問題のトラブルシューティングを行います。

{{< whatsnext desc="このセクションには下記のトピックが含まれています。">}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/setup" >}}<u>セットアップ</u>: ネットワークデータを収集するように Agent を構成します。{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_health" >}}<u>ネットワークヘルス</u>: ネットワーク環境の健全性を確認します。{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_analytics" >}}<u>Network Analytics</u>: 利用可能な各クライアントとサーバー間のネットワークデータをグラフ化します。{{< /nextlink >}}
    {{< nextlink href="network_monitoring/network_path/setup/#scheduled-tests" >}}<u>Network Path Scheduled Tests</u>: スケジュールテストを使用して、ネットワークトラフィックの起点から終点までのルートを可視化します。{{< /nextlink >}}
    {{< nextlink href="network_monitoring/network_path/setup/#dynamic-tests" >}}<u>Network Path Dynamic Tests</u>: テストを動的に作成し、Agent が Network Path を自動的に検出および監視できるようにします。{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_map" >}}<u>Network Map</u>: タグ間のネットワークデータをマップ化します。{{< /nextlink >}}
    {{< nextlink href="monitors/types/cloud_network_monitoring/#common-monitors" >}}<u>一般的なモニター</u>: 一般的な CNM モニターを構成します。{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map