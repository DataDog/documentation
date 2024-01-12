---
aliases:
- /ja/network_device_monitoring/devices/
description: ルーター、スイッチ、サーバー、ファイアウォールなどのネットワーク接続デバイスを可視化。
disable_sidebar: true
further_reading:
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: ナレッジセンター
  text: SNMP モニタリングの概要
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: ブログ
  text: Datadog での SNMP モニタリング
- link: https://www.datadoghq.com/blog/monitor-meraki/
  tag: ブログ
  text: Datadog で Cisco Meraki を監視する
- link: https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/
  tag: ブログ
  text: Datadog でデータセンターおよびネットワークデバイスを監視
- link: https://www.datadoghq.com/blog/network-device-monitoring/
  tag: ブログ
  text: ネットワークデバイスモニタリングの紹介
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: ブログ
  text: SNMP トラップによるネットワークパフォーマンスの問題の監視と診断
kind: documentation
title: ネットワークデバイスモニタリング
---

## 概要

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/673243317/rendition/1080p/file.mp4?loc=external&signature=cadf7020caa33b97a62ecb01216b83e5d04b35a4ca3a1b8b0a22323b9e79d0c3" poster="/images/poster/ndm.png" >}}

<br/>

ネットワークデバイスモニタリングは、ルーター、スイッチ、ファイアウォールなどのオンプレミスおよびバーチャルのネットワークデバイスを可視化します。任意のネットワーク上のデバイスを自動的に検出し、帯域幅使用率、送信されたバイト数、デバイスのアップ/ダウンなどのメトリクスを迅速に収集します。

## はじめに

1. Datadog Agent をインストールします (通常、監視対象デバイスではないサーバーにインストールします)。
2. [個々のデバイスの監視][1]または[デバイスのオートディスカバリー][2]のいずれかで、SNMP インテグレーションを構成します。
3. ネットワークデバイスの探索ページで、ネットワークインフラストラクチャー全体の監視を開始します。
4. Datadog のすぐに使えるダッシュボードで収集されたメトリクスを表示します。
    - [監視対象のデバイス一覧][3]
    - [すべてのインターフェイスのパフォーマンス全体][4]
5. [SNMP メトリクス][5]の積極的な監視で問題が発生する前に把握します。

## サポートされるデバイス

### 一般的なプロファイル

一般的なプロファイルはベンダープロファイルでサポートされないデバイスのメトリクスを収集します。メトリクスには、TCP、UDP、IP の他、帯域幅使用率や送受信量などのインターフェイスメトリクスが含まれます。

### ベンダープロファイル

以下のベンダーのデバイスは、専用のプロファイルでサポートされます。ベンダー/デバイスの種類がサポートされながら、特定のモデルがサポートされていない場合は、[よくあるご質問][6]を参照してください。

-   Cisco Catalyst
-   Cisco ASA
-   Cisco CSR 1000v
-   Cisco ISR 4431
-   Cisco Nexus
-   Cisco ICM
-   Cisco UC Virtual Machines
-   Arista
-   Aruba
-   Checkpoint Firewall
-   Chatsworth PDU
-   APC UPS
-   F5 Big IP
-   Fortinet FortiGate
-   HP iLO
-   HP Proliant
-   Dell iDRAC
-   EMC Isilon
-   Juniper EX シリーズ
-   Juniper MX シリーズ
-   Juniper SRX
-   Meraki Cloud
-   Meraki On-Prem
-   NetApp
-   Palo Alto

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/devices/snmp_metrics/#monitoring-individual-devices
[2]: /ja/network_monitoring/devices/snmp_metrics/#autodiscovery
[3]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[4]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[5]: /ja/monitors/types/metric/
[6]: /ja/network_monitoring/devices/troubleshooting#what-do-i-do-if-datadog-supports-a-vendor-or-device-type-but-my-specific-model-isnt-supported
