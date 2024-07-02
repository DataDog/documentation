---
title: SNMP Traps
description: "Enable listening for SNMP Traps."
further_reading:
  - link: "https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/"
    tag: Blog
    text: Monitor and diagnose network performance issues with SNMP Traps
---

## 概要

SNMP トラップとは、SNMP 対応デバイスから SNMP マネージャーに送信される通知です。ネットワークデバイスが、機器の状態が突然変化するなどの異常な動作に遭遇した場合、デバイスは SNMP トラップイベントをトリガーします。

SNMP トラップの監視は、デバイスが不安定なために気付かないかもしれない問題をキャプチャするのに役立ちます。たとえば、インターフェイスが 15 秒ごとに使用可能な状態と使用不可能な状態の間を行き来している場合、60 秒ごとに実行されるポールに依存すると、ネットワークの不安定さの程度を誤って判断してしまう可能性があります。また、トラップは、デバイスのバッテリーやシャーシの健全性など、特定のハードウェアコンポーネントの可視性のギャップを埋めることができます。

Datadog Agent v7.37+ は、SNMP トラップのリッスンをサポートしており、特定のトラップイベントに対する[モニター][1]を設定することが可能です。

## 構成

SNMP トラップのリッスンを有効にするには、`datadog.yaml` に以下を追加します。

```yaml
network_devices:
  namespace: <NAMESPACE> # optional, defaults to "default".
  snmp_traps:
    enabled: true
    port: 9162 # on which ports to listen for traps
    community_strings: # which community strings to allow for v2 traps
      - <STRING_1>
      - <STRING_2>
    bind_host: 0.0.0.0
    users: # SNMP v3
    - user: "user"
      authKey: myAuthKey
      authProtocol: "SHA"
      privKey: myPrivKey
      privProtocol: "AES" # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
    - user: "user"
      authKey: myAuthKey
      authProtocol: "MD5"
      privKey: myPrivKey
      privProtocol: "DES"
    - user: "user2"
      authKey: myAuthKey2
      authProtocol: "SHA"
      privKey: myPrivKey2
      privProtocol: "AES" # choices: DES, AES (128 bits), AES192, AES192C, AES256, AES256C
```

## デバイスのネームスペース

As in [Network Device Monitoring][2], namespaces can be used as tags to differentiate between multiple network devices that may share the same private IP. For example, consider a case of two routers: one in New York and one in Paris, which share the same private IP. There should be one Agent in the New York data center and another in the Paris data center. You may wish to tag these with `namespace: nyc` and `namespace: paris`, respectively.

ネームスペースは、SNMP トラップから送信デバイス、または送信デバイスから SNMP トラップへの一意なピボットとして使用することができます。

複数の Agent 構成間で一貫性を持たせることが重要です。例えば、2 つの Agent を構成している場合 (例えば、1 つはトラップ収集用、もう 1 つはメトリクス用)、ネームスペースが両方の場所に存在することを確認する必要があります。または、ネームスペースがどちらにも存在しないことを確認します。

## 解決

各 SNMP トラップには、特定の OID ベースのフォーマットがあります。Datadog Agent は、OID をより読みやすい文字列に変換するための_解決_ステップを実行します。

SNMP トラップは、以下の要素から構成されます。
- エミッター情報 (デバイスの IP など)
- トラップの種類を定義する OID
- “変数” - つまり、トラップに追加のコンテキストを提供するペア (`OID:value`) のリストです。

デコードは Agent 側で行われ、ディスク上の `{TX-PL-LABEL}lt;PATH_TO_AGENT_CONF.D>/snmp.d/traps_db/dd_traps_db.json.gz` に格納されたマッピングを使用します。Datadog は、11,000 以上の異なる管理情報ベース (MIB) をサポートしています。

### マッピングフォーマット

マッピングは TrapsDB ファイルとして保存され、YAML または JSON を使用することができます。

#### 例

{{< tabs >}}
{{% tab "YAML" %}}
```yaml
mibs:
- NET-SNMP-EXAMPLES-MIB
traps:
  1.3.6.1.4.1.8072.2.3.0.1:
    mib: NET-SNMP-EXAMPLES-MIB
    name: netSnmpExampleHeartbeatNotification
vars:
  1.3.6.1.4.1.8072.2.3.2.1:
    name: netSnmpExampleHeartbeatRate
```
{{% /tab %}}
{{% tab "JSON" %}}
```json
{
  "mibs": [
    "NET-SNMP-EXAMPLES-MIB"
  ],
  "traps": {
    "1.3.6.1.4.1.8072.2.3.0.1": {
      "mib": "NET-SNMP-EXAMPLES-MIB",
      "name": "netSnmpExampleHeartbeatNotification"
    }
  },
  "vars": {
    "1.3.6.1.4.1.8072.2.3.2.1": {
      "name": "netSnmpExampleHeartbeatRate"
    }
  }
}
```
{{% /tab %}}
{{< /tabs >}}

### Agent を拡張する

Agent の機能を拡張するために、独自のマッピングを作成し、`{TX-PL-LABEL}lt;PATH_TO_AGENT_CONF.D>/snmp.d/traps_db/` ディレクトリに配置します。

You can write these mappings by hand, or generate mappings from a list of MIBs using Datadog's developer toolkit, [`ddev`][3].

#### MIB の一覧から TrapsDB ファイルを生成する

**前提条件**:
- Python 3
- [`ddev`][3] (`pip3 install "datadog-checks-dev[cli]"`)
- [`pysmi`][4] (`pip3 install pysmi`)

すべての MIB を専用のフォルダに入れます。そして、次を実行します:
`ddev meta snmp generate-traps-db -o ./output_dir/ /path/to/my/mib1 /path/to/my/mib2 /path/to/my/mib3 ...`

MIB に依存関係がある場合、`ddev` はそれが見つかればオンラインで取得します。

依存関係の欠落によるエラーが発生し、欠落している MIB ファイルにアクセスできる場合は、 ファイルを別のフォルダに置き、`--mib-sources <DIR>` パラメーターを使用して、 ddev がそれらのファイルがどこにあるかわかるようにしてください。各ファイル名が MIB 名と同じであることを確認してください (例: `snmp_v2_smi.txt` ではなく `SNMPv2-SMI`)。




[1]: /monitors/
[2]: /network_monitoring/devices
[3]: /developers/integrations/python
[4]: https://pypi.org/project/pysmi/
