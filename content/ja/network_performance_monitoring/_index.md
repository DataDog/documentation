---
title: ネットワークパフォーマンスのモニタリング
kind: documentation
description: インフラストラクチャー上のポイントツーポイントコミュニケーションのメトリクスを調べます。
aliases:
  - /ja/monitors/network_flow_monitors/
  - /ja/graphing/infrastructure/network_performance_monitor/
further_reading:
  - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
    tag: ブログ
    text: ネットワークパフォーマンスのモニタリング
  - link: 'https://www.datadoghq.com/blog/npm-windows-support/'
    tag: ブログ
    text: ネットワークパフォーマンスモニタリングで Windows ホストを監視する
  - link: /network_performance_monitoring/devices
    tag: Documentation
    text: ネットワークデバイスモニタリング
---
## 概要

{{< img src="network_performance_monitoring/network_page/npm_cover.png" alt="メインページ" >}}

Datadog ネットワークパフォーマンスモニタリング (NPM) は Datadog のサービス、コンテナ、アベイラビリティーゾーン、およびその他のタグまで、ネットワークトラフィックを可視化するように設計されています。IP、ポート、PID レベルの接続データは有意義な_ソース_と_宛先_エンドポイント間のアプリケーションレイヤーの依存関係に集約され、カスタマイズ可能な[ネットワークページ][1]と[ネットワークマップ][2]経由で分析および可視化することができます。フローデータと主要なネットワークトラフィック、および DNS サーバーのメトリクスを使用すると以下のことが行えます。

* 予期しない、または潜在的なサービスの依存関係を特定
* クロスリージョンやマルチクラウドなど、高コストの通信を最適化
* クラウドプロバイダーのリージョンやサードパーティーツールの機能停止を特定
* クライアントおよびサーバーサイドにおける、DNS サーバーに関する問題のトラブルシューティング

{{< whatsnext desc="このセクションには、次のトピックが含まれています。">}}
    {{< nextlink href="network_performance_monitoring/installation" >}}<u>インストール</u>: ネットワークデータを収集するように Agent を構成します。{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/network_page" >}}<u>ネットワークページ</u>: 利用可能な各送信元と宛先間のネットワークデータをグラフ化します。{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/network_map" >}}<u>ネットワークマップ</u>: タグ間でネットワークデータをマッピングします。{{< /nextlink >}}
 {{< nextlink href="network_performance_monitoring/dns_monitoring" >}}<u>DNS モニタリング</u>: DNS サーバーに関する問題を診断およびデバッグします。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map