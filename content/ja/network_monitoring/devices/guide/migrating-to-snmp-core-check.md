---
title: Python ベースのチェックから SNMP Core チェック (Go) への移行
kind: ガイド
further_reading:
- link: network_monitoring/devices/setup
  tag: ドキュメント
  text: NDM のセットアップに関する詳細
---

## 概要

Datadog Agent 7.27.0 では、SNMP を使用したデバイスの監視の際、Agent のメモリおよびパフォーマンスの両方を向上できる Go での新しい SNMP チェックバージョンが導入されています。本文書は、この新しいコアチェックへの移行をスムーズに行うためのガイドです。

### Agent v7.27.0 の変更点

- オートディスカバリーが Agent のコアプロセスとなり、`init_config` で `loader:core` を使用してメインの SNMP インテグレーションチェックでロードし、Datadog Agent `datadog.yaml` で構成される必要があります。

- 可読名のみによる MIB への直接参照はサポートされません。すべての OID 参照は、数字によるアドレスで作成され、可読名である必要があります。Datadog がサポートするすべてのプロファイルは更新されていますが、カスタムプロファイルはアップデートする必要があります。移行例を以下に示します。

- Core チェックは、手動でコンパイルする MIB のプロファイルとしての使用をサポートしないため、以下のパラメーターはサポートされません。
  - `mibs_folder`
  - `optimize_mib_memory_usage`
  - `enforce_mib_constraints`
  - `bulk_threshold` - 削除され、他の `GET` 関数に置き換えられました

## 手順

### 非 K8s/DCA 環境

1. 対応する Agent プラットフォーム用に Datadog Agent バージョンを 7.27 以降にアップグレードします。

2. `snmp.d/conf.yaml` で新しいコアチェックを参照するよう SNMP チェックで `init_config` を更新します。

``` yaml
  init_config
      loader: core
```
3. 以下の手順は、オートディスカバリー/サブネットスキャンを使用する場合のみ適用されます。各インスタンス（サブネット）のコンフィギュレーションを、SNMP チェックコンフィギュレーションからメインの Datadog Agent `datadog.yaml` に移動します。

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
listeners:
  - name: snmp
snmp_listener:
  workers: 100              # デバイスの検出に同時に使用されるワーカー数
  discovery_interval: 3600  # 秒数
  configs:
    - network: 1.2.3.4/24   # CIDR 表記。/24 ブロック以下を推奨
      version: 2
      port: 161
      community: ***
    tags:
      - "key1:val1"
      - "key2:val2"
    - network: 2.3.4.5/24
      version: 2
      port: 161
      community: ***
      tags:
      - "key1:val1"
      - "key2:val2"
```

{{% /tab %}}

{{% tab "SNMPv3" %}}

```yaml
listeners:
  - name: snmp
snmp_listener:
  workers: 100              # デバイスの検出に同時に使用されるワーカー数
  discovery_interval: 3600  # 各オートディスカバリー間のインターバル（秒）
  configs:
    - network: 1.2.3.4/24   # CIDR 表記。/24 ブロック以下を推奨
      snmp_version: 3
      user: "user"
      authProtocol: "fakeAuth"
      authKey: "fakeKey"
      privProtocol: "fakeProtocol"
      privKey: "fakePrivKey"
      tags:
        - "key1:val1"
        - "key2:val2"
    - network: 2.3.4.5/24
      version: 3
      snmp_version: 3
      user: "user"
      authProtocol: "fakeAuth"
      authKey: "fakeKey"
      privProtocol: "fakeProtocol"
      privKey: "fakePrivKey"
      tags:
        - "key1:val1"
        - "key2:val2"
```

{{% /tab %}}
{{< /tabs >}}

### DCA 特定の移行

`snmp_listener` で使用される一部のパラメーターが変更されています。たとえば、`network_address` が `network` に、`community_string` が `community` になっています。変更のあったパラメーターの全リストについては、以下をご参照ください。

| インテグレーションコンフィグ (Python & Core) | snmp_listener                                                    |
| ----------------------------------- | -----------------------------------------------------------------|
| `community_string`                  | `community`                                                      |
| `network_address`                   | `network`                                                        |
| `authKey`                           | `authentication_key`                                             |
| `authProtocol`                      | `authentication_protocol`                                        |
| `privKey`                           | `privacy_key`                                                    |
| `privProtocol`                      | `privacy_protocol`                                               |
| `snmp_version`                      | `version`                                                        |
| `discovery_allowed_failures`        | `allowed_failures`, top config: `snmp_listener.allowed_failures` |

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
  -MIB: HOST-RESOURCES-MIB
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
  -MIB: HOST-RESOURCES-MIB
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
