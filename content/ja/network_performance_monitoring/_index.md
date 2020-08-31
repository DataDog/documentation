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
  - link: /integrations/snmp/
    tag: ドキュメント
    text: SNMP インテグレーション
---
## 概要

Datadog Network Performance Monitoring (NPM) は、コンテナからホスト、サービス、およびアベイラビリティーゾーンまで、Datadog のタグ付きオブジェクト全体のネットワークトラフィックを可視化するように設計されています。接続データはフローに集約され、それぞれがカスタマイズ可能な[ネットワークページ][1]および[ネットワークマップ][2]を介して、1 つの_送信元_と 1 つの_宛先_の間のトラフィックを示します。
各フローには、スループット、帯域幅、再送信数、および IP、ポート、PID レベルまでの送信元/宛先情報などのネットワークメトリクスが含まれます。

{{< whatsnext desc="このセクションには、次のトピックが含まれています。">}}
    {{< nextlink href="network_performance_monitoring/installation" >}}<u>インストール</u>: ネットワークデータを収集するように Agent を構成します。{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/network_page" >}}<u>ネットワークページ</u>: 利用可能な各送信元と宛先間のネットワークデータをグラフ化します。{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/network_map" >}}<u>ネットワークマップ</u>: タグ間でネットワークデータをマッピングします。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map