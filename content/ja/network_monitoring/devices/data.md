---
title: NDM Data Collected
disable_toc: true
aliases:
    - /network_performance_monitoring/devices/data/
---

## イベント

ネットワークデバイスモニタリングには、イベントは含まれません。

## サービスチェック

{{< get-service-checks-from-git "snmp" >}}

## メトリクス

ネットワークデバイス監視は、`snmp.*` ネームスペースの下に指定されたメトリクスを提出します。収集されるメトリクスは、`[configured profile]` によって決定されます。
必要なメトリクスが以下のリストにない場合は、[グローバル OID リファレンスデータベース][1]から OID とその名前を検索して、プロファイルに追加してください。

{{< get-metrics-from-git "snmp" >}}


[1]: http://oidref.com
