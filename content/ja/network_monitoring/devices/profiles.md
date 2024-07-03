---
aliases:
- /ja/network_performance_monitoring/devices/profiles/
further_reading:
- link: /network_monitoring/devices/data
  tag: Documentation
  text: Data Collected with Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Monitor SNMP with Datadog
title: NDM Profiles
---

## 概要

Network Device Monitoring uses profiles to tell the Datadog Agent the metrics and associated tags to collect. A profile is a collection of OIDs associated with a device. 

## 構成

デフォルトでは、Agent コンフィギュレーションディレクトリ内のすべてのプロファイルがロードされます。コレクションの特定のプロファイルをカスタマイズするには、`definition_file` でファイル名別に明示的に参照するか、`definition` でインラインリストを指定します。Datadog プロファイルはいずれも名前別にリストできます。追加のカスタムプロファイルは、コンフィギュレーション内でファイルパスで参照するか、コンフィギュレーションディレクトリに配置できます。

**Note**: The generic profile is [generic-device.yaml][1], which supports routers, switches, and other devices.

<div class="alert alert-info">
If you would like to build a device profile using the GUI based experience, review the <a href="/network_monitoring/devices/guide/device_profiles/">Getting Started with Device Profiles</a> documentation.
</div>

### sysOID マップデバイス

プロファイルを使用すると、Network Device Monitoring は、複数のデバイスタイプまたはインスタンスにわたってメトリクス定義を再利用できます。プロファイルは、収集するメトリクスと、それらを Datadog メトリクスに変換する方法を定義します。各プロファイルは、同じベンダーの同種のデバイスを監視することを想定しています。プロファイルは、Datadog Agent がネットワークデバイスの sysObjectIds をプロファイルファイルに定義されたものと比較することで自動的に使用されます。

Datadog Agent は、すぐに使えるプロファイルを `conf.d/snmp.d/default_profiles` ディレクトリに提供します。このディレクトリは、Agent のアップグレード時にクリーンアップされ、リセットされますので、そこに何も保存しないでください。`conf.d/snmp.d/profiles` ディレクトリにファイルを置くことで、独自のカスタムプロファイルを作成したり、既存のプロファイルを拡張したりすることができます。

次のプロファイルの例は、`sysobjectid` が `1.3.6.1.4.1.232.9.4.10` であるか、`1.3.6.1.4.1.232.9.4.2.` で始まるネットワークデバイスで使用されます。

```yaml
sysobjectid:
 - 1.3.6.1.4.1.232.9.4.10
 - 1.3.6.1.4.1.232.9.4.2.*

metrics:
  - MIB: CPQHLTH-MIB
    symbol:
      OID: 1.3.6.1.4.1.232.6.2.8.1.0
      name: cpqHeSysUtilLifeTime
```

同じ `sysobjectid` を共有するネットワークデバイスに対して異なるメトリクスが必要な場合は、`sysobjectid` なしでプロファイルを記述し、SNMP 構成で `profile` オプションを構成できます。

```yaml
instances:
   - ip_address: 192.168.34.10
     profile: my-profile1
   - ip_address: 192.168.34.11
     profile: my-profile2
   - ip_address: 192.168.34.13
     # このデバイスの場合、Agent はデバイスの sysObjectID を取得し、最も近いものを使用します
```

### プロファイルによるメトリクス定義

プロファイルは互いに交換して使用できます。つまり、MIB 依存関係を共有するデバイスは同じプロファイルを再利用できます。たとえば、[Cisco c3850 のプロファイル][2]は多くの Cisco スイッチで使用できます。

Datadog が提供するプロファイルの詳細については、[GitHub リポジトリ][3]を参照してください。

### プロファイルによるメタデータ定義

プロファイルのメタデータセクションで、メタデータを収集する場所と方法を定義できます。値は、静的または OID 値に由来します。
サポートされているフィールドについては、[DeviceMetadata][4] セクションを参照してください。 

Datadog Agent バージョン 7.52 以降では、デバイスメタデータ用に `device_type` フィールドがあります。これはプロファイルで手動で設定でき、特定のタイプのデバイスをフィルタリングするために使用できます。設定可能な値は以下の通りです。

- access_point
- firewall
- load_balancer
- pdu
- printer
- router
- sd-wan
- sensor
- サーバー
- storage
- switch
- ups
- wlc

プロファイルフォーマットの詳細については、[プロファイルフォーマットリファレンス][5]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/generic-device.yaml
[2]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-3850.yaml
[3]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/default_profiles
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/networkdevice/metadata/payload.go#L51-L76
[5]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
[6]: https://app.datadoghq.com/devices/
[7]: /ja/network_monitoring/devices/guide/device_profiles/