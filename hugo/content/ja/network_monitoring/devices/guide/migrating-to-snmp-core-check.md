---
further_reading:
- link: network_monitoring/devices/setup
  tag: ドキュメント
  text: NDM のセットアップに関する詳細
title: Python ベースのチェックから SNMP Core チェック (Go) への移行
---

## 概要

Datadog Agent 7.27.0 では、SNMP を使用したデバイスの監視の際、Agent のメモリおよびパフォーマンスの両方を向上できる Go での新しい SNMP チェックバージョンが導入されています。本文書は、この新しいコアチェックへの移行をスムーズに行うためのガイドです。

### Agent v7.27.0 の変更点

- オートディスカバリーが Agent のコアプロセスとなり、`init_config` で `loader:core` を使用してメインの SNMP インテグレーションチェックでロードし、Datadog Agent `datadog.yaml` で構成される必要があります。

- Direct reference to MIBs by their human readable names only are no longer supported. Instead, all OID references should be made by their numerical address, and human readable name. All Datadog shipped profiles have been updated, but custom profiles will need to be updated. Examples for migration are provided below.

- Core チェックは、手動でコンパイルする MIB のプロファイルとしての使用をサポートしないため、以下のパラメーターはサポートされません。
  - `mibs_folder`
  - `optimize_mib_memory_usage`
  - `enforce_mib_constraints`
  - `bulk_threshold` - 削除され、他の `GET` 関数に置き換えられました

## 手順

1. 対応する Agent プラットフォーム用に Datadog Agent バージョンを 7.27 以降にアップグレードします。

2. Update the `init_config` in the SNMP check to reference the new core check in `snmp.d/conf.yaml`.

``` yaml
  init_config:
      loader: core
```
3. 以下の手順は、オートディスカバリー/サブネットスキャンを使用する場合のみ適用されます。各インスタンス（サブネット）のコンフィギュレーションを、SNMP チェックコンフィギュレーションからメインの Datadog Agent `datadog.yaml` に移動します。

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
network_devices:
  autodiscovery:
    workers: 100  # デバイスの発見に同時に使用されるワーカー数
    discovery_interval: 3600  # 各オートディスカバリーの間隔 (秒)
    loader: core  # SNMP インテグレーションのコアチェック実装を使用します。推奨
    use_device_id_as_hostname: true  # 推奨
    configs:
      - network_address: 10.10.0.0/24  # CIDR サブネット
        snmp_version: 2
        port: 161
        community_string: '***'  # 一重引用符で囲みます
        tags:
        - "key1:val1"
        - "key2:val2"
      - network_address: 10.20.0.0/24
        snmp_version: 2
        port: 161
        community_string: '***'
        tags:
        - "key1:val1"
        - "key2:val2"
```

{{% /tab %}}

{{% tab "SNMPv3" %}}

```yaml
network_devices:
  autodiscovery:
    workers: 100  # デバイスの発見に同時に使用されるワーカー数
    discovery_interval: 3600  # 各オートディスカバリーの間隔 (秒)
    loader: core  # SNMP インテグレーションのコアチェック実装を使用します。推奨
    use_device_id_as_hostname: true  # 推奨
    configs:
      - network_address: 10.10.0.0/24  # CIDR サブネット
        snmp_version: 3
        user: 'user'
        authProtocol: 'SHA256'  # 選択肢: MD5, SHA, SHA224, SHA256, SHA384, SHA512
        authKey: 'fakeKey'  # 一重引用符で囲みます
        privProtocol: 'AES256'  # 選択肢: DES, AES (128 bits), AES192, AES192C, AES256, AES256C
        privKey: 'fakePrivKey'  # 一重引用符で囲みます
        tags:
          - 'key1:val1'
          - 'key2:val2'
      - network_address: 10.20.0.0/24
        snmp_version: 3
        user: 'user'
        authProtocol: 'SHA256'
        authKey: 'fakeKey'
        privProtocol: 'AES256'
        privKey: 'fakePrivKey'
        tags:
          - 'key1:val1'
          - 'key2:val2'
```

{{% /tab %}}
{{< /tabs >}}

**注**: この構文を使用するには、Agent 7.53 以降を使用していることを確認してください。以前のバージョンについては、[以前の config_template.yaml][1] を参照してください。

### カスタムプロファイルの移行（デプロイ以外）

可読名のみによる OID リストはサポートされません。アドレス（テーブル名およびインデックス）または MIB エントリアドレスにより参照できます。自身で書き込んだプロファイルがあるまたは既存のプロファイルを変更した場合は、新しいフォーマットに移行します。移行例を以下に示します。

#### スカラーシンボル

**Agent 7.27.0 以前:**

{{< code-block lang="yaml" filename="scalar_symbols.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    symbol: hrSystemUptime
{{< /code-block >}}

**Agent 7.27.0 の場合:**

{{< code-block lang="yaml" filename="scalar_symbols_7_27.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    symbol:
      OID: 1.3.6.1.2.1.25.1.1.0
      name: hrSystemUptime
{{< /code-block >}}

#### テーブルシンボル

**Agent 7.27.0 以前:**

{{< code-block lang="yaml" filename="table_symbols.yaml" >}}

metrics:
  - MIB: HOST-RESOURCES-MIB
    table: hrStorageTable
    symbols:
      - hrStorageAllocationUnits
      - hrStoageSize
    metrics_tags:
      - tag: storagedec
        column: hrStorageDescr

{{< /code-block >}}


**Agent 7.27.0 の場合:**

{{< code-block lang="yaml" filename="table_symbols_7_27.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    table:
      OID: 1.3.6.1.2.1.25.2.3
      name: hrStorageTable
    symbols:
      - OID: 1.3.6.1.2.1.25.2.3.1.4
        name: hrStorageAllocationUnits
      - OID: 1.3.6.1.2.1.25.2.3.1.5
        name: hrStoageSize
    metrics_tags:
      - tag: storagedec
        column:
          OID: 1.3.6.1.2.1.25.2.3.1.3
          name: hrStorageDescr
{{< /code-block >}}


#### メトリクスタグ

**Agent 7.27.0 以前:**

{{< code-block lang="yaml" filename="metrics_tags.yaml" >}}
metrics_tags:
  - symbol: sysName
    tag: snmp_host
{{< /code-block >}}

**Agent 7.27.0 の場合:**

{{< code-block lang="yaml" filename="metrics_tags_7_27.yaml" >}}
metrics_tags:
  - OID: 1.3.6.1.2.1.1.5.0
    symbol: sysName
    tag: snmp_host
{{< /code-block >}}

[1]: https://github.com/DataDog/datadog-agent/blob/51dd4482466cc052d301666628b7c8f97a07662b/pkg/config/config_template.yaml#L855