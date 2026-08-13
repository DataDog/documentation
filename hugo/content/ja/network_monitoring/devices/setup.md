---
aliases:
- /ja/network_monitoring/devices/getting_started/
description: ルーター、スイッチ、サーバー、ファイアウォールなど、ネットワーク接続デバイスについて説明します。
further_reading:
- link: /network_monitoring/devices/supported_devices
  tag: ドキュメント
  text: サポートされている NDM デバイス
- link: network_monitoring/devices/data/
  tag: ドキュメント
  text: 収集済みの NDM データ
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: ブログ
  text: SNMP トラップによるネットワークパフォーマンスの問題の監視と診断
title: セットアップ
---
## 概要 {#overview}

Network Device Monitoring は、オンプレミスのルーター、スイッチ、ファイアウォールの健全性とパフォーマンスに関する洞察を得るのに役立ちます。ネットワークにアクセスできるホストに Datadog Agent をインストールすると、自動的にネットワークデバイスが検出され、すぐにメトリクスの収集が始まります。

このガイドでは、ホストでの Network Device Monitoring の構成、デバイスタグの拡張、デバイスプロファイルの設定と表示、NetFlow Monitoring でのデータの表示、用意されているダッシュボードおよびデバイストポロジーマップでのデータの検証について説明します。

{{< img src="network_device_monitoring/getting_started/ndm_landing_page_2.png" alt="Network Device Monitoring のランディングページ。グラフとインターフェイスが表示されています。" style="width:100%;" >}}

## 仕組み {#how-it-works}

次の図は、Syslog、SNMP トラップ、NetFlow 情報の間のデータの流れを示しています。デバイスは、図に示されたポートを介して Datadog Agent に関連情報を送信します (ポートは Agent の構成で必要に応じて変更可能です)。API ベースのインテグレーションの場合、Datadog Agent は、ベンダーごとの固有の `https` API インテグレーションの手順に基づいて、オンプレミスまたはクラウド上のネットワークデバイスベンダーのソフトウェアコントローラーまたはマネージャーに接続します。Datadog Agent は、NDM で構成されてオンプレミスまたはクラウドにデプロイされると、ネットワークから収集したすべてのデバイスおよびネットワークのデータを統合し、ポート `443` から HTTPS 経由で Datadog に送信します。これにより、メトリクス、ログ、トレース、モニター、ダッシュボードの統一されたフルスタックの可観測性が提供されます。

  {{< img src="network_device_monitoring/getting_started/syslog_trap_netflow.png" alt="NDM における Syslog、トラップ、NetFlow 収集の流れを示す図。" style="width:90%;" >}}

## 次のステップ {#next-steps}

次の手順に従って、ネットワークデバイスを監視するように Datadog を構成します。

## 前提条件 {#prerequisites}

### Agent をインストールする {#install-the-agent}

[Agent のインストールページ][1]に移動し、ホスト (通常は**監視対象デバイスではない**サーバー) に [Datadog Agent][2] をインストールします。</br>

{{< img src="network_device_monitoring/getting_started/ndm_install_agent.png" alt="Agent の構成ページ。Ubuntu インストールが強調表示されています。" style="width:100%;" >}}

## セットアップ {#setup}

### 高可用性 {#high-availability}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger"> Datadog Agent の高可用性サポートは、選択された <a href="/getting_started/site">Datadog サイト</a>({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

Network Device Monitoring における Datadog Agent の高可用性 (HA) サポートにより、アクティブな Agent とスタンバイの Agent を指定し、アクティブな Agent に問題が発生した場合の自動フェイルオーバーが可能です。この設定により、Datadog Agent が単一障害点でなくなり、予期しないインシデントや計画的なメンテナンス (OS のアップデートや Agent のアップグレードなど) の間も監視が継続されます。

NDM でアクティブな Agent とスタンバイの Agent を HA ペアとして機能するように構成できます。アクティブな Agent がダウンした場合、スタンバイの Agent が 90 秒以内に引き継ぎ、新しいアクティブな Agent になります。さらに、特定の Agent がアクティブな Agent として再び利用できるようになったら自動的に戻るように、優先する Agent を指定することもできます。この機能により、予定されたメンテナンスの前に Agent をプロアクティブに切り替えることが可能です。

詳細については、[Datadog Agent の高可用性サポート][20]を参照してください。

### 構成 {#configuration}

ネットワークデバイスの監視を開始するには、次のいずれかの方法で SNMP 監視を有効にします。

[個々のデバイス][3]
: 個々のデバイスで SNMP 監視を構成します。

