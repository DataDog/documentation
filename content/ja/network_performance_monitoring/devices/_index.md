---
title: ネットワークデバイスモニタリング
kind: ドキュメント
disable_sidebar: true
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-snmp-with-datadog/'
    tag: ブログ
    text: Datadog での SNMP モニタリング
  - link: 'https://www.datadoghq.com/blog/monitor-meraki/'
    tag: ブログ
    text: Datadog で Cisco Meraki を監視する
---
## 概要

Datadog ネットワークデバイスモニタリングは、SNMP プロトコルを使用して、ルーター、スイッチ、サーバー、ファイアウォールなどのネットワーク接続デバイスを可視化するように設計されています。

任意のネットワーク上のデバイスを自動的に検出し、帯域幅使用率、スループット、デバイスのアップ/ダウンなどのメトリクスを収集するように Datadog Agent を構成します。Datadog [ダッシュボード][1]でメトリクスをグラフ化するか、[モニター][2]を作成して、問題が発生したときにアラートを送信します。

{{< img src="network_performance_monitoring/devices/snmp_dashboard.png" alt="SNMP 汎用ダッシュボード" responsive="true" style="width:100%;">}}

{{< whatsnext desc="このセクションには、次のトピックが含まれています。">}}
    {{< nextlink href="network_performance_monitoring/devices/setup" >}}<u>セットアップ</u>: ネットワークデバイスデータを収集するように Agent を構成します。{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/devices/profiles" >}}<u>プロファイル</u>: デバイスで使用するプロファイルを設定します。{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/devices/data" >}}<u>データ収集</u>: 収集されたメトリクス、イベント、サービスチェックを表示します。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards
[2]: /ja/monitors/monitor_types
