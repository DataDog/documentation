---
aliases:
- /ja/network_performance_monitoring/devices/profiles/
further_reading:
- link: /network_monitoring/devices/data
  tag: Documentation
  text: ネットワークデバイスモニタリングで収集されるデータ
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: ブログ
  text: Datadog での SNMP モニタリング
title: NDM プロファイル
---

## 概要

ネットワークデバイスモニタリングはプロファイルを使用して、収集するメトリクスと関連タグを Datadog Agent に通知します。プロファイルは、デバイスに関連付けられた OID のコレクションです。

## コンフィギュレーション

デフォルトでは、Agent コンフィギュレーションディレクトリ内のすべてのプロファイルがロードされます。コレクションの特定のプロファイルをカスタマイズするには、`definition_file` でファイル名別に明示的に参照するか、`definition` でインラインリストを指定します。Datadog プロファイルはいずれも名前別にリストできます。追加のカスタムプロファイルは、コンフィギュレーション内でファイルパスで参照するか、コンフィギュレーションディレクトリに配置できます。

**注**: 一般的なプロファイルは [generic-device.yaml][1] で、ルーターやスイッチなどをサポートしています。

### sysOID マップデバイス

プロファイルを使用すると、ネットワークデバイスモニタリングで複数のデバイスタイプまたはインスタンスでメトリクス定義を再利用できます。プロファイルは、構成ファイル内のインラインまたは別のファイルで、メトリクスをインスタンスと同様に定義します。各インスタンスは、ただ 1 つのプロファイルに対応します。たとえば、次のように `init_config` セクションでプロファイルを定義できます。

```yaml
init_config:
  profiles:
    my-profile:
      definition:
        - MIB: IP-MIB
          table: ipSystemStatsTable
          symbols:
            - ipSystemStatsInReceives
          metric_tags:
            - tag: ipversion
          index: 1
      sysobjectid: '1.3.6.1.4.1.8072.3.2.10'
```

次に、名前を明示してそれを参照するか、sysObjectID 検出を使用します。

```yaml
instances:
   - ip_address: 192.168.34.10
     profile: my-profile
   - ip_address: 192.168.34.11
     # その他は必要ありません。チェックは sysObjectID を問い合わせて、
     # 一致した場合はそのプロファイルを使用します。
```

必要な場合は、インスタンスで追加メトリクスを定義できます。これらのメトリクスは、プロファイル内のメトリクスに加えて収集されます。

### プロファイルによるメトリクス定義

プロファイルは互いに交換して使用できます。つまり、MIB 依存関係を共有するデバイスは同じプロファイルを再利用できます。たとえば、[Cisco c3850 のプロファイル][2]は多くの Cisco スイッチで使用できます。

Datadog が提供するプロファイルの詳細については、[GitHub リポジトリ][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/generic-device.yaml
[2]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-3850.yaml
[3]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/default_profiles