[Autodiscovery][4]
: Autodiscovery を使用して SNMP 監視を構成します。

[Ping][5]
: デバイスに ICMP ping を送信するように SNMP チェックを構成します。

[Syslog][22]
: Syslog メッセージを送信するようにデバイスを構成します。

[VPN 監視][21]
: デバイスの VPN トンネルの監視を開始するように VPN 監視を構成します。

### ネットワークデバイスをタグで拡張する {#enrich-network-devices-with-tags}

デバイスでの NDM の構成後、次の方法でネットワークデバイスタグを追加してさらに拡張できます。

[Datadog Agent][2]
: Datadog Agent は、[個々のデバイス][3]を構成する際や [Autodiscovery][4] を使用する際にデバイスのタグを収集できます。

[デバイスプロファイル][6]
: アプリ内でデバイスプロファイルを直接作成することにより、特定のメトリクスとタグを収集およびカスタマイズするように Agentを構成します。

[ServiceNow インテグレーション][7]
: ServiceNow の CMDB (構成管理データベース) で定義されたデータを使用して、Datadog Network Device Monitoring で監視されるネットワークデバイスを動的に拡張します。

[Network Device Monitoring API](#use-the-network-api)
: Network Device Monitoring API を利用して、ネットワークデバイスにプログラムでタグを追加します。

### メトリクスとタグをカスタマイズする {#customize-metrics-and-tags}

[サポートされるデバイス][9]ページですぐに使えるデバイスプロファイルを確認して、デバイスのメトリクスとタグをカスタマイズします。メトリクスを編集または追加する場合は、次のオプションを利用できます。

[デバイスプロファイル][10]
: デバイスプロファイルを使用して、Datadog Agent の `yaml` ファイルでメトリクスとタグを直接編集します。

[GUI ベースのプロファイル作成][6]
: デバイスにカスタムのメトリクスとタグを追加できる Datadog Network Monitoring の GUI ベースのデバイスオンボーディングエクスペリエンスを利用します。

### NetFlow Monitoring {#netflow-monitoring}

NetFlow 対応デバイスからのフローレコードを視覚化して監視するように [NetFlow Monitoring][11]を構成します。

{{< img src="network_device_monitoring/netflow/home.png" alt="上位のソース、宛先、プロトコル、ソースポート、宛先ポート、デバイストレンドのタブを含む NetFlow Monitoring ページ" style="width:100%;" >}}

## データを検証する {#validate-your-data}

- [ネットワークデバイス][12]ページで、ネットワークインフラストラクチャー全体の監視を開始します。
- Datadog のすぐに使えるダッシュボードで収集されたメトリクスを表示します。
  - [監視対象のデバイス一覧][13]
  - [ネットワークデバイスのインターフェイスのパフォーマンス][14]
- bネットワークの[デバイストポロジーマップ][15]を使用して、デバイスの問題を特定してトラブルシューティングします。

## Network API を使用する {#use-the-network-api}

- [Network API][8] を使用して、ネットワークデバイスに関する次の情報を抽出します。
  * [デバイスのインターフェイスのリストを取得する。][16]
  - [デバイスのラグのリストを取得する。][17]
  - [デバイスのタグのリストを更新する。][18]

## トラブルシューティング {#troubleshooting}

- NDM の問題のトラブルシューティングに関する詳細については、ネットワークデバイスの[トラブルシューティング][19]のページを参照してください。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/agent
[3]: /ja/network_monitoring/devices/snmp_metrics/?tab=snmpv2#monitoring-individual-devices
[4]: /ja/network_monitoring/devices/snmp_metrics/#autodiscovery
[5]: /ja/network_monitoring/devices/ping
[6]: /ja/network_monitoring/devices/guide/device_profiles/
[7]: https://docs.datadoghq.com/ja/integrations/servicenow/#network-device-tagging
[8]: /ja/api/latest/network-device-monitoring/
[9]: /ja/network_monitoring/devices/supported_devices
[10]: /ja/network_monitoring/devices/profiles
[11]: /ja/network_monitoring/netflow/
[12]: https://app.datadoghq.com/devices
[13]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[14]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[15]: /ja/network_monitoring/devices/device_topology_map
[16]: /ja/api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[17]: /ja/api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[18]: /ja/api/latest/network-device-monitoring/#update-the-tags-for-a-device
[19]: /ja/network_monitoring/devices/troubleshooting
[20]: /ja/integrations/guide/high_availability
[21]: /ja/network_monitoring/devices/vpn_monitoring
[22]: /ja/network_monitoring/devices/syslog