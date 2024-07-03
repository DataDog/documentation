---
aliases:
- /ja/network_performance_monitoring/devices/guide/tags-with-regex/
further_reading:
- link: /network_monitoring/devices/snmp_metrics
  tag: Documentation
  text: Network Device Monitoring SNMP Metrics
- link: /getting_started/tagging
  tag: Documentation
  text: Getting Started with Tags
title: NDM Tags with Regex
---

Datadog ネットワークデバイスモニタリング (NDM) は、正規表現に対応し `<KEY>:<VALUE>` の形式でメトリクスタグを作成します。

## セットアップ

### インストール

Follow the [setup instructions][1] to install Datadog Network Device Monitoring, and start collecting SNMP Metrics and Traps.

### 構成

[SNMP conf.yaml][2] で、OID から `metric_tags` を指定します。デバイスに対し複数のタグを作成するには、正規表現を使用して結果の値を複数のタグに分けるか、正規表現の [Python エンジン][3]を使用して部分文字列を取得します。

#### OID

以下の例では、OID の値に一致する正規表現を使用して 2 つのタグを作成しています。OID の値が `41ba948911b9` の場合、対応するメトリクスにタグ `host_prefix:41` と `host:ba948911b9` が追加されます。

```yaml
    metric_tags:
     - # OID より:
       symbol:
          OID: 1.3.6.1.2.1.1.5.0
          name: sysName
       match: (\d\d)(.*)
       tags:
           host_prefix: \1
           host: \2
```

以下の例では、正規表現を使用してテーブルにタグを作成します。

```yaml
metrics:
  - MIB: IF-MIB
    table:
      OID: 1.3.6.1.2.1.2.2
      name: ifTable
    symbols:
      - OID: 1.3.6.1.2.1.2.2.1.10
        name: ifInOctets
    metric_tags:
      - column':
          OID: 1.3.6.1.2.1.2.2.1.2
          name: ifDescr
        match: '(\w)(\w+)'
        tags:
         - prefix: '\1'
         - suffix: '\2'
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/network_monitoring/devices/snmp_metrics
[2]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[3]: https://docs.python.org/3/library/re.html