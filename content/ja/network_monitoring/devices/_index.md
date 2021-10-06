---
title: ネットワークデバイスモニタリング
kind: documentation
disable_sidebar: true
description: ルーター、スイッチ、サーバー、ファイアウォールなどのネットワーク接続デバイスを可視化。
aliases:
  - /ja/network_performance_monitoring/devices/
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-snmp-with-datadog/'
    tag: ブログ
    text: Datadog での SNMP モニタリング
  - link: 'https://www.datadoghq.com/blog/monitor-meraki/'
    tag: ブログ
    text: Datadog で Cisco Meraki を監視する
  - link: 'https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/'
    tag: ブログ
    text: Datadog でデータセンターおよびネットワークデバイスを監視
---
## 概要

{{< img src="network_performance_monitoring/devices/datacenter_dashboard.jpg" alt="データセンター概要ダッシュボード" responsive="true" style="width:100%;">}}

ネットワークデバイスモニタリングは、ルーター、スイッチ、ファイアウォールなどのオンプレミスおよびバーチャルのネットワークデバイスを可視化するように設計されています。任意のネットワーク上のデバイスを自動的に検出し、帯域幅使用率、送信されたバイト数、デバイスのアップ/ダウンなどのメトリクスを迅速に収集します。

## はじめに

1. Datadog Agent をインストールします。
2. [個々のデバイスの監視][1]または[デバイスのオートディスカバリー][2]のいずれかで、SNMP インテグレーションを構成します。
3. Datadog のすぐに使えるダッシュボードで収集されたメトリクスを表示します。
    - [監視対象のデバイス一覧][3]
    - [すべてのインターフェイスのパフォーマンス全体][4]
4. [SNMP メトリクス][5]の積極的な監視で問題が発生する前に把握します。

## サポートされるデバイス

### 一般的なプロファイル

一般的なプロファイルはベンダープロファイルでサポートされないデバイスのメトリクスを収集します。メトリクスには、TCP、UDP、IP の他、帯域幅使用率や送受信量などのインターフェイスメトリクスが含まれます。

### ベンダープロファイル

以下のベンダーのデバイスは、専用のプロファイルでサポートされます。ベンダー/デバイスの種類がサポートされながら、特定のモデルがサポートされていない場合は、[よくあるご質問][6]を参照してください。

- Cisco Catalyst
- Cisco ASA
- Cisco CSR 1000v
- Cisco ISR 4431
- Cisco Nexus
- Cisco ICM
- Cisco UC Virtual Machines 
- Arista
- Aruba
- Checkpoint Firewall
- Chatsworth PDU
- APC UPS
- F5 Big IP
- Fortinet FortiGate 
- HP iLO
- HP Proliant
- Dell iDRAC
- EMC Isilon
- Juniper EX シリーズ
- Juniper MX シリーズ
- Juniper SRX
- Meraki Cloud
- Meraki On-Prem
- NetApp
- Palo Alto


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/devices/setup/#monitoring-individual-devices
[2]: /ja/network_monitoring/devices/setup/#autodiscovery
[3]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[4]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[5]: /ja/monitors/monitor_types/metric/
[6]: /ja/network_monitoring/devices/troubleshooting#what-do-i-do-if-datadog-supports-a-vendor-or-device-type-but-my-specific-model-isnt-supported