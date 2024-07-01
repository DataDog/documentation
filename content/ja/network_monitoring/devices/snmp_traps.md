---
description: SNMP トラップのリッスンを有効にします。
further_reading:
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: ブログ
  text: SNMP トラップによるネットワークパフォーマンスの問題の監視と診断
title: SNMP トラップ
---

## 概要

SNMP トラップとは、SNMP 対応デバイスから SNMP マネージャーに送信される通知です。ネットワークデバイスが、機器の状態が突然変化するなどの異常な動作に遭遇した場合、デバイスは SNMP トラップイベントをトリガーします。

SNMP トラップの監視は、デバイスが不安定なために気付かないかもしれない問題をキャプチャするのに役立ちます。たとえば、インターフェイスが 15 秒ごとに使用可能な状態と使用不可能な状態の間を行き来している場合、60 秒ごとに実行されるポールに依存すると、ネットワークの不安定さの程度を誤って判断してしまう可能性があります。また、トラップは、デバイスのバッテリーやシャーシの健全性など、特定のハードウェアコンポーネントの可視性のギャップを埋めることができます。

Datadog Agent v7.37+ は、SNMP トラップのリッスンをサポートしており、特定のトラップイベントに対する[モニター][1]を設定することが可能です。

## コンフィギュレーション

SNMP トラップのリッスンを有効にするには、`datadog.yaml` に以下を追加します。

```yaml
network_devices:
  namespace: <NAMESPACE> # オプション、デフォルトは "default" です。
  snmp_traps:
    enabled: true
    port: 9162 # どのポートでトラップをリッスンするか
    community_strings: # v2 トラップで許可するコミュニティ文字列を指定します
      - <STRING_1>
      - <STRING_2>
    bind_host: 0.0.0.0
    users: # v3 ユーザー 1 名のみに限定
      - username: 'user'
        authKey: 'fakeKey'
        authProtocol: 'SHA' # 選択肢: MD5、SHA、SHA224、SHA256、SHA384、SHA512
        privKey: 'fakePrivKey'
        privProtocol: 'AES' # 選択肢: DES、AES (128 ビット)、AES192、AES192C、AES256、AES256C
```

**注**: 複数の v3 ユーザーとパスワードはサポートされていません。お客様の環境でこれが必要な場合は、[Datadog サポート][2]にお問い合わせください。

## デバイスのネームスペース

[ネットワークデバイスモニタリング][3]と同様に、ネームスペースをタグとして使用して、同じプライベート IP を共有する可能性がある複数のネットワークデバイスを区別することができます。たとえば、ニューヨークとパリの 2 つのルーターが同じプライベート IP を共有している場合を考えてみましょう。ニューヨークのデータセンターに 1 つ、パリのデータセンターにもう 1 つの Agent があるはずです。これらには、それぞれ `namespace: nyc` と `namespace: paris` というタグを付けるとよいでしょう。

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

これらのマッピングは手で書くこともできますし、Datadog の開発者ツールキットである [`ddev`][4] を使用して MIB の一覧からマッピングを生成することもできます。

#### MIB の一覧から TrapsDB ファイルを生成する

**前提条件**:
- Python 3
- [`ddev`][4] (`pip3 install "datadog-checks-dev[cli]"`)
- [`pysmi`][5] (`pip3 install pysmi`)

すべての MIB を専用のフォルダに入れます。そして、次を実行します:
`ddev meta snmp generate-traps-db -o ./output_dir/ /path/to/my/mib1 /path/to/my/mib2 /path/to/my/mib3 ...`

MIB に依存関係がある場合、`ddev` は依存関係が見つかればオンラインで取得します。あるいは、すべての依存関係を別のフォルダに置いて、`--mib-sources` パラメータでそのフォルダを指定します。



[1]: /ja/monitors/
[2]: /ja/help/
[3]: /ja/network_monitoring/devices
[4]: /ja/developers/integrations/new_check_howto/?tab=configurationtemplate#developer-toolkit
[5]: https://pypi.org/project/pysmi/