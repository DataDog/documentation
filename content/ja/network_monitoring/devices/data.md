---
title: 収集対象の NDM データ
kind: documentation
aliases:
  - /ja/network_performance_monitoring/devices/data/
---
## メトリクス

ネットワークデバイスモニタリングは指定されたメトリクスを `snmp.*` ネームスペース下に送信します。収集対象のメトリクスは`[構成されたプロファイル]`により決まります。

{{< get-metrics-from-git "snmp" >}}

## イベント

ネットワークデバイスモニタリングには、イベントは含まれません。

## サービスチェック

{{< get-service-checks-from-git "snmp" >}